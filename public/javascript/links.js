console.log("Hallo von Links.js");
console.log("window.location:"+window.location);

window.onload= function(){
  console.log("window onLoad");
  var navigationLink= document.getElementById("navigationLinks");
  navigationLink.value = window.location  ;
  console.log("window onLoad" +navigationLink.value);
  };
