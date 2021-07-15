const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  }))

const sendEmails = ({ incident, type = 'new' }) => {
  const emails = (process.env.EMAILS || "").split(",")
  const { title, priority, html_url } = incident.incident

  let html = ''

  if (type = 'new') {
    html = `<h3>New incident "${title}" with priority "${priority.summary}": ${html_url}</h3>`
  } else {
    html = `<h3>Updated incident "${title}" to priority "${priority.summary}": ${html_url}</h3>`
  }

  emails.forEach(email => transporter.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: title,
    html,
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response, info);
    }
  }))
}

module.exports = {
  transporter,
  sendEmails
}
