var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    name: String,
    price: { type: Number, required: true},
    description: { type: String, required: true },
    calification: { type: Number, min: 0, max: 5}
});


productSchema.methods.case = function() {
    // add some stuff to the users name
    this.name = this.name + ' Product';
    return this.name;
};


var Product = mongoose.model('Product', productSchema);


module.exports = Product;