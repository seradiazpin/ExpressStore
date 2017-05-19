
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineryCompSchema = new Schema({
    reference:{type:String, required:true,unique:true},
    name:{type:String, required:true},
    weight:{type:Number,required:true},
    length:{type:Number,required:true},
    width:{type:Number,required:true},
    height:{type:Number,required:true},
    price:{type:String,required:true},
    img:{type: String,required:true}
});

var machineryComp = mongoose.model('machineryComp',machineryCompSchema);

module.exports = machineryComp;
