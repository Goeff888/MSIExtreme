var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var http = require('http');
var router = express.Router();

promise.promisifyAll(mongoose);;
var dBTodo = require("../models/todo");
var dBTasks = require("../models/tasks");
//var dBCMPosts = require("../models/cmsPosts");
var dBCategory = require("../models/categories");




//Erstellen einer neuen Taskgruppe (aus anderer Awendung)
router.post("/createTask", function(req, res){
    console.log("Ajax Route aufgerufen" );
   var todoCorel = [{project:req.body.project, description:req.body.description, result:req.body.result}];
   console.log("todoCorel:"+todoCorel );
   dBTodo.create(todoCorel, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry[0]._id);
    //res.redirect("/corel/"+ req.param.id+"/edit");
    res.send(newEntry[0]._id);
   }
  });
   
});


module.exports = router;