/**
 * Created by bhavya on 8/4/16.
 */

var inventoryModel= require('mongoose').model('inventory');

exports.createInventoryPage = function(req, res, next) {
    res.render('inventory-create.ejs');
};

exports.createItem = function(req, res, next) {
      console.log('creating Item....', req.body);
    var item = new inventoryModel(req.body);
    inventoryModel.findOne({ name: req.body.name }, function(err, inventoryDetails){
        console.log('inventoryDetails, ', inventoryDetails);
        if(!inventoryDetails){
            item.save(function (err, results) {
                if(err) {
                    next({Error : err});
                    return;
                }
               res.redirect('/')
            });
        }
        else{
              res.status(400).json({success: false, message: "Items already exists" });
        }
    })
};