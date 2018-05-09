var express = require ("express");
var router = express.Router();

//var dBCMS = require("../models/cms");
var dBCMSPosts = require("../models/cmsPosts");
var dBCMSUnit = require("../models/cmsUnit");

function createNewEntry(task,id){
 var newEntry = {task:"Hallo" , todoID:id};
 dBCMSPosts.create(newEntry,function(err,newEntry){
  if(err){
   console.log(err);
   console.log(task);
   //res.render("error", {error:err});
  }else{
   console.log("Unterabschnitt hinzugefügt:" +newEntry);
  }
 });
}



//INDEX ROUTES###########################
//Anzeige aller Unterabschnitte

//NEW ROUTES###########################

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/cms/:id/cmsUnit/:idUnit/cmsPost", function(req, res){
 console.log("Create Route: cmsUnit");
 dBCMSUnit.findById(req.params.id, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
   dBCMSPosts.create(req.body.cmsUnit, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect ("/cms/:id/cmsUnit/:idUnit/cmsPost/edit");
   }
  });

  }
 }); 

});
//SHOW ROUTES###########################
//ANZEIGE eines Tasks

//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/cms/:id/cmsUnit/:idUnit/:idPost/edit", function(req, res){

});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/cms/:id/cmsUnit/:id/edit", function(req, res){
  dBCodingPost.findByIdAndUpdate(req.params.id, entries, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("cms/edit", {todo: updatedPost});
   }
 });
});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/cms/:id", function(req, res){
  dBCodingUnit.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt");
      res.redirect("/todo");
     }
  }); 
});

module.exports = router;