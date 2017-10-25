/**
 * Created by bhavya on 8/4/16.
 */

var inventoryModel= require('mongoose').model('inventory');

exports.createInventoryPage = function(req, res, next) {
    res.render('inventory/create.ejs');
};

exports.editInventoryPage = function(req, res, next) {
    inventoryModel.findOne({_id: req.params.id }, function(err, inventoryDetails){
     res.render('inventory/edit.ejs', {inventoryDetails});
    });
};


exports.createItem = function(req, res, next) {
    var item = new inventoryModel(req.body);
    inventoryModel.findOne({ name: req.body.name }, function(err, inventoryDetails){
        if(!inventoryDetails){
            item.save(function (err, results) {
                if(err) {
                    next({Error : err});
                    return;
                }
               res.send({
                   success: true,
                   message: "Inventory Item created Successfully",
                   redirectTo: '/'
               });
            });
        }
        else{
              res.status(400).json({success: false, message: "Items already exists" });
        }
    })
};

exports.editItem = function(req, res, next) {
    inventoryModel.findByIdAndUpdate(req.params.id, {name: req.body.name, qty: req.body.qty }, {new: true}, function(err, model) {
        if(err) {
            next({Error : err});
            return;
        }
        res.send({
            success: true,
            message: "Inventory Item edited Successfully",
            redirectTo: '/'
        });
    });
};

exports.deleteItem = function(req, res, next) {
    inventoryModel.findByIdAndRemove({_id: req.params.id}, function(err, data) {
        if(err) {
            next({Error : err});
            return;
        }
        res.send({
            success: true,
            message: "Inventory Item deleted Successfully",
            redirectTo: '/'
        });
    });
}