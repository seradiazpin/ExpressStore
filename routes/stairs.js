/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Stair = require('../database/schemas/stair');
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/provider');


/* Metodo para crear y guardar una escalera*/
var createStair = function (request, response) {
    var data = request.body|| {};
    var stair = new Stair(data);
    stair.save(function(err) {
        if (err) throw err;
        console.log('Stair saved successfully!');
    });
    response.redirect('/stairs/admin');
};

/* Metodo para crear y guardar un material*/
var createMaterial = function (request, response) {
    var data = request.body|| {};
    console.log(data);
    var material = new Material(data);
    material.save(function(err) {
        if (err) throw err;
        console.log('Material saved successfully!');
    });
    response.redirect('/stairs/admin');
};

/* Metodo para crear y guardar un proveedor*/
var createProvider = function (request, response) {
    var data = request.body|| {};
    var provider = new Provider(data);
    provider.save(function(err) {
        if (err) throw err;
        console.log('Provider saved successfully!');
    });
    response.redirect('/stairs/admin');
};

var deleteStair = function (request, response) {
    console.log(request.params.stairId);
    Stair.findByIdAndRemove(request.params.stairId, function (err) {

        if (err) throw err;
        console.log('Stair Removed successfully!');
        response.redirect('/stairs/admin');
    })
};
/* Actualizar escalera*/
var updateStair = function (request, response) {
    console.log(request.params.stairId);
    var data = request.body|| {};
    Stair.findByIdAndUpdate(request.params.stairId, { $set: data}, { new: true }, function (err, stair) {
        if (err) throw err;
        response.redirect('/stairs/admin');
    });
};

/* Borrar y edutar escalera*/
router.get('/delete/:stairId',deleteStair);
router.get('/edit-stair/:stairId',function (request, response) {
    Stair.findById(request.params.stairId, function (err, sta) {
        response.render('stairs/editS', {stair:sta});
    });
});

router.get('/edit-stair2/:stairId',function (request, response) {
    Stair.findById(request.params.stairId, function (err, sta) {
        response.send(sta);
    });
});

/* POST Ruta para guardar elementos en la base de datos*/
router.post('/new-stair',jsonParser,createStair);
router.post('/update-stair/:stairId',jsonParser,updateStair);
router.post('/new-material',jsonParser,createMaterial);
router.post('/new-provider',jsonParser,createProvider);


/* GET Cargar pagina de escaleras de administrador */
router.get('/admin', function(req, res, next) {
    Stair.find({}, function(err, sta) {
        if (err) throw err;
        Material.find({}, function(err, mat) {
            if (err) throw err;
            Provider.find({}, function(err, pro) {
                if (err) throw err;
                res.render('stairs/admin', {stairs:sta, materials:mat, providers:pro});
            });
        });

    });

});

module.exports = router;
