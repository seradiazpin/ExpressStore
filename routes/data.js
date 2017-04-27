/**
 * Created by seradiazpin on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/provider');

var getMaterial = function (req,res) {
    var querry = {name:req.params.matName};
    Material.findOne(querry, function (err, mat) {
        if(err){
            res.send({"error":"Nombre incorrecto"})
        }
        res.send(mat);
    });
};

var getProvider = function (req,res) {
    Provider.findById(req.params.provId, function (err, pro) {
        if(err){
            res.send({"error":"IdIncorrecto"})
        }
        res.send(pro);
    });
};

/* GET datos para office.*/
router.get('/', function(req, res, next) {
    res.render('data/points');
});

router.get('/materials', function(req, res, next) {
    Material.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

router.get('/providers', function(req, res, next) {
    Provider.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

router.get('/materials/:matName', getMaterial);
router.get('/providers/:provId', getProvider);


module.exports = router;