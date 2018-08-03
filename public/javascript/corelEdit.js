console.log("Hallo vom Corel.js");
//Drag n Drop*****************************
//File Dialog mit Klick auf Dropzone öffnen
function openFileDialog(e){
  console.log("Dateidialog öffnen");
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
   var file = e.dataTransfer.items[0].getAsFile();
  //console.log("File:" + e.dataTransfer.files[0].path);
  console.log("Item:" + file);
  console.log("Abgelegt");
}
//Formulareinträge prüfen*****************************

//Überprüfen, ob "neues Template" korrekt ausgefüllt ist
function chkFormular() {
  if (document.getElementsByName("templateDescription")[0].value == "") {
    alert("Bitte eine Beschreibung eingeben!");
    event.preventDefault();
  }else if(document.getElementsByName("templateFile")[0].value == ""){
    alert("Bitte eine Datei auswählen!!");
    event.preventDefault();    
  }
  //return false;
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







