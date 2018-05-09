var mongoose =require("mongoose");

var cmsSchema = new mongoose.Schema({
  name:         String,
  image:        {type: String, default: 'n.a.'},
  description:  {type: String, default: 'n.a'},
  order:        Number,
  children:     [],
  site:         String,
  created:      Date
});

module.exports = mongoose.model("CMS", cmsSchema);