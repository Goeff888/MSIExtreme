var mongoose =require("mongoose");

var compositionSchema = new mongoose.Schema({
  name:         String,
  image:        {type: String, default: '/images/compositions/winkenderPanda.jpg'},
  description:  {type: String, default: 'n.a'},
  comments:[{
              type: mongoose.Schema.Types.ObjectId,
              ref:"comments"
            }]
});

module.exports = mongoose.model("Composition", compositionSchema);