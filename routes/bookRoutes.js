var express = require ("express");
var router = express.Router();
var http = require('http');
var promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var fileUpload = require('express-fileupload');
var dBBooks = require("../models/books");
var mongoose = require("mongoose");

promise.promisifyAll(mongoose);
router.use(fileUpload());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static("public"));
//INDEX ROUTES###########################
//Anzeige aller Einträge
router.get("/book", function(req, res){

});
//NEW ROUTES###########################


//CREATE ROUTES###########################
//neues Buch hinzufügen
/*router.post("/books/new", function(req, res){
  console.log("Route: Books create");
   dBBooks.create(req.body.books, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    console.log(newEntry);
    res.redirect("/composition/new");
   }
  });
});*/

router.post("/book/new",function(req,res){
   console.log("Create Route  corel"); 
    console.log(req.body.bookName);
    console.log(req.files);
    // Datei hochladen
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
     
    var book = [{
         name:req.body.bookName,
         book:req.files.bookFile.name,
         description:req.body.description,
                }];
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.book;
    //console.log(req.body.name);
    //console.log(sampleFile.name);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('public/images/books/' + sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    dBBooks.create(book, function(err, newEntry){
     if(err){
      res.render("error", {error: err});
     }else{
      //console.log(newEntry);
      res.redirect("/corel/new");
     }
    });
   });

 });
//SHOW ROUTES###########################


//EDIT ROUTES###########################


//UPDATE ROUTES###########################
//Bearbeiten 

//DESTROY ROUTES###########################
//Löschen eines Tutorials

module.exports = router;