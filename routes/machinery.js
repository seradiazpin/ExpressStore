/**
 * Created by Seradiazpin on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* Importar esquemas de la base de datos*/
var Machine = require('../database/schemas/machinery');
var MachineCat = require('../database/schemas/machineryCat');
var Material = require('../database/schemas/material');
var Provider = require('../database/schemas/providerMachines');
var Component = require('../database/schemas/machineryComp');
var Reader = require('./reader.js');


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

var searchMachine = function(request,response){
    var data = request.params.id || {};
    Machine.findById(data,function(err,mac){
        if(err) throw err;
          console.log('Search successfully');
            response.send(mac);
    });
}
/* Categorias */
var createMachineCat = function (request, response) {
    var data = request.body|| {};
    var machineCat = new MachineCat(data);
    machineCat.save(function(err) {
        if (err) throw err;
        console.log('Machine Cat saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteCategory = function (request, response) {
    console.log(request.params.categoryId);
    MachineCat.findByIdAndRemove(request.params.categoryId, function (err) {
        if (err) throw err;
        console.log('Machine Category Removed successfully!');
        response.redirect('/machinery/admin');
    });
};


/* Proveedores */
var createProvider = function (request, response) {
    var data = request.body|| {};
    var provider = new Provider(data);
    provider.save(function(err) {
        if (err) throw err;
        console.log('Machine Cat saved successfully!');
    });
    response.redirect('/machinery/admin');
};
var deleteProvider = function (request, response) {
    console.log(request.params.providerId);
    Provider.findByIdAndRemove(request.params.providerId, function (err) {
        if (err) throw err;
        console.log('Provider Removed successfully!');
        response.redirect('/machinery/admin');
    });
};


/* Componentes */
var createMachineComp = function (request, response) {
    var data = request.body|| {};
    var component = new Component(data);
    component.save(function(err) {
        if (err) throw err;
        console.log('Machine Comp saved successfully!');
    });
    response.redirect('/machinery/admin');
};

var deleteComponent = function (request, response) {
    console.log(request.params.componentId);
    Component.findByIdAndRemove(request.params.componentId, function (err) {
        if (err) throw err;
        console.log('deleted Component successfully!');
        response.redirect('/machinery/admin');
    });
};

var addComponentsMachine = function(request,response){
    var data = request.body || {};
    // en construccion
    var outObj = {
        comp: data.comp,
        cant:data.amm
    }
    Machine.findById(data.mac,function(err,mac){
          if(err) throw err;
          Component.findById(data.comp,function(err,comp){
                  if(err) throw err;
                  mac.componets.append(outObj);
                      console.log('component added successfully');
          });
    });
}

var removeComponentsMachine = function(request,response){
      var data = request.body ||{};
      var machineId = data.id ||{};
      var componentId = data.comp ||{};

        Machine.findById(machineId,function(err,mac){
              if (err) throw err;
                mac.components.findByIdAndRemove(componentId,function(err){
                      if(err) throw err;

                });
        });

}


router.get('/', function(req, res, next) {
    Machine.find({}, function(err, mac) {
        if (err) throw err;
        res.render('machinery/index', {machines:mac});
    });
});

router.get('/components/:machineId', function(req, res, next) {
  // Revisar y completar para recibir parametros
    Machine.findById(req.params.machineId, function(err, mac) {
        if (err) throw err;
        res.render('machinery/components', {machine:mac});
        console.log('redireccionado a componentes');
    });
});

router.get('/admin', function(req, res, next) {
    Machine.find({}, function(err, mac) {
                if (err) throw err;
          MachineCat.find({},function(err,cat){
                    if (err) throw err;
                  Provider.find({},function(err,prov){
                        if (err) throw err;
                        Component.find({},function(error,comp){
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
