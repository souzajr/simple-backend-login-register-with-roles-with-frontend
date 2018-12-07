const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy } = passportJwt
require('dotenv').config()

const getSession = function(req) {
    var token = null
    try {
        if(req && req.session) token = req.session.user.token
        return token
    } catch(err) {
        return err
    }
}

const params = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: getSession
}

module.exports = app => {
    const strategy = new Strategy(params, (payload, done) => {
        User.findOne({ _id: payload.id }).then(user => done(null, user ? { ...payload } : false)).catch(err => done(err, false))  
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}