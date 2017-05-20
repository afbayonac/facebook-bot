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
  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
    forismatic.getQuote(function (error, quote) {
      if (error) throw err
      reply({ text: quote.quoteLink }, (err) => {
        if (err) throw err
        console.log(`log ok`)
      })
    })
  })
})

http.createServer(bot.middleware()).listen(5000)
console.log('Echo bot server running at port 5000.')
