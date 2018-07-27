var mongoose =require("mongoose");
//Alle lokalen pdfs und Dokumente (word, ppt und tbd)
var booksSchema = new mongoose.Schema({
  name:           String,
  description:    {type: String, default: 'About...'},
  format:         {type: String, default: 'not set'}, //pdf, ...
  content:        {type: String, default: 'not set'},//wird automatisch gesetzt
  category:       {type: String, default: 'not set'} // Digitale Kunst, 3D, Composing, Lighting, Charakter, Animation,...
});
module.exports = mongoose.model("books", booksSchema);