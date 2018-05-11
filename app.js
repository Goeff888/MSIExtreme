//////VARIABLES////////
var bodyParser = require("body-parser"); //Request Data from Form in HTML-Body
var methodOverride = require("method-override");
var express = require ("express");
var mongoose = require("mongoose");
var todoRoutes = require("./routes/todoRoutes");
var taskRoutes = require("./routes/taskRoutes");
var cmsRoutes = require("./routes/cmsRoutes");
var cmsUnitRoutes = require("./routes/cmsUnitRoutes");
var cmsPostRoutes = require("./routes/cmsPostsRoutes");
//////MONGO-DATABASE-SCHEMES////////

var app = express();
//////APP INIT////////
//promise.promisifyAll(mongoose);
mongoose.connect("mongodb://localhost/homepage");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));
//app.use(fileUpload());    

//##########################
//////RESTFUL ROUTES////////
//##########################
app.use(taskRoutes);
app.use(todoRoutes);
app.use(cmsRoutes);
app.use(cmsUnitRoutes);
app.use(cmsPostRoutes);
//LANDING PAGE
app.get("/", function(req, res){
 res.render ("index");
});
//Anzeige der Fehlerseite
app.get("/error", function(req, res){
  res.render ("error");
});



app.listen(8888,"127.0.0.1", function(){
        console.log( "Yoga-Server ist gestartet");
});



