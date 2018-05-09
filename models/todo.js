var mongoose =require("mongoose");

var todoSchema = new mongoose.Schema({
  project:       String,
  description:  String,
  tasks:        {type: String, default: 'n.a.'},
  result:       String,
  order:        Number,
  created:      {type:Date, default: Date.now},
  deadline:     {type:Date, default: Date.now}
});
module.exports = mongoose.model("todo", todoSchema);