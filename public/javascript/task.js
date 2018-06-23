console.log("task.js wird jetzt ausgeführt");

//neuen Eintrag im Aufgabenbereich hinzufügen
function addTaskbyEnter(e){
  //console.log("Aufgabe hinzufügen");
  //this.focus();e.preventDefault();
   if (e.which === 13){
    //Enter-Event
        var todotext = $(this).val();
        var todoID = this.dataset.value;
        console.log(this.dataset.value);
        $(this).val("");
        //$("ul").append("<li>"+ todotext +"<input type='text' name='tasks[task]' value='" +todotext+"' hidden='true'></li>");
        $("ul").append("<li><input type='checkbox' class='form-check-input' id='exampleCheck1' >" + todotext +"<span class='iconRight' data-value=''><i class='fas fa-trash'></i></span>");         
                       
        sendText(todotext, todoID);
        //var addTaskForm = document.getElementById("addTaskForm");
        //addTaskForm.addEventListener("keypress", removeDefault);
   }
}
//Maus über TAsk (nur zum Test)
function showElements(e){
  console.log("Function: showElements");
  //document.getElementByClassName
}

function deleteTask(e){
  console.log("Funktion: deleteTask");
  console.log("this.data-value "+this.getAttribute("data-value"));
  var id = this.getAttribute("data-value");
  $.post("/task/" + id+  "?_method=DELETE" ,
  //$.post("/deleteTask/",
    {
        data: id   
    },
    function(daten, status){
      console.log("Callback");
      location.reload(true);
    });
}

//Funktion zum Durchstreichen des Textes und Ändern des Status
function setStatusReady(e){
  console.log("CheckBox Ausgewählt");
  var status;
  var ckID = this.getAttribute("id");
  var liID = "li" + ckID.slice(2, ckID.length-1);
  var liElement = document.getElementById(liID);
  console.log(liID);
  if (this.checked == true){
    //console.log("ausgewählt");
    status = "finished";
    console.log("this:"+ this.getAttribute("id"));
    liElement.style.textDecoration = "line-through";
    //liElement.style.text-decoration = "line-through",
    
  }else{
    console.log("leer");
    status = "open";
    console.log("this:"+ this.getAttribute("id"));
    liElement.style.textDecoration = "none";
  }
  console.log(status);
 /* $.post("/updateStatus/"+ id,
    {
        data: id   
    },
    function(daten, status){
      console.log("Callback");
      //location.reload(true);
    });*/
}

//Ausgabe des Keycodes/////
function retrievekeyCode(e){
  e = e || window.event;
  console.log( e.keyCode); 
}

function sendText(text,id){
    $.post("/saveTask",
    {
        task: text,
        todoID: id
    },
    function(data, status){
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log("Callback");
    });
}


//HOOVER über Listeneintrag
var tasks = document.getElementsByClassName("taskListItem");
console.log(tasks.length);
for (var i = 0; i < tasks.length; i++){
  tasks[i].addEventListener("mouseover", showElements);
}

//Delete Task Icon
var deleteBtns = document.getElementsByClassName("iconRight");
for (var j = 0; j < deleteBtns.length; j++){
  deleteBtns[j].addEventListener("mouseup",deleteTask);
}

//Listeneintrag mit enter hinzufügen
var addTask = document.getElementById("taskName");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
//var addTaskForm = document.getElementById("addTaskForm");
addTask.addEventListener("keypress", addTaskbyEnter);

//Check Box Status Tasks
var statusTask = document.getElementsByClassName("form-check-input");
for (var k = 0; k < statusTask.length;k++){
  statusTask[k].addEventListener("change", setStatusReady);
}

