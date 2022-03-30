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
  for (let i = 0; i < 2; i++) {
    await bcrypt.genSalt(5).then(salt => bcrypt.hash(user[i].password, salt)).then(hash => { user[i].password = hash })
  }
  const usersData = await User.create(user)
  const [user1Id, user2Id] = [usersData[0]._id, usersData[1]._id]
  for (let i = 0; i < 8; i++) {
    if (i < 3 || i > 5) { restaurants[i].userId = user1Id } else { restaurants[i].userId = user2Id }
  }
  await Restaurant.create(restaurants)
  console.log('seed success')
  process.exit()
})
