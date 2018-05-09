var express = require ("express");
var router = express.Router();

var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");

function createNewTask(task,id){
 var newEntry = {task:"Hallo" , todoID:id};
 dBTasks.create(newEntry,function(err,newEntry){
  if(err){
   console.log(err);
   console.log(task);
   //res.render("error", {error:err});
  }else{
   console.log("Task hinzugefügt:" +newEntry);
  }
 });
}



//INDEX ROUTES###########################
//Anzeige aller Aufgaben
router.get("/tasks", function(req, res){
 dBTodo.find({}, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
    res.render ("error", {todo: entries});//noch undefiniert, da nicht nötig
  }
 }); 
});
//NEW ROUTES###########################

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/todo/:id/tasks", function(req, res){
 console.log("Create Route: Tasks");
 dBTodo.findById(req.params.id, function(err, entries){
  if(err){
   res.render("error", {error: err});
  }else{
   for(var i=0; i< req.body.tasks.task.length; i++){
    createNewTask(req.body.tasks.task[i], entries._id);
   }
   res.redirect("/todo/" +req.params.id);
    /*dBTasks.create(req.body.tasks, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }
     console.log("task hinzugefügt:" + newEntry);
     res.redirect("/todo/:" + req.params.id);
     });*/
   //for(var i=0; i<req.body.newTasks.length;i++ ){
    //console.log(req.body.tasks.task.length);
  }
 }); 

});
//SHOW ROUTES###########################
//ANZEIGE eines Tasks

//EDIT ROUTES###########################
//Seite zum Bearbeiten einer Aufgabe
router.get("/todo/:id/task/:id/edit", function(req, res){

});
//UPDATE ROUTES###########################
//Bearbeiten einer Aufgabe
router.put("/todo/:id/edit", function(req, res){
  dBCodingPost.findByIdAndUpdate(req.params.id, entries, function(err, updatedPost){
   if(err){
    res.render("error", {error: err});
   }else{
    res.render("todo/edit", {todo: updatedPost});
   }
 });
});
//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/todo/:id", function(req, res){
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