//var bodyParser = require("body-parser"); //Request Data from Form in HTML-Body
var express = require ("express");
var router = express.Router();

var promise = require('bluebird');
var path = require('path');

var fs = require('fs');
var dBPainting = require("../models/painting");
var dBComments = require("../models/comments");
var dBTasks = require("../models/tasks");
var dBTodo = require("../models/todo");
var dbBooks = require("../models/books");
var dBLinks = require("../models/links");
var mongoose = require("mongoose");
var dbHandler = require ("./dbHandler");

router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));
//router.use(bodyParser.urlencoded({extended: true}));


function fileMover(tempFile,id,addFolder){
  console.log("fileMover:" + tempFile.name);
  var folder;
  if (!addFolder){
   
   folder = 'public/images/paintings/'+ id + '/' ;
   console.log("folder: " + folder);
  }
  else{
   folder = 'public/images/paintings/'+ id +"/" +addFolder + '/';
   console.log("folder else: " + folder);
  }
  tempFile.mv(folder +tempFile.name, function(err) {
    if (err) return console.log(err);
   }); 
}


function copyFile(sampleFile,folder, subFolder){ 
  console.log("copyFile:" + sampleFile.name);
  var tempDir = 'public/images/paintings/'+ folder;
  console.log("tempDir:" + tempDir);
  if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);        
    fs.mkdirSync(tempDir + "/templates");
    fs.mkdirSync(tempDir + "/history");
    if (subFolder == "templates"){
     fileMover(sampleFile,folder,"templates");
    }else if(subFolder == "history"){
     fileMover(sampleFile,folder,"history");
    }else{
     fileMover(sampleFile,folder);
    }
  }else{
   fileMover(sampleFile,folder);
  }
}

//INDEX ROUTES###########################
router.get("/painting", function(req, res){
   promise.props({
    painting:    dBPainting.find().execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dBTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    comments:    dBComments.find({compositionID:req.params.id}).execAsync()
   })
   .then(function(results) {
    dbHandler.getTasks(results,res,"painting/index");
     //res.render("painting/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});

//NEW ROUTES###########################
router.get("/painting/new", function(req, res){
 console.log("Route: painting new");
 //Inhalte laden: Kategorien ,Tutorials
   promise.props({
     painting:    dBPainting.find().execAsync(),
     links:       dBLinks.find({ 'content': 'Painting' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'Painting' }).execAsync(),
     todo:        dBTodo.findOne({'project': 'Digital Painting' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'Painting' }).execAsync(),
   })
   .then(function(results) {
    //console.log(results);
    dbHandler.getTasks(results,res,"painting/new");
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   }); 
});

//CREATE ROUTES###########################
router.post("/painting/new",function(req,res){
    console.log("Create Route painting für " + req.body.name); 
    var painting = [];
    let sampleFile ;
    // Datei hochladen
    if(req.files.renderedImage){
     console.log("Bilddatei ausgewählt!:"+req.files.renderedImage.name);
     sampleFile = req.files.renderedImage; 
     painting = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
     dBPainting.create(painting, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag nur mit Bildergebnis erzeugt:"+ newEntry);       
       copyFile(sampleFile,newEntry[0]._id+"/");
       res.redirect("/painting/" + newEntry[0]._id);
      }
    });  
    }else if(req.files.templateImage){
     console.log("Template ausgewählt!:");
     sampleFile = req.files.templateImage;
     painting = [{name:req.body.name, templates:{image:req.files.templateImage.name,created:Date()},description:req.body.description,created:Date(),updated:Date()}];
     dBPainting.create(painting, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag nur mit Template erzeugt:"+ newEntry);
       //createNewProjectFolder("./public/images/paintings/"+ newEntry[0]._id);
       //copyFile(sampleFile,"./public/images/compositions/"+ newEntry[0]._id);
       copyFile(sampleFile,newEntry[0]._id ,"templates");
       res.redirect("/painting/" + newEntry[0]._id);
      }
    });
    }else{
     console.log("keine Datei vorhanden zum Hochladen");
     painting = [{name:req.body.name, description:req.body.description,created:Date(),updated:Date()}];
     dBPainting.create(painting, function(err, newEntry){
      if(err){
       console.log("Fehler beim Anlegen des Datenbankeintrags:"+ err);
      }else{
       console.log("Neuer Eintrag ohne Bild erzeugt:"+ newEntry);
       createNewProjectFolder("./public/images/paintings/"+ newEntry[0]._id);
       copyFile(sampleFile,"./public/images/paintings/"+ newEntry[0]._id);
       res.redirect("/painting/" + newEntry[0]._id);
      }
    });
    }
 });

