function handleDragStart(e){
  var hiddenElements = document.querySelectorAll('.btnDropzone');
  e.stopPropagation();
//Drag and Drop Element Style ändern
  this.style.opacity ='0.6';
//unsichtbare Elemente zeigen
  for (var j = 0; j < hiddenElements.length; j++){
    hiddenElements[j].classList.add('btnDropzoneVisible');
    hiddenElements[j].classList.remove('btnDropzone');
  }
  //console.log("Text im gezogenen Element");
  console.log("Event:Ziehen");
}

function handleDragStop(e){
  var hiddenElements = document.querySelectorAll('.btnDropzoneVisible');
//Drag and Drop Element Style zurücksetzen
  this.style.opacity ='1';
//unsichtbare Elemente wieder verbergen
  for (var j = 0; j < hiddenElements.length; j++){
    hiddenElements[j].classList.add('btnDropzone');
    hiddenElements[j].classList.remove('btnDropzoneVisible');
  }
  console.log("Event: Ziehen Ende");
}


function handleDragOverZone(e){
  e.preventDefault();
  e.stopPropagation();
//gehovertes Element hervorheben
  this.style.border = "2px solid black";
  //console.log("Nummer der Dropzone in der Liste");
  console.log("Event:In die Dropzone gezogen");
}

function handleDragLeaveZone(e){
  e.preventDefault();
  e.stopPropagation();
//gehovertes Element wieder zurücksetzen
  this.style.border = "1px dotted black";
  console.log("Event: aus der Dropzone gezogen");
}

function handleDrop(e){
  //e.preventDefault();
 // e.dataTransfer.effectAllowed ='move';
  //console.log("Nummer der Dropzone in der Liste");
  //console.log("Text im gezogenen Element");
  console.log("Event:in die Dropzone abgelegt");
}

//////////////////////Event-Listener definieren/////////////////////////////
var dropzone = document.querySelectorAll(".btnDropzone");
var dragElement = document.querySelectorAll('.btnUnitName');

////////////////////DROPZONES//////////////
for (var i = 0;i < dropzone.length;i++){
  dropzone[i].addEventListener('dragover', handleDragOverZone, false);
  dropzone[i].addEventListener('dragleave', handleDragLeaveZone, false);
  dropzone[i].addEventListener('drop', handleDrop, false);
  console.log(dropzone[i]);
}
console.log();
////////////////////DRAGELEMENTE//////////////
for (var i = 0;i < dragElement.length;i++){
  dragElement[i].addEventListener('dragstart', handleDragStart, false);
  dragElement[i].addEventListener('dragend', handleDragStop, false);
  //dragElement[i].addEventListener('drop', handleDrop, false);
  console.log(dragElement[i]);
}



