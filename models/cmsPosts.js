var mongoose = require("mongoose");

var cmsPostsSchema = new mongoose.Schema({
  name:         String,
  content:      {type: String, default: 'Geben Sie hier den Text ein'},
  order:        Number,
  cmsUnitID:       {type: mongoose.Schema.Types.ObjectId, ref:"cmsUnit"},
  created:      Date,
  updated:      Date
});

module.exports = mongoose.model("cmsPosts", cmsPostsSchema);