/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Measurer = require('../database/schemas/measurer');
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/provider');
var Quotation = require('../database/schemas/quotation');


var createmeasurer = function (request, response) {
    var data = request.body|| {};
    var measurer = new Measurer(data);
    measurer.save(function(err) {
        if (err) throw err;
        console.log('measurer saved successfully!');
    });
    response.redirect('/measurers/admin');
};

var createMeasurerQuotation = function (request, response) {
    var data = request.body|| {};

    var measurerData = {
        out_diameter:data.out_diameter,
        flow : data.flow,
        wall_heigth: data.wall_heigth,
        wall_width: data.wall_width,
        measurer_number: data.measurer_number
    };


    var measurer = new Measurer(measurerData);

    measurer.save(function(err) {
        if (err) throw err;
        console.log('Measurer saved successfully!');
    });
    console.log(measurer.id);
    var userData= {
        complete:false,
        itemType:2,
        item:measurer.id,
        clientEmail:data.clientEmail,
        clientPhone:data.clientPhone,
        clientName:data.clientName
    };
    console.log(userData);
    var quotation = new Quotation(userData);

    quotation.save(function(err) {
        if (err) throw err;
        console.log('Quotation saved successfully!');
    });
    
    response.redirect('/measurers/');
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
    response.redirect('/measurers/admin');
};

/* Metodo para crear y guardar un proveedor*/
var createProvider = function (request, response) {
    var data = request.body|| {};
    var provider = new Provider(data);
    provider.save(function(err) {
        if (err) throw err;
        console.log('Provider saved successfully!');
    });
    response.redirect('/measurers/admin');
};

var deletemeasurer = function (request, response) {
    console.log(request.params.measurerId);
    Measurer.findByIdAndRemove(request.params.measurerId, function (err) {

        if (err) throw err;
        console.log('measurer Removed successfully!');
        response.redirect('/measurers/admin');
    })
};
/* Actualizar escalera*/
var updatemeasurer = function (request, response) {
    console.log(request.params.measurerId);
    var data = request.body|| {};
    Measurer.findByIdAndUpdate(request.params.measurerId, { $set: data}, { new: true }, function (err, measurer) {
        if (err) throw err;
        response.redirect('/measurers/admin');
    });
};

router.get('/',function (request, response) {
    Measurer.find({}, function(err, sta) {
        if (err) throw err;
        response.render('measurers/index', {measurers:sta});
    });
});

/* Borrar y edutar escalera*/
router.get('/delete/:measurerId',deletemeasurer);
router.get('/edit-measurer/:measurerId',function (request, response) {
    Measurer.findById(request.params.measurerId, function (err, sta) {
        response.render('measurers/editS', {measurer:sta});
    });
});

/* POST Ruta para guardar elementos en la base de datos*/
router.post('/new-measurer',jsonParser,createmeasurer);
router.post('/update-measurer/:measurerId',jsonParser,updatemeasurer);
router.post('/new-material',jsonParser,createMaterial);
router.post('/new-provider',jsonParser,createProvider);
router.post('/new-quotation',jsonParser,createMeasurerQuotation);



/* GET Cargar pagina de escaleras de administrador */
router.get('/admin', function(req, res, next) {
    Measurer.find({}, function(err, sta) {
        if (err) throw err;
        Material.find({}, function(err, mat) {
            if (err) throw err;
            Provider.find({}, function(err, pro) {
                if (err) throw err;
                res.render('measurers/admin', {measurers:sta, materials:mat, providers:pro});
            });
        });

    });

});


router.get('/form', function(req, res, next) {
    res.render('measurers/form');
});
module.exports = router;
