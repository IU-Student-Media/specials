var ad = document.getElementById("banner"),
    ad2 =document.getElementById("aside-ad"),
    fraction = .7;

function checkScroll() {
    var left = ad.offsetLeft, 
        top = ad.offsetTop, 
        width = ad.offsetWidth, 
        height = ad.offsetHeight, 
        right = left + width,
        bottom = top + height, 
        visibleX, visibleY, visible;

        visibleX = Math.max(0, Math.min(width, window.pageXOffset + window.innerWidth - left, right - window.pageXOffset));
        visibleY = Math.max(0, Math.min(height, window.pageYOffset + window.innerHeight - top, bottom - window.pageYOffset));

        visible = visibleX * visibleY / (width * height),

        winWidth = $(window).width(),
        leftMargin = (winWidth-width)/2;
        
        if (visible > fraction) {
            $("#banner").removeClass('ad-passive');
            $("#banner").addClass('banner-active');
            $('#adImg').html('<img id="adImg" src="img/testad.jpg"/> <div id="btnClose"> <i class="fa fa-times" aria-hidden="true"></i></div>');
            $('#banner').css({'margin-left': leftMargin})
        } 

        closeBtn = document.getElementById('btnClose').addEventListener('click', function() {
            $('#banner').removeClass('banner-active');
            $('#banner').removeClass('ad-passive');
            $('#banner').addClass('ad-kill');
        }, false);
}



function asideAd() {
    var left = ad2.offsetLeft, 
        top = ad2.offsetTop, 
        width = ad2.offsetWidth, 
        height = ad2.offsetHeight, 
        right = left + width,
        bottom = top + height, 
        visibleX, visibleY, visible;

        visibleX = Math.max(0, Math.min(width, window.pageXOffset + window.innerWidth - left, right - window.pageXOffset));
        visibleY = Math.max(0, Math.min(height, window.pageYOffset + window.innerHeight - top, bottom - window.pageYOffset));

        visible = visibleX * visibleY / (width * height);

        closeBtn = document.getElementById('btnClose2').addEventListener('click', function() {
            $('#aside-ad').removeClass('ad-active');
            $('#aside-ad').removeClass('ad-passive');
            $('#aside-ad').addClass('ad-kill');
        }, false);
    
        if (visible > fraction) {
            // $("#aside-ad").removeClass('ad-passive');
            // $("#aside-ad").addClass('ad-active');
            $('#aside-ad').removeClass('ad-passive');
            $('#aside-ad').addClass('ad-active');
            $('#adImg2').html('<img src="img/aside-ad.jpg"/> <div id="btnClose2"> <i class="fa fa-times" aria-hidden="true"></i></div>');
            
        };

        
}


window.addEventListener('scroll', checkScroll, true);
window.addEventListener('resize', checkScroll, true);

window.addEventListener('scroll', asideAd, true);
window.addEventListener('resize', asideAd, true);

