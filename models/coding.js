var mongoose =require("mongoose");

var codingSchema = new mongoose.Schema({
  section:     String,
  description:  {type: String, default: 'n.a.'},
  picture:      {type: String, default: 'n.a.'},
  contentID:    {type: mongoose.Schema.Types.ObjectId, ref: "Content"}
});
module.exports = mongoose.model("Coding", codingSchema);