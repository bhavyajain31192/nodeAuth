/**
 * Created by bhavya on 8/4/16.
 */
var express = require('./config/express');
var app = express();


app.use(function(err, req, res, next) {

    console.log(err,"errr");
    res.status(500).send(err);

});

app.listen(3003);
console.log("server started at 3003");


module.exports =app;