var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();
promise.promisifyAll(mongoose);
var dBCMS = require("../models/cms");
var dBCMSPosts = require("../models/cmsPosts");
var dBCMSUnit = require("../models/cmsUnit");

function createDate(entriesDateless){
 var now = new Date();
 var entries = new Object();
 
 entries.date = now;
 console.log("Datum:" +now);
 console.log("Daten aus Formular:" +entriesDateless);
 //var newEntry = entriesDateless[0].push({created:now });
 //return newEntry;
}



//INDEX ROUTES###########################
//Anzeige aller Unterabschnitte

//NEW ROUTES###########################

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/cms/:id/cmsUnit/:idUnit/cmsPost", function(req, res){
 console.log("Create Route: cmsPost");
 dBCMSPosts.findById(req.params.idUnit, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
   var now = new Date();
   var entries = new Object;
   entries.content = req.body.cmsPost.content;
   entries.created = now;
   entries.updated = now;
   console.log("Parameter aus dem Formular:" + req.body.cmsPost);
   console.log("Parameter nach der Funktion:" + createDate(req.body.cmsPost));
   dBCMSPosts.create(req.body.cmsPost, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    //console.log(newEntry);
    res.redirect ("/cms/new");
   }
  });

  }
 }); 

});
//SHOW ROUTES###########################
//ANZEIGE eines Tasks

//EDIT ROUTES###########################
//Seite zum Bearbeiten eines Posts
router.get("/cms/:id/cmsUnit/:idUnit/:idPost/edit", function(req, res){
 console.log("CMSPOST edit Seite");
 promise.props({
     cms:       dBCMS.find().execAsync(),
     cmsUnit:   dBCMSUnit.find().execAsync(),
     cmsPost:   dBCMSPosts.find().execAsync(),
     navigation: [{cms:req.params.id,cmsUnit:req.params.idUnit, cmsPost:req.params.idPost}]
   })
   .then(function(results) {
    //console.log(results.cmsPost);
     res.render("cms/edit", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//UPDATE ROUTES###########################
//Bearbeiten einer Posts
router.put("/cms/:id/cmsUnit/:idUnit/edit", function(req, res){
  dBCMSPosts.findByIdAndUpdate(req.params.id, entries, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("cms/edit", {cms: updatedPost});
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