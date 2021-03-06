var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();
promise.promisifyAll(mongoose);
var dBCMS = require("../models/cms");
var dBCMSPosts = require("../models/cmsPosts");
var dBCMSUnit = require("../models/cmsUnit");
var dBCategories = require("../models/categories");
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
   //console.log("Parameter aus dem Formular:" + req.body.cmsPost);
   //console.log("Parameter nach der Funktion:" + createDate(req.body.cmsPost));
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
 console.log(req.params.idPost);
 promise.props({
     cms:          dBCMS.find().execAsync(),
     cmsUnit:      dBCMSUnit.find().execAsync(),
     cmsPost:      dBCMSPosts.find().execAsync(),
     selectedPost: dBCMSPosts.findById(req.params.idPost).execAsync(),
     categories:   dBCategories.find().execAsync(),
     navigation: [{cms:req.params.id,cmsUnit:req.params.idUnit, cmsPost:req.params.idPost}]
   })
   .then(function(results) {
    //console.log(results.cmsPost[0].created);
     res.render("cms/edit", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//UPDATE ROUTES###########################
//Aktualisieren einer Posts mit Navigation
router.put("/cms/:id/cmsUnit/:idUnit/:idPost/edit", function(req, res){
 console.log("Update Route cmsPost mit");
  dBCMSPosts.findByIdAndUpdate(req.params.idPost, req.params.post, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log();
    res.redirect("/cms/");//+ req.params.post.cmsID +"/cmsUnit/"+ req.params.post.cmsUnitID +"/"+ req.params.post.cmsPostID +"/edit", {cms: updatedPost});
   }
 });
});

//Bearbeiten einer Posts ohne Navigation
router.put("/cmsPost/:id/edit", function(req, res){
 console.log("Update Route cmsPost ohne");

  dBCMSPosts.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(updatedPost);
    res.redirect("/cms/"+ req.body.post.cmsID +"/cmsUnit/"+ req.body.post.cmsUnitID +"/"+ req.params.id +"/edit");
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