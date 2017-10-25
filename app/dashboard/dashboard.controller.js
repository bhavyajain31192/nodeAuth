/**
 * Created by Bhavya on 22/10/17.
 */

var inventoryModel= require('mongoose').model('inventory');

exports.getUsers = function (req,res,next) {
    inventoryModel.find().then(function(results){
        if(!results){
            res.status(404).json("No data");
        }else{
            res.render('dashboard', { items: results, user: req.session.user });
        }
    });
};

