
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var http = require('http');
var router = express.Router();
var dBTasks = require("../models/tasks");
promise.promisifyAll(mongoose);


router.get("/readTaskData/:id",function(req,res){
  console.log("Funktion: readTaskData");
  dBTasks.findById(req.params.id,function(err,result){
    if(err){
      res.render("error", {error: err});
     }else{
      console.log("result:"+result);
      res.send(result);
     }
    });
});
//Speichern eines Tasks###########################
router.post("/saveTask",function(req,res){
  console.log("Ajax Route: SaveTask");
  console.log("Task:" + req.body.task);
  console.log("todoID:" + req.body.todoID);
  var task = [{task:req.body.task,todoID:req.body.todoID}];
  dBTasks.create(task, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("newEntry:"+newEntry);
    //res.redirect("/todo/"+ newEntry._id+"/edit");
   }  
  });
});

//Löschen eines Tasks###########################
router.post("/deleteTask",function(req,res){
  console.log("Ajax Route: deleteTask");
  console.log("ID:" + req.body.data);
});

//Aktualisieren des Status eines Tasks###########################
router.post("/updateStatus",function(req,res){
  console.log("Funktion: UpdateStatus");
});

/////////////////////////////////////////////////////////////////////////


module.exports = router;