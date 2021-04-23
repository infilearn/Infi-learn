function ModalShow(){
    document.getElementById("modal").style.zIndex = "3";
    window.location.href = "#modal";
}
function HideModal(){
    document.getElementById("modal").style.zIndex = "-1";
    window.location.href = "#";
}