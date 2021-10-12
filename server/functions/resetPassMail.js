const nodemailer = require('nodemailer')
const { mailData } = require('../config')
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
  let htmlTemplate = ` 
  <h1>Hackzone</h1>
  <p>Hi ${full_name},</p>
  <p>As you have requested for reset password instructions, here they are, please follow the URL:</P
  <a href="${origin}/reset_password/${role}/${token}">Reset Password</a>
  <p>Alternatively, open the following url in your browser</p>
  <a href="${origin}/reset_password/${role}/${token}">${origin}/reset_password/${role}/${token}</a>`

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
