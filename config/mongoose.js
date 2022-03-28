//
const mongoose = require('mongoose')
const db = mongoose.connection
//
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db open')
})

module.exports = db
