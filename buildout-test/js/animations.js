let headlineContainer = document.querySelector("div.headline-container");

function checkScroll() {
  // Headline animation
  let startY = header.offsetHeight * 0.35;

  if (window.scrollY > startY) {
    // Blur & translate .headline-container
    headlineContainer.style.filter = "blur(3px)";
    headlineContainer.style.transform = "translateY(-150px) scale(1.04)";
  } else {
    // Reset .headline-container filter and transform styling
    headlineContainer.style.filter = "";
    headlineContainer.style.transform = "";
  }

  // Section Divider animation
  let windowHeight = window.innerHeight;
  let dividerIcons = document.querySelectorAll("div > i");

  dividerIcons.forEach((icon) => {
    let positionFromTop = icon.getBoundingClientRect().top;

    // Fade-in divider icon when scrolled into view
    if (positionFromTop - windowHeight <= -25) {
      icon.classList.add("fade-in");
    }
  });
}
window.addEventListener("scroll", checkScroll);
