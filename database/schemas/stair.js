/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var stairSchema = new Schema({
    form:{ type: String, required: true},
    accessDir : { type: String, required: true},
    exitDir: { type: String, required: true},
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    len:{ type: Number, required: true }
});


var Stair = mongoose.model('Stair', stairSchema);


module.exports = Stair;