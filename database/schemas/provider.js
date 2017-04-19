/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var providerSchema = new Schema({
    name:{ type: String, required: true},
    location : { type: String, required: true},
    resuplyTime: { type: Number, required: true}
});

var Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;