function popUp(district) {
    console.log(district)
    var popup = document.getElementsByClassName("info")[0];
    $(".info-" + district).toggleClass("show");
    console.log($(".info-" + district))
}