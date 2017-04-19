/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var materialSchema = new Schema({
    name:{ type: String, required: true},
    price : { type: Number, required: true},
    quantity: { type: Number, required: true},
    provider : {type: mongoose.Schema.Types.ObjectId, ref: 'Provider'}
});

var Material = mongoose.model('Material', materialSchema);

module.exports = Material;