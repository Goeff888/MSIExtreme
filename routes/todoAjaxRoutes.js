
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var http = require('http');
var router = express.Router();

promise.promisifyAll(mongoose);
//var dBCMS = require(".../models/cms");
var dBTasks = require("../models/tasks");
//var dBCMPosts = require("../models/cmsPosts");
var dBCategory = require("../models/categories");

//Speichern eines Tasks###########################
router.post("/saveTask",function(req,res){
  console.log("Ajax Route: SaveTask");
  console.log("Task:" + req.body.task);
  var task = [{task:req.body.task,todoID:req.body.todoID}];
  dBTasks.create(task, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
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
//////////Composition Routes
//Speichern einer Kategorie###########################
router.post("/saveCategory",function(req,res){
  console.log("Ajax Route: saveCategory");
  console.log("saveCategory:" + req.body.category);
  var saveCategory = [{category:req.body.category}];
  dBCategory.create(saveCategory, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    //res.redirect("/todo/"+ newEntry._id+"/edit");
   }  
  });
});


module.exports = router;