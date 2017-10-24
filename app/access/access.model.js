/**
 * Created by bhavya on 8/4/16.
 */


var mongoose = require('mongoose'),
    schema = mongoose.Schema;

require('mongoose-assert')(mongoose);


var AccessSchema = new schema({
    token: { type: String },
    num: { type: String, match: [/^[0-9]{10}$/, "Mobile number must be 10 digit"], required: true },
    reg_time : {
        type : Date, default: Date.now
    },
}, { collection: 'access' });
;

mongoose.model('access', AccessSchema);