//SHOW ROUTES###########################
//Anzeige eines Eintrags
router.get("/painting/:id", function(req, res){
  console.log("Route:  painting Show von " + req.params.id);
  promise.props({
    painting:    dBPainting.findOne({ '_id': req.params.id}).execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dBTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    comments:    dBComments.find({compositionID:req.params.id}).execAsync()
 })
 .then(function(results) {
   dbHandler.getTasks(results,res,"painting/show");   
  })
  .catch(function(err) {
    console.log(err);
    res.render("error");
  });  
 });

//EDIT ROUTES###########################
router.get("/painting/:id/edit", function(req, res){
  console.log("painting Edit Route für "+ req.params.id );
  //console.log("ID für Todos "+ req.body.paintingTodoId );
  promise.props({
    painting:    dBPainting.findOne({ '_id': req.params.id}).execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dBTodo.findOne({'result': req.params.id }).execAsync(),//req.body.taskId
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    comments:    dBComments.find({compositionID:req.params.id}).execAsync()
 })
 .then(function(results) {
  console.log("results:" + results.todo);
   dbHandler.getTasks(results,res,"painting/edit");   
  })
  .catch(function(err) {
    console.log(err);
    res.render("error");
  });  
});

//UPDATE ROUTES###########################s
router.put("/painting/:id/edit", function(req, res){
 console.log("Update Route painting:" + req.params.id);
 var data =  {};
//Prüfen, welcher Array Eintrag (History/Template aktualisiert werden soll)
 if ( req.files.templateFile){//Template wird nicht korrekt überprüft
  console.log("template Datei ausgewählt:" +req.files.templateFile.name );
  fileName= copyFile (req.files.templateFile,"/"+req.params.id+"/templates");//neue Datei ins entsprechende Verzeichnis kopieren 
  data =  {description:req.body.templateDescription,  image:fileName};//Array Eintrag festlegen und Eintrag aktualisieren
  console.log("description:" +data.description + "image:" +data.image);
  dBPainting.findOneAndUpdate({_id: req.params.id},{$push:{templates: data}}, function(err, updatedPost){
    if(err){
       console.log("Something wrong when updating data!");
    }
      console.log("updatedPost Template:"+updatedPost);
  });
  //neue Datei wurde ausgewählt
 }else if(req.files.newFile.name.length  > 0){
  console.log("neue Datei ausgewählt:" );
  //alte Datei verschieben

  if (req.body.srcFile){
  console.log("Datei bereits vorhanden");
  var path = "public/images/paintings/"+req.params.id+"/";
  fs.copyFile(path + req.body.srcFile, path + 'history/' + req.body.srcFile, err => { 
      if (err) throw err;
      console.log('success');
  });
   fs.unlinkSync("public/images/paintings/"+req.params.id+"/"+ req.body.srcFile,function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });
   data =  {description:req.body.newDescription,  image:req.body.srcFile};
   dBPainting.findOneAndUpdate({_id: req.params.id},{$push:{history: data}}, function(err, updatedPost){
     if(err){
       console.log("Something wrong when updating data!");
     }
       //console.log("updatedPost:"+updatedPost);
   });
  }else{
   console.log("noch keine Bildversion vorhanden");//req.body.srcFile
  }
  console.log("sampleFile: " +req.files.newFile.name + " folder: /" +req.params.id +"  subFolder = undefined");
  fileName= copyFile (req.files.newFile,req.params.id); 
  dBPainting.findOneAndUpdate({_id: req.params.id},{$set:{image: req.files.newFile.name}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
  });   
 }else{
  return res.status(400).send('No files selected');
 }
 res.redirect("/painting/"+ req.params.id +"/edit");
});

//DESTROY ROUTES###########################
//Löschen von Bildern auf Crel-Seite
router.delete("/painting/:id", function(req, res){
  console.log("Delete Route painting");
  dBComments.deleteMany({ compositionID: req.params.id }, function (err) {
  if (err) return handleError(err);
   console.log("Comments entfernt");
  });
});

module.exports = router;