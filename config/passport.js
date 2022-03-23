const passport = require("passport")
const localStrategy = require("passport-local")

function auth(app){
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) { 
            return done(null, false, { message: 'That email is not registered!' })
          }
          if (user.password !== password) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
        .catch(err => done(err, false))
    }))
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
      User.findById(id)
        .lean()
        .then(user => done(null, user))
        .catch(err => done(err, null))
    })

}
module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) { 
      
      return next()
    }
    res.redirect('/user/signin')
  }
  ,auth
}