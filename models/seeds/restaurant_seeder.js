// require modules and set const
const db = require('../../config/mongoose')
const restaurants = require('../../restaurant.json').results
const Restaurant = require('../restaurant')
const user = require("../../user.json").user
const User = require("../user")
//
db.on('error', () => {
  console.log('seeder error')
})
db.once('open', async() => {
  let a = await User.create(user)
  let [c,d] = [a[0]._id,a[1]._id]
  for(let i=0;i<8;i++){
    if(i<3||i>5)
      restaurants[i].userId=c
    else
      restaurants[i].userId=d
  }
  let b = await Restaurant.create(restaurants)
  process.exit()
})
