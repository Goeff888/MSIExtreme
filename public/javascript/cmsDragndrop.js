//Javascript für den Editor
console.log("editor Javascript mit Drag&Drop");
//Drag and Drop Funktionen///////////////////////////////////////
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

//############Textarea und Editor Funktionen#############
//Umschalten zwischen HTML und PLAIN
function switchView(){
  console.log("switchView");
  var status= document.getElementById("switchCode");
  var editor= document.getElementById("editor");
  var textarea= document.getElementById("clipped");
  editor.style.display = "none";
  textarea.style.visibility ="visible";
  //Prüfen ob Coder oder WYSIWG-Ansicht
  console.log(status.value);
  if(status.value ==="plain"){
    textarea.style.display = "none";
    status.value ="code";
    editor.style.display = "block";
    //textarea.style.visibility ="hidden";
    console.log(status.value);
  }else if(status.value ==="code"){
    editor.style.display = "none";
    textarea.style.display = "block";
    //textarea.style.visibility ="visible";
    status.value ="plain";
    console.log(status.value);
  }else{
    //undefinierter Zustand
     console.log(status.value);
  }
  
  
  //Inhalt kopieren
  
  
  //Bisheriger Code: FUnkioniert
}
////////////////////////Editor Funktionen/////////////////////////////////////////////
  var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
  var forePalette = $('.fore-palette');
  var backPalette = $('.back-palette');

  for (var i = 0; i < colorPalette.length; i++) {
    forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
    backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
  }

  $('.toolbar a').click(function(e) {
    var command = $(this).data('command');
    if (command == 'h1' || command == 'h2' || command == 'p') {
      document.execCommand('formatBlock', false, command);
    }
    if (command == 'forecolor' || command == 'backcolor') {
      document.execCommand($(this).data('command'), false, $(this).data('value'));
    }
    if (command == 'createlink' || command == 'insertimage') {
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand($(this).data('command'), false, url);
    } else document.execCommand($(this).data('command'), false, null);
    if(command =='switchCode'){
      switchView();
    }
  });
  
////////////////////////Editor Funktionen Ende/////////////////////////////////////////////
//////////////////////Event-Listener definieren/////////////////////////////
var dropzone = document.querySelectorAll(".btnDropzone");
var dragElement = document.querySelectorAll('.btnUnitName');

////////////////////DROPZONES//////////////
for (var i = 0;i < dropzone.length;i++){
  dropzone[i].addEventListener('dragover', handleDragOverZone, false);
  dropzone[i].addEventListener('dragleave', handleDragLeaveZone, false);
  dropzone[i].addEventListener('drop', handleDrop, false);
  //console.log(dropzone[i]);
}
console.log();
////////////////////DRAGELEMENTE//////////////
for (var i = 0;i < dragElement.length;i++){
  dragElement[i].addEventListener('dragstart', handleDragStart, false);
  dragElement[i].addEventListener('dragend', handleDragStop, false);
  //dragElement[i].addEventListener('drop', handleDrop, false);
  //console.log(dragElement[i]);
}
////////////////////EDITORTOOLBAR//////////////
//CodeButton
//var switchView = document.getElementById("switchCode");
//switchView.addEventListener("click",switchView);


