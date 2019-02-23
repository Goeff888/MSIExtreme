var mongoose = require("mongoose");
var dbTasks = require("../models/tasks");
var dbTodo = require("../models/todo");

var newTodo3DVisualization = [{'project': '3D Visualisierung' },{"description":"Verbesserungen an der Homepage"}];
var newTodo3DVisualProject = [{'project': 'Dummy Name des Projekts' },{"description":"Inhalte: Aufgaben zum Projekt"}];
var newTodo3DVisualizationBlog = [{'project': '3D Visualisierungs Blog' },{"description":"Verbesserungen am Blog zur 3D Visualisierung"}];

function renderComposition (results,res,site){
 res.render(site,{
                  composition:results.composition,
                  todo:results.todo,
                  tasks:[],
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments,
                  blog:results.blog});
}

function renderPainting (results,res,site){
 res.render(site,{
                  painting:results.painting,
                  todo:results.todo,
                  tasks:[],
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments,
                  blog:results.blog});
}

exports.getTasks = function(results,res,site){
 console.log("tasks per dbHandler ermitteln");

 //Datenbank bereits vorhanden, es wird nur die Seite gerendert
 if (results.todo != null){
  dbTasks.find({ 'todoID': results.todo._id }, function(err, tasksResults){
      if(err){
       return err;
      }else{
       if (site.slice(0,8)=="painting"){
        console.log("Aufruf von painting");
        renderPainting(results,res,site);
       }else if(site.slice(0,11)=="composition"){
        console.log("Aufruf von composition");
        renderComposition(results,res,site);
       }else{
        console.log("Aufruf unbekannt");
       }
       //renderComposition(results,res,site);
      }
  });
  //Datenbank nicht vorhanden
 }else{
   console.log("datenbank zu "+ site +" nicht vorhanden");
   var newTodo=[];
   //Datenbak für Verbesserungen an der Homepage generieren
   if((site === "compositions/index") || (site == "compositions/new")){   
    newTodo = {
       'project':newTodo3DVisualization[0].project,
       'description':newTodo3DVisualization[0].description,
     };
   }
   //Datenbank für Verbesserungen am Projekt generieren
    else if(site === "compositions/show" || site == "compositions/edit"){
     newTodo = {
       project:newTodo3DVisualProject[0].project,
       description:newTodo3DVisualProject[0].description,
       result: results.composition._id };
        //Datenbank für Verbesserungen am Projekt generieren
    }else if(site === "compositions/blog" ){
     newTodo = {
       project:newTodo3DVisualizationBlog[0].project,
       description:newTodo3DVisualizationBlog[0].description,
       result: results.composition._id };//Prüfen ob richtig!!!!!!!!!!!
   //Dummydatenbak bei Fehler um Stabilität sicherzustellen
    }else{
    newTodo = {
       project:"Fehler",
       description:"Diese Datenbank sollte nicht erstellt werden",
     };     
    }
    //Datenkank erzeugen und Seite rendern
    dbTodo.create(newTodo, function(err, newEntry){
     if(err){
      return err;
     }else{
      console.log("Neuer Eintrag erzeugt:"+newEntry);
      res.render(site,{
                 composition:results.composition,
                 tasks:{},
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine,
                 comments:results.comments,
                 blog:results.blog});
      return newEntry;
     }
    });
    
   }
};

//neuen datenbankeintrag erzeugen und Seite rendern
exports.createNewDB = function(dbNew, content,res, site){
   console.log("Neue datenbank erzeugen");
   dbNew.create(content, function(err, newEntry){
   if(err){
    res.render("error", {error: err});
   }else{
    res.redirect (site+"/"+newEntry[0]._id);
   }
  });
};
