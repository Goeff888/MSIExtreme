var mongoose =require("mongoose");

var cmsPostSchema = new mongoose.Schema({
  name:         String,
  content:      {type: String, default: 'Geben Sie hier den Text ein'},
  order:        Number,
  children:     [],
  cmsUnitID:       {type: mongoose.Schema.Types.ObjectId, ref:"cmsUnit"},
  created:      Date,
  updated:      Date
});

module.exports = mongoose.model("cmsUnit", cmsUnitSchema);