var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
//var dBTodo = require("../models/todo");
var dBTasks = require("../models/comments");
var mongoose = require("mongoose");
promise.promisifyAll(mongoose);
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/comments", function(req, res){
 /*promise.props({
     todo:    dBTodo.find({}).execAsync(),
     tasks:   dBTasks.find({}).execAsync(),
   })
   .then(function(results) {
     res.render ("todo/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });*/
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
    console.log("Eintrag gefunden");
     //res.send("Hallo");
     res.render ("comments/new",{composition:composition});
    } 
  
  });
});
//CREATE ROUTES###########################
//neuer Eintrag
router.post("/comments", function(req, res){
   /*dBTodo.create(req.body.todo, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect("/todo/"+ newEntry._id+"/edit");
   }
  });*/
});

//Hinzufügen von Kommentaren zu einem Bild
router.post("/composition/:id/comments", function(req, res){
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
});
//SHOW ROUTES###########################
//ANZEIGE einer Aufgabe
router.get("/comments/:id", function(req, res){
  console.log("Show Route Comments ");
  /*dBTodo.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   //console.log(entries);
   dBTasks.find({todoID:entries._id},function(err, tasks){
    if(err){
     res.render("error", {error: err});
    }else{
     //console.log("id:" + entries._id);
     //console.log("tasks:" + tasks);
     res.redirect("/todo/"+ entries._id+"/edit");
    } 
   });
   
  }
 });*/
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/comments/:id/edit", function(req, res){
  console.log("Edit Route Comments ");
  //var task = [{task:'hallo'}];
  /*dBTodo.findById(req.params.id, function(err, entries){
  if(err){
    res.render("error", {error: err});
  }else{
   
   dBTasks.find({todoID:entries._id}, function(err, task){
    if(err){
      res.render("error", {error: err});
    }else{
     //console.log(task);
     res.render("todo/edit", {todo: entries, tasks: task});
    }
   });
  }
 });*/ 
// res.render ("todo/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/comments/:id/edit", function(req, res){
  /*dBTodo.findByIdAndUpdate(req.params.id, entries, function(err, updatedTodo){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("todo/edit", {todo: updatedTodo});
   }
 });*/
});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/comments/:id", function(req, res){
  console.log("Delete Route Comments ");
  /*dBTodo.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt:" + req.params.id);
      res.redirect("/todo");
     }
  });*/ 
});

module.exports = router;