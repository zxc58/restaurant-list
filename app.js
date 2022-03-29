// require模組 設定常數

const express = require('express')
const exphbs = require('express-handlebars')
require('dotenv').config()
require('./config/mongoose')
const indexRouter = require('./routes/index')
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport').auth
const flash = require("connect-flash")
const middleWare = require("./myMiddleware")

// app設定

app.use(session({
  secret: process.env.MY_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use(middleWare.flash)
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use('/', indexRouter)

// 啟動監聽
app.listen(parseInt(process.env.PORT), () => {
  console.log(`server start at http://localhost:${process.env.PORT}`)
})
