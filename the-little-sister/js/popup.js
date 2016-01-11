$('.popup').click(function(event) {
    event.preventDefault();
    window.open($(this).attr("href"), "popupWindow", "width=600,height=400,scrollbars=yes");
});