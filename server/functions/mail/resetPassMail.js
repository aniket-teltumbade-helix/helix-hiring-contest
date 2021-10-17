const nodemailer = require('nodemailer')
const { mailData } = require('../../config')
const resetPassTemplate = require('../mail_templates/resetPassTemplate')
module.exports = async function resetPassMail (
  full_name,
  email,
  token,
  role,
  origin
) {
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
      from: 'Hackzone Team <noreply@hackzone.herokuapp.com>',
      headers: {
        'X-Laziness-level': 1000
      }
    }
  )
  let htmlTemplate = resetPassTemplate(origin, token)
  let message = {
    to: `${full_name} <${email}>`,
    subject: 'Reset Password ✔',
    html: htmlTemplate
  }

  let info = await transporter.sendMail(message)

  console.log('Message sent successfully!')
  transporter.close()
  return nodemailer.getTestMessageUrl(info)
}
