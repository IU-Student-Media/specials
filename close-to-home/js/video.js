var videos = document.getElementsByClassName("autoplay"),
fraction = .7;
function checkScroll() {

    for(var i = 0; i < videos.length; i++) {

        var video = videos[i];

        var left = video.offsetLeft, top = video.offsetTop, width = video.offsetWidth, height = video.offsetHeight, right = left + width,
            bottom = top + height, 
            visibleX, visibleY, visible;

            visibleX = Math.max(0, Math.min(width, window.pageXOffset + window.innerWidth - left, right - window.pageXOffset));
            visibleY = Math.max(0, Math.min(height, window.pageYOffset + window.innerHeight - top, bottom - window.pageYOffset));

            visible = visibleX * visibleY / (width * height);

            if (visible > fraction) {
                video.play();
            } else {
                video.pause();
            }

    }

}

window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);
