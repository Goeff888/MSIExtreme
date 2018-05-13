var express = require ("express");
var router = express.Router();

var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");
//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/todo", function(req, res){
 dBTodo.find({}, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
    res.render ("todo/index", {todo: entries});
  }
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
   dBTodo.create(req.body.todo, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect("/todo/"+ newEntry._id+"/edit");
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
     console.log("id:" + entries._id);
     console.log("tasks:" + tasks);
     res.redirect("/todo/"+ tasks._id+"/edit");
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
   
   dBTasks.find({todoID:entries.todoID}, function(err, task){
    if(err){
      res.render("error", {error: err});
    }else{
     
     res.render("todo/edit", {todo: entries, tasks: task});
    }
   });
   
   //res.render("todo/edit", {todo: entries, tasks: task});
  }
 }); 
// res.render ("todo/edit");
});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/todo/:id/edit", function(req, res){
  dBTodo.findByIdAndUpdate(req.params.id, entries, function(err, updatedTodo){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("todo/edit", {todo: updatedTodo});
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
      console.log("Eintrag entfernt");
      res.redirect("/todo");
     }
  }); 
});

module.exports = router;