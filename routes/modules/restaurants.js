const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const myMiddleware = require('../../myMiddleware')
router.use(myMiddleware.validationGuard)
// C
router.get('/new', (req, res) => {
  res.render('newedit', { action: '/restaurants', page: 'New Page' })
})
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  Restaurant.create(req.body).then(() => res.redirect('/')).catch(err => console.log(err))
})

// R
router.get('/:_id', (req, res) => {
  Restaurant.findById(req.params._id).lean().then(restaurant => {
    res.render('show', { restaurant })
  })
    .catch(err => console.log(err))
})

// U
router.get('/:_id/edit', (req, res) => {
  Restaurant.findById(req.params._id).lean().then(restaurant => {
    res.render('newedit', { restaurant, action: `/restaurants/${req.params._id}?_method=PUT`, page: 'Edit Page' })
  })
    .catch(err => console.log(err))
})
router.put('/:_id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params._id, req.body)
    .then(() => { res.redirect('/restaurants/' + req.params._id) })
    .catch(err => console.log(err))
})

// D
router.delete('/:_id', (req, res) => {
  Restaurant.findById(req.params._id)
    .then(restaurant => {
      return restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
