var express = require ("express");
var router = express.Router();
var http = require('http');
var promise = require('bluebird');
var path = require('path');
//const fileUpload = require('express-fileupload');
//var formidable = require('formidable');
var fs = require('fs');
var dBComposition = require("../models/composition");
var dBTutorials = require("../models/links");
var dBComments = require("../models/comments");
var dbCategories = require("../models/categories");
var mongoose = require("mongoose");
//promise.promisifyAll(mongoose);
//router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));

//Funktionen
function getSites(siteList, id){
 console.log("Seiten ermitteln");
 var navigation = [];
 for(var i = 0; i < siteList.length; i++){
  console.log("site" +siteList[i]);
  console.log(id);
  if(JSON.stringify(siteList[i]) === JSON.stringify(id)){
    navigation[0] = siteList[i];
    navigation[1] = "Hallo";
    
  }
 }
 return navigation;
}


//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/composition", function(req, res){
   promise.props({
    //dbcmsUnit für Überschriften im Magazinbereich
     categories:  dbCategories.find().execAsync(),
     composition: dBComposition.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("compositions/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//NEW ROUTES###########################

//Anzeige der Blender-Seite zum Hinzufügen von Bildern
router.get("/composition/new", function(req, res){
 console.log("Route: Compositions new");
 //Inhalte laden: Kategorien ,Tutorials
   promise.props({
     categories:  dbCategories.find().execAsync(),
     tutorials:   dBTutorials.find().execAsync(),
   })
   .then(function(results) {
    //console.log(results);
     res.render("compositions/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   }); 
});


//CREATE ROUTES###########################
//Hinzufügen eines neuen Bildes
router.post("/composition/new",function(req,res){
   console.log("Create Route  composition");
   /*var now = new Date();
   var entries = new Object;
   entries.content = req.body.composition.name;*/
   //entries.created = now;
   //entries.updated = now;   
    var composition = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
    // Datei hochladen
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.renderedImage;
    //console.log(req.body.name);
    //console.log(sampleFile.name);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/images/compositions/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    dBComposition.create(composition, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }else{
      //console.log(newEntry);
      res.redirect("/composition");
     }
    });
   });
 });


//SHOW ROUTES###########################
//Anzeige eines Composition-Eintrags
router.get("/composition/:id", function(req, res){
  console.log("Route:  Composition Show ");
  promise.props({
   categories:  dbCategories.find().execAsync(),
   tutorials:   dBTutorials.find().execAsync(),
   composition: dBComposition.findById(req.params.id).execAsync(),
   navigation:  dBComposition.find({}, "_id").execAsync()
 })
 .then(function(results) {
  
  var sites = getSites(results.navigation,req.params.id );
  console.log("sites:" + sites);
  dBComments.find({compositionID:req.params.id}, function(err, comments){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("compositions:"+results.composition);
      res.render("compositions/show",{composition: results.composition, comments: comments,categories:results.categories,tutorials:results.tutorials, navigation:sites });
     }
   });
 })
 .catch(function(err) {
   res.send(500); // oops - we're even handling errors!
   res.render("error", {error: err});
 });  
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf Blender-Seite
router.get("/composition/:id/edit", function(req, res){
   console.log("Edit Route Composition:" + req.params.id);
   promise.props({
    categories:  dbCategories.find().execAsync(),
    tutorials:   dBTutorials.find().execAsync(),
    composition: dBComposition.findById(req.params.id).execAsync()
  })
  .then(function(results) {
   console.log("results:" + results.composition[0]._id);
   dBComments.find({compositionID:req.params.id}, function(err, comments){
      if(err){
       res.render("error", {error: err});
      }else{
       console.log("comments:"+comments);
       res.render("compositions/edit",{composition: results.composition, comments: comments,categories:results.categories,tutorials:results.tutorials });
      }
    });
  })
  .catch(function(err) {
    res.send(500); // oops - we're even handling errors!
    res.render("error", {error: err});
  }); 
   /*
   dBComposition.findById(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      res.redirect("/composition");
     }
  });*/
});
//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags
router.put("/composition/:id/edit", function(req, res){
 console.log("Update Route Composition:" + req.params.id);
 //Überpüfen, ob Bildbeschreibung oder History geändert wird fehlt noch
  if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.image;
  //console.log("sampleFile:"+sampleFile.name);
  var history =  {description:req.body.description,  image:sampleFile.name};
  sampleFile.mv('public/images/compositions/' + sampleFile.name, function(err) {
    if (err) return res.status(500).send(err);
     //console.log("Bild hochgeladen:" + req.files.image.name);
     
     //console.log("history:"+req.body.description);
     //console.log("history variable:"+ history);
     dBComposition.findByIdAndUpdate(req.params.id,{"$push":{history: history}}, function(err, updatedPost){
        if(err){
         console.log(err);
         //res.render("error", {error: err});
        }else{
         console.log(updatedPost);
        }
       });
     res.redirect("/composition/"+ req.params.id +"/edit");
   });
  
//Bildbeschreibung bearbeiten
});
//DESTROY ROUTES###########################
//Löschen von Bildern auf Blender-Seite
router.delete("/composition/:id", function(req, res){
  console.log("Delete Route Composition");
  dBComments.deleteMany({ compositionID: req.params.id }, function (err) {
  if (err) return handleError(err);
  console.log("Comments entfernt");
});
  dBComposition.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      
      console.log("Eintrag entfernt:" + req.params.id);
      res.redirect("/composition");
     }
  });
 //res.render ("compositions/index");
});

module.exports = router;