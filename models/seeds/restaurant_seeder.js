// require modules and set const
require('dotenv').config()
const db = require('../../config/mongoose')
const restaurants = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const user = require('../../user.json').user
const User = require('../user')
const bcrypt = require('bcryptjs')
//
db.on('error', () => {
  console.log('seeder error')
})
db.once('open', async () => {
  await bcrypt.genSalt(5).then(salt => bcrypt.hash(user[0].password, salt)).then(hash => { user[0].password = hash })
  await bcrypt.genSalt(5).then(salt => bcrypt.hash(user[1].password, salt)).then(hash => { user[1].password = hash })
  const a = await User.create(user)
  const [c, d] = [a[0]._id, a[1]._id]
  for (let i = 0; i < 8; i++) {
    if (i < 3 || i > 5) { restaurants[i].userId = c } else { restaurants[i].userId = d }
  }
  await Restaurant.create(restaurants)
  console.log('seed success')
  process.exit()
})
