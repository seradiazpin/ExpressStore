
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineryCatSchema = new Schema({
    name:{type:String, required:true}
});

var machineryCat = mongoose.model('machineryCat',machineryCatSchema);

module.exports = machineryCat;
