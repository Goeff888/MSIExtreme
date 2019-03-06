var express = require ("express");
var router = express.Router();
//var http = require('http');
var promise = require('bluebird');
var path = require('path');
//const fileUpload = require('express-fileupload');
//var formidable = require('formidable');
var fs = require('fs');
var dBComposition = require("../models/composition");
var dBComments = require("../models/comments");
//var dbTasks = require("../models/tasks");
var dbTodo = require("../models/todo");
var dbBooks = require("../models/books");
var dBLinks = require("../models/links");
var mongoose = require("mongoose");
var dbHandler = require ("./dbHandler");
//promise.promisifyAll(mongoose);
//router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));

//////////////////////////////////Funktionen

//Neuen Projektordner anlegen und Status zurückgeben
function createNewProjectFolder(dir){
 if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);        
  fs.mkdirSync(dir + "/templates");
  fs.mkdirSync(dir + "/history");
 }else{
  console.log("Ordner exisitert bereits");
 }
  /*
  if(req.files.cgArt){
    copyFile(req.files.cgArt,newEntry[0]._id +"/");
   }else{
    console.log("Verzeichnis muss wieder gelöscht werden");
   }
 }*/
}
function copyFile(sampleFile,folder){ 
  console.log("copyFile:" + sampleFile.name);
  sampleFile.mv('./public/images/compositions/'+ folder +'/' + sampleFile.name, function(err) {
    if (err) return console.log(err);
    
   });
  return sampleFile.name;
}


//INDEX ROUTES###########################
router.get("/composition", function(req, res){
   console.log("Composition Route:"+ req.url);
   promise.props({
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': '3D Visualisierung' }).execAsync(),
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
    console.log("Results.id:"+results.todo._id);
    dbHandler.getTasks(results,res,"compositions/index");
    //console.log("Anzahl der Tasks vor Rendern:"+ data);
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
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': '3D Visualisierung' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
   console.log("Results.id:"+results.todo._id);
    dbHandler.getTasks(results,res,"compositions/new");
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
   var composition = [];
   let sampleFile ; 
   //Prüfen, ob Datei, Template oder beides ausgewählt wurde
    if(req.files.renderedImage){
     console.log("Bilddatei ausgewählt!:"+req.files.renderedImage.name);
     sampleFile = req.files.renderedImage; 
     composition = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
     dBComposition.create(composition, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag nur mit Bildergebnis erzeugt:"+ newEntry);
       createNewProjectFolder("./public/images/compositions/"+ newEntry[0]._id);
       //copyFile(sampleFile,"./public/images/compositions/"+ newEntry[0]._id);
       copyFile(sampleFile,newEntry[0]._id+"/");
       res.redirect("/composition/" + newEntry[0]._id);
      }
    });
     
    }else if(req.files.templateImage){
     console.log("Template ausgewählt!:");
     sampleFile = req.files.templateImage;
     composition = [{name:req.body.name, templates:{image:req.files.templateImage.name,created:Date()},description:req.body.description,created:Date(),updated:Date()}];
     dBComposition.create(composition, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag nur mit Template erzeugt:"+ newEntry);
       createNewProjectFolder("./public/images/compositions/"+ newEntry[0]._id);
       //copyFile(sampleFile,"./public/images/compositions/"+ newEntry[0]._id);
       copyFile(sampleFile,newEntry[0]._id+"/templates/");
       res.redirect("/composition/" + newEntry[0]._id);
      }
    });
    }else{
     console.log("keine Datei vorhanden zum Hochladen");
     composition = [{name:req.body.name, description:req.body.description,created:Date(),updated:Date()}];
     dBComposition.create(composition, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag ohne Bild erzeugt:"+ newEntry);
       
       createNewProjectFolder("./public/images/compositions/"+ newEntry[0]._id);
       //copyFile(sampleFile,"./public/images/compositions/"+ newEntry[0]._id);
       res.redirect("/composition/" + newEntry[0]._id);
      }
    });
    }
   
 });

