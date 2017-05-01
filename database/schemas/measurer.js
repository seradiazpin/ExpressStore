var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var measurerSchema = new Schema({
    out_diameter:{ type: String, min:0.5,max:1,required: true},
    flow: { type: String, min:0.5,max:20, required: true},
    wall_heigth: { type: Number, min:1, max:2.2, required: true },
    wall_width: { type: Number, min:0.6,max:5, required: true },
    measurer_number:{ type: Number, min:0,max:20,required: true }
});

var machinery = mongoose.model('Measurer', measurerSchema);


module.exports = machinery;