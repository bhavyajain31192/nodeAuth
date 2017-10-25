/**
 * Created by Bhavya on 22/10/17.
 */
var inventoryController= require('./inventory.controller.js');
module.exports = function (app) {
    app.route('/inventory/create')
        .get(function(req, res, next) {
            if(!req.session.user) {
                return res.redirect('/');
            }
            if(req.session.user.permissions && req.session.user.permissions.indexOf('inventory.create') < 0){
                return res.redirect('/');
            }
            res.locals.userLoggedIn = true;
            res.locals.user = req.session.user;
            return inventoryController.createInventoryPage(req, res, next);
        });
    app.route('/inventory/edit/:id')
        .get(function(req, res, next) {
            if(!req.session.user) {
                return res.redirect('/');
            }
             if(req.session.user.permissions && req.session.user.permissions.indexOf('inventory.edit') < 0){
                return res.redirect('/');
            }
            res.locals.userLoggedIn = true;
            res.locals.user = req.session.user;
            return inventoryController.editInventoryPage(req, res, next);
        })
    app.route('/api/inventory')
    .post(function(req,res,next){
        if(req.user.permissions && req.user.permissions.indexOf('inventory.create') < 0){
            return res.status(403).send({success:false, message: 'Permission denied'});
        }
        return inventoryController.createItem(req,res,next);

    });
    app.route('/api/inventory/:id')
    .post(function(req,res,next){
        if(req.user.permissions && req.user.permissions.indexOf('inventory.edit') < 0){
            return res.status(403).send({success:false, message: 'Permission denied'});
        }
        return inventoryController.editItem(req,res,next);
    });
    app.route('/api/inventory/:id')
    .delete(
        function(req,res,next){
        if(req.user.permissions && req.user.permissions.indexOf('inventory.delete') < 0){
            return res.status(403).send({success:false, message: 'Permission denied'});
        }
        return inventoryController.deleteItem(req,res,next);
    });

};