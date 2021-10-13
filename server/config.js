exports.redisData = process.env.REDIS_URL
exports.mailData = {
  user: process.env.MAIL_USER.trim(),
  pass: process.env.MAIL_PASS
}
