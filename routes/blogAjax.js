var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();
promise.promisifyAll(mongoose);
var dBBlogs = require("../models/blogs");
var dbHandler = require ("./dbHandler");

router.post("/updateContent/:id", function(req, res){
  console.log("Ajax Route zum Aktualisiern des Bloginhalts" );
   console.log("id:"+ req.params.id );
   console.log("content:"+ req.body.content );
   dBBlogs.findByIdAndUpdate({"_id":req.params.id},{content:req.body.content},{new: true}, function(err, entry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log("Eintrag" + entry);
    res.send(entry);
   }
  }); 
});
module.exports = router;