/**
 * Created by bhavya on 8/4/16.
 */
var inventoryController= require('./inventory.controller.js');
module.exports = function (app) {
    app.route('/inventory/create')
        .get(function(req, res, next) {
            console.log('session');
            if(!req.session.user) {
                return res.redirect('/');
            }
            res.locals.userLoggedIn = true;
            return inventoryController.createInventoryPage(req, res, next);
        });
    app.route('/api/inventory')
    .post(inventoryController.createItem);

};