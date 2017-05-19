/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();



/* Importar esquemas de la base de datos*/
var machineryComp = require('../database/schemas/machineryComp');
var machinery = require('../database/schemas/machinery');
var MachineCat = require('../database/schemas/machineryCat');
var Material = require('../database/schemas/material');
var provider = require('../database/schemas/providerMachines');
var Reader = require('./reader.js');

/* Tablas base de datos de prueba */
/*
var testData = {
    name:'Test machinery',
    brand:'Test Brand',
    type:'typo',
    weight:1,
    capacity:1,
    engineModel: 'test engine' ,
    waterCooling: 'No' ,
    routeSpeed: 100 ,
    turningSpeed:  100,
    fuelCapacity: 100 ,
    length: 100 ,
    width:  100,
    height: 100 ,
    workHours: 100 ,
    ammount: 1 ,
    img:  'null',
    sound: 'null'
}

var mac = new machinery(testData);
mac.save(function(err){
    if(err) throw err;
      var testComp = {
          name:'Comp 12',
          reference:'sizlo',
          width:50,
          price:100
      }
        var comp = new machineryComp(testComp);
        comp.save(function(err){
            if(err) throw err;

              mac.components.push(comp);
              mac.save(function(err){
                  if(err) throw err;

                  console.log('prueba creada');
              });
        });
});
*/

/* Metodo para crear y guardar una escalera*/
var createMachine = function (request, response) {
    var data = request.body|| {};
    var machine = new machinery(data);
    machine.save(function(err) {
        if (err) throw err;
        console.log('machinery saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteMachine = function (request, response) {
    console.log(request.params.machineryId);
    machinery.findByIdAndRemove(request.params.machineryId, function (err) {
        if (err) throw err;
        console.log('machinery Removed successfully!');
        response.redirect('/machinery/admin');
    });
};

/* Actualizar escalera*/
var updateMachine = function (request, response) {
    console.log(request.params.machineryId);
    var data = request.body|| {};
    machinery.findByIdAndUpdate(request.params.machineryId, { $set: data}, { new: true }, function (err,machine) {
        if (err) throw err;
        response.redirect('/machinery/admin');
    });
};

var searchMachine = function(request,response){
    var data = request.params.id || {};

        machinery.findOne({_id:data}).populate('components').exec(function(err,resulMac){
            if (err) throw err;
            //console.log(JSON.stringify(resulMac, null, "\t"));
            console.log('Search successfully');
            response.send(resulMac);
        });
}
/* Categorias */
var createMachineCat = function (request, response) {
    var data = request.body|| {};
    var machineCat = new MachineCat(data);
    machineCat.save(function(err) {
        if (err) throw err;
        console.log('machinery Cat saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteCategory = function (request, response) {
    console.log(request.params.categoryId);
    MachineCat.findByIdAndRemove(request.params.categoryId, function (err) {
        if (err) throw err;
        console.log('machinery Category Removed successfully!');
        response.redirect('/machinery/admin');
    });
};


/* Proveedores */
var createProvider = function (request, response) {
    var data = request.body|| {};
    var provider = new provider(data);
    provider.save(function(err) {
        if (err) throw err;
        console.log('machinery Cat saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteProvider = function (request, response) {
    console.log(request.params.providerId);
    provider.findByIdAndRemove(request.params.providerId, function (err) {
        if (err) throw err;
        console.log('provider Removed successfully!');
        response.redirect('/machinery/admin');
    });
};


/* Componentes */
var createMachineComp = function (request, response) {
    var data = request.body|| {};
    var component = new machineryComp(data);
    component.save(function(err) {
        if (err) throw err;
        console.log('machinery Comp saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteComponent = function (request, response) {
    console.log(request.params.componentId);
    machineryComp.findByIdAndRemove(request.params.componentId, function (err) {
        if (err) throw err;
        console.log('deleted machineryComp successfully!');
        response.redirect('/machinery/admin');
    });
};

var addComponentsMachine = function(request,response){
    var data = request.body || {};
    console.log('Datos :' + data.macId);
    console.log(data.compId);

   machinery.findById(data.macId,function(err,mac){
          if(err) throw err;
          machineryComp.findById(data.compId,function(err,comp){
              if(err) throw err;
                  mac.components.push(comp);
                  mac.save(function(err){
                      if(err) throw err;
                      console.log(JSON.stringify(mac, null, "\t"));
                        console.log('component added successfully');
                        response.redirect('/machinery/admin');
                  });
          });
    });
}

var removeComponentsMachine = function(request,response){
    var data = request.body || {};

    // en construccion

    machinery.findById(data.macId,function(err,mac){
          if(err) throw err;
          //mac.components.push(data.idSelec);
          mac.components.pull({_id: data.compId});
          mac.save(function(err){
              if(err) throw err;
                console.log('component removed successfully');
          });
    });
}


router.get('/', function(req, res, next) {
    machinery.find({}, function(err, mac) {
        if (err) throw err;
        res.render('machinery/index', {machines:mac});
    });
});

router.get('/components/:machineId', function(req, res, next) {
  // Revisar y completar para recibir parametros

    machinery.findOne({_id:req.params.machineId}).populate('components').exec(function(err,resulMac){
        if (err) throw err;
        //console.log(JSON.stringify(resulMac, null, "\t"));
        console.log('components View successfully');

        res.render('machinery/components',{machine:resulMac});
    });

});

router.get('/admin', function(req, res, next) {
    machinery.find({}, function(err, mac) {
                if (err) throw err;
          MachineCat.find({},function(err,cat){
                    if (err) throw err;
                  provider.find({},function(err,prov){
                        if (err) throw err;
                        machineryComp.find({},function(error,comp){
                            if (err) throw err;
                                res.render('machinery/admin',{machines:mac,categories:cat,providers:prov,components:comp});
                        });
                  });
          });
    });
});


/* llamadas de busqueda de datos */
router.get('/search-machine/:id',searchMachine);

//router.post('/search-machine',jsonParser,searchMachine);

router.post('/add-component',jsonParser,addComponentsMachine);
router.post('/remove-component',jsonParser,removeComponentsMachine);

router.post('/new-machine',jsonParser,createMachine);
router.post('/new-machineCat',jsonParser,createMachineCat);
router.post('/new-machineComp',jsonParser,createMachineComp);
router.post('/new-provider',jsonParser,createProvider);
router.post('/edit-machinery/:machineryId',jsonParser,updateMachine);


router.get('/delete/:machineryId',deleteMachine);
router.get('/delete-category/:categoryId',deleteCategory);
router.get('/delete-provider/:providerId',deleteProvider);
router.get('/delete-component/:componentId',deleteComponent);

router.use(Reader);

module.exports = router;
