console.log("task.js wird ausgeführt");

function addTaskbyEnter(e){
  console.log("Aufgabe hinzufügen");
  //this.focus();e.preventDefault();
   if (e.which === 13){
    //Enter-Event
        var todotext = $(this).val();
        //console.log(todotext);
        $(this).val("");
        $("ul").append("<li></i> "+ todotext +"<input type='text' name='tasks[task]' value='" +todotext+"' hidden='true'></li>");
        
        //var addTaskForm = document.getElementById("addTaskForm");
        //addTaskForm.addEventListener("keypress", removeDefault);
   }
}
function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
} 

document.onkeypress = stopRKey;
function removeDefault(e){
     if (e.which === 13){
    //Enter-Event
    console.log("nur halo");
   }
}

var addTask = document.getElementsByClassName("taskName");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
var addTaskForm = document.getElementById("addTaskForm");
addTaskForm.addEventListener("keypress", removeDefault);
for (var i=0; i<addTask.length;i++){
  addTask[i].addEventListener("keypress", addTaskbyEnter);
  addTask[0].focus();
  }

