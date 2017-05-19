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
var Quotation = require('../database/schemas/quotation');
var officeResponce = require("./Office/quickstart");
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

var createMachineQuotation = function (request, response) {
    var data = request.body|| {};

    var machineData = {
        components:data.i
    };
    var querry = {name:request.params.machineName};
    machinery.findOneAndUpdate(querry, {$set:machineData}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }

        var userData= {
            complete:false,
            itemType:1,
            item:doc.id,
            clientEmail:data.clientEmail,
            clientPhone:data.clientPhone,
            clientName:data.clientName
        };
        console.log(userData);
        var quotation = new Quotation(userData);
        quotation.save(function(err) {
            if (err) throw err;
            console.log('Quotation saved successfully!');
            officeResponce.sendResponce();
        });
        response.redirect('/machinery/');
    });

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
        machinery.findById(request.params.id, function (err, machine){
            if (err) throw err;
            //console.log(JSON.stringify(resulMac, null, "\t"));
            console.log('Search successfully');
            response.send(machine);
        });
};
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
};

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
                response.redirect('/machinery/admin');
          });
    });
};


router.get('/', function(req, res, next) {
    machinery.find({}, function(err, mac) {
        if (err) throw err;
        res.render('machinery/index', {machines:mac});
    });
});

router.get('/components/:machineId', function(req, res, next) {
  // Revisar y completar para recibir parametros
    var querry = {reference:req.params.machineId};
    machineryComp.find(querry, function (err, mat) {
        if (err) throw err;
        res.render('machinery/components',{components:mat, machine:req.params.machineId});
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
                            console.log(JSON.stringify(comp, null, "\t"));

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


router.post('/new-quotation/:machineName',jsonParser,createMachineQuotation);
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
