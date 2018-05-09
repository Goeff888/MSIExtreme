function handleDragStart(e){
  e.stopPropagation();
  //e.preventDefault();
  e.dataTransfer.setData("text",e.target.id);
  this.style.opacity ='0.2';
  console.log("Ziehen");
}

function handleDragStop(e){
  this.style.opacity ='1';
  console.log("Loslassen");
}


function handleDragOverZone(e){
  //e.stopPropagation();
  e.preventDefault();
  //e.style.opacity ='0.7'; 
  this.classList.remove('dropzone');
  this.classList.add('dropzoneOver');
  console.log("Über Dropzone gezogen");
}

function handleDragLeaveZone(e){
  e.preventDefault();
  this.classList.remove('dropzoneOver');
  this.classList.add('dropzone');
  console.log("von Dropzone weggezogen");
}

function handleDrop(e){
  e.preventDefault();
 // e.dataTransfer.effectAllowed ='move';
  //this.classList.remove('dropzoneOver');
  this.classList.add('droppedZone');
  console.log(e.target);
  console.log("daten in e:" + e.dataTransfer.getData("text"));
  //e.target.appendChild("HAllo");
  //this.innerHTML = e.dataTransfer.getData('text');
  this.style.background="white";
  //this.style.background-image=e.dataTransfer.getData('text');
  console.log("Abgelegt");
}

var dropzone = document.getElementsByClassName("dropzone");
var cols = document.querySelectorAll('#columns .column');

dropzone[0].addEventListener('dragover', handleDragOverZone, false);
dropzone[0].addEventListener('dragleave', handleDragLeaveZone, false);
dropzone[0].addEventListener('drop', handleDrop, false);

cols.forEach(function(element){
  element.addEventListener('dragstart', handleDragStart, false);
  element.addEventListener('dragend', handleDragStop, false);
  element.addEventListener('drop', handleDrop, false);
 /* element.addEventListener('drop', handleFileSelect, false);
  
  element.addEventListener('dragenter', handleDragEnter, false);
  */
});


/*
/////////////////////Drag and Drop Funktionen /////////////////////////////////////////////
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    
    // files is a FileList of File objects. List some properties.
    //var output = files[0].name;
    //console.log(files[0]);
    document.getElementById('uploadPic').name=files[0];
    for(var i = 0; i < files.length;i++){
      if (i == 0){ 
        document.getElementById('dropzone').innerHTML = "<p>"+files[i].name +"</p>";
      }else{
        document.getElementById('dropzone').innerHTML += "<p>"+files[i].name +"</p>";
      }
      //console.log(files[i].name);
      }
    /*for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }*/
/*   
  }

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('dragOver'); 
  console.log(this);
}

function handleDragLeave(e) {
  this.classList.remove('dragOver');  // this / e.target is previous target element.
  console.log("leave");
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  /*var dropZone = document.getElementById('dropzone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  dropZone.addEventListener('dragleave', handleDragLeave, false);
  dropZone.addEventListener('dragenter', handleDragEnter, false);*/
////////////////////////Drag and Drop Funktionen Ende/////////////////////////////////////////////

