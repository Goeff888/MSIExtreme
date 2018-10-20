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
var dbTasks = require("../models/tasks");
var dbBooks = require("../models/books");
var dbTodo = require("../models/todo");
var dBLinks = require("../models/links");
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
router.get("/composition", function(req, res){
   console.log("Route:"+ req.url);
   promise.props({
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': 'Blender (General) Todos' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
   console.log("Results.id:"+results.todo._id);
   if (results.todo != null){
    dbTasks.find({ 'todoID': results.todo._id }, function(err, tasksResults){
        if(err){
         res.render("error", {error: err});
        }else{
         console.log("tasksResults:"+ tasksResults);
         console.log("todo:"+ results.todo);
         res.render("compositions/index",{
                    composition:results.composition,
                    todo:results.todo,
                    tasks:tasksResults,
                    links:results.links,
                    magazine:results.magazine});
        }
    });   
    ///////////////////////////////Schauen, ob die neue datenbank angelegt wird
   }else{
    var newTodo = {
       project:"Blender (General) Todos",
       description:"Inhalte: Alles was mit der Arbeit mit Blender zu tun hat (Arbeitsplatz, Webauftritt, Computer,...)",
     };
    dbTodo.create(newTodo, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log(newEntry);
      res.render("compositions/index",{
                 composition:results.composition,
                 tasks:{},
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine});
     }
    });
   }
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
    var composition = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
    // Datei hochladen
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.renderedImage;
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
   links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
   todo:        dBTodo.findOne({ 'result': 'blender' }).execAsync(),
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
      res.render("compositions/show",{
       composition: results.composition,
       comments: comments,
       links:results.links,
       tutorials:results.tutorials,
       todo:results.todo,
       navigation:sites });
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
   links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
   todo:        dBTodo.findOne({ 'result': 'blender' }).execAsync(),
   composition: dBComposition.findById(req.params.id).execAsync(),
   navigation:  dBComposition.find({}, "_id").execAsync()
  })
  .then(function(results) {
   console.log("results:" + results.composition._id);
   dBComments.find({compositionID:req.params.id}, function(err, comments){
      if(err){
       res.render("error", {error: err});
      }else{
       console.log("comments:"+comments);
       res.render("compositions/edit",{
        comments:comments,
        magazine:"Buch1",
        composition: results.composition,
        links:results.links,
        todo:results.todo,
        tutorials:results.tutorials });
      }
    });
  })
  .catch(function(err) {
   console.log(err);
    //res.send(500); // oops - we're even handling errors!
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