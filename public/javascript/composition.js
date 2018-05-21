console.log("Hallo vom Blender.js");

//Überprüfen, ob Formular korrekt ausgefüllt ist
var sendBtn = document.getElementById("sendBtn");
function chkFormular() {
  if (document.newFile.composition.image == "") {
    alert("Bitte Ihren Namen eingeben!");
    document.newFile.composition.image.focus();
    return false; //Verhindern, dass das Formular gesendet wird
  }
}


//neuen Eintrag erzeugen*****************************
//Funktionen:
function saveEntry(category){
  $.post("/saveCategory",
  {
      category: category,
  },
  function(data, status){
      //console.log("Data: " + data + "\nStatus: " + status);
      console.log("Callback");
  });
}
function addCategorybyEnter(e){
  console.log("Kategorie hinzufügen");
  //this.focus();e.preventDefault();
   if (e.which === 13){
    //Enter-Event
        var categoryText = $(this).val();
        //var todoID = document.getElementById("todoID").innerHTML;
        //console.log(todoID);
        $(this).val("");
        $("ul").append("<li>"+ categoryText +"<input type='text' name='tasks[ui]' value='" +categoryText+"' hidden='true'></li>");
        saveEntry(categoryText);
   }
}
//Kategorie
var addCategory = document.getElementById("newCategory");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll

addCategory.addEventListener("keypress", addCategorybyEnter);
//Tutorials