/**
 * Created by bhavya on 8/4/16.
 */
var dashboardController= require('./dashboard.controller.js');
module.exports = function (app) {
    app.route('/')
        .get(function(req, res, next) {
            console.log('session', req.session);
            if(!req.session.user) {
                return res.render('login', { userLoggedIn: false });
            }
            return dashboardController.getUsers(req, res, next);
        });
  
};