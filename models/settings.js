var mongoose =require("mongoose");
var unitSchema = new mongoose.Schema({
  description:  String, 
  content:      String,
  created:      {type:Date, default: Date.now}
});
var settingsSchema = new mongoose.Schema({
  description:  {type: String, default: 'n.a'},
  content:      [{type: String, default: 'n.a'}], //zum (automatischen) Speichern der jeweiliegn Seite
  values:       Array,
  unit:         [unitSchema]
});

module.exports = mongoose.model("settings", settingsSchema);