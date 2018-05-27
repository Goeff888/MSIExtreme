var mongoose =require("mongoose");

var commentsSchema = new mongoose.Schema({
  comment:       String,
  author:        {type: String, default: 'uncategorized'},
  date:          {type:Date, default: Date.now},
  compositionID: {type: mongoose.Schema.Types.ObjectId, ref:"comments"}
});
module.exports = mongoose.model("comments", commentsSchema);