var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var dBTutorials = require("../models/tutorials");
//var dBTasks = require("../models/tasks");
var mongoose = require("mongoose");
promise.promisifyAll(mongoose);
//INDEX ROUTES###########################
//Anzeige aller Tutorials
router.get("/tutorials", function(req, res){
 /*promise.props({
     todo:    dBTodo.find({}).execAsync(),
     tasks:   dBTasks.find({}).execAsync(),
   })
   .then(function(results) {
     res.render ("todo/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });*/
});
//NEW ROUTES###########################
//Anzeige der Seite für neues Tutorial 

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/tutorials/new", function(req, res){
  console.log("Route: Tutorial create");
   dBTutorials.create(req.body.tutorials, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect("/composition/new");
   }
  });
});
//SHOW ROUTES###########################
//ANZEIGE eines Tutorials

//EDIT ROUTES###########################
//Seite zum Bearbeiten eines Tutorials

//UPDATE ROUTES###########################
//Bearbeiten eines Tutorials

//DESTROY ROUTES###########################
//Löschen eines Tutorials

module.exports = router;