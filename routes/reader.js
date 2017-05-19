
var express = require('express');
var Machine = require('../database/schemas/machinery');
var app = express();
var path = require('path');


app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

function searchMachine(request,response){
  var data = request.params.id || {};
  Machine.findById(data,function(err,data){
      if(!err){
            //response.set('Content-type','json');
            response.write(JSON.stringify(data));
      }else{
            console.log("<error>: ");
      }
  });
}

app.get("/search-machine/:id",searchMachine);
module.exports = app;
