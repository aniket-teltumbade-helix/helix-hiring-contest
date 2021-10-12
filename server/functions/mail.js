const nodemailer = require('nodemailer')
const { mailData } = require('../config')
module.exports = async function mail (full_name, email) {
  let transporter = nodemailer.createTransport(
    {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: mailData,
      logger: false,
      debug: true
    },
    {
      from: 'Hackzone <noreply@hackzone.herokuapp.com>',
      headers: {
        'X-Laziness-level': 1000
      }
    }
  )
  let htmlTemplate = 'Hello hi'

  let message = {
    to: `${full_name} <${email}>`,
    subject: 'Nodemailer is unicode friendly ✔',
    html: htmlTemplate
  }

  let info = await transporter.sendMail(message)

  console.log('Message sent successfully!')
  transporter.close()
  return nodemailer.getTestMessageUrl(info)
}
