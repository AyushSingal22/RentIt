const x = document.querySelector('#bookshow');
const btn = document.querySelector('#showbooking');
var c=0;
btn.addEventListener('click',()=>{
        c = c +1;
        if(c%2!=0)  {
            x.style.display = "";
            btn.value = "Hide"
        }
        else {
            x.style.display = "none"
            btn.value = "Show All bookings"
        }
         
    
    
    
})