
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineryCompSchema = new Schema({
    name:{type:String, required:true,unique:true},
    reference:{type:String,required:true},
    width:{type:Number,required:true},
    price:{type:Number,required:true}
    //ammount:{type:Number,required:true}
});

var machineryComp = mongoose.model('machineryComp',machineryCompSchema);

module.exports = machineryComp;
