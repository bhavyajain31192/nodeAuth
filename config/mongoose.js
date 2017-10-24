/**
 * Created by bhavya on 8/4/16.
 */
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(){
    var db = mongoose.connect('mongodb://authtest:authtest@ds227555.mlab.com:27555/node-authentication');
    require('../app/user/user.model');
    require('../app/access/access.model');
    require('../app/inventory/inventory.model');

    return db;
};