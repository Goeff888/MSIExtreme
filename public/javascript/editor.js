
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
  });
  
////////////////////////Editor Funktionen Ende/////////////////////////////////////////////

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
      }
    /*for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }*/
   
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
  var dropZone = document.getElementById('dropzone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  dropZone.addEventListener('dragleave', handleDragLeave, false);
  dropZone.addEventListener('dragenter', handleDragEnter, false);
////////////////////////Drag and Drop Funktionen Ende/////////////////////////////////////////////

function setURL(url){
  var apEdit ="/edit";
 // console.log(url);
  if (url !== "/homepage/new"){ //String vergleichen zum Ausgrauen des Buttons
    var editCodingPost = url.slice(0,url.length - apEdit.length) +"?_method=PUT";
    document.querySelector('#savePost').disabled =false;
    document.querySelector("#formContent").action=editCodingPost;
    //console.log(editCodingPost);
    //console.log(url);
    //console.log(url.length-apEdit.lenth);
  }
  //console.log(url);
//str.split([separator[, limit]])
}


function openCollapses(url){

 // console.log("Hallo2kh");

}

//############Umschalten zwischen HTML und PLAIN#############


$('#switchCode').click(function(e){
  //Prüfen ob Coder oder WYSIWG-Ansicht
  
  //textarea (de-)aktiveren
  
  //contenteditable (de-)aktiveren
  
  //Inhalt kopieren
  
  
  //Bisheriger Code: FUnkioniert
  /*var status = document.querySelector('#switchCode').name;
  var originHTML = document.querySelector('#editor').textContent;
  var originText = document.querySelector('#editor').innerHTML;
  if (status === "Browser"){
    document.querySelector('#switchCode').name = "Code";
    document.getElementById('switchCode').firstChild.data = "Code";
    document.querySelector('#editor').textContent = document.querySelector('#editor').innerHTML;
    console.log("Status1: " + status);
    console.log(originHTML);
  }else if(status === "Code"){
    document.querySelector('#switchCode').name = "Browser";
    document.getElementById('switchCode').firstChild.data = "Browser";
    document.querySelector('#editor').innerHTML = document.querySelector('#editor').textContent;
    console.log(originText);
    console.log("Status2: " + status);    
  }else{
    document.querySelector('#switchCode').name = "Browser";
    console.log("StatusErr: " + status);   
  }*/
});

function validateForm(){
  if (status === "Browser"){
    document.querySelector('#clipped').innerHTML = document.querySelector('#editor').textContent;
   //console.log("Hallo");
  }else{
    //document.getElementById('editor').addEventListener("change", function(){
    document.querySelector('#clipped').innerHTML = document.querySelector('#editor').innerHTML;

  }
}

function showContent(content){
  document.querySelector('#clipped').textContent = content;
  document.querySelector("#editor").append(content);
  console.log("dbContent.content: " + content );
}

$('#formContent').click(function(e){
  validateForm();
  
  });


