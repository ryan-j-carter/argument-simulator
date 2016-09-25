'use strict';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

//Change user/collection in config.js
var mongoUrl = 'mongodb://' + config.mongo.DB_USER + ':' + config.mongo.DB_PASS +
               '@' + config.mongo.DB_URL + '/' + config.mongo.DB_NAME;

mongoose.connect(mongoUrl, function(err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    }
    else {
        console.log('MongoDB connected to ' + config.mongo.DB_NAME);
    }

    //Set up static paths for cleaner file requests
    app.use('/app', express.static(__dirname + '/../app'));
    app.use('/controllers', express.static(__dirname + '/../app/controllers'));
    app.use('/stylesheets', express.static(__dirname + '/../app/stylesheets'));

    //Set up routes, specifically for api calls
    app.use('/', require('./routes')(express, mongoose));

    var address = process.env.IP || "0.0.0.0";
    var port = process.env.PORT || 8080;
    app.listen(port, address, function() {
        console.log('Argument Simulator listening on ' + address + ':' + port + '...');
    });
});
