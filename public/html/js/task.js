console.log("tasks");

function addTaskbyEnter(e){
  console.log("Aufgabe hinzufügen");
   if (e.which === 13){
        var todotext = $(this).val();
        console.log(todotext);
        $(this).val("");
        $("ul").append("<li><i class='fa fa-trash'></i> "+ todotext +"</li>");
        console.log("dfdf");
   }
}

function addProject(){
  console.log("Aufgabenbereich hinzufügen");
}

var addTask = document.getElementsByClassName("newTask");

for (var i=0; i<addTask.length;i++){
  addTask[i].addEventListener("keypress", addTaskbyEnter);
  }

