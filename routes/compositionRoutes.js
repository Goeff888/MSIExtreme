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

//////////////////////////////////Funktionen
/*function getSites(siteList, id){
 console.log("Seiten ermitteln");
 var navigation = [];
 for(var i = 0; i < siteList.length; i++){
  //console.log("site" +siteList[i]);
  //console.log(id);
  if(JSON.stringify(siteList[i]) === JSON.stringify(id)){
    navigation[0] = siteList[i];
    navigation[1] = "Hallo";    
  }
 }
 return navigation;
}*/

//Neuen Projektordner anlegen und Status zurückgeben
function createNewProjectFolder(dir){
 //var dir = './public/images/corel/'+ newEntry[0]._id;
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

//Alle Daten der Partials ermitteln
/*function getPartialData(){
   promise.props({
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': 'Blender (General) Todos' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
    return (results);
    //console.log("Anzahl der Tasks vor Rendern:"+ data);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
}*/
//Zum Partial gehörigen tasks ermittleln oder neue Datenbank anlegen
//Anschließend rendern der Seite
function getTasks(results,res,site){
 //console.log("Länge des übergebenen Parameters:"+results.todo._id);
 if (results.todo != null){
  dbTasks.find({ 'todoID': results.todo._id }, function(err, tasksResults){
      if(err){
       return err;
      }else{
       console.log("Anzahl der ermittelten Tasks:"+ tasksResults.length);
       res.render(site,{
                  composition:results.composition,
                  todo:results.todo,
                  tasks:tasksResults,
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments});
      }
  }); 
 }else{
   var newTodo=[];
   console.log(site);
   if((site === "compositions/index") || (site == "compositions/new")){   
    newTodo = {
       project:"Composition General Todos",
       description:"Inhalte: Alles was mit der Arbeit mit 3D am PC zu tun hat (Arbeitsplatz, Webauftritt, Computer,...)",
     };
   }
    else if(site === "compositions/show" || site == "compositions/edit"){
     newTodo = {
       project:"Projektdatenbank",
       description:"Inhalte: Auffgaben zum Projekt",
       result: results.composition._id };     
    }else{
    newTodo = {
       project:"Fehler",
       description:"Diese Datenbank sollte nicht erstellt werden",
     };     
    }
    dbTodo.create(newTodo, function(err, newEntry){
     if(err){
      return err;
     }else{
      console.log("Neuer Eintrag erzeugt:"+newEntry);
      res.render(site,{
                 composition:results.composition,
                 tasks:{},
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine,
                 comments:results.comments});
     }
    });
   }
}

//INDEX ROUTES###########################
router.get("/composition", function(req, res){
   console.log("Composition Route:"+ req.url);
   promise.props({
     composition: dBComposition.find().execAsync(),
     links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
     todo:        dbTodo.findOne({'project': 'Blender (General) Todos' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
    getTasks(results,res,"compositions/index");
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
     todo:        dbTodo.findOne({'project': 'Blender (General) Todos' }).execAsync(),//req.body.taskId
     magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
   })
   .then(function(results) {
   //console.log("Results.id:"+results.todo._id);
    getTasks(results,res,"compositions/new");
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
   if (!req.files){
    console.log("Keine Datei zum Hochladen");
   }else{
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
     composition = [{name:req.body.name, image:req.files.templateImage.name,description:req.body.description,created:Date(),updated:Date()}];
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
     console.log("Datei vorhanden zum Hochladen, aber kein Datenbankwert");
    }
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
  console.log(results.todo);
   getTasks(results,res,"compositions/show");
 })
 .catch(function(err) {
   res.sendStatus(err); // oops - we're even handling errors!
   //res.render("error", {error: err});
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
   getTasks(results,res,"compositions/edit");
   /*
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
    });*/
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
  fs.copyFile("public/images/compositions/"+req.params.id+"/"+ req.body.srcFile, "public/images/compositions/"+req.params.id+"/history/"+req.body.srcFile, (err) => {
  if (err) throw err;
  //console.log('source.txt was copied to destination.txt');
  });
  fs.unlinkSync("public/images/compositions/"+req.params.id+"/"+ req.body.srcFile,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  
  fileName= copyFile (req.files.newFile,"/"+req.params.id);
  
  data =  {description:req.body.newDescription,  image:req.body.srcFile};
  dBComposition.findOneAndUpdate({_id: req.params.id},{$push:{history: data}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      //console.log("updatedPost:"+updatedPost);
  });
  
  dBComposition.findOneAndUpdate({_id: req.params.id},{$set:{image: req.files.newFile.name}}, function(err, updatedPost){
    if(err){
      console.log("Something wrong when updating data!");
    }
      //console.log("updatedPost:"+updatedPost);
  });
   
 }else{
  return res.status(400).send('No files selected');
 }
 res.redirect("/composition/"+ req.params.id +"/edit");
});
/*router.put("/composition/:id/edit", function(req, res){
 console.log("Update Route Composition:" + req.params.id);
 //Überpüfen, ob Bildbeschreibung oder History geändert wird fehlt noch
  if (!req.files)
      return res.status(400).send('No files were uploaded.');
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.image;
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
*/
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