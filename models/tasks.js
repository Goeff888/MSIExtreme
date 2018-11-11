var mongoose =require("mongoose");

var tasksSchema = new mongoose.Schema({
  task:       String,
  order:      Number,
  todoID:       {type: mongoose.Schema.Types.ObjectId, ref:"todo"},
  description:  {type: String, default: 'n.a.'},
  status:       {type: Number, default: 0}, //1 = open, 5 = in progress, 9= closed
  links:        Array,
  subTasks:        Array,
  created:      {type:Date, default: Date.now},
  deadline:     {type:Date, default: Date.now}
});

module.exports = mongoose.model("tasks", tasksSchema);