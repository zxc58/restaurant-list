const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  let a, searchValue
  if (!req.query.keyword) { a = { userId: req.user._id } } else {
    searchValue = new RegExp(req.query.keyword, 'i')
    a = { userId: req.user._id, $or: [{ name: searchValue }, { name_en: searchValue }, { category: searchValue }] }
  }
  Restaurant.find(a).lean().sort({ name: 'asc' }).then(restaurants => {
    const dbResult = JSON.stringify(restaurants)
    res.render('index', { restaurants, search_value: req.query.keyword, db_result: dbResult })
  })
    .catch(error => {
      console.log(error)
      res.render('err')
    })
})

module.exports = router
