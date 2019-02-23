var express = require ("express");
var promise = require('bluebird');
var mongoose = require("mongoose");
var router = express.Router();
promise.promisifyAll(mongoose);
var dBBlogs = require("../models/blogs");
var dBCategories = require("../models/categories");
var dBComposition = require("../models/composition");
var dBComments = require("../models/comments");
//var dbTasks = require("../models/tasks");
var dbTodo = require("../models/todo");
var dbBooks = require("../models/books");
var dBLinks = require("../models/links");
var dbHandler = require ("./dbHandler");

//INDEX ROUTES###########################
//Anzeige aller Unterabschnitte

//NEW ROUTES###########################

//CREATE ROUTES###########################
//neuer Eintrag
router.post("/blog", function(req, res){
 console.log("Create Route: blog");
 //console.log(req.body.name );
 var entry = [{name:req.body.name,
              description:req.body.description,
              category:req.body.category,
              area:req.body.area,
              created:Date(),updated:Date()}];

 dbHandler.createNewDB(dBBlogs, entry,res, "/blog");
});
 


//SHOW ROUTES###########################
//ANZEIGE eines Blogs
router.get("/blog/:id", function(req, res){
 console.log("Show Route: blog");
   promise.props({
    composition: dBComposition.find().execAsync(),
    links:       dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    tutorials:   dBLinks.find({ 'content': 'digital Art' }).execAsync(),
    todo:        dbTodo.findOne({'project': '3D Visualisierung' }).execAsync(),
    magazine:    dbBooks.find({ 'content': 'blender' }).execAsync(),
    blog:        dBBlogs.find({},'name area category').execAsync()
  })
  .then(function(results) {
   dbHandler.getTasks(results,res,"blog/show");
   //console.log("Anzahl der Tasks vor Rendern:"+ data);
  })
  .catch(function(err) {
    res.send(500); // oops - we're even handling errors!
    console.log(err);
  });
});
//EDIT ROUTES###########################
//Seite zum Bearbeiten eines Posts
router.get("/blog/:id/edit", function(req, res){
 
});
//UPDATE ROUTES###########################
//Aktualisieren einer Posts mit Navigation
router.put("/blog/:id/edit", function(req, res){

});


//DESTROY ROUTES###########################
//Löschen einer Aufgabe
router.delete("/blog/:id", function(req, res){
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