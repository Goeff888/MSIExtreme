var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var dBComposition = require("../models/composition");
var dBCommments = require("../models/comments");
var mongoose = require("mongoose");
promise.promisifyAll(mongoose);
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/comments", function(req, res){

});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Eintrag 
router.get("/comments/new", function(req, res){
 //res.render ("todo/new");
});

//Anzeige der Blender-Seite zum Hinzufügen von Kommentaren
router.get("/composition/:id/comments/new", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
    //console.log("Eintrag gefunden:" + composition);
     res.render ("comments/new",{composition:composition});
    } 
  
  });
});

//Anzeige der Blender-Seite zum Hinzufügen von Kommentaren------------------------------------Entfernen da nur zur Anzeige, nur POST Route nötig
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
//neuer Eintrag
router.post("/comments", function(req, res){
 
});

//Hinzufügen von Kommentaren zu einem Bild
router.post("/composition/:id/comments", function(req, res){
 console.log("Neuer Comment in Composition");
 dBComposition.findById(req.params.id, function(err, composition){
 if(err){
     console.log(err);
     res.redirect("/composition");
    }else{
     console.log("CompositionID gefunden");
     //var comment = [{name:req.body.name, image:req.files.renderedImage.name,description:req.body.description,created:Date(),updated:Date()}];
    dBCommments.create(req.body.comment,function(err, comment){
     if(err){
      console.log(err);
      res.redirect("/composition");
    }else{
     
     
     //composition.comments.push(comment);
     //composition.save();
     console.log( "composition/" + composition._id);
     res.redirect ("/composition/" + composition._id);
    } 
   });
  }});
});
//SHOW ROUTES###########################
//ANZEIGE eines Comments
router.get("/comments/:id", function(req, res){
  console.log("Show Route Comments ");

});


//EDIT ROUTES###########################
//Seite zum Bearbeiten eines Comments
router.get("/comments/:id/edit", function(req, res){
  console.log("Edit Route Comments ");

});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/comments/:id/edit", function(req, res){

});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/comments/:id", function(req, res){
  console.log("Delete Route Comments ");
 
});

module.exports = router;