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

function addTaskbyEnter(e){
   if (e.which === 13){//Enter-Event
        var name = document.getElementById("pictureName").value;
        var corelID = this.dataset.value;
        var todoID = document.getElementById("todoList").dataset.value;
        var todotext = $(this).val();
        console.log(document.getElementById("todoList").dataset.value);
        if (!document.getElementById("todoList").dataset.value){
          console.log("Todo nicht vorhanden");
          createTodo(name, corelID,todotext);
        }else{
          sendText(todoID,todotext);
          console.log("fertig" ); 
        }
   }
}

function handleDragLeaveZone(e){
  e.preventDefault();
  this.classList.remove('renderDropzoneOver');
  this.classList.add('renderDropzone');
  console.log("von Dropzone weggezogen");
}

function handleDrop(e){
  e.preventDefault();

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


/////////////////AJAX Aufrufe
function createTodo(name,id,text){
    console.log("Javascript createTodo ID des Bildes: " +id);
    //console.log("Javascript createTodo neuer Task: " +text);
    //console.log("Javascript createTodo Bildname für Todo: " +name);
    $.post("/createTodo",
    {
        project: name,//Hier Werte aus task model festlegen
        description: "Dies ist eine Todo-Liste aus der Corel Seite",
        result:id
    },
    function(data){
        console.log("Datenbank erzeugt");
        sendText(data,text);
    });
}

function sendText(id,text){
    console.log("Javascript sendText: " +id);
    //console.log("Javascript sendText ID des Bildes: " +id);
    //console.log("Javascript sendText neuer Task: " +text);
    $.post("/createTask",
    {
        task: text,
        todoID:id
    },
    function(data){
        console.log("neuer Task angelegt");
        //console.log("Data: " + data);
        $("ul#todoList").append(
"<li><input type='checkbox' class='form-check-input' id='corelTask' >" + text +
"<button type='button' class='btn btnEditTask' data-toggle='modal' data-target='#editTaskModal'><i class='fa fa-edit editTask'></i></button>");
        //console.log("Callback");
    });
}

function changeTaskStatus(){
  console.log("ID:" + this.checked);
  console.log("ID:" + this.dataset.id);
  $.post("/changeStatus/"+this.dataset.id ,
    {
        status: this.checked,
    },
    function(data){
      if (this.checked === true){
       console.log("Task offen:" +data);
       //Hier Text durchstreichen
      }else{
        console.log("Task erledigt"); 
      }
    });
  

}
/////////////////EVENT LISTENER
var todoInput = document.getElementById("todo");
todoInput.addEventListener("keypress",addTaskbyEnter);

//Öffnen des Task-Modal
$('#editTaskModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var taskId = button.data('id');
     console.log("Aufruf von readTaskData");
    $.get("/readTaskData/" +taskId ,
    function(data){
        console.log("data:"+data.task);
        var modal = $(this);
        document.getElementById("modalTaskTitle").value=data.task;
        //document.getElementById("formEditTask").action="saveTaskData/"+data._id;
        console.log("modal:"+document.getElementById("formEditTask").action);
    });  
});

//Status eines Tasks setzen
var ckTasks = document.getElementsByClassName("ckTasks");
for (var i = 0; i < ckTasks.length; i++){
  ckTasks[i].addEventListener("click",changeTaskStatus);
}


/*$('#editTaskModal').click('show.bs.modal', function (event) {


});*/



