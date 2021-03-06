require('dotenv').config()
require("./mail")

const express = require("express")
const app = express()
const PORT = process.env.APP_PORT || 5000

const { slackClient } = require("./slack/slackConnect")
const { SlackService } = require("./slack/slackService")
const storeService = require('./store/storeService');

const slackService = new SlackService(slackClient)

app.use(express.json())

app.get("/", (req, res) => res.send({ message: "Ok" }))

app.post("/incident", async (req, res) => {
  try {
    if (req.body.messages && req.body.messages.length) {
      for (let i = 0; i < req.body.messages.length; i++) {
        const incident = req.body.messages[i];
        await slackService.sendIncident(incident)
      }

      storeService.processMessages(req.body.messages, slackService.isInPriority)
    } else {
      await slackService.sendIncident(req.body)

      storeService.processMessages({ messages: [req.body] }, slackService.isInPriority)
    }

    res.end()
  } catch (e) {
    console.log("Error:", e)
    console.dir(error, { depth: null });
  }
})

app.use((err, req, res, next) => (
  res.status(500).send({
    error: err.stack,
    message: err.message
  })
));

app.listen(PORT, () => console.log(`Server on: http://localhost:${PORT}`))