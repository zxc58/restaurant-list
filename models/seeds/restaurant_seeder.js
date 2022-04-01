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
  for (let oneUser of users) {
    const salt = await bcrypt.genSalt(5)
    const hashed = await bcrypt.hash(oneUser.password, salt)
    oneUser.password = hashed
    const usersData = await User.create(oneUser)
    const userId = usersData._id
    oneUser.restaurantsIds.forEach(e => {
      restaurants[e - 1].userId = userId
    })
  }

  await Restaurant.create(restaurants)
  console.log('seed success')
  process.exit()
})
