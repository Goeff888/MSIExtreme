var mongoose =require("mongoose");
var historySchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  created:      {type:Date, default: Date.now}
});
var templateSchema = new mongoose.Schema({
  description:  String, 
  image:        String,
  created:      {type:Date, default: Date.now}
});
var paintingSchema = new mongoose.Schema({
  name:         String,
  image:        String,
  description:  {type: String, default: 'n.a'},
  rating:       Number,
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  history:      [historySchema],//alt.alle Bilder werden hier geladen, der Array hat immer eine feste Reihenfolge lt Manual
  templates:    [templateSchema]
});

module.exports = mongoose.model("Painting", paintingSchema);