/**
 * Created by sergiodiazpinilla on 20/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var quotationSchema = new Schema({
    complete:{ type: String, required: true},
    items:{
        stairs:[{type: Schema.Types.ObjectId, ref: 'Stair'}]
    },
    clientEmail:{type: String, required: true},
    clientName:{type: String, required: true},
    price: { type: Number, required: true}
});

quotationSchema.methods.addStair = function(stair) {
    this.items.push(stair.id);
};

quotationSchema.methods.addMachine = function(machine) {
    this.items.push(machine.id);
};
quotationSchema.methods.addBoard = function(board) {
    this.items.push(board.id);
};

var Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;