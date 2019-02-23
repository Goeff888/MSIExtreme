console.log("Aufruf von blogEdit.js");

function activateWorkSpace(){
    console.log("Workspace aktivieren");
    var contentNode =  document.getElementsByClassName("content")[0];
    contentNode.contentEditable = "true";
    contentNode.focus();
    contentNode.style.backgroundColor = "white";
    
}

function saveContent(){
    console.log("Inhalt speichern");
    var contentNode =  document.getElementsByClassName("content")[0];
    contentNode.contentEditable = "false";
    contentNode.style.backgroundColor = "transparent";
    var id = contentNode.dataset.value;
    console.log(contentNode.innerHTML);
    $.post("/updateContent/" + id ,
    {
        content: contentNode.innerHTML,
        status:"in progress"
        
    },
    function(daten, status){
      console.log(status);
      if (status == "success"){
        console.log("erhaltene Daten:"+daten);
       //hier erst contenteditable verhindern
      }
    });
}