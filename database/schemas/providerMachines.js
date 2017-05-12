/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var providerMachinerySchema = new Schema({
    name:{ type: String, required: true},
    location : { type: String, required: true},
    email : { type: String, required: true},
    phone : {type: String,required : true},
    resuplyTime: { type: Number, required: true}
});

var ProviderMachinery = mongoose.model('ProviderMachinery', providerMachinerySchema);

module.exports = ProviderMachinery;
