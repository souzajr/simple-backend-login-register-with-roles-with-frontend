const admin = require('./admin')

module.exports = app => {
    /* ============= INDEX ============= */
    app.get('/', function(req, res) {
        res.render('index')
    })

    /* ============= REGISTER ============= */
    app.get('/register', function(req, res) {
        res.render('register', { message: null })
    })
    app.post('/register', app.src.api.user.save)

    /* ============= LOGIN ============= */
    app.get('/login', function(req, res) {
        res.render('login', { message: null })
    })
    app.post('/login', app.src.api.auth.signin)

    /* ============= LOGOUT ============= */
    app.get('/logout', function(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/')
        })
    })

    /* ============= DASHBOARD  ============= */
    app.route('/dashboard')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.auth.validateToken)

    /* ============= PROFILE ============= */
    app.route('/profile')
        .all(app.src.config.passport.authenticate())        
        .get(app.src.api.user.get)
        .put(app.src.api.user.save)

    /* ============= LIST OF ALL USSER & ADD NEW USER ============= */
    app.route('/users')
        .all(app.src.config.passport.authenticate())
        .get(admin(app.src.api.user.getAll))
        .post(admin(app.src.api.user.save))
        .delete(admin(app.src.api.user.remove))

    /* ============= HANDLE ERROR  ============= */ 
    app.use(function(err, req, res, next) {
        res.status(500).render('500')
    })
    app.use(function(req, res) {
        res.status(404).render('404');
    })
}