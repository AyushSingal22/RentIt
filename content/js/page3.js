
const pricekm = parseInt(document.querySelector('#priceperkm').innerHTML.split(" ")[2]);
const priceday =parseInt( document.querySelector('#priceperday').innerHTML.split(" ")[0]);
const day = parseInt(document.querySelector('#kmrange'));
var fpe = document.querySelector('#finalp')
var ghi = document.querySelector('#finalprice')
const slct = document.querySelector('#day');
var fp;
addEventListener('click',()=>{
    var ay = parseInt(document.querySelector('#kmrange').value)
    fp = ay*priceday;
    fpe.innerHTML=fp;
    ghi.value = fp;
})
console.log( finalp = day*priceday)