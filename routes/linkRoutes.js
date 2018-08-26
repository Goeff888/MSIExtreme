//Link Routes
// Hinzufügen und Bearbeiten interessanter Links aus dem Internet (oder lokal gespeicherter Daten)
//Tutorials werden automatisch gesetzt oder durch Benutzer ausgewählt
//Router entscheidet hier zu welchen Bereich zurückgeleitet werden soll->Navigation 
var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var dBLinks = require("../models/links");
var mongoose = require("mongoose");
promise.promisifyAll(mongoose);
//INDEX ROUTES###########################
//Anzeige aller Links
router.get("/links", function(req, res){

});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Link 

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/links/new", function(req, res){
  console.log("Route: Link create");
   dBLinks.create(req.body.links, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("Navigation:"+req.body.navigation);
    
    res.redirect(req.body.navigation);
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