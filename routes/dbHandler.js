var mongoose = require("mongoose");


 
exports.seedDB=function(s){
   //Remove all campgrounds
   console.log("Aufruf ddd erfolgt");
   console.log(s);
};

exports.getTasks = function(results,res,site){
 //console.log("Länge des übergebenen Parameters:"+results.todo._id);
 //Datenbank bereits vorhanden, es wird nur die Seite gerendert
 if (results.todo != null){
  dbTasks.find({ 'todoID': results.todo._id }, function(err, tasksResults){
      if(err){
       return err;
      }else{
       console.log("Anzahl der ermittelten Tasks:"+ tasksResults.length);
       res.render(site,{
                  composition:results.composition,
                  todo:results.todo,
                  tasks:tasksResults,
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments});
      }
  });
  //Datenbank nicht vorhanden
 }else{
   console.log("datenbank nicht vorhanden");
   /*
   var newTodo=[];
   console.log(site);
   //Datenbak für Verbesserungen an der Homepage generieren
   if((site === "compositions/index") || (site == "compositions/new")){   
    newTodo = {
       project:"Composition General Todos",
       description:"Verbesserungen an der Homepage",
     };
   }
   //Datenbak für Verbesserungen am Projekt generieren
    else if(site === "compositions/show" || site == "compositions/edit"){
     newTodo = {
       project:"Projektdatenbank",
       description:"Inhalte: Aufgaben zum Projekt",
       result: results.composition._id };
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
                 comments:results.comments});
     }
    });
    */
   }
};
