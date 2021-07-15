const { sendEmails } = require("../mail/mail")

class SlackService {
  constructor(client) {
    this.slackClient = client
    this.rootChannelId = null
    this.lastIncidentDate = null
    this.defaultPriorities = 'SEV-1,SEV-2'
  }

  buildMessage({ channelId, incidentTitle, incidentUrl = 'https://1deb2eccbe8f.ngrok.io' }) {
    const slackLink = 'https://small-y6x9515.slack.com'

    return {
      channel: channelId,
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
              "text": `<${slackLink}/archives/${this.rootChannelId}|Channel link>`,
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

  async sendIncident(data) {
    let incident = data;
    if (data.messages) {
      incident = data.messages[0]
    }
    const isPriority = this.isInPriority(incident)
    if (!isPriority) {
      return "Low priority incident"
    }
    sendEmails(incident)

    const channelName = incident.incident.title ? incident.incident.title
      .toLocaleLowerCase()
      .trim()
      .replace(/ /gi, '-') :
      `Incident ${new Date()}`
    // Проверить наличие канала
    const newChannel = await this.slackClient.conversations.create({ name: channelName });
    const members = await this.getRootChannelMembers()
    const result = await this.slackClient.conversations
      .invite({
        channel: newChannel.channel.id,
        users: members.join(",")
      })
    const id = await this.getChannelId()

    await this.slackClient.chat.postMessage(this.buildMessage({
      channelId: id,
      incidentTitle: incident.incident.title,
      incidentUrl: incident.incident.html_url
    }))
    return result
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
   * @returns {string|null}
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
}

module.exports = { SlackService }