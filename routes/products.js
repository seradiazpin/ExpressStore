/* Librerias de express */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();


/* Importar esquemas de la base de datos*/
var Product = require('../database/schemas/product');
var Quotation = require('../database/schemas/quotation');

var car = new Quotation();

/* Crear un producto y agregarlo a la base de datos*/
var createProduct = function (request, response) {
    var data = request.body|| {};
    var aplanadora = new Product(data);
    console.log(aplanadora);
    //Ejecutar el metodo CASE para agrefar Product al nombre del producto
    aplanadora.case(function(err, name) {
        if (err) throw err;
        console.log('product name :'+ name);
    });
    // Guardar en la base de datos
    aplanadora.save(function(err) {
        if (err) throw err;
        console.log('Product saved successfully!');
    });
    response.redirect('/products/all');
};


/* TODO Funcion para agregar al carro */
var addToCar = function (request, response) {
    var data = request.body|| {};
    //Stairs
    if(data.form !== undefined){
        car.addStair(data);
    }

};

/* TODO Funcion para guardar cotizacion en la base de datos*/
var sendQuotation = function (request, response) {
    car.save(function (err) {
        if (err) throw err;
        console.log('Quotation send!');
    });
    response.redirect('/products/all');
};



/* GET Obtener todos los productos */
router.get('/', function(req, res, next) {
    Product.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

/* TODO GET Obtener carro de compras*/
router.get('/car', function(req, res, next) {
    res.render('quotation/status', { shoppingCar:car });
});


/* GET Obtener todos los productos*/
router.get('/all', function(req, res, next) {
    var products = [];
    Product.find({}, function(err, pro) {
        if (err) throw err;
        res.render('products', { products:pro });
    });
});

/* GET Formulario para crear un nuevo producto*/
router.get('/newForm', function(req, res, next) {
    res.render('newProduct', { data: {} });
});

/* POST Para gueardar los productos en la base de datos*/
router.post('/new',jsonParser,createProduct);


module.exports = router;
