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
var corelSchema = new mongoose.Schema({
  name:         String,
  image:        {type: String, default: '/images/winkenderPanda.jpg'},
  description:  {type: String, default: 'n.a'},
  rating:       Number,
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  history:      [historySchema],//alt.alle Bilder werden hier geladen, der Array hat immer eine feste Reihenfolge lt Manual
  templates:    [templateSchema]
});

module.exports = mongoose.model("Corel", corelSchema);