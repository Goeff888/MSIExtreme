var mongoose =require("mongoose");

var categorySchema = new mongoose.Schema({
  category:     {type: String, default: 'n.a.'},
  icon:         {type: String, default: 'n.a.'},
  description:  {type: String, default: 'n.a'},
  compositionIDs:Array,
  
  /*[{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"compositions"
            }]*/
});

module.exports = mongoose.model("category", categorySchema);