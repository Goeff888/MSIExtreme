var express = require ("express");
var router = express.Router();
var http = require('http');
var promise = require('bluebird');
var path = require('path');
const fileUpload = require('express-fileupload');
//var formidable = require('formidable');
var fs = require('fs');
var dBCorel = require("../models/corel");
var dBTutorials = require("../models/tutorials");
var dBComments = require("../models/comments");
var dbCategories = require("../models/categories");
//var dBTasks = require("../models/tasks");
var mongoose = require("mongoose");
//promise.promisifyAll(mongoose);
router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));

//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/corel", function(req, res){
   promise.props({
     composition: dBCorel.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("corel/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//NEW ROUTES###########################

//Anzeige der Blender-Seite zum Hinzufügen von Bildern
router.get("/corel/new", function(req, res){
 console.log("Route: corel new");
 //Inhalte laden: Kategorien ,Tutorials
   promise.props({
     categories:  dbCategories.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("corel/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   }); 
});


//CREATE ROUTES###########################
//Hinzufügen eines neuen Bildes
router.post("/corel/new",function(req,res){
   console.log("Create Route  corel");
   /*var now = new Date();
   var entries = new Object;
   entries.content = req.body.composition.name;*/
   //entries.created = now;
   //entries.updated = now;   
    var corel = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
    // Datei hochladen
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.renderedImage;
    //console.log(req.body.name);
    //console.log(sampleFile.name);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/images/corel/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    dBComposition.create(corel, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }else{
      //console.log(newEntry);
      res.redirect("/corel");
     }
    });
   });
   
    //Datenbankeintrag erzeugen

    //Show-Seite laden

 });



//SHOW ROUTES###########################
//Anzeige eines Composition-Eintrags
router.get("/corel/:id", function(req, res){
  console.log("Route:  corel Show ");
  promise.props({
   categories:  dbCategories.find().execAsync(),
   tutorials:   dBTutorials.find().execAsync(),
   corel:       dBComposition.find({_id:req.params.id}).execAsync()
 })
 .then(function(results) {
  console.log("results:" + results.composition[0]._id);
  dBComments.find({compositionID:req.params.id}, function(err, comments){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("comments:"+comments);
      res.render("corel/show",{corel: results.composition, comments: comments,categories:results.categories,tutorials:results.tutorials });
     }
   });     
   //res.render("compositions/new", results);
 })
 .catch(function(err) {
   res.send(500); // oops - we're even handling errors!
   res.render("error", {error: err});
 });  
  

 });
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf corel-Seite
router.get("Edit Route corel", function(req, res){
   console.log("Eintrag entfernt:" + req.params.id);
   /*dBComposition.findById(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      
      //console.log("Eintrag entfernt:" + req.params.id);
      res.redirect("/corel");
     }
  });*/
});
//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags

//DESTROY ROUTES###########################
//Löschen von Bildern auf Blender-Seite
router.delete("/corel/:id", function(req, res){
  console.log("Delete Route corel");
  dBComments.deleteMany({ compositionID: req.params.id }, function (err) {
  if (err) return handleError(err);
  console.log("Comments entfernt");
});
  /*dBComposition.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      
      console.log("Eintrag entfernt:" + req.params.id);
      res.redirect("/corel");
     }
  });*/
});

module.exports = router;