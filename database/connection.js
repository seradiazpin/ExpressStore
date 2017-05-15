var mongoose = require('mongoose');
mongoose.connect('mongodb://ejemplo:ejemplo@ds153710.mlab.com:53710/ejemplo');
//mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;


module.exports = db;
