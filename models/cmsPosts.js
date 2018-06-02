var mongoose = require("mongoose");

var cmsPostsSchema = new mongoose.Schema({
  name:         String,
  content:      {type: String, default: 'Geben Sie hier den Text ein'},
  order:        Number,
  cmsUnitID:       {type: mongoose.Schema.Types.ObjectId, ref:"cmsUnit"},
  created:      {type:Date, default: Date.now},
  updated:      {type:Date, default: Date.now},
  status:      {type:String, default: "neu"},
});

module.exports = mongoose.model("cmsPosts", cmsPostsSchema);