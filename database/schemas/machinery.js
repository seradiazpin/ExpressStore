/**
 * Created by usuario on 19/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var machinerySchema = new Schema({

    name:{ type: String, required: true},
    brand:{type: String,required:true,default:"*NOT FOUND*"},
    type:{ type: String, required: true,default:"*NOT FOUND*"},
    weight: { type: Number, required: true},
    capacity: { type: Number, required: true},
    engineModel: { type: String, required: true,default:"*NOT FOUND*"},
    waterCooling:{ type: String, required: true,default:"*NOT FOUND*"},
    routeSpeed: { type: Number, required: true},
    turningSpeed: { type: Number, required: true},
    fuelCapacity: { type: Number, required: true},
    length: { type: Number, required: true},
    width: { type: Number, required: true},
    height: { type: Number, required: true},
    workHours: { type: Number, required: true},
    ammount: { type: Number, default:0},
    img: { type: String, default:null},
    sound: { type: String, default:null},
    components: [{comp:{ type: Schema.Types.ObjectId, ref: 'component' },
                  cant:{type:Number,default:1}}]
});

var machinery = mongoose.model('machinery', machinerySchema);

module.exports = machinery;
