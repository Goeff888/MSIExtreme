//var bodyParser = require("body-parser"); //Request Data from Form in HTML-Body
var express = require ("express");
var router = express.Router();
var http = require('http');
var promise = require('bluebird');
var path = require('path');
var fileUpload = require('express-fileupload');
//var formidable = require('formidable');
var fs = require('fs');
var dBCorel = require("../models/corel");
var dBLinks = require("../models/links");
var dBComments = require("../models/comments");
var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");
var dbCategories = require("../models/categories");
var mongoose = require("mongoose");
router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));
//router.use(bodyParser.urlencoded({extended: true}));

function copyFile(sampleFile,folder){ 
  console.log("copyFile:" + sampleFile.name);
  sampleFile.mv('public/images/corel/'+ folder +'/' + sampleFile.name, function(err) {
    if (err) return console.log(err);
    
   });
  return sampleFile.name;
}

//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/corel", function(req, res){
   promise.props({
     composition: dBCorel.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find().execAsync()
   })
   .then(function(results) {
    console.log(results.links);
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
     tutorials:   dBLinks.find().execAsync(),
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
    console.log("Create Route corel für " + req.body.name); 
    var corel = [];
    // Datei hochladen
    if (typeof req.files.cgArt == "undefined" ){
         corel = [{
         name:req.body.name,
         //image:req.files.cgArt.name,
         description:req.body.description,
         created:Date(),
         updated:Date()
                }];
    }else{
         corel = [{
         name:req.body.name,
         image:req.files.cgArt.name,
         description:req.body.description,
         created:Date(),
         updated:Date()
                }];
    }
  dBCorel.create(corel, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }else{
      //console.log("ID:"+newEntry[0]._id);
      var dir = './public/images/corel/'+ newEntry[0]._id;
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);        
          fs.mkdirSync(dir + "/templates");
          fs.mkdirSync(dir + "/history");
          console.log("req.files:"+req.files);
          console.log("req.files:"+req.files.cgArt);
          if(req.files.cgArt){
           copyFile(req.files.cgArt,newEntry[0]._id +"/");
           }else{
            console.log("Verzeichnis muss wieder gelöscht werden");
           }
      }
      res.redirect("/corel");
     }
    });
 });

//SHOW ROUTES###########################
//Anzeige eines Eintrags
router.get("/corel/:id", function(req, res){
  console.log("Route:  corel Show von " + req.params.id);
  promise.props({
   links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
   corel:       dBCorel.findById(req.params.id).execAsync(),
 })
 .then(function(results) {
  console.log("results:" + results.links);
  dBComments.find({compositionID:req.params.id}, function(err, comments){
     if(err){
      res.render("error");
     }else{
      res.render("corel/show",{corel: results.corel, comments: comments,links:results.links,tutorials:results.tutorials });
     }
   });     
  })
  .catch(function(err) {
    console.log(err);
    res.render("error");
  });  
 });
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf corel-Seite
router.get("/corel/:id/edit", function(req, res){
  console.log("Corel Edit Route für "+ req.params.id );
  //console.log("ID für Todos "+ req.body.corelTodoId );
  promise.props({
   todo:        dBTodo.findOne({ 'result': req.params.id }).execAsync(),
   corel:       dBCorel.findById(req.params.id).execAsync()
 })
 .then(function(results) {
  console.log("results todo:" + results.todo);
  var taskID =JSON.stringify(0);
  if(results.todo == null){
   taskID = "5b6f5b924fa94e3e8c282e85";//Hier wert prüfen und setzen
   console.log("todo nicht vorhanden");
  }else{
   taskID = results.todo._id;
   console.log("todo vorhanden");
  }
  promise.props({
     tasks:       dBTasks.find({ 'todoID': taskID }).execAsync(),//hier soll ein Wert stehen falls keine Datenbank vorhanden ist
     comments:    dBComments.findOne({compositionID:req.params.id }).execAsync()
   })
   .then(function(results_ID) {
     console.log("results tasks:" + results_ID.tasks);
     res.render("corel/edit",{corel: results.corel, todo:results.todo, tasks: results_ID.tasks }); 
    })
    .catch(function(err) {
      console.log(err);
      res.render("error");
    });      
  })
  .catch(function(err) {
    console.log(err);
    res.render("error");
  }); 
});

//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags
router.put("/corel/:id/edit", function(req, res){
 console.log("Update Route Corel:" + req.params.id);
 var data =  {};
//Prüfen, welcher Array Eintrag (History/Template aktualisiert werden soll)
 if ( req.files.templateFile){//Template wird nicht korrekt überprüft
  console.log("template Datei ausgewählt:" +req.files.templateFile.name );
  fileName= copyFile (req.files.templateFile,"/"+req.params.id+"/templates");//neue Datei ins entsprechende Verzeichnis kopieren
  
  data =  {description:req.body.templateDescription,  image:fileName};//Array Eintrag festlegen und Eintrag aktualisieren
  console.log("description:" +data.description + "image:" +data.image);
  dBCorel.findOneAndUpdate({_id: req.params.id},{$push:{templates: data}}, function(err, updatedPost){
    if(err){
       console.log("Something wrong when updating data!");
    }
      console.log("updatedPost Template:"+updatedPost);
  });  
 }else if(req.files.newFile.name.length  > 0){
  //alte Datei verschieben
  fs.copyFile("public/images/corel/"+req.params.id+"/"+ req.body.srcFile, "public/images/corel/"+req.params.id+"/history/"+req.body.srcFile, (err) => {
  if (err) throw err;
  //console.log('source.txt was copied to destination.txt');
  });
  fs.unlinkSync("public/images/corel/"+req.params.id+"/"+ req.body.srcFile,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  
  fileName= copyFile (req.files.newFile,"/"+req.params.id);
  
  data =  {description:req.body.newDescription,  image:req.body.srcFile};
  dBCorel.findOneAndUpdate({_id: req.params.id},{$push:{history: data}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      //console.log("updatedPost:"+updatedPost);
  });
  
  dBCorel.findOneAndUpdate({_id: req.params.id},{$set:{image: req.files.newFile.name}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      //console.log("updatedPost:"+updatedPost);
  });
   
 }else{
  return res.status(400).send('No files selected');
 }
 res.redirect("/corel/"+ req.params.id +"/edit");
});

//DESTROY ROUTES###########################
//Löschen von Bildern auf Crel-Seite
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