//SHOW ROUTES###########################
//Anzeige eines Composition-Eintrags
router.get("/composition/:id", function(req, res){
  console.log("Route:  Composition Show ");
  //console.log("getPartialData:" + getPartialData());
  promise.props({
    composition: dBComposition.findOne({ '_id': req.params.id}).execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dbTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    comments:    dBComments.find({compositionID:req.params.id}).execAsync()
  })
 .then(function(results) {
  console.log(results.composition);
   dbHandler.getTasks(results,res,"compositions/show");
 })
 .catch(function(err) {
   res.sendStatus(err); // oops - we're even handling errors!

 });  
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf Blender-Seite
router.get("/composition/:id/edit", function(req, res){
   console.log("Edit Route Composition:" + req.params.id);
   promise.props({
    composition: dBComposition.findOne({ '_id': req.params.id}).execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dbTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    comments:    dBComments.find({compositionID:req.params.id}).execAsync()
  })
  .then(function(results) {
   console.log("results:" + results.composition._id);
   dbHandler.getTasks(results,res,"compositions/edit");
  })
  .catch(function(err) {
   console.log(err);
    //res.send(500); // oops - we're even handling errors!
    res.render("error", {error: err});
  }); 
  //});
});

//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags
router.put("/composition/:id/edit", function(req, res){
 console.log("Update Route Composition:" + req.params.id);
 var data =  {};
//Prüfen, welcher Array Eintrag (History/Template aktualisiert werden soll)
 
 
 if ( req.files.templateFile){//Template wird nicht korrekt überprüft
  console.log("template Datei ausgewählt:" +req.files.templateFile.name );
  fileName= copyFile (req.files.templateFile,"/"+req.params.id+"/templates");//neue Datei ins entsprechende Verzeichnis kopieren
  data =  {description:req.body.templateDescription,  image:fileName};//Array Eintrag festlegen und Eintrag aktualisieren
  console.log("description:" +data.description + "image:" +data.image);
  dBComposition.findOneAndUpdate({_id: req.params.id},{$push:{templates: data}}, function(err, updatedPost){
    if(err){
       console.log("Something wrong when updating data!");
    }
      console.log("updatedPost Template:"+updatedPost);
  });  
 }else if(req.files.newFile.name.length  > 0){
  //alte Datei verschieben
  console.log("neue Bildversion ausgewählt:" +req.files.newFile.name );
  if ( req.body.srcFile == "winkender Panda.jpg"){
   console.log("noch kein Bild vorhanden");
  }else{
   fs.copyFile("public/images/compositions/"+req.params.id+"/"+ req.body.srcFile, "public/images/compositions/"+req.params.id+"/history/"+req.body.srcFile, (err) => {
  if (err) throw err;
   fs.unlinkSync("public/images/compositions/"+req.params.id+"/"+ req.body.srcFile,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
  });
 
   });  
 }
  
 // }
  


  fileName= copyFile (req.files.newFile,"/"+req.params.id);
  
  data =  {description:req.body.newDescription,  image:req.body.srcFile};
  dBComposition.findOneAndUpdate({_id: req.params.id},{$push:{history: data}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      console.log("updatedPost:"+updatedPost);
  });
  
  dBComposition.findOneAndUpdate({_id: req.params.id},{$set:{image: req.files.newFile.name}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      console.log("updatedPost:"+updatedPost);
  });
   
 }else{
  return res.status(400).send('No files selected');
 }
 res.redirect("/composition/"+ req.params.id +"/edit");
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
});
//Blog ROUTES###########################
//Aufruf der Blog-Seite
router.get("/compositionBlogNew/", function(req, res){
   console.log("Blog Route:"+ req.url);
   promise.props({
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': '3D Visualisierungs Blog' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
     dbHandler.getTasks2(results,res,"compositions/blog");
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});

module.exports = router;