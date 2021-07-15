require('dotenv').config()
const { WebClient } = require("@slack/web-api")
const { createEventAdapter } = require("@slack/events-api")

const slackSigninSecret = process.env.SLACK_SIGNIN_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const port = process.env.SLACK_PORT || 5001;

const slackEvents = createEventAdapter(slackSigninSecret);
const slackClient = new WebClient(slackToken)

slackEvents.on("error", console.error)

slackEvents.start(port).then(() => {
  console.log(`Slack on: http://localhost:${port}`)
})

module.exports = { slackClient }