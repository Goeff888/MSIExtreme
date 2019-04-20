var express = require ("express");
var router = express.Router();

var dBMedia = require("../models/media");

//INDEX ROUTES###########################
//Anzeige aller Medien
router.get("/media", function(req, res){
 dBMedia.find({}, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
    res.render ("media/index", {todo: entries});
  }
 }); 
});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Eintrag 
router.get("/media/new", function(req, res){
 res.render ("media/new");
});
//CREATE ROUTES###########################
//neuer Eintrag

//SHOW ROUTES###########################
//ANZEIGE einer Eintrags
router.get("/media/:id", function(req, res){
  console.log("Show Route Media ");
  dBMedia.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   //console.log(entries);
   /*dBTasks.find({todoID:entries._id},function(err, tasks){
    if(err){
     res.render("error", {error: err});
    }else{
     console.log("id:" + entries._id);
     console.log("tasks:" + tasks);
     console.log("entries:" + entries);
     res.render("todo/show", {todo: entries, tasks: tasks});
    } 
   });
   
  */}
 });
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/media/:id/edit", function(req, res){
  console.log("Edit Route Media ");
  var task = [{task:'hallo'}];
  dBMedia.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   res.render("media/edit", {todo: entries, tasks: task});
  }
 }); 
});
//UPDATE ROUTES###########################
//Bearbeiten eines Eintrags
router.put("/media/:id/edit", function(req, res){
  dBMedia.findByIdAndUpdate(req.params.id, entries, function(err, updatedMedia){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("media/edit", {media: updatedTodo});
   }
 });
});
//DESTROY ROUTES###########################
//Löschen eines Eintrags
router.delete("/media/:id", function(req, res){
  console.log("Delete Route Media ");
  dBMedia.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt");
      res.redirect("/media");
     }
  }); 
});

module.exports = router;