var mongoose = require("mongoose");

var blogsSchema = new mongoose.Schema({
  titel:         String,
  description:      {type: String, default: 'Geben Sie hier den Text ein'},
  category:      {type: String, default: 'Wählen Sie hier die Kategorie aus'},
  area:         {type: String, default: 'Bereich sollte automatisch gesetzt werden'},
  content:         {type: String, default: 'Fangen Sie hier mit dem Schreiben an'},
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  status:      {type:String, default: "neu"},
});

module.exports = mongoose.model("blogs", blogsSchema);