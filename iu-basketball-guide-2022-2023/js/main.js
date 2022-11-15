window.addEventListener("scroll", () => {
  windowHeight = window.innerHeight;

  document
    .querySelectorAll(
      "#womens-features .heading > div, #mens-features .heading > div, #mens-exhibitions .heading > div, #general-content .heading > div"
    )
    .forEach((heading) => {
      // Show & animate heading when scrolled into view
      if (
        heading.getBoundingClientRect().top - windowHeight <=
        0 - windowHeight * 0.1
      ) {
        heading.classList.add("fromLeft");
      }

      // Hide heading when scrolled out of view
      if (heading.getBoundingClientRect().top - windowHeight >= windowHeight) {
        heading.classList.remove("fromLeft");
      }
    });
});

// Player Cards
document.querySelectorAll(".flip").forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.target.parentNode.parentNode.parentNode;
    const cardFace = event.target.parentNode.parentNode.classList;

    card.classList.toggle("flipped");

    // Un-flip card after 25 seconds
    const timeoutUnflip = setTimeout(() => {
      card.classList.remove("flipped");
    }, 25000);

    if (cardFace.contains("front")) {
      card.children[0].style.zIndex = -1;
      card.children[1].style.zIndex = 1;
    } else if (cardFace.contains("back")) {
      card.children[0].style.zIndex = 1;
      card.children[1].style.zIndex = -1;

      clearTimeout(timeoutUnflip);
    }
  });
});
