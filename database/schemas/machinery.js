/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var machinerySchema = new Schema({
    type:{ type: String, required: true},
    weight: { type: String, required: true},
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    hp:{ type: Number, required: true }
});

var machinery = mongoose.model('machinery', machinerySchema);


module.exports = machinery;