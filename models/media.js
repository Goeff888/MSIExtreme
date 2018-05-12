var mongoose =require("mongoose");

var mediaSchema = new mongoose.Schema({
  name:         String,
  url:          {type: String, default: 'n.a.'},
  description:  {type: String, default: 'n.a'},
  type:         String,
});

module.exports = mongoose.model("media", mediaSchema);