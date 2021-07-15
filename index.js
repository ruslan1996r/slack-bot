require('dotenv').config()
require("./mail/mail")

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
    storeService.processMessages(req.body?.messages, slackService.isInPriority)
      .catch((error) => {
        console.error('StoreService processMessages error:');
        console.dir(error, { depth: null });
      });


    const incidentResult = await slackService.sendIncident(req.body)
    // console.log("incidentResult", incidentResult)
    // res.send({ sult })
    res.end()
  } catch (e) {
    console.log("Error:", e)
  }
  // console.log("slackService", slackService.client)
  // console.dir(req.params, { depth: null })
  // console.dir(req.body, { depth: null })
})

app.use((err, req, res, next) => (
  res.status(500).send({
    error: err.stack,
    message: err.message
  })
));

app.listen(PORT, () => console.log(`Server on: http://localhost:${PORT}`))