var mongoose =require("mongoose");

var linksSchema = new mongoose.Schema({
  name:           String,
  category:       {type: String, default: 'uncategorized'},//Tutorial, Blueprints/Vorlagen, Arbeitsmaterialien,Einkaufsliste, Interessant 
  url:            {type: String, default: 'n.a'}, //lokalen Pfad definieren offen
  content:        {type: String, default: 'n.a'}, //wird durch die Anwendung gesetzt: definiert Zugehörigkeit zu einem CMS Bereich
  format:         {type: String, default: 'not set'}, //pdf, video,arbeitsdateien
  status:         {type: String, default: 'not set'},//open,in progress, finished, retry
  workfield:      {type: String, default: 'not set'} // Composing, Lighting, Charakter, Animation,...
});
module.exports = mongoose.model("links", linksSchema);