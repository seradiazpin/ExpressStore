/**
 * Created by seradiazpin on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var officeResponce = require("./Office/quickstart");


/* Importar esquemas de la base de datos*/
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/provider');
var Quotation = require('../database/schemas/quotation');

var Stair = require('../database/schemas/stair');
var Machine = require('../database/schemas/machinery');
var Measurer = require('../database/schemas/measurer');

var getMaterial = function (req,res) {
    var querry = {name:req.params.matName};
    console.log(req.params.matName);
    Material.findOne(querry, function (err, mat) {
        if(err){
            res.send({"error":"Nombre incorrecto"})
        }else{
        res.send(mat);
        }
    });
};

var getProvider = function (req,res) {
    Provider.findById(req.params.provId, function (err, pro) {
        if(err){
            res.send({"error":"IdIncorrecto"})
        }else{
        res.send(pro);
        }
    });
};


var completeQuotation = function (req,res) {
    Quotation.findByIdAndUpdate(req.params.quotId, { $set: {complete:true}}, { new: true }, function (err, quot) {
        if (err) {res.send({"error":"IdIncorrecto"})}
        else{res.send(quot)}
    });
};

/* GET datos para office.*/
router.get('/', function(req, res, next) {
    res.render('data/points');
});

router.get('/materials', function(req, res, next) {
    Material.find({}, function(err, mat) {
        if (err){res.send({"error":"Error en base de datos"})}
        else{res.send(mat)};
    });
});

router.get('/providers', function(req, res, next) {
    Provider.find({}, function(err, mat) {
        if (err){res.send({"error":"Error en base de datos"})}
        else{res.send(mat)};
    });
});

router.get('/quotations', function(req, res, next) {
    var querry = {complete:false};
    Quotation.find(querry, function (err, mat) {
        if (err){res.send({"error":"Error en base de datos"})}
        else{res.send(mat)};
    });
});

router.get('/machines', function(req, res, next) {
    Machine.find({}, function (err, mat) {
        if (err){res.send({"error":"Error en base de datos"})}
        else{res.send(mat)};
    });
});

router.get('/materials/:matName', getMaterial);
router.get('/providers/:provId', getProvider);
router.get('/completeQuotation/:quotId', completeQuotation);


var getStair = function (req,res) {
    Stair.findById(req.params.stairId, function (err, mat) {
        if(err){
            res.send({"error":"Nombre incorrecto"})
        }
        res.send(mat);
    });
};

var getMachine = function (req,res) {
    Machine.findById(req.params.machineId, function (err, mat) {
        if(err){
            res.send({"error":"Nombre incorrecto, el ID: "+req.params.machineId+"no es valido" })
        }
        res.send(mat);
    });
};

var getMeasurer = function (req,res) {
    Measurer.findById(req.params.measurerId, function (err, mat) {
        if(err){
            res.send({"error":"Nombre incorrecto"})
        }
        res.send(mat);
    });
};

var getSecondPart = function (req,res) {
    officeResponce.continueQuotation();
    res.send({continuetest:"Continue"});
};

router.get('/0/:stairId', getStair);
router.get('/1/:machineId', getMachine);
router.get('/2/:measurerId', getMeasurer);

router.get('/continue', getSecondPart);
module.exports = router;