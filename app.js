var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Importar conneccion a base de datos
var db = require('./database/connection');


// Agregamos nuestros puntos de conexion
var index = require('./routes/index');
var products = require('./routes/products');
var stairs = require('./routes/stairs');
var machinery = require('./routes/machinery');
//var machineryCat = require('./routes/machineryCat');
var measurer = require('./routes/measurer');
var appData = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Databas econection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected mongo")
});


app.use('/', index);
app.use('/products', products);
app.use('/stairs', stairs);
app.use('/machinery', machinery);
app.use('/measurers', measurer);
app.use('/data', appData);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
