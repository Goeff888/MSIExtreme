var mongoose =require("mongoose");

var tutorialsSchema = new mongoose.Schema({
  name: String,
  category:       {type: String, default: 'uncategorized'},
  url:          {type: String, default: 'n.a'},
});
module.exports = mongoose.model("tutorials", tutorialsSchema);