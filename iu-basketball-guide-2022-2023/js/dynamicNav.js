// Populate dynamic nav container
document.querySelectorAll("[data-index]").forEach((section) => {
  const sectionName = section.getAttribute("data-index");
  const dynamicNav = document.querySelector("#dynamicNav .list");

  const sectionAnchor = document.createElement("div");
  sectionAnchor.innerHTML = sectionName;

  dynamicNav.appendChild(sectionAnchor);
});

// Active index styling
window.addEventListener("scroll", () => {
  document.querySelectorAll("[data-index]").forEach((section) => {
    const navAnchors = document.querySelectorAll("#dynamicNav .list div");
    const navHeight = document.querySelector("nav").clientHeight;

    if (
      window.scrollY >= section.offsetTop - navHeight &&
      window.scrollY <= section.offsetTop + section.offsetHeight - navHeight
    ) {
      navAnchors.forEach((anchor) => {
        if (anchor.innerHTML == section.getAttribute("data-index")) {
          document.querySelector("#activeSection .label").innerHTML =
            anchor.innerHTML;
          anchor.classList.add("active");
        } else {
          anchor.classList.remove("active");
        }
      });
    } else {
      navAnchors.forEach((anchor) => {
        if (anchor.innerHTML == section.getAttribute("data-index")) {
          anchor.classList.remove("active");
        }
      });
    }
  });
});

document.querySelectorAll("#dynamicNav .list div").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const navSections = document.querySelectorAll("[data-index]");
    const navHeight = document.querySelector("nav").clientHeight;

    navSections.forEach((section) => {
      if (section.getAttribute("data-index") == event.target.innerHTML) {
        window.scroll(0, section.offsetTop - navHeight + 1);
      }
    });
  });
});

function toggleNavList() {
  const navList = document.querySelector("#dynamicNav .list");
  navList.style.display = navList.style.display == "flex" ? "none" : "flex";
}

function hideNavList() {
  const navList = document.querySelector("#dynamicNav .list");
  navList.style.display = "none";
}

function handleMobile() {
  const navList = document.querySelector("#dynamicNav .list");

  if (window.matchMedia("(max-width: 575px)").matches) {
    // If window width < 576px:

    // Hide nav list
    navList.style.display = "none";

    // Add mobile event listeners
    document
      .querySelector("#activeSection")
      .addEventListener("click", toggleNavList);

    document.querySelectorAll("#dynamicNav .list div").forEach((anchor) => {
      anchor.addEventListener("click", hideNavList);
    });
  } else {
    // If window width >= 576px:

    // Show nav list
    navList.style.display = "flex";

    // Remove mobile event listeners
    document
      .querySelector("#activeSection")
      .removeEventListener("click", toggleNavList);

    document.querySelectorAll("#dynamicNav .list div").forEach((anchor) => {
      anchor.removeEventListener("click", hideNavList);
    });
  }
}

window.addEventListener("resize", handleMobile);
handleMobile();
