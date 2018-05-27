var mongoose =require("mongoose");

var tutorialsSchema = new mongoose.Schema({
  name: String,
  category:       {type: String, default: 'uncategorized'},//Kurs, Tutorial, Projekt, Notiz
  url:          {type: String, default: 'n.a'},
  format:         {type: String, default: 'not set'} //pdf, video,textur, objekte 
});
module.exports = mongoose.model("tutorials", tutorialsSchema);