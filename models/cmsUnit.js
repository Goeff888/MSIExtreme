var mongoose =require("mongoose");

var cmsUnitSchema = new mongoose.Schema({
  name:         String,
  description:  {type: String, default: 'n.a'},
  order:        Number,
  children:     [],
  cmsID:       {type: mongoose.Schema.Types.ObjectId, ref:"cms"},
  created:      Date
});

module.exports = mongoose.model("cmsUnit", cmsUnitSchema);