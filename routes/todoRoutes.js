var express = require ("express");
var router = express.Router();
var promise = require('bluebird');
var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");
var mongoose = require("mongoose");
promise.promisifyAll(mongoose);
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/todo", function(req, res){
 promise.props({
     todo:    dBTodo.find({}).execAsync(),
     tasks:   dBTasks.find({}).execAsync(),
   })
   .then(function(results) {
     res.render ("todo/index", results);
   })
   .catch(function(err) {
     res.send(500); // oops - we're even handling errors!
     console.log(err);
   });
});
//NEW ROUTES###########################
//Anzeige der Seite für neuen Eintrag 
router.get("/todo/new", function(req, res){
 res.render ("todo/new");
});
//CREATE ROUTES###########################
//neuer Eintrag
router.post("/todo", function(req, res){
 console.log("Post Route Todo Create");
   dBTodo.create(req.body.todo, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("Datenbank erzeugt:" +newEntry);
    res.redirect("/todo/"+ newEntry._id);
   }
  });
});
//SHOW ROUTES###########################
//ANZEIGE einer Aufgabe
router.get("/todo/:id", function(req, res){
  console.log("Show Route ToDo ");
  dBTodo.findById(req.params.id, function(err, entries){
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
     res.render("todo/show", tasks);
    } 
   });
   
  }
 });
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/todo/:id/edit", function(req, res){
  console.log("Edit Route ToDo ");
  //var task = [{task:'hallo'}];
  dBTodo.findById(req.params.id, function(err, entries){
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
 }); 
// res.render ("todo/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/todo/:id/edit", function(req, res){
 console.log("Update Route ToDo ");
  dBTodo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
   if(err){
    res.render("error", {error: err});
   }else{
    //console.log("todo/"+ req.params.id +"/edit");
    res.redirect("/todo/"+ req.params.id +"/edit");
   }
 });
});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/todo/:id", function(req, res){
  console.log("Delete Route ToDo ");
  dBTodo.findByIdAndRemove(req.params.id, function(err){
     if(err){
      res.render("error", {error: err});
     }else{
      console.log("Eintrag entfernt:" + req.params.id);
      res.redirect("/todo");
     }
  }); 
});

module.exports = router;