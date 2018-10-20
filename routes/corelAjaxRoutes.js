var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var http = require('http');
var router = express.Router();

promise.promisifyAll(mongoose);;
var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");
//Alle Todos über TodoAjayRoutes
/*
//Erstellen einer neuen Taskgruppe (aus anderer Awendung)
router.post("/createTask", function(req, res){
   console.log("Ajax Route für Task aufgerufen" );
   var todoCorel = [{task:req.body.task, todoID:req.body.todoID}];
   //console.log("todoCorel:"+req.body.project );
   dBTasks.create(todoCorel, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    //console.log("Task Eintrag" +newEntry[0]);
    res.send(newEntry[0]._id);
   }
  }); 
});

/*router.get("/readTaskData/:id", function(req, res){
  console.log("Ajax Route für Einlesen der Taskdata aufgerufen" );
   console.log("id:"+req.params.id );
   dBTasks.findById(req.params.id , function(err, entry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("Task Eintrag" +entry);
    res.send(entry);
   }
  }); 
});*/
/*
router.post("/changeStatus/:id", function(req, res){
  console.log("Ajax Route zum Aendern des Task Status aufgerufen" );
  var data = ["closed","open"];
  var i =0;
  if (req.body.status == "false"){
    i=1;
  }else{
    i=0;
  }
  dBTasks.findByIdAndUpdate(req.params.id ,{$set: { status: data[i] }} ,function(err, entry){
   if(err){
    res.render("error", {error: err});
   }else{
    //console.log("Task Eintrag" +entry);
    res.send(entry);
   }
  }); 
});

router.post("/saveTaskData/:id", function(req, res){
  console.log("Ajax Route für Einlesen der Taskdata aufgerufen" );
   console.log("id:"+req.params.id );
   dBTasks.findByIdAndUpdate(req.params.id , function(err, entry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("Task Eintrag" +entry);
    res.send(entry);
   }
  }); 
});

router.post("/createTodo", function(req, res){
  console.log("Ajax Route für Todo aufgerufen" );
  var todoCorel = [{project:req.body.project, description:req.body.description, result:req.body.result}];
   //console.log("todoCorel:"+req.body.todoID );
   dBTodo.create(todoCorel, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    //console.log("Todo Eintrag" +newEntry[0]);
    res.send(newEntry[0]._id);
   }
  }); 
});
*/
module.exports = router;