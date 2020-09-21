$(document).ready(function (){
    $('.my-image-map').maphilight();
});

$('area').click(function(){
    let id = $(this).attr('id');
    closeWin(id); return false;
});

function closeWin(id) {
    window.opener.resultCloseParent(id);
    window.close();
}
function createEventListeners() {
    var closeSelectBtn = document.getElementById("closeSeatSelect");
    if(closeSelectBtn.addEventListener) {
        closeSelectBtn.addEventListener("click", closeWin, false);
    } else if (closeSelectBtn.attachEvent) {
        closeSelectBtn.attachEvent("onclick", closeWin);
    }
}
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}