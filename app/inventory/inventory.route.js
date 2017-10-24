/**
 * Created by bhavya on 8/4/16.
 */
var inventoryController= require('./inventory.controller.js');
module.exports = function (app) {
    app.route('/inventory/create')
        .get(function(req, res, next) {
            if(!req.session.user) {
                return res.redirect('/');
            }
            res.locals.userLoggedIn = true;
            return inventoryController.createInventoryPage(req, res, next);
        });
    app.route('/inventory/edit/:id')
        .get(function(req, res, next) {
            if(!req.session.user) {
                return res.redirect('/');
            }
            res.locals.userLoggedIn = true;
            return inventoryController.editInventoryPage(req, res, next);
        })
    app.route('/api/inventory')
    .post(inventoryController.createItem);
    app.route('/api/inventory/:id')
    .post(inventoryController.editItem);
    app.route('/api/inventory/:id')
    .delete(inventoryController.deleteItem);

};