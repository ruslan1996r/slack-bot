const { sendEmails } = require("../mail")
const { DynamoDBService } = require('../dbService')

const DBService = new DynamoDBService()

class SlackService {
  constructor(client) {
    this.slackClient = client
    this.rootChannelId = null
    this.lastIncidentDate = null
    this.defaultPriorities = 'SEV-1,SEV-2'
  }

  buildMessage({
    channelToSend,
    incidentChannelId,
    incidentTitle,
    incidentUrl,
    priority
  }) {
    const slackLink = 'https://small-y6x9515.slack.com'

    return {
      channel: channelToSend,
      text: incidentTitle,
      blocks: [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": incidentTitle
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `${priority}`
            }
          ]
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `<${slackLink}/archives/${incidentChannelId}|Channel link>`,
            },
            {
              "type": "mrkdwn",
              "text": `<${incidentUrl}|Incident link>`
            },
          ]
        },
      ],
    }
  }

  async sendIncident(incident) {
    const channelName = incident.incident.title ? incident.incident.title
      .toLocaleLowerCase()
      .trim()
      .replace(/ /gi, '-') :
      `Incident ${new Date()}`

    const inPriority = this.isInPriority(incident)
    const existsChannel = await this.isChannelExists(channelName)

    if (existsChannel && incident.incident.status === 'resolved') {
      await this.slackClient.chat.postMessage(this.buildMessage({
        channelToSend: existsChannel,
        incidentChannelId: existsChannel,
        incidentTitle: incident.incident.title,
        incidentUrl: incident.incident.html_url,
        priority: "Incident resolved"
      }))

      await DBService.updateIncident(
        incident.incident.id,
        { incidentPriority: 'RESOLVED' }
      )

    } else if (existsChannel) {
      await this.slackClient.chat.postMessage(this.buildMessage({
        channelToSend: existsChannel,
        incidentChannelId: existsChannel,
        incidentTitle: incident.incident.title,
        incidentUrl: incident.incident.html_url,
        priority: `Updated the priority of the incident: ${incident.incident.priority.summary}`
      }))

      await DBService.updateIncident(
        incident.incident.id,
        { incidentPriority: incident.incident.priority.summary }
      )

      sendEmails({ type: "update", incident })

      return "Updated priority"

    } else if (!existsChannel && inPriority) {
      const newChannel = await this.slackClient.conversations.create({ name: channelName });
      const members = await this.getRootChannelMembers()
      const result = await this.slackClient.conversations
        .invite({
          channel: newChannel.channel.id,
          users: members.join(",")
        })
      const id = await this.getChannelId()

      await this.slackClient.chat.postMessage(this.buildMessage({
        channelToSend: id,
        incidentChannelId: newChannel.channel.id,
        incidentTitle: incident.incident.title,
        incidentUrl: incident.incident.html_url,
        priority: `Incident priority: ${incident.incident.priority.summary}`
      }))

      await DBService.createIncident({
        incidentPriority: incident.incident.priority.summary,
        incidentId: incident.incident.id,
        incidentTitle: incident.incident.title
      })

      sendEmails({ type: "new", incident })

      return result
    } else if (!existsChannel && !inPriority) {
      return "Low priority incident"
    }
  }

  /**
   * @returns {boolean} 
   */
  isInPriority(incident) {
    const priorities = process.env.PRIORITIES || this.defaultPriorities
    const isIn = priorities
      .split(',')
      .indexOf(incident.incident.priority.summary)
    if (isIn === -1 || incident.incident.status === 'resolved') return false
    return true
  }

  /**
   * @returns {Array} 
   */
  async getRootChannelMembers() {
    try {
      const channelId = await this.getChannelId()

      if (!channelId) return []

      const result = await this.slackClient.conversations.members({ channel: channelId })
      return result.members
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @returns {string|null} - returns the ID of the main channel
   */
  async getChannelId() {
    try {
      if (this.rootChannelId) {
        return this.rootChannelId
      }
      const result = await this.slackClient.conversations.list()
      const channel = result.channels.find(channel => channel.name === process.env.CHANNEL_NAME)

      if (channel) {
        this.rootChannelId = channel.id
        return channel.id
      }
      return null
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @param {string} channelName 
   * @returns {boolean|string}
   */
  async isChannelExists(channelName) {
    const result = await this.slackClient.conversations.list()
    const channel = result.channels.find(channel => channel.name === channelName)

    if (channel) return channel.id
    return false
  }
}

module.exports = { SlackService }