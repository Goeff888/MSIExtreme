console.log("Hallo vom Blender.js");
//Drag n Drop*****************************
//File Dialog mit Klick auf Dropzone öffnen
function openFileDialog(e){
  console.log("Dateidialog öffnen");
}

function showSelectedImage(){
  console.log("Funktion Bild anzeigen");
  var file = document.getElementById("fileLoader");
  console.log("Datei:" + file.name);
  //Bild auf der Seite anzeigen
}

function handleDragOverZone(e){
  //e.stopPropagation();
  e.preventDefault();
  //e.style.opacity ='0.7'; 
  this.classList.remove('renderDropzone');
  this.classList.add('renderDropzoneOver');
  console.log("Über Dropzone gezogen");
}


function handleDragLeaveZone(e){
  e.preventDefault();
  this.classList.remove('renderDropzoneOver');
  this.classList.add('renderDropzone');
  console.log("von Dropzone weggezogen");
}

function handleDrop(e){
  e.preventDefault();
 // e.dataTransfer.effectAllowed ='move';
  //this.classList.remove('dropzoneOver');
  this.classList.add('renderDropzoneOverDrop');
  console.log(e.target);
  console.log("daten in e:" + e.dataTransfer.getData("text"));
  //e.target.appendChild("HAllo");
  //this.innerHTML = e.dataTransfer.getData('text');
  this.style.background="white";
  //this.style.background-image=e.dataTransfer.getData('text');
  console.log("Abgelegt");
}
//Formulareinträge prüfen*****************************
//Überprüfen, ob Formular korrekt ausgefüllt ist

function chkFormular() {
  if (document.getElementsByName("renderedImage")[0].value == "") {
    alert("Bitte ein Bild auswählen!");
    event.preventDefault();
  }else if(document.getElementsByName("name")[0].value == ""){
    alert("Bitte einen Namen eingeben!");
    event.preventDefault();    
  }
  //return false;
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
/////////////////EVENT LISTENER
//Speichern Button
var sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", chkFormular);
//Kategorie
var addCategory = document.getElementById("newCategory");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
addCategory.addEventListener("keypress", addCategorybyEnter);
//Tutorials

//Dropzone 
var dropzone = document.getElementById("renderDropzone");
dropzone.addEventListener("click", openfileDialog);
dropzone.addEventListener("dragover", handleDragOverZone);
dropzone.addEventListener('dragleave', handleDragLeaveZone, false);
dropzone.addEventListener('drop', handleDrop, false);

//Datei öffnen Dialog
function openfileDialog() {
    $("#fileLoader").click();
}
var fileDialog = document.getElementById("fileLoader");
fileDialog.addEventListener('change', showSelectedImage);