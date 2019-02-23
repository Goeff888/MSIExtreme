console.log("taskGeneral.js wird jetzt ausgeführt");

///Task im Fenster für Status 0 oder 9 hervorheben
function setStatusVisual(itemID,status){
  console.log("setStatusVisual wird aufgerufen mit itemID:"+itemID+" und status:"+status);
  console.log("spTask"+itemID);
  item = document.getElementById("spTask"+itemID);
  if(status == 0){
    item.style.textDecoration = "none";
    item.style.color = "black";
  }else if(status == 9){
    item.style.textDecoration = "line-through";
    item.style.color = "grey";
  }else{
    console.log("Fehler beim Verändern des Task-Textes");
  }
}

//neuen Eintrag im Aufgabenbereich hinzufügen
function addTaskbyEnter(e){  
  //this.focus();e.preventDefault();
   if (e.which === 13){
    console.log("Aufgabe hinzufügen");
    //Enter-Event
        var todotext = $(this).val();
        var todoID = this.dataset.value;
        console.log(this.dataset.value);
        $(this).val("");
        //$("ul").append("<li>"+ todotext +"<input type='text' name='tasks[task]' value='" +todotext+"' hidden='true'></li>");
        $("#taskList").append("<li><input type='checkbox' class='form-check-input' id='exampleCheck1' >" + todotext +"<span class='iconRight' data-value=''><i class='fas fa-trash'></i></span>");              
        sendText(todotext, todoID);
   }
}

function addLink(e){
  console.log("Funktion: addLink");
  //Hier Daten zum Hinzufügen eines Links senden
    //var button = $(event.relatedTarget); // Button that triggered the modal
    //var taskId = button.data('taskId');
    var taskId = document.getElementById('taskID').value;
    console.log("TaskID in addLink:"+taskId);
    console.log(document.getElementById("taskLink").value);
    $.post("/addArrayElement/" + taskId ,
    {
        link: document.getElementById("taskLink").value
        
    },
    function(daten, status){
      if (daten){
        console.log("erhaltene Daten:"+daten);
        $("#taskLinks").append("<li>" + document.getElementById("taskLink").value +"<span class='iconRight' data-value=''><i class='fa fa-trash'></i></span>");
      }
    });
}

function addSubTask(e){
  console.log("Funktion: addSubTask");
  //Hier Daten zum Hinzufügen eines Links senden
    //var button = $(event.relatedTarget); // Button that triggered the modal
    //var taskId = button.data('taskId');
    var taskId = document.getElementById('taskID').value;
    console.log("TaskID in addSubTask:"+taskId);
    console.log("VALU"+document.getElementById("taskSubTask").value);
    $.post("/addArrayElement/" + taskId ,
    {
        
        subTasks: document.getElementById("taskSubTask").value        
    },
    function(daten, status){
      //Hier Task in Modal schreiben
      if (daten){
        console.log(daten);
        $("#taskSubTasks").append("<li>" + daten.subTasks +"<span class='iconRight' data-value=''><i class='fas fa-trash'></i></span>");
      }
      //location.reload(true);
    });
}

function deleteTask(taskID){
  console.log("Funktion: deleteTask");
  //console.log("this.data-value "+this.getAttribute("data-id"));
  var button = $(event.relatedTarget); // Button that triggered the modal
  console.log("taskId:"+ taskID);
  $.post("/task/" + taskID+  "?_method=DELETE" ,
  //$.post("/deleteTask/",
    {
        //todoSubtask: taskLink,
        todoId: taskID   
    },
    function(data, status){
      console.log("data:"+data);
      if (data == "success"){
        //Eintrag entfernen
        //console.log("this:"+ this.getAttribute("id"));
        
        var listEntry = document.getElementById(taskID);
        var removed = listEntry.parentNode.removeChild(listEntry);
        console.log("removed:"+removed);
        console.log("removed:"+listEntry);
      }
      //location.reload(true);
    });
}

/*
 *    function wegMitEintrag () {
      var knoten = document.getElementsByTagName('ol')[0];
      var verschwunden = knoten.removeChild(knoten.firstChild);
      ausgabe(verschwunden.firstChild.nodeValue + ' wurde gelöscht!')
    }
    */

//Funktion zum Durchstreichen des Textes und Ändern des Status
function setStatusReady(e){
  console.log("CheckBox Ausgewählt");
  var status;
  var ckID = this.getAttribute("data-id");
  //var liID = "li" + ckID.slice(2, ckID.length-1);
  //var liElement = document.getElementById(liID);
  console.log("ckID:"+ckID); 
  if (this.checked == true){
    //console.log("ausgewählt");
    status = 9;
    //liElement.style.textDecoration = "line-through";
    //liElement.style.text-decoration = "line-through",  
  }else{
    //console.log("leer");
    status = 0;
    //console.log("this:"+ this.getAttribute("id"));
    //liElement.style.textDecoration = "none";
  }
  
  var data = {status: status};
  console.log("gesendeter Status:"+ data.status);
  $.post("/updateStatus/"+ ckID,
    {
        data: data   
    },
    function(daten, status){
     console.log(status);
     if (status == "success"){
       console.log("Status wurde erfolgreich übertragen");
       console.log(daten.status);
       setStatusVisual(ckID,daten.status);
       
     }
  });
}

//Öffnen des Task-Modal
$('#editTaskModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var taskId = button.data('id');
    console.log("Aufruf von Darstellung des Modals von Task (ID):"+ taskId);
    $.get("/readTaskData/" + taskId ,
    function(data){
        //console.log("data:"+data.task);
        //var modal = $(this);      
        //console.log("ID des Tasks:"+data._id);
        //console.log("Anzahl des Links:"+data.links.length);
        //Name des Tasks in Textfeld schreiben
        document.getElementById("modalTaskTitle").value=data.task;
        document.getElementById("taskID").value=data._id;
        var taskLinks = document.getElementById("taskLinks");
        var taskSubTasks = document.getElementById("taskSubTasks");
        //vorherige Listenelemente löschen, um nur Elemente des Tasks anzuzeigen
        /*while (taskLinks.firstChild) {
            taskLinks.removeChild(taskLinks.firstChild);
            taskSubTasks.removeChild(taskLinks.firstChild);//Falls sih Browser aufhängt ID prüfen
        }*/
        //Links des Tasks ins Modal schreiben
        for (var i = 0; i < data.links.length;i++){
          $("#taskLinks").append("<li>"+data.links[i] +"<button type='button' class='btn btnEditTask' data-id=li"+ i + " onclick=deleteTask()><i class='fa fa-trash editTask'></i></button> </li>");
        }
        //SubTasks einbinden 
        for (var j = 0; j < data.subTasks.length;j++){
          $("#taskSubTasks").append("<li>" + data.subTasks[j] +"</li>");
        }
        //console.log("modal:"+document.getElementById("formEditTask").action);
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

//Delete Task Icon ist die Funktion nötig???
/*var deleteBtns = document.getElementsByClassName("iconRight");
for (var j = 0; j < deleteBtns.length; j++){
  deleteBtns[j].addEventListener("mouseup",deleteTask);
}*/

//Listeneintrag mit enter hinzufügen
var addTask = document.getElementById("todo");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
//var addTaskForm = document.getElementById("addTaskForm");
addTask.addEventListener("keypress", addTaskbyEnter);

//Check Box Status Tasks
var statusTask = document.getElementsByClassName("form-check-input");
for (var k = 0; k < statusTask.length;k++){
  statusTask[k].addEventListener("change", setStatusReady);
}

