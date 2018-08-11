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
        
        var todotext = $(this).val();
        console.log("corelID:" +corelID);
        if (!document.getElementById("todoList").value){
          console.log("Todo nicht vorhanden");
          createTodo(name, corelID,todotext);//Hier werte setzen
          console.log("id:" + corelID );
        }else{
          console.log("Todo vorhanden" + todoID ); 
        }
        var todoID = document.getElementById("todoList").value;
         console.log("Todo:" + todoID );
         $("ul#todoList").append(
"<li><input type='checkbox' class='form-check-input' id='corelTask' >" + todotext +
"<span class='iconRight' data-value='"+ todoID +"'><i class='fas fa-trash'></i></span>");
          sendText(todotext, todoID);
        $(this).val("");
        //var tasks = document.querySelector("ul");
            
         //console.log($("ul#todoList"));              
        //sendText(todotext, todoID);
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
    console.log("Javascript createTodo: " +id);
    $.post("/createTask",
    {
        project: name,//Hier Werte aus task model festlegen
        description: "Dies ist eine Todo-Liste aus der Corel Seite",
        result:id
    },
    function(data){
        console.log("Data: " + data);
        console.log("Callback");
        //ulllsdatavalueh.appendoder=(, data);//hier todoid setzen!!!!!!!!!!!!!!!!!
    });
}

function sendText(id,text){
    console.log("Javascript createTodo: " +id);
    $.post("/createTask",
    {
        project: text,
        id:id
    },
    function(data){
        console.log("Data: " + data);
        console.log("Callback");
        //ulllsdatavalueh.appendoder=(, data);//hier todoid setzen!!!!!!!!!!!!!!!!!
    });
}
/////////////////EVENT LISTENER
var todoInput = document.getElementById("todo");
todoInput.addEventListener("keypress",addTaskbyEnter);






