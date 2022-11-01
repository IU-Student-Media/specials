// --- Settings ---
const loadIncrement = 5;
// --- Global Variables ---
let visibleArticles = loadIncrement;
let currentIndex;
let isOverflow = false;
let numberOfSections;

function generateSections(articleJSON) {
  // Section Article Container
  const articleContainer = document.getElementById("articleContainer");

  articleJSON.sections.forEach((section, sectionIndex, sectionArray) => {
    isOverflow = sectionArray.length > 4;
    numberOfSections = sectionArray.length;

    // Timeline Point
    const tabContainer = document.getElementById("tabContainer");

    // Tab Button
    var tabButton = document.createElement("div");
    tabButton.classList = "sectionButton";
    tabButton.dataset.index = sectionIndex;

    // Tab Heading
    const tabHeading = document.createElement("div");
    tabHeading.classList = "heading";
    tabHeading.innerHTML = section.header;

    tabButton.appendChild(tabHeading);

    // Tab Subheading
    const tabSubHead = document.createElement("div");
    tabSubHead.classList = "subheading";
    tabSubHead.innerHTML = section.subheader;

    tabButton.appendChild(tabSubHead);

    if (!isOverflow) {
      // Add button to container if there are <= 4 sections
      tabContainer.appendChild(tabButton);
    } else if (isOverflow) {
      // If there are > 4 sections:
      if (sectionIndex > numberOfSections - 4) {
        // Add last three sections to container
        tabContainer.appendChild(tabButton);
      } else {
        const overflowContainer = document.querySelector(
          "#tabContainer .overflow"
        );
        overflowContainer.style.display = "block";

        // Add remaining to overflow menu
        const overflowMenu = document.querySelector(
          "#tabContainer .overflow .menu"
        );

        const overflowHeading = document.createElement("div");
        overflowHeading.classList = "sectionButton";
        overflowHeading.innerHTML = section.header;
        overflowHeading.dataset.index = sectionIndex;

        overflowMenu.appendChild(overflowHeading);
      }
    }

    const sectionContainer = document.createElement("div");
    sectionContainer.dataset.sectionId = section.sectionID;
    sectionContainer.dataset.index = sectionIndex;
    sectionContainer.style.display = "none";

    // Display last section
    if (sectionIndex == sectionArray.length - 1) {
      tabButton.classList.add("active");
      sectionContainer.style.display = "flex";

      currentIndex = sectionIndex;
    }

    // Generate Articles
    const sortedArticles = sortArticles(section);

    articleContainer.appendChild(sectionContainer);

    let animationDelay = 0;
    sortedArticles.forEach((article, articleIndex) => {
      const articleCard = createArticleCard(article, articleIndex, false);

      articleCard.style.animationDelay = `${animationDelay++ / 5}s`;

      if (animationDelay >= 5) {
        animationDelay = 0;
      }

      if (articleIndex >= loadIncrement) {
        articleCard.style.display = "none";
      }

      sectionContainer.appendChild(articleCard);
    });

    // Index Container
    const indexContainer = document.getElementById("indexCoverage");

    const indexAnchor = document.createElement("a");
    indexAnchor.href = "#coverage";
    indexAnchor.innerHTML = section.header;

    const indexListItem = document.createElement("li");
    indexListItem.dataset.index = sectionIndex;

    indexListItem.appendChild(indexAnchor);
    indexContainer.appendChild(indexListItem);
  });

  // Add load more button
  const loadButton = document.createElement("button");
  loadButton.classList = "loadMore";
  loadButton.innerHTML = "Load More";

  articleContainer.appendChild(loadButton);
}

