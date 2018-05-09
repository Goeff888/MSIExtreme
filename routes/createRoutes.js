var express = require ("express");
var router = express.Router();

var dBContent = require("../models/content");
var dBCoding = require("../models/coding");
var dBCodingUnit = require("../models/codingUnit");
var dBCodingPost = require("../models/codingPost");

//CREATE ROUTES###########################
//Eintrag in Content hinzufügen
router.post("/homepage/new", function(req, res){
 console.log("Post route für contents");
    dBContent.create(req.body.content, function(err, newEntry){
    if(err){
     console.log(err);
     res.redirect("/homepage/new");
    }else{
    console.log(newEntry);
     res.redirect("/homepage/new");
    }
   });
});

//Eintrag in Coding hinzufügen
router.post("/homepage/:idContent/new", function(req, res){
 console.log("Post route für codings");
    dBCoding.create(req.body.coding, function(err, newUnit){
    if(err){
     console.log(err);
     res.redirect("/homepage/new");
    }else{
    console.log(newUnit);
     res.redirect("/homepage/new/"+req.params.idContent+"/0/0/0");
    }
   });
});

//Eintrag in CodingUnit hinzufügen
router.post("/homepage/new/:idContent/:idCoding", function(req, res){
    dBCodingUnit.create(req.body.codingSection, function(err, newCoding){
    if(err){
     console.log(err);
     res.redirect("/homepage/new");
    }else{
    console.log(req.params.idCoding);
     res.redirect("/homepage/new/" + req.params.idContent+ "/"+req.params.idCoding+ "/0/0");
    }
   });
});

//Post in Coding Section hinzufügen
router.post("/hompage/new/:idContent/:idCoding/:idCodingUnit", function(req, res){
   console.log("Post Route für codingUnitPost");
    dBCodingPost.create(req.body.codingUnitPost, function(err, newCoding){
    if(err){
     console.log(err);
     res.redirect("/homepage/new");
    }else{
    //console.log(req.body.codingUnitPost.sectionID);
     res.redirect("/homepage/new/" + req.params.idContent+ "/"+req.params.idCoding+ "/"+req.params.idCodingUnit+"/0");
    }
   });
});



module.exports = router;