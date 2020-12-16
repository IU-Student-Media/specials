// FAKE STORIES DROPDOWN
function showHide(elem) {
    if(elem.selectedIndex !== 0) {
         //hide the divs
         for(var i=0; i < divsO.length; i++) {
             divsO[i].style.display = 'none';
        }
        //unhide the selected div
        document.getElementById(elem.value).style.display = 'block';
    }
}
 
window.onload=function() {
    //get the divs to show/hide
    divsO = document.getElementById("fake-speeches").getElementsByClassName('show-hide');
};

