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
      const speed = element.dataset.parallaxSpeed / 100;
      const x = (offX * speed) / 100;
      const y = (offY * speed) / 100;

      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
});

window.addEventListener("scroll", () => {
  let startY = header.offsetHeight * 0.55;

  // Header Shadows
  const backgroundShadow = document.querySelector(".backgroundShadow");
  const foregroundShadow = document.querySelector(".foregroundShadow");

  if (window.scrollY <= header.offsetHeight) {
    backgroundShadow.style.background = `radial-gradient(circle, transparent 30%, black ${
      120 - window.scrollY / 10
    }%)`;

    foregroundShadow.style.background = `linear-gradient(0deg, rgba(0,0,0,${
      0.4 + window.scrollY / 1000
    }) 40%, transparent 100%)`;
  }

  // Headline
  const headline = document.querySelector(".headline-container h2");

  if (window.scrollY > startY) {
    headline.style.filter = "blur(3px)";
  } else {
    headline.style.filter = "";
  }
});
