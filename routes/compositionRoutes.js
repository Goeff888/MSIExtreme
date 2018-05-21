var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var formidable = require('formidable');
var fs = require('fs');
var dBComposition = require("../models/composition");
var dBTutorials = require("../models/tutorials");
var dBComments = require("../models/comments");
var dbCategories = require("../models/categories");
//var dBTasks = require("../models/tasks");
var mongoose = require("mongoose");
//promise.promisifyAll(mongoose);

function uploadComposition(renderedImage){
 console.log("Funktion:uploadFile");
 console.log(renderedImage.path);
 var form = new formidable.IncomingForm();
 /*form.parse( function (err, fields, files) {
  var oldpath = files.composition.renderedImage.path;
  console.log(oldpath);
  var newpath = '/images/compositions/' + files.filetoupload.name;
  console.log(newpath);
  /*fs.rename(oldpath, newpath, function (err) {
   if (err) throw err;
   res.write('File uploaded and moved!');
   res.end();
  });*/
// });
}
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/composition", function(req, res){
   promise.props({
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

 
 //res.render ("compositions/new");
});

//Anzeige der Blender-Seite zum Hinzufügen von Kommentaren
/*router.get("/composition/:id/comments/new", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    console.log("Eintrag gefunden");
     //res.send("Hallo");
     res.render ("comments/new",{composition:composition});
    } 
  
  });
});*/
//CREATE ROUTES###########################
//Hinzufügen eines neuen Bildes
router.post("/composition/new",function(req,res){
    console.log("Post Route für composition");
    dBComposition.create(req.body.composition, function(err, newEntry){
    if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    //console.log(newEntry);
    var form = new formidable.IncomingForm();
    form.parse( function (err, fields, files) {
     var oldpath = files.composition.renderedImage.path;//Hier Fehler in der Paraetercomposition.renderedImage
     console.log(oldpath);
     //var newpath = '/images/compositions/' + files.filetoupload.name;
     console.log(newpath);
});



     res.redirect("/composition");
    }
   });
 
 });


//Hinzufügen von Kommentaren zu einem Bild
/*router.post("/composition/:id/comments", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    dBCommments.create(req.body.comment,function(err, comment){
     if(err){
      console.log(err);
      res.redirect("/composition");
    }else{
     composition.comments.push(comment);
     composition.save();
     console.log( "composition/" + composition._id);
     res.redirect ("/composition/" + composition._id);
    } 
   });
  }});
});*/
//SHOW ROUTES###########################
//Anzeige eines Composition-Eintrags
router.get("/composition/:id", function(req, res){
  console.log("Route für die Anzeige einer Composition-Detailseite ");
    dBComposition.findById(req.params.id).populate("comments").exec(function(err, entries){
    if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    //console.log(req.body.codingUnitPost.sectionID);
    //console.log(newEntry);
     res.render("compositions/show",{composition: entries});
     
    }
   });
 });
//EDIT ROUTES###########################
//Seite zum Bearbeiten von Bildern auf Blender-Seite
router.get("/composition/:id/edit", function(req, res){
 res.render ("compositions/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten eines Bildeintrags

//DESTROY ROUTES###########################
//Löschen von Bildern auf Blender-Seite
router.delete("/composition/edit", function(req, res){
 res.render ("compositions/show");
});

module.exports = router;