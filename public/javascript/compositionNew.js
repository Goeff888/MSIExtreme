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

//Setzen des ausgewählten Dateinamen in der Seite
function showSelectedImage(){
  console.log("Funktion Bild anzeigen");
  console.log("ID:"+ this.getAttribute("id"));
  var fileText;
  if(this.getAttribute("id")==="newPicLoader"){
   fileText=document.getElementById("fileText");
  }else if(this.getAttribute("id")==="templateLoader"){
   fileText=document.getElementById("fileTextTemplate");
  }else{
   console.log("Fehler beim Auswerten der ID desFileDialogs!");
  }
  //var fileText = document.getElementById("fileText");  
  //var file = document.getElementById("newPicLoader").files[0];
  var file = this.files[0];
  console.log("Datei:" + file.name);
  //bgrd.classList.remove('renderDropzone');
  fileText.innerHTML = file.name;
  fileText.style.fontSize = "xx-large";
  //Bild auf der Seite anzeigen
}


//Formulareinträge prüfen*****************************
//Überprüfen, ob "neues Bild" korrekt ausgefüllt ist
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

//Überprüfen, ob "neues Tutorial" korrekt ausgefüllt
function chkModal() {
  console.log(document.getElementsByName("tutorial")[0].value);
  event.preventDefault();
  if (document.getElementsByName("renderedImage")[0].value == "") {
    alert("Bitte ein Bild auswählen!");
    event.preventDefault();
  }else if(document.getElementsByName("name")[0].value == ""){
    alert("Bitte einen Namen eingeben!");
    event.preventDefault();    
  }else if(document.getElementsByName("name")[0].value == ""){
    alert("Bitte einen Namen eingeben!");
    event.preventDefault(); 
  }else if(document.getElementsByName("name")[0].value == ""){
    alert("Bitte einen Namen eingeben!");
    event.preventDefault(); 
  //return false;
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
var fileDialog = document.getElementById("newPicLoader");
fileDialog.addEventListener('change', showSelectedImage);

var fileTemplateDialog = document.getElementById("templateLoader");
fileTemplateDialog.addEventListener('change', showSelectedImage);
//Button Bild löschen
//Views: Index, Edit
/*var deleteBtn = document.getElementById("btnDelete");
deleteBtn.addEventListener("click", verifyDelete);

var bookNavigation = document.getElementById("saveBook");*/

