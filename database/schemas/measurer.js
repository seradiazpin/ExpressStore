var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var measurerSchema = new Schema({
    wall_heigth: { type: Number, min:1, max:2, required: true },
    measurer_number:{ type: Number, min:0,max:100,required: true }
});

var machinery = mongoose.model('Measurer', measurerSchema);


module.exports = machinery;
