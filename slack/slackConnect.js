require('dotenv').config()
const { WebClient } = require("@slack/web-api")
const { createEventAdapter } = require("@slack/events-api")

const slackSigninSecret = process.env.SLACK_SIGNIN_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const port = process.env.SLACK_PORT || 5001;

const slackEvents = createEventAdapter(slackSigninSecret);
const slackClient = new WebClient(slackToken)

slackEvents.on('app_mention', async (event) => {
  try {
    console.log(`Got event from user ${event.user}: ${event.text}`);

    if (event.text && event.text.includes('add')) {
      const channelName = event.text.split('add:')[1] || `New channel: ${Math.random()}`
      const result = await slackClient.conversations.create({ name: channelName });
      const members = await getMembers()

      await slackClient
        .conversations
        .invite({
          channel: result.channel.id,
          users: members.join(",")
        })
      // console.log(result);
      // console.log("members", members)
    }
  } catch (e) {
    console.log("ERROR: ", e)
  }
  // slackClient.conversations.list().then(res => console.log("RESULT: ", res)).catch(e => console.log(e))

  // (async () => {
  //   try {
  //     await slackClient.chat.postMessage({
  //       channel: event.channel,
  //       text: `Hello <@${event.user}>! :tada:`,
  //       attachments: {
  //         text: ""
  //       }
  //     })
  //   } catch (e) {
  //     console.log(error.data)
  //   }
  // })()
})

// slackClient.conversations
//   .list()
//   .then(res => {
//     const channels = res.channels
//     const small = channels.find(c => c.name === 'small')
//     console.log("small", small)
//     // small.members
//     //   ().then(users => {
//     //   console.log("users", users)
//     // }).catch(e => console.log("ERRR;,", e))
//   })
//   .catch(e => console.log(e))

async function getMembers() {
  return await slackClient.conversations
    .members({ channel: "C026PGCFHFZ" })
    .then(res => {
      // console.log("res", res.members)
      return res.members
    })
    .catch(e => console.log(e))
}

slackEvents.on("error", console.error)

slackEvents.start(port).then(() => {
  console.log(`Slack on: http://localhost:${port}`)
})

module.exports = { slackClient }