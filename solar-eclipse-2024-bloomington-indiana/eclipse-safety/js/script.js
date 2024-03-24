var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart  (2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy+mm+dd;

const dates = document.getElementsByClassName("date-block");

let dateIdx = 0;
let date = dates[dateIdx];
while(dateIdx < dates.length && today >= date.id){
    dateIdx++;
    date = dates[dateIdx];
}
if(dateIdx > 0) date = dates[dateIdx-1];

const jumpButt = document.getElementById("jump");

jumpButt.addEventListener("click", e => {
    date.scrollIntoView();
})
