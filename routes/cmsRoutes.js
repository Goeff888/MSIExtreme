
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();
promise.promisifyAll(mongoose);
var dBCMS = require("../models/cms");
var dBCMSUnit = require("../models/cmsUnit");
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
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
     cms:       dBCMS.find().execAsync(),
     cmsUnit:   dBCMSUnit.find().execAsync(),
   })
   .then(function(results) {
    console.log(results.cmsUnit);
     res.render("cms/new", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
 
 /*dBCMS.find({}, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
   console.log(entries);
    res.render ("cms/new", {cms: entries});
  }
 });*/
});
//CREATE ROUTES###########################
//neuer Eintrag
router.post("/cms", function(req, res){
   dBCMS.create(req.body.cms, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect ("/cms/new");
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

     res.render("todo/show", {todo: entries, tasks: tasks});
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
   res.render("todo/edit", {todo: entries, tasks: task});
  }
 }); 
// res.render ("todo/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/cms/:id/edit", function(req, res){
  dBCMS.findByIdAndUpdate(req.params.id, entries, function(err, updatedTodo){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("todo/edit", {todo: updatedTodo});
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
      res.redirect("/todo");
     }
  }); 
});

module.exports = router;