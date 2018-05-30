
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();

var dBCMS = require("../models/cms");
var dBCMSUnit = require("../models/cmsUnit");
var dBCMPosts = require("../models/cmsPosts");
var dBCategories = require("../models/categories");
promise.promisifyAll(mongoose);

function createDate(entriesDateless){
 var now = new Date();
 var entries = new Object();
 entries.name = entriesDateless.name;
 entries.date = now;
 console.log("Datum:" +now);
 console.log("Daten aus Formular:" + entries.date);
 //var newEntry = entriesDateless[0].push({created:now });
 return entries;
}

//INDEX ROUTES###########################
//Anzeige aller Haupteinträge
router.get("/cms", function(req, res){
 dBCMS.find({}, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
    res.render ("cms/index", {todo: entries});
  }
 }); 
});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Eintrag 
router.get("/cms/new", function(req, res){
 console.log("CMS New Seite");
 promise.props({
     cms:       dBCMS.find({},'name').execAsync(),
     cmsUnit:   dBCMSUnit.find({},'name cmsID').execAsync(),
     cmsPost:   dBCMPosts.find({},'name cmsUnitID').execAsync(),
     categories:dBCategories.find().execAsync()
   })
   .then(function(results) {
    console.log("CMS:"+results.cms);
    console.log("CMSUnit:"+results.cmsUnit);
     res.render("cms/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//CREATE ROUTES###########################
//neuer Eintrag
router.post("/cms", function(req, res){
 var entryWithDate = createDate(req.body.cms);
 console.log(entryWithDate.date);
 console.log(entryWithDate.name);
   dBCMS.create(req.body.cms, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect ("cms/new");
   }
  });
});
//SHOW ROUTES###########################
//ANZEIGE eines Beitrags
router.get("/cms/:id", function(req, res){
  console.log("Show Route ToDo ");
  dBCMS.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   //console.log(entries);
   dBCMS.find({todoID:entries._id},function(err, tasks){
    if(err){
     res.render("error", {error: err});
    }else{
     console.log("id:" + entries._id);

     res.render("cms/show", {todo: entries, tasks: tasks});
    } 
   });
   
  }
 });
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/cms/:id/edit", function(req, res){
  console.log("Edit Route ToDo ");
  var task = [{task:'hallo'}];
  dBCMS.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   res.render("cms/edit", {todo: entries, tasks: task});
  }
 }); 

});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/cms/:id/edit", function(req, res){
  dBCMS.findByIdAndUpdate(req.params.id, entries, function(err, updatedTodo){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("cms/edit", {cms: updatedTodo});
   }
 });
});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/cms/:id", function(req, res){
  console.log("Delete Route ToDo ");
  dBCMS.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt");
      res.redirect("/cms");
     }
  }); 
});

module.exports = router;