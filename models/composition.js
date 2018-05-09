var mongoose =require("mongoose");

var compositionSchema = new mongoose.Schema({
  name:         String,
  image:        {type: String, default: 'n.a.'},
  description:  {type: String, default: 'n.a'},
  site:         String,
  comments:[{
              type: mongoose.Schema.Types.ObjectId,
              ref:"Comments"
            }]
});

module.exports = mongoose.model("Composition", compositionSchema);