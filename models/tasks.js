var mongoose =require("mongoose");

var tasksSchema = new mongoose.Schema({
  task:       String,
  order:      Number,
  todoID:       {type: mongoose.Schema.Types.ObjectId, ref:"todo"},
  description:  {type: String, default: 'n.a.'},
  status:       {type: String, default: 'open'},
  links:        Array,
  created:      {type:Date, default: Date.now},
  deadline:     {type:Date, default: Date.now}
});

module.exports = mongoose.model("tasks", tasksSchema);