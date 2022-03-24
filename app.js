// require模組 設定常數
const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const indexRouter = require('./routes/index')
const app = express()
const port = 3000
const methodOverride = require('method-override')
const session = require('express-session')
const auth = require('./config/passport').auth
// app設定
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
auth(app)
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use('/', indexRouter)

// 啟動監聽
app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`)
})
