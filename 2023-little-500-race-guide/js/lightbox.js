// dont mess with this i finally got it to work
window.onload = function() {
    const isDesktop = window.matchMedia("(min-width: 991px)").matches;
    if (isDesktop) {
        const images = document.querySelectorAll('.gallery img');
        images.forEach(function(image) {
            image.addEventListener('click', function() {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                const lightboxCaption = document.getElementById('lightbox-caption');
                lightboxImg.src = this.src;
                lightboxCaption.innerHTML = this.alt;
                    if (image.naturalWidth > image.naturalHeight) {
                        lightboxImg.classList.remove('tall');
                        lightboxCaption.classList.remove('tall-caption');
                        lightboxImg.classList.add('short');
                        lightboxCaption.classList.add('short-caption');
                    } 
                    else {
                        lightboxImg.classList.remove('short');
                        lightboxCaption.classList.remove('short-caption');
                        lightboxImg.classList.add('tall');
                        lightboxCaption.classList.add('tall-caption');
                    };
                lightbox.classList.remove('hidden');
            });
        });

        const lightboxOverlay = document.getElementById('lightbox');
        lightboxOverlay.addEventListener('click', function() {
            lightbox.classList.add('hidden');
        });
    } 
    else { //TODO: Find the caption and fix it.
        const mobileImages = document.querySelectorAll('.item img');
        mobileImages.forEach(function(image) {
            image.addEventListener('click', function() {
                const item = this.closest('.item');
                const overlay = item.querySelector('.overlay');
                const figCaption = overlay.querySelector('figcaption');
                figCaption.innerHTML = this.alt;
                if (figCaption.classList.contains('hidden')) {
                    figCaption.classList.remove('hidden');
                } else {
                    figCaption.classList.add('hidden');
                    overlay.style.backgroundColor = "transparent";
                }
            });
        });        
    };
}