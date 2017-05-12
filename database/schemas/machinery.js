/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var machinerySchema = new Schema({
    type:{ type: String, required: true},
    weight: { type: Number, required: true},
    capacity: { type: Number, required: true },
    engineModel: { type: String, required: true },
    waterCooling:{ type: String, required: true },
    routeSpeed: { type: Number, required: true },
    turningSpeed: { type: Number, required: true },
    fuelCapacity: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    workHours: { type: Number, required: true }
});

var machinery = mongoose.model('machinery', machinerySchema);

module.exports = machinery;
