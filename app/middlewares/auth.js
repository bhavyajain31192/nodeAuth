var jwt    = require('jsonwebtoken');
var userModel= require('mongoose').model('user');
var role= require('mongoose').model('role');

module.exports = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.JWTSIGNATURE, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if token is proper, save to request for use in other routes
                userModel.findOne({
                    id: decoded.id
                }, function(err, user) {
                    if (err) throw err;

                    if (!user) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. User not found.'
                        });
                    } else if (user) {
                        role.find( { "_id" : { $in : decoded.roles }  }, function(err, roles) {
                             req.user = decoded;
                             req.user.permissions = roles[0].permissions;
                             next();
                        });
                       
                    }

                });
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}