const http = require('http')
const Bot = require('messenger-bot')
const cfg = require('./secret')
var forismatic = require('forismatic-node')()

let bot = new Bot({
  token: cfg.token,
  verify: cfg.verify,
  app_secret: cfg.app_secret
})

bot.on('error', (err) => {
  console.log('err')
  console.log(err)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    forismatic.getQuote(function (error, quote) {
      if (!error) {
        reply({ text: quote.quoteLink }, (err) => {
          if (err) throw err
          console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
        })
      } else {
        console.error(error)
      }
    })
  })
})

http.createServer(bot.middleware()).listen(5000)
console.log('Echo bot server running at port 5000.')
