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
var paintingRoutes = require ("./routes/paintingRoutes");
var paintingAjaxRoutes = require ("./routes/paintingAjaxRoutes");
var linkRoutes = require ("./routes/linkRoutes");
var commentRoutes = require ("./routes/commentRoutes");
var mediaRoutes = require ("./routes/mediaRoutes");
var pythonRoutes = require ("./routes/pythonRoutes");
var todoRoutes = require("./routes/todoRoutes");
var taskRoutes = require("./routes/taskRoutes");
var todoAjaxRoutes = require("./routes/todoAjaxRoutes");
var blogRoutes = require("./routes/blogRoutes");
var blogAjax = require("./routes/blogAjax");
//var dbHandler = require("./dbHandler");
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
app.use(paintingRoutes);
app.use(paintingAjaxRoutes);
app.use(cmsAjaxRoutes);
app.use(pythonRoutes);
app.use(todoRoutes);
app.use(taskRoutes);
app.use(todoAjaxRoutes);
app.use(blogRoutes);
app.use(blogAjax);
//LANDING PAGE
app.get("/", function(req, res){
 res.render ("index2");
});
//Anzeige der Fehlerseite
app.get("/error", function(req, res){
  res.render ("error");
});



app.listen(8888,"127.0.0.1", function(){
        console.log( "Yoga-Server ist gestartet");
});
