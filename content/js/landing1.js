var engineCount  = document.querySelector(".noe")



var e = document.getElementById("fueltype");
 
var slct = document.querySelector("select");
slct.addEventListener("click", ()=>{
    var selectedtype = e.options[e.selectedIndex].value;
    console.log(selectedtype);
    var sf =document.querySelector( `#ename${selectedtype}`);
    var fm =document.querySelector( "h2");
    
    //sf.style.textDecoration = "underline";
    
}); 
