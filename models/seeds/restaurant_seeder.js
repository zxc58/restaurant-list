// require modules and set const
require('dotenv').config()
const db = require('../../config/mongoose')
const restaurants = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const users = require('../../user.json').results
const User = require('../user')
const bcrypt = require('bcryptjs')
//
db.on('error', () => {
  console.log('seeder error')
})
db.once('open', async () => {
  for (let i = 0; i < users.length; i++) {
    const salt = await bcrypt.genSalt(5)
    const hashed = await bcrypt.hash(users[i].password, salt)
    users[i].password = hashed
    const usersData = await User.create(users[i])
    const userId = usersData._id
    users[i].restaurantsIds.forEach(e => {
      restaurants[e - 1].userId = userId
    })
  }

  await Restaurant.create(restaurants)
  console.log('seed success')
  process.exit()
})
