//Javascript für den Todo im CMS
console.log("editor Javascript für das Todo");

////////////////////////Keypress Funktionen/////////////////////////////////////////////
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

////////////////////////Editor Funktionen/////////////////////////////////////////////

////////////////////////Ajax-Funktionen/////////////////////////////////////////////
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





