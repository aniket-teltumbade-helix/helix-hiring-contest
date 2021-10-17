const nodemailer = require('nodemailer')
const { mailData } = require('../../config')
const inviteMailTemplate = require('../mail_templates/inviteMailTemplate')
module.exports = async function invitationMail (body) {
  let { full_name, email, start_date, end_date, name } = body
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
  let htmlTemplate = inviteMailTemplate(name, full_name, start_date, end_date)

  let message = {
    to: `${full_name} <${email}>`,
    subject: `Helix Hiring 👉🏻 ${name}`,
    html: htmlTemplate
  }

  let info = await transporter.sendMail(message)

  console.log('Message sent successfully!')
  transporter.close()
  return nodemailer.getTestMessageUrl(info)
}
