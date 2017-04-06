var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    name: String,
    price: { type: Number, required: true},
    description: { type: String, required: true },
    calification: { type: Number, min: 0, max: 5}
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
productSchema.methods.case = function() {
    // add some stuff to the users name
    this.name = this.name + ' Product';
    return this.name;
};

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;