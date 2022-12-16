// Resources:
//  - https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/
//  - https://codepen.io/MythosM/pen/zYaLeXQ?editors=1010

let scrollBuffer = 0;

function setStickyContainersSize() {
  document.querySelectorAll(".gallery-sticky").forEach(function (container) {
    const stickyElementWidth = container.querySelector(
      ".gallery > div:first-of-type"
    ).scrollWidth;
    const stickyElementHeight = container.querySelector(
      ".gallery > div:first-of-type"
    ).offsetHeight;
    if (stickyElementHeight > stickyElementWidth) {
      const stickyContainerHeight =
        stickyElementHeight + container.querySelector(".gallery").scrollWidth;
      container.setAttribute(
        "style",
        "height: " + stickyContainerHeight + "px"
      );
    } else {
      const stickyContainerHeight =
        container.querySelector(".gallery").scrollWidth +
        container.querySelector(".sticky-inner").offsetHeight -
        container.querySelector(".sticky-inner").scrollWidth +
        scrollBuffer * 2;
      container.setAttribute(
        "style",
        "height: " + stickyContainerHeight + "px"
      );
    }
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom >= document.documentElement.clientHeight;
}

function bindEvents() {
  let ticking = false;

  if (!ticking) {
    trackScroll();
    ticking = true;
  }
}

function trackScroll() {
  const containerInViewPort = Array.from(
    document.querySelectorAll(".gallery-sticky")
  ).filter(function (container) {
    const isVisible = isElementInViewport(container);
    if (!isVisible) {
      var position;
      var containerWidth = container.offsetHeight;
      if (container.offsetTop < window.pageYOffset) {
        container.querySelector(".gallery").scrollLeft = containerWidth;
      } else if (container.offsetTop < window.pageYOffset) {
        container.querySelector(".gallery").scrollLeft = 0;
      } else {
        container.querySelector(".gallery").scrollLeft = 0;
      }
    }
    return isVisible;
  })[0];

  if (!containerInViewPort) {
    requestAnimationFrame(trackScroll);
    return;
  }

  var isPlaceHolderBelowTop =
    containerInViewPort.offsetTop < document.documentElement.scrollTop;
  var isPlaceHolderBelowBottom =
    containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
    document.documentElement.scrollTop;
  let g_canScrollHorizontally =
    isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

  if (g_canScrollHorizontally) {
    var pxToScroll = window.pageYOffset - containerInViewPort.offsetTop;
    containerInViewPort.querySelector(".gallery").scrollLeft = pxToScroll;
  }

  requestAnimationFrame(trackScroll);
}

function initGallery() {
  setStickyContainersSize();
  bindEvents();
}

document.addEventListener("scroll", bindEvents);
window.addEventListener("resize", setStickyContainersSize);

initGallery();
