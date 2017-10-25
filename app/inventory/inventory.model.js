/**
 * Created by Bhavya on 22/10/17.
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