function changeSection(event) {
  const targetIndex =
    event.target.dataset.index || event.target.parentElement.dataset.index;

  // Show/hide articles
  document.querySelectorAll("#articleContainer > div").forEach((section) => {
    const sectionIndex =
      section.dataset.index || button.parentElement.dataset.index;

    if (sectionIndex == targetIndex) {
      section.style.display = "";
    } else {
      section.style.display = "none";
    }
  });

  // Update button styling
  document
    .querySelectorAll("#tabContainer .sectionButton")
    .forEach((button) => {
      const buttonIndex =
        button.dataset.index || button.parentElement.dataset.index;

      if (buttonIndex == targetIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

  // Overflow button styling
  const overflowButton = document.querySelector(
    "#tabContainer .overflow button"
  );

  if (isOverflow && targetIndex <= numberOfSections - 4) {
    overflowButton.classList.add("active");
  } else {
    overflowButton.classList.remove("active");
  }

  // Update headline
  let currentSection = articleData.sections[targetIndex];

  document.querySelector("#coverage div > h3").innerHTML =
    currentSection.header;
  document.querySelector("#coverage div > p").innerHTML =
    currentSection.description;

  currentIndex = targetIndex;

  // Reset load button
  const loadButton = document.querySelector(".loadMore");
  loadButton.style.display = "block";
  visibleArticles = loadIncrement;

  // Reset visible articles
  const currentArticles = document.querySelectorAll(
    `div[data-index="${currentIndex}"] .card`
  );

  currentArticles.forEach((article, index) => {
    article.classList.add("fadeIn");

    if (index >= visibleArticles) {
      article.style.display = "none";
    }
  });

  // Hide overflow menu
  document.querySelector("#tabContainer .menu").style.display = "none";
}

function init() {
  generateSections(articleData);

  // Card Animations
  document.querySelectorAll("#articleContainer .card").forEach((card) => {
    card.addEventListener("animationend", () => {
      // Remove fadeIn class after animation finishes
      card.classList.remove("fadeIn");
    });
  });

  // Timeline Buttons
  document
    .querySelectorAll("#tabContainer .sectionButton")
    .forEach((button) => {
      button.addEventListener("click", changeSection);
    });

  // Load more button
  document.querySelector(".loadMore").addEventListener("click", (event) => {
    const currentArticles = document.querySelectorAll(
      `div[data-index="${currentIndex}"] .card`
    );

    for (
      let index = visibleArticles;
      index < visibleArticles + loadIncrement;
      index++
    ) {
      if (index < currentArticles.length) {
        currentArticles[index].style.display = "";
      } else {
        event.target.style.display = "none";
      }
    }

    visibleArticles += loadIncrement;
  });

  // Overflow button
  document
    .querySelector("#tabContainer .overflow button")
    .addEventListener("click", () => {
      const overflowMenu = document.querySelector("#tabContainer .menu");
      let overflowDisplay = overflowMenu.style.display;

      // Toggle menu visibility
      overflowMenu.style.display = overflowDisplay == "none" ? "block" : "none";
    });

  // Overflow close button
  document.querySelectorAll("#closeBtn").forEach((div) => {
    div.addEventListener("click", () => {
      const overflowMenu = document.querySelector("#tabContainer .menu");
      overflowMenu.style.display = "none";
    });
  });

  // Index Coverage Anchors
  document.querySelectorAll("#indexCoverage li").forEach((item) => {
    item.addEventListener("click", changeSection);
  });

  // Article Anchors
  document
    .querySelectorAll(".card .headline > a, .card a.image, a.readButton")
    .forEach((anchor) => {
      anchor.addEventListener("click", () => {
        const articleURL = anchor.href;

        // Set article as read
        setReadStatus(articleURL);

        // Set indicators to read
        const indicators = document.querySelectorAll(
          `.indicator[data-url="${articleURL}"]`
        );

        indicators.forEach((indicator) => {
          indicator.classList = "indicator read";
          indicator.title = "Read";
        });

        // Set buttons to read
        const readButtons = document.querySelectorAll(
          `a.readButton[href="${articleURL}"]`
        );
        readButtons.forEach((button) => {
          button.title = "Read";
        });
      });
    });
}

init();
