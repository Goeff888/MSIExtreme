var mongoose =require("mongoose");

var compositionSchema = new mongoose.Schema({
  name:         String,
  image:        {type: String, default: '/images/compositions/winkenderPanda.jpg'},
  description:  {type: String, default: 'n.a'},
  rating:       Number,
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
});

module.exports = mongoose.model("Composition", compositionSchema);