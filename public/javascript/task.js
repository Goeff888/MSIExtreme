console.log("task.js wird ausgeführt");

function addTaskbyEnter(e){
  //console.log("Aufgabe hinzufügen");
  //this.focus();e.preventDefault();
   if (e.which === 13){
    //Enter-Event
        var todotext = $(this).val();
        console.log(todotext);
        $(this).val("");
        $("ul").append("<li>"+ todotext +"<input type='text' name='tasks[task]' value='" +todotext+"' hidden='true'></li>");
        sendText(todotext);
        //var addTaskForm = document.getElementById("addTaskForm");
        //addTaskForm.addEventListener("keypress", removeDefault);
   }
}

//Ausgabe des Keycodes/////
function retrievekeyCode(e){
  e = e || window.event;
  console.log( e.keyCode); 
}

function sendText(todotext){
    $.post("/saveTask",
    {
        task: todotext,
        city: "Duckburg"
    },
    function(data, status){
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log("Callback");
    });
}


function sendText2(todotext){
  var xhttp = new XMLHttpRequest();
  var data = "task=" + todotext;
  //var data = [{"task": todotext}];
  console.log("Function: sendText");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Hallo");
   }
};
  xhttp.open("POST", "/saveTask", true);
  xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhttp.setRequestHeader("Content-type", "application/text/plain");
  //xhttp.send("fname=Henry&lname=Ford");
  console.log("todotext auf Clientseite:"+ data);
  //xhttp.open("POST", "/saveTask", true);
  xhttp.send(data);
  
  //diesen teil prüfen
  	/*xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    
    
  /*var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send(); */ 
}


var addTask = document.getElementById("taskName");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
//var addTaskForm = document.getElementById("addTaskForm");
taskName.addEventListener("keypress", addTaskbyEnter);


