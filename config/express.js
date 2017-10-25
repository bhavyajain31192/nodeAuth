/**
 * Created by bhavya on 8/4/16.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var dotenv = require('dotenv').config();
var mongoose = require('./mongoose');
var db = mongoose();
var session = require('express-session');

var authorizeUser = require('../app/middlewares/auth')

module.exports = function(){
    var app = express();
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
    app.use('/scripts', express.static(path.resolve('public/scripts'))) // to access scripts.
    app.use(bodyParser.urlencoded({strict: false, extended: true}));
    app.use(bodyParser.json());
    app.use(session({ secret: 'sessionsecret', resave: false, saveUninitialized: true}));
    app.use(morgan('dev'));
    // to enable CORS.
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        return next();
    });

  
    //secured routes.
    app.all('/api/*', authorizeUser); // to authorise secured users.
    
    app.all('/', function(req, res, next) {
        if(req.session.user) {
            res.locals.user = req.session.user;
            res.locals.userLoggedIn = true;
        }else {
            res.locals.userLoggedIn = false;
        }
        next();
    })
    var router = express.Router();

    require('../app/inventory/inventory.route')(router);
    require('../app/user/user.route')(router);
    require('../app/dashboard/dashboard.route')(router);
   
    app.use(router);
    return app;
};