var express = require ("express");
var router = express.Router();
//var promise = require('bluebird');
//var dBTasks = require("../models/tasks");
//var mongoose = require("mongoose");
//promise.promisifyAll(mongoose);

//INDEX ROUTES###########################
//Anzeige der Startseite
router.get("/python", function(req, res){
 res.render ("python/index");
});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Eintrag 

//CREATE ROUTES###########################
//neuer Eintrag

//SHOW ROUTES###########################
//ANZEIGE einer Aufgabe

//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe

//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe

//DESTROY ROUTES###########################
//Löschen einer Aufgabe

module.exports = router;