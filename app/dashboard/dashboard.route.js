/**
 * Created by Bhavya on 22/10/17.
 */
var dashboardController= require('./dashboard.controller.js');
module.exports = function (app) {
    app.route('/')
        .get(function(req, res, next) {
            if(!req.session.user) {
                return res.render('login', { userLoggedIn: false });
            }
            return dashboardController.getUsers(req, res, next);
        });
  
};