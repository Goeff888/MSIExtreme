var mongoose = require("mongoose");
var dbTasks = require("../models/tasks");
var dbTodo = require("../models/todo");

var newTodo3DVisualization = [{'project': '3D Visualisierung' },{"description":"Verbesserungen an der Homepage"}];
var newTodo3DVisualProject = [{'project': 'Dummy Name des Projekts' },{"description":"Inhalte: Aufgaben zum Projekt"}];
var newTodo3DVisualizationBlog = [{'project': '3D Visualisierungs Blog' },{"description":"Verbesserungen am Blog zur 3D Visualisierung"}];

function getArea(site){
 var area = [];
 if (site.slice(0,8) == "painting"){
  area = "painting";
 }else if (site.slice(0,11) == "composition"){
    area = "composition";
  }
 return area;
}

function getRouteArea(string,site){
 var area = 0;
 var routeString = site.slice(string.length+1, site.length);
 console.log("Aufruf von getRouteArea");
 console.log("routeString: " +routeString);
 console.log("string:"+string);
 console.log("site:"+site);
 if((routeString=="index")||(routeString=="new")){
  area = 1;
 }else if((routeString =="show")||(routeString=="edit")){
  area = 2;
 }else if(routeString=="blog"){
  area = 3;
 } else{
  area = 0;
 }
 return area;
}

function renderComposition (results,res,site,tasks){
 res.render(site,{
                  composition:results.composition,
                  todo:results.todo,
                  tasks:tasks,
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments,
                  blog:results.blog});
}

function renderPainting (results,res,site,tasks){
 res.render(site,{
                  painting:results.painting,
                  todo:results.todo,
                  tasks:tasks,
                  links:results.links,
                  magazine:results.magazine,
                  comments:results.comments,
                  blog:results.blog});
}

exports.getTasks = function(results,res,site){
 console.log("tasks per dbHandler ermitteln");
 var area = getArea(site);
 console.log("area:" +area);
//console.log("Results.id:"+results.todo._id);
 //Datenbank bereits vorhanden, es wird nur die Seite gerendert
 if (results.todo != null){
  dbTasks.find({ 'todoID': results.todo._id }, function(err, tasksResults){
      if(err){
       return err;
      }else{
       if (site.slice(0,8) =="painting"){
        console.log("Aufruf von painting" + results.painting);
        renderPainting(results,res,site,tasksResults);
       }else if(site.slice(0,11)=="composition"){
        console.log("Aufruf von composition");
        renderComposition(results,res,site,tasksResults);
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
   var routeArea = getRouteArea(area,site);
   console.log("routeArea:" + routeArea);
   //Datenbank für Verbesserungen an der Homepage generieren
   if(routeArea === 1){
    console.log("area: " +area);
    if (area =="composition"){
     newTodo = {
       'project':newTodo3DVisualization[0].project,
       'description':newTodo3DVisualization[0].description,
     };    
    }else if(area == "painting"){
      newTodo = {
       'project':newTodo3DVisualization[0].project,
       'description':newTodo3DVisualization[0].description,
     };
    }
   } 
   //Datenbank für Verbesserungen am Projekt generieren
    else if(routeArea === 2){
     if (area =="composition"){
     newTodo = {
       project:newTodo3DVisualProject[0].project,
       description:newTodo3DVisualProject[0].description,
       result: results.composition._id };   
    }else if(area == "painting"){
     console.log("results.painting._id" + results.painting._id);
     console.log("results.painting._id" + results.painting._id);
     newTodo = {
       'project':newTodo3DVisualProject[0].project,
       'description':newTodo3DVisualProject[0].description,
       'result': results.painting._id };
       console.log("newTodo" + newTodo);
    }
    
        //Datenbank für Verbesserungen am Projekt generieren
    }else if(routeArea === 3){
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
      console.log("site:"+site);
      if (area == "composition"){
       res.render(site,{
                 composition:results.composition,
                 tasks:{},
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine,
                 comments:results.comments,
                 blog:results.blog});
      }
      else if(area == "painting"){
       console.log("---------------------------------");
       //console.log("newEntry: " +newEntry._id);
       res.render(site,{
                 painting:results.painting,
                 tasks:[],
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine,
                 comments:results.comments,
                 blog:results.blog});

      }
      else{}
      //results.push({todo:newEntry});
      /*res.render(site,{
                 composition:results.magazine,
                 tasks:{},
                 todo:newEntry,
                 links:results.links,
                 magazine:results.magazine,
                 comments:results.comments,
                 blog:results.blog});
      return newEntry;*/
      //*********************************nötig?
      //res.render(site,results);
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
