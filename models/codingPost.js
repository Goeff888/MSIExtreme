var mongoose =require("mongoose");

var codingPostSchema = new mongoose.Schema({
  name:                   String,
  unitID:                 {type: mongoose.Schema.Types.ObjectId, ref:"CodingUnit"},
  content:                {type: String, default: 'n.a.'},
  picture:                {type: String, default: 'n.a.'},
  status:                 {type: String, default: 'neu'},
  created:                {type:Date, default: Date.now},
  updated:                {type:Date, default: Date.now}
});
module.exports = mongoose.model("CodingPost", codingPostSchema);