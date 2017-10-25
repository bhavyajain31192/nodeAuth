/**
 * Created by bhavya on 8/4/16.
 */
var userController= require('./user.controller.js');
var validation =  require('./user.validation.js');

module.exports = function (app) {


    app.route('/user')
        .get(userController.getUsers)
    app.route('/login')
        .post(userController.login);
    app.route('/signup')
        .get(userController.renderSignupPage)
        .post(userController.createUser);
    app.route('/api')
        .post(function(req, res, next) {
            res.status(200).json({user : req.user});
        });
     app.post('/logout',function(req,res) {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                // res.locals.user= null
                // res.locals.userLoggedIn = false;
                res.redirect('/');
            }
        });
    });

};