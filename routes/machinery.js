/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Machine = require('../database/schemas/machinery');
var Material = require('../../../Desktop/ExpressStore-master/database/schemas/material');
var Provider = require('../../../Desktop/ExpressStore-master/database/schemas/provider');


/* Metodo para crear y guardar una escalera*/
var createmachine = function (request, response) {
    var data = request.body|| {};
    var machine = new Machine(data);
    machine.save(function(err) {
        if (err) throw err;
        console.log('machine saved successfully!');
    });
    response.redirect('/machinery/admin');
};

router.get('/', function(req, res, next) {
    Machine.find({}, function(err, mac) {
        if (err) throw err;
        res.render('machinery/index', {machines:mac});
    });

});

router.get('/admin', function(req, res, next) {
    Machine.find({}, function(err, mac) {
        if (err) throw err;
        res.render('machinery/index', {machines:mac});
    });

});

module.exports = router;