const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

module.exports = app => { 
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }))
    app.use(passport.initialize())
    app.use(passport.session())    
    app.use('/static', express.static('views'))
    app.set('view engine', 'ejs')
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    app.use('/dashboard', function(req, res, next) {       
      if(!req.session.user) {       
          res.render('login', { message: JSON.stringify('Please login to access') })
      } else {
          next()
      }
    })
    app.use('/profile', function(req, res, next) {       
        if(!req.session.user) {       
            res.render('login', { message: JSON.stringify('Please login to access') })
        } else {
            next()
        }
    })
    app.use('/users', function(req, res, next) {       
        if(!req.session.user) {       
            res.render('login', { message: JSON.stringify('Please login to access') })
        } else {
            next()
        }
    })
}