console.log("taskGeneral.js wird jetzt ausgeführt");

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

function addLink(e){
  console.log("Funktion: addLink");
  //Hier Daten zum Hinzufügen eines Links senden
    //var button = $(event.relatedTarget); // Button that triggered the modal
    //var taskId = button.data('taskId');
    var taskId = document.getElementById('taskID').value;
    console.log("TaskID in addLink:"+taskId);
    console.log(document.getElementById("taskLink").value);
    $.post("/addlink/" + taskId ,
    {
        link: document.getElementById("taskLink").value
        
    },
    function(daten, status){
      console.log("Callback");
      location.reload(true);
    });

}

function deleteTask(e){
  console.log("Funktion: deleteTask");
  console.log("this.data-value "+this.getAttribute("data-value"));
  var id = this.getAttribute("data-value");
  $.post("/task/" + id+  "?_method=DELETE" ,
  //$.post("/deleteTask/",
    {
        todoSubtask: taskLink,
        todoId: id   
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

//Öffnen des Task-Modal
$('#editTaskModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var taskId = button.data('id');
    console.log("Aufruf von Darstellung des Modals von Task (ID):"+ taskId);
    $.get("/readTaskData/" + taskId ,
    function(data){
        console.log("data:"+data.task);
        var modal = $(this);
        document.getElementById("modalTaskTitle").value=data.task;
        //console.log("ID des Tasks:"+data._id);
        document.getElementById("taskID").value=data._id;
        //document.getElementById("taskID").value=taskId;
        //$('#addTodoLink').data('taskID',taskId);//hier id des task setzen
        console.log("modal:"+document.getElementById("formEditTask").action);
    });  
});

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
        console.log("Callback:"+data);
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
var addTask = document.getElementById("todo");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
//var addTaskForm = document.getElementById("addTaskForm");
addTask.addEventListener("keypress", addTaskbyEnter);

//Check Box Status Tasks
var statusTask = document.getElementsByClassName("form-check-input");
for (var k = 0; k < statusTask.length;k++){
  statusTask[k].addEventListener("change", setStatusReady);
}

