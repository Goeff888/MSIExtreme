
var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var path = require('path');
var router = express.Router();

promise.promisifyAll(mongoose);
//var dBCMS = require(".../models/cms");
var dBTasks = require("../models/tasks");
//var dBCMPosts = require("../models/cmsPosts");


//Speichern eines Tasks###########################

router.post("/saveTask",function(req,res){
  console.log("Route: SaveTask");
  console.log(__dirname);
  var task = [{task:'hallo'}];
  /*dBTasks.create(task, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{/*
    console.log(newEntry);
    res.redirect("/todo/"+ newEntry._id+"/edit");
   }  
  });*/
});
module.exports = router;