/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Machine = require('../database/schemas/machinery');
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/provider');


/* Metodo para crear y guardar una escalera*/
var createMachine = function (request, response) {
    var data = request.body|| {};
    var machine = new Machine(data);
    machine.save(function(err) {
        if (err) throw err;
        console.log('Machine saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteMachine = function (request, response) {
    console.log(request.params.machineryId);
    Machine.findByIdAndRemove(request.params.machineryId, function (err) {
        if (err) throw err;
        console.log('Machine Removed successfully!');
        response.redirect('/machinery/admin');
    });
};

/* Actualizar escalera*/
var updateMachine = function (request, response) {
    console.log(request.params.machineryId);
    var data = request.body|| {};
    Machine.findByIdAndUpdate(request.params.machineryId, { $set: data}, { new: true }, function (err,machine) {
        if (err) throw err;
        response.redirect('/machinery/admin');
    });
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
                res.render('machinery/admin', {machines:mac});
    });
});

router.post('/new-machine',jsonParser,createMachine);
router.post('/edit-machinery/:machineryId',jsonParser,updateMachine);
router.post('/delete/:machineryId',jsonParser,deleteMachine);

module.exports = router;
