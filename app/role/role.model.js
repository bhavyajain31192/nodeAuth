/**
 * Created by Bhavya on 22/10/17.
 */


var mongoose = require('mongoose'),
    schema = mongoose.Schema;

require('mongoose-assert')(mongoose);


var roleSchema = new schema({
    name: { type: String },
    permissions: { type: Array },
    reg_time : {
        type : Date, default: Date.now
    },
}, { collection: 'roles' });
;

mongoose.model('role', roleSchema);