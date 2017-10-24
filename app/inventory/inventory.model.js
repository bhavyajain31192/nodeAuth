/**
 * Created by bhavya on 8/4/16.
 */


var mongoose = require('mongoose'),
    schema = mongoose.Schema;

require('mongoose-assert')(mongoose);


var inventorySchema = new schema({
    name: { type: String },
    qty: { type: Number },
    reg_time : {
        type : Date, default: Date.now
    },
}, { collection: 'inventory' });
;

mongoose.model('inventory', inventorySchema);