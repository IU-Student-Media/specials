function popUp(district) {
    // when u click .info (modal background) 
    $(".info").click(function () {
        // hide the info box
        $(".info-" + district).removeClass("show");
    })

    $(".info-" + district).addClass("show");
}
