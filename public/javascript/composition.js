 console.log("Hallo vom composition.js");
//Drag n Drop*****************************
//File Dialog mit Klick auf Dropzone öffnen

function setModals(){
  event.preventDefault(); 
  var bookNavigation = document.getElementById("bookNavigation");
  bookNavigation.value = "Hallo";
  console.log("setModals:" +window.location);
  
}

function openFileDialog(e){
  console.log("Dateidialog öffnen");
}

//Überprüfen, ob "Bild löschen" korrekt ausgefüllt ist
function verifyDelete() {
  alert("Wollen Sie das Bild wirklich löschen?");
  var txt;
  var r = confirm("Press a button!");
  if (r == true) {
      txt = "You pressed OK!";
  } else {
      txt = "You pressed Cancel!";
  }
    //return false;
  
}



/////////////////EVENT LISTENER

//Dropzone für Bilder
var dropzone = document.getElementById("renderDropzone");
dropzone.addEventListener("click", openNewPicDialog);
dropzone.addEventListener("dragover", handleDragOverZone);
dropzone.addEventListener('dragleave', handleDragLeaveZone, false);
dropzone.addEventListener('drop', handleDrop, false);
//Dropzone für Templates
var templateDropZone = document.getElementById("dropZoneTemplate");
templateDropZone.addEventListener("click", openTemplateDialog);

//Datei öffnen Dialog
//Views: New, Edit
function openNewPicDialog() {
    $("#newPicLoader").click();
    console.log("Funktion Open New Pic Dialog");    
}
function openTemplateDialog() {
    $("#templateLoader").click();
    console.log("Funktion Open Template Dialog");    
}

//Formular prüfen
document.getElementById('newForm').onsubmit = function (evt) { 	
   let input = document.getElementById('name').value;
   if (input.length < 1) {
     console.log('»Name« bitte ausfüllen');
      evt.preventDefault();
   }else if((document.getElementsByName("renderedImage")[0].value == "") && (document.getElementsByName("templateImage")[0].value == "")){
    alert("Bitte ein Bild eingeben!");
    event.preventDefault();    
  } 
};

var fileDialog = document.getElementById("newPicLoader");
fileDialog.addEventListener('change', showSelectedImage);

var fileTemplateDialog = document.getElementById("templateLoader");
fileTemplateDialog.addEventListener('change', showSelectedImage);
//Button Bild löschen
//Views: Index, Edit
/*var deleteBtn = document.getElementById("btnDelete");
deleteBtn.addEventListener("click", verifyDelete);

var bookNavigation = document.getElementById("saveBook");*/

