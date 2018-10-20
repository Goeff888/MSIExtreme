//////VARIABLES////////
var bodyParser = require("body-parser"); //Request Data from Form in HTML-Body
var methodOverride = require("method-override");
var express = require ("express");
var mongoose = require("mongoose");

var bookRoutes = require("./routes/bookRoutes");
var cmsRoutes = require("./routes/cmsRoutes");
var cmsAjaxRoutes = require ("./routes/cmsAjaxRoutes");
var cmsUnitRoutes = require("./routes/cmsUnitRoutes");//?
var cmsPostRoutes = require("./routes/cmsPostsRoutes");//?
var compositionRoutes = require ("./routes/compositionRoutes");
var corelRoutes = require ("./routes/corelRoutes");
var corelAjaxRoutes = require ("./routes/corelAjaxRoutes");
var linkRoutes = require ("./routes/linkRoutes");
var commentRoutes = require ("./routes/commentRoutes");
var mediaRoutes = require ("./routes/mediaRoutes");
var pythonRoutes = require ("./routes/pythonRoutes");
var todoRoutes = require("./routes/todoRoutes");
var taskRoutes = require("./routes/taskRoutes");
var todoAjaxRoutes = require("./routes/todoAjaxRoutes");
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
app.use(bookRoutes);
app.use(cmsRoutes);
app.use(cmsUnitRoutes);
app.use(cmsPostRoutes);
app.use(compositionRoutes);
app.use(commentRoutes);
app.use(linkRoutes);
app.use(mediaRoutes);
app.use(corelRoutes);
app.use(corelAjaxRoutes);
app.use(cmsAjaxRoutes);
app.use(pythonRoutes);
app.use(todoRoutes);
app.use(taskRoutes);
app.use(todoAjaxRoutes);
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



