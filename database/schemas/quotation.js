/**
 * Created by sergiodiazpinilla on 20/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var quotationSchema = new Schema({
    complete:{ type: String, required: true},
    itemType : {type: Number, required: true},
    item:{type: Schema.Types.ObjectId},
    clientEmail:{type: String, required: true},
    clientPhone:{type: Number, required: true},
    clientName:{type: String, required: true}
});

var Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;