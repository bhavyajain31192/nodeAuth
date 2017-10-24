/**
 * Created by bhavya on 8/4/16.
 */

var userModel= require('mongoose').model('user');
var accessModel=require('mongoose').model('access');
var role = require('mongoose').model('role')
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var responseMessage = {
    error: {}
};

exports.createUser = function (req,res,next) { 

    var hash = bcrypt.hashSync(req.body.pass, 10);
    req.body.pass = hash;
    var user = new userModel(req.body);
    userModel.findOne({ num: req.body.num }, function(err,userDetails){
        console.log('userDetails, ', userDetails);
        if(!userDetails){
            user.save(function (err, results) {
                if(err) {
                    next({Error : err});
                    return;
                }
                var tokenData = jwt.sign({uid: results._id}, process.env.JWTSIGNATURE,  { expiresIn: '60 days' });
                var access = new accessModel({token: tokenData,num: req.body.num});
                access.save(function(err, accessRes){
                    req.session.user = { id: results._id };
                    res.locals.user= results
                    res.locals.userLoggedIn = true;
                    res.status(200).json({success: true, token: accessRes.token});
                });    
            });
        }
        else{
            next({Error : "Duplicate Mobile Number"});
        }
    })
};

exports.login = function (req,res,next) { 
    userModel.findOne({num: req.body.num}).then(function(results){
        console.log('results', results, req.body);
        var passValidation = bcrypt.compareSync(req.body.pass, results.pass); // true
        if(!passValidation){
            res.status(404).json({success:false, message: "Password is invalid." }); 
        }else{
            var tokenData = jwt.sign({uid: results._id, roles: results.roles }, process.env.JWTSIGNATURE,  { expiresIn: '60 days' });
                var access = new accessModel({token: tokenData,num: req.body.num});
                access.save(function(err, accessRes){
                    console.log('session', req.session);
                    req.session.user = { id: results._id};
                    res.locals.user= results
                    res.locals.userLoggedIn = true;
                    
                    console.log("User", req.session);
                    res.status(200).json({success: true, token: accessRes.token});
                });   
        }
    }).catch(function(err){
        console.log(err);
        res.status(400).json(err); 
    })
};


exports.getUsers = function (req,res,next) {
    userModel.find().then(function(results){
        if(!results){
            res.status(404).json("No student Present");
        }else{
            res.status(200).json(results);
        }
    });
};

exports.renderSignupPage = function (req,res,next) {
      console.log('renderingg....');
      role.find({}, function(err, roles) {
        
         res.render('signup', { userLoggedIn: false, roles: roles });
        
      });
};


exports.authorize = function(req, res) {

    // find the user
    userModel.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                console.log("fhjdh",process.env.JWTSIGNATURE);
                // if user is found and password is right
                // create a token
                var token =  jwt.sign(user, process.env.JWTSIGNATURE, { expiresIn: '60 days' }) ;


                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};