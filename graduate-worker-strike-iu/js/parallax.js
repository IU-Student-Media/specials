const isMobile = navigator.userAgent.match(/mobile/i);
const isTablet = navigator.userAgent.match(/tablet/i);

["mousemove", "touchmove"].forEach((eventType) => {
  document.addEventListener(eventType, (event) => {
    const eventX = event.pageX || event.touches[0].clientX;
    const eventY = event.pageY || event.touches[0].clientY;

    const { width, height } = document
      .querySelector("header")
      .getBoundingClientRect();
    const offX = eventX - width * 0.5;
    const offY = eventY - height * 0.5;

    document.querySelectorAll("header .parallaxElement").forEach((element) => {
      let speed = element.dataset.parallaxSpeed;

      if (isMobile) {
        speed = speed / 20;
      } else if (isTablet) {
        speed = speed / 25;
      } else {
        speed = speed / 100;
      }

      const x = (offX * speed) / 100;
      const y = (offY * speed) / 100;

      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
});

window.addEventListener("scroll", () => {
  let startY = header.offsetHeight * 0.55;

  const backgroundShadow = document.querySelector(".backgroundShadow");
  const foregroundShadow = document.querySelector(".foregroundShadow");
  const headline = document.querySelector(".headline-container h2");

  if (window.scrollY > startY) {
    // Blur headline
    headline.style.filter = "blur(3px)";

    // Fade-in background & foreground shadow
    backgroundShadow.classList.add("bShadowIn");
    foregroundShadow.classList.add("fShadowIn");

    backgroundShadow.classList.remove("shadowOut");
    foregroundShadow.classList.remove("shadowOut");
  } else if (window.scrollY <= startY) {
    // Un-blur headline
    headline.style.filter = "";

    if (
      backgroundShadow.classList.contains("bShadowIn") &&
      foregroundShadow.classList.contains("fShadowIn")
    ) {
      // Fade-out background & foreground shadow
      backgroundShadow.classList.add("shadowOut");
      foregroundShadow.classList.add("shadowOut");
    }
  }
});
