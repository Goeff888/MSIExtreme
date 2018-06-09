// Javascript für den Python Bereich
console.log("Javascript für den Python Bereich");

//Eingabe als Code an Python-Server senden
function sendCode(){
    console.log("Code senden");
    $.post("/hier den Python aufruf",
    {
        task: text,
        todoID: id
    },
    function(data, status){
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log("Callback");
    });

}

var btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click",sendCode);