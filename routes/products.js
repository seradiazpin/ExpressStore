var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();



var Product = require('../database/schemas/product');
var Quotation = require('../database/schemas/quotation');

var car = new Quotation();

/*Querrys and functions*/
var addToCar = function (request, response) {
    var data = request.body|| {};
    //Stairs
    if(data.form !== undefined){
        car.addStair(data);
    }

};

var sendQuotation = function (request, response) {
    car.save(function (err) {
        if (err) throw err;
        console.log('Quotation send!');
    });
    response.redirect('/products/all');
};

// Create a new product
var createProduct = function (request, response) {
    var data = request.body|| {};
    var aplanadora = new Product(data);
    console.log(aplanadora);
    aplanadora.case(function(err, name) {
        if (err) throw err;
        console.log('product name :'+ name);
    });
    aplanadora.save(function(err) {
        if (err) throw err;
        console.log('Product saved successfully!');
    });
    response.redirect('/products/all');
};

/* GET products listing. */
router.get('/', function(req, res, next) {
    Product.find({}, function(err, users) {
        if (err) throw err;
        res.send(users);
    });
});

/* GET shoping car. */
router.get('/car', function(req, res, next) {
    res.render('quotation/status', { shoppingCar:car });
});


/* GET users listing. */
router.get('/all', function(req, res, next) {
    var products = [];
    Product.find({}, function(err, pro) {
        if (err) throw err;
        res.render('products', { products:pro });
    });
});

/* GET users listing. */
router.get('/newForm', function(req, res, next) {
    res.render('newProduct', { data: {} });
});

router.post('/new',jsonParser,createProduct);

module.exports = router;
