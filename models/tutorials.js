var mongoose =require("mongoose");

var tutorialsSchema = new mongoose.Schema({
  name: String,
  category:       {type: String, default: 'uncategorized'},//Kurs, Tutorial, Projekt, textur, objekte
  url:          {type: String, default: 'n.a'},
  format:         {type: String, default: 'not set'}, //pdf, video,
  workfield:      {type: String, default: 'not set'} // Digitale Kunst, 3D, Composing, Lighting, Charakter, Animation,...
});
module.exports = mongoose.model("tutorials", tutorialsSchema);