/*! Last updated December 16, 2022 - https://specials.idsnews.com/antisemitism-iu-mezuzah-the-avenue */
// replace <div class="ad"></div> with proper ad code
let adDivs = document.querySelectorAll(".ad");
let adCount = 2;
for (let ad of adDivs) {
  adCount++;
  let adIndex = adCount % 5 == 0 ? 5 - 1 : (adCount % 5) - 1;
  ad.outerHTML = `
                <!-- AD BLOCK -->
                <div class="ad-block">
                    <p class="ad-caption">Advertisement</p>
                    <div class="ad-code">
                        <div id='div-gpt-ad-1512489859064-${adIndex}' align="center">
                            <script>
                                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1512489859064-${adIndex}'); }); 
                            </script>
                        </div>
                    </div>
                </div> 
                <!-- END AD BLOCK -->`;
}
;// Resources:
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
;document.querySelectorAll(".glass-interactive").forEach((element) => {
  const glassCursor = element.children.namedItem("glassCursor");

  element.addEventListener("mouseenter", () => {
    document.onmousemove = (event) => {
      const cursorY = event.clientY;
      const cursorX = event.clientX;

      glassCursor.style.top = cursorY + "px";
      glassCursor.style.left = cursorX + "px";
    };

    glassCursor.style.opacity = 1;
  });

  element.addEventListener("mouseleave", () => {
    document.onmousemove = null;
    glassCursor.style.opacity = 0;
  });
});
;(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "//www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-NBJX8F");
;"use strict";

/*
    TRANSPARENT NAVBAR TRANSITION
*/
// define elements from DOM
const nav = document.querySelector("nav");
const slug = document.querySelector(".logo span");
const header = document.querySelector("header");
function checkScroll() {
  // callback function
  let startY = header.offsetHeight * 0.6; //The point where the navbar changes in px
  // check whether scroll position is above/below target
  // toggle css styles accordingly
  if (window.scrollY > startY) {
    nav.style.backgroundColor = "black";
    slug.style.display = "block";
  } else {
    nav.style.backgroundColor = "transparent";
    slug.style.display = "none";
  }
}
window.addEventListener("scroll", checkScroll);

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
function toggleDropdown() {
  const socials = document.querySelector(".item");
  socials.classList.toggle("show");
}
document.querySelector(".toggle").addEventListener("click", toggleDropdown);

/*
    DATA SCROLL SPEED
*/
$.fn.moveIt = function () {
  var $window = $(window);
  var instances = [];

  $(this).each(function () {
    instances.push(new moveItItem($(this)));
  });

  window.addEventListener(
    "scroll",
    function () {
      var scrollTop = $window.scrollTop();
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
    },
    { passive: true }
  );
};

var moveItItem = function (el) {
  this.el = $(el);
  this.speed = parseInt(this.el.attr("data-scroll-speed"));
};

moveItItem.prototype.update = function (scrollTop) {
  this.el.css("transform", "translateY(" + -(scrollTop / this.speed) + "px)");
};

// Initialization
$(function () {
  $("[data-scroll-speed]").moveIt();
});
;let currentTimeInterval;
let cardWidthTimeout;

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".player").forEach((player) => {
    const playerID = player.id;
    const videoID = document
      .querySelector(`#${playerID}`)
      .getAttribute("data-youtube-video-id");

    player = new YT.Player(playerID, {
      videoId: videoID,
      playerVars: {
        height: "unset",
        width: "unset",
        playsinline: 1,
        modestbranding: 1,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  });
}

function onPlayerStateChange(changeEvent) {
  if (changeEvent.data == YT.PlayerState.PLAYING) {
    // Get playtime every 1 second
    currentTimeInterval = setInterval(() => {
      const currentVideoTime = changeEvent.target.getCurrentTime();
      handleVideoTime(currentVideoTime, changeEvent);
    }, 1000);
  } else {
    clearInterval(currentTimeInterval);
  }
}

function handleVideoTime(currentVideoTime, event) {
  const videoID = event.target.o.getAttribute("data-youtube-video-id");
  const speakerDictionary = {
    speakers: [
      {
        id: "maya",
        name: "Maya Goldenberg",
        picture:
          "http://127.0.0.1:5500/build/wap-antisemitism/assets/dev/select7.jpg",
        cardWidth: "256px",
      },
    ],
    videos: [
      {
        id: "ScMzIvxBSi4",
        timestamps: [{ time: 0, speaker: "maya" }],
      },
    ],
  };

  const currentVideo = speakerDictionary.videos.find(
    (video) => video.id === videoID
  );

  let currentSpeaker;
  currentVideo.timestamps.forEach((timestamp) => {
    if (currentVideoTime > timestamp.time) {
      currentSpeaker = timestamp.speaker;
    }
  });

  currentSpeaker = speakerDictionary.speakers.find(
    (speaker) => speaker.id === currentSpeaker
  );

  // Update speaking card
  const speakingCard =
    event.target.h.parentNode.parentNode.querySelector(".speakingCard");
  const prevSpeaker = speakingCard.querySelector(".name").innerHTML;

  if (prevSpeaker !== currentSpeaker.name) {
    if (window.innerWidth >= 992) {
      speakingCard.style.width = currentSpeaker.cardWidth;
    }
    speakingCard.querySelector(".name").innerHTML = currentSpeaker.name;
    speakingCard.querySelector("img").alt = currentSpeaker.name;
    speakingCard.querySelector("img").src = currentSpeaker.picture;

    // Collapse card after 5 seconds
    clearTimeout(cardWidthTimeout);
    cardWidthTimeout = setTimeout(() => {
      speakingCard.style.width = speakingCard.offsetHeight + "px";
    }, 5000);
  }
}

document.querySelectorAll(".speakingCard").forEach((card) => {
  card.style.width = card.offsetHeight + "px";
});
;document.querySelectorAll(".content-warning").forEach((warning) => {
  warning.querySelector("button").addEventListener("click", () => {
    warning.classList.add("hide");
    warning.addEventListener("animationend", () => {
      warning.style.display = "none";
    });

    document.querySelector("#hideBtn").addEventListener("click", () => {
      warning.classList.remove("hide");
      warning.style.display = "flex";
    });
  });
});
;const data = {
  url: "antisemitism-iu-mezuzah-the-avenue",
  slug: "Faith over fear",
  headline: "‘We will always outlive the people who hate us’",
  title: "‘We will always outlive the people who hate us’",
  pub_date: "Dec. 16, 2022",
  bylines: {
    "Written by": {
      name: "Christina Avery",
      email: "averycm@iu.edu",
      twitter: "christym_avery",
      pfp: "https://s3.amazonaws.com/snwceomedia/ids/278a97fa-20ae-46fb-a147-3e84166568c4.sized-1000x1000.jpg",
      bio: "Christina has worked at the IDS since 2020 as a news and enterprise reporter.",
    },
    "Photos and videos by": {
      name: "Anya Heminger",
      email: "aiheming@iu.edu",
      pfp: "https://s3.amazonaws.com/snwceomedia/ids/a80ffef2-0882-41dd-a585-a464912ddc5a.sized-1000x1000.jpg",
      bio: "Anya Heminger is a photojournalism student and they are graduating in the fall of 2023.",
    },
    "Design and development by": {
      name: "Jacob Day",
      email: "jacobmday@alumni.iu.edu",
      twitter: "_jacobmday",
      pfp: "https://s.gravatar.com/avatar/1e2241c3b494e488c02e98ec554508ac?s=400",
      bio: "Jacob has worked at the IDS since 2022 as a web designer.",
    },
  },
};

// bylines
const byline_types = [
  "Written by",
  "Photos and videos by",
  "Design and development by",
  "Graphics by",
];
let bylines_html = "";
let bios_html = "";

for (let type of byline_types) {
  if (data.bylines[type]) {
    if (data.bylines[type].length) {
      data.bylines[type].forEach((author) => setAuthorBio(type, author));
    } else {
      setAuthorBio(type, data.bylines[type]);
    }
  }
}

for (let type of byline_types) {
  if (data.bylines[type]) {
    if (!data.bylines[type].length) {
      bylines_html += `<p>${type} <a target="_blank" href="https://idsnews.com/staff/${data.bylines[
        type
      ].name
        .split(" ")
        .join("-")}">${data.bylines[type].name}</a></p>`;
    } else {
      bylines_html += "<p>" + type;
      for (let index in data.bylines[type]) {
        bylines_html += ` <a target="_blank" href="https://idsnews.com/staff/${data.bylines[
          type
        ][index].name
          .split(" ")
          .join("-")}">${data.bylines[type][index].name}</a>`;
        if (
          index != data.bylines[type].length - 2 &&
          index != data.bylines[type].length - 1
        ) {
          bylines_html += ",";
        } else if (index == data.bylines[type].length - 2) {
          bylines_html += " and";
        }
      }
      bylines_html += "</p>";
    }
  }
}

function setAuthorBio(type, author) {
  let twitter_link = `<span><a href="https://twitter.com/${author.twitter}" target="_blank">Twitter <i class="fab fa-twitter"></i></a></span>`;
  let email_link = `<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a
        href="mailto:${author.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>`;
  if (author.pfp && author.bio) {
    bios_html += `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p>${type} <a href="https://idsnews.com/staff/${author.name
      .split(" ")
      .join("-")}" target="_blank">${author.name}</a></p>
                            <p>${author.bio}  ${
      author.email ? email_link : ""
    }   ${author.twitter ? twitter_link : ""}</p>
                            </div>
                        </div>
                    </div>`;
  }
}

document.querySelector("#bylines").innerHTML = bylines_html;
document.querySelector(".author-bios").innerHTML = bios_html;

// pubdate
document.querySelector("#pubdate").innerHTML = "Published " + data.pub_date;

// title & slug
document.querySelector("title").innerHTML =
  data.title + " | Indiana Daily Student";
document.querySelector("#slug").innerHTML = data.slug;

// socials
let meta_twitter = document.querySelectorAll('meta[name*="twitter"]');
let meta_og = document.querySelectorAll('meta[property*="og"]');
let fb = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;
let twitter = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fspecials.idsnews.com%2F${
  data.url
}%2F&text=${data.headline.split(" ").join("%20")}`;
let reddit = `https://www.reddit.com/submit?title=${data.headline
  .split(" ")
  .join("%20")}&url=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;

document.querySelector("li#socials").innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${reddit}" target="_blank"><i class="fab fa-reddit"></i></a>
        `;
;// ! SVG Data
const headlineData = `<svg xmlns="http://www.w3.org/2000/svg" id="xs" viewBox="0 0 368.5 246.9">
  <g id="headline-path-2">
    <g id="paths">
      <path id="comma-open"
        d="M2.45,13.07c0-5.43,1.36-8.98,4-10.03l.38,.75c-2.34,.98-3.55,4.38-3.55,9.28,0,2.04,.15,4.15,.45,6.04l-.83,.15c-.3-1.96-.45-4.07-.45-6.19Z"
        mask="url(#m-comma-open)" />
      <path id="we-w"
        d="M62.8,36c-2.72,10.94-6.94,18.41-8.68,18.41-2.34,0-3.47-11.99-8.45-30.55-2.34,15.62-9.73,30.55-11.99,30.55-1.43,0-1.58-2.94-2.94-13.05-1.96-14.64-4.83-35.68-12.3-35.68-3.47,0-5.88,4-5.88,9.58,0,9.2,5.73,14.86,9.58,14.86v.83c-4.45,0-10.41-6.11-10.41-15.69,0-6.11,2.79-10.49,6.64-10.49,8.68,0,11.39,22.93,13.65,39.53,.68,4.98,1.21,9.2,1.66,9.2,1.28,0,9.05-13.81,11.47-31.38h.83c3.62,11.47,6.64,31.38,8.15,31.38,1.13,0,5.21-7.17,7.92-17.95-4.83-3.02-7.24-10.41-7.24-19.31s2.34-15.24,5.58-15.24,4.9,5.58,4.9,14.94c0,6.94-.98,13.5-2.34,19.24,1.28,.6,2.64,.98,4.15,.98v.83c-1.58,0-3.02-.38-4.3-.98Zm-.6-1.28c1.36-5.51,2.26-11.92,2.26-18.78,0-8.75-1.58-14.03-4.07-14.03-2.34,0-4.75,5.43-4.75,14.33s2.19,15.54,6.56,18.48Z"
        mask="url(#m-we-w)" />
      <path id="we-e"
        d="M73.51,43.09c0-3.47,.6-6.64,1.58-9.2-1.58,1.43-4.3,3.09-8,3.09v-.83c4.9,0,7.92-3.09,8.9-4.37,1.28-2.34,3.02-3.77,4.83-3.77,2.26,0,3.7,1.89,3.7,4.98,0,5.51-4.15,12.67-9.2,16.37,.98,2.64,2.72,4.15,4.9,4.15,4.53,0,6.49-5.06,6.49-5.06l.75,.3s-2.11,5.66-7.24,5.66c-4.15,0-6.71-4.45-6.71-11.32Zm1.51,5.51c4.75-3.55,8.68-10.41,8.68-15.62,0-2.56-1.06-4.15-2.87-4.15-3.39,0-6.49,6.64-6.49,14.26,0,2.11,.23,3.92,.68,5.51Z"
        mask="url(#m-we-e)" />
      <path id="will-w"
        d="M116.1,35.48c0,3.09,1.28,3.7,1.51,3.85l-.53,.6c-.3-.15-1.81-1.13-1.81-4.53s1.81-7.39,3.47-7.39,2.04,3.85,2.94,11.24c.91,6.56,1.81,14.26,3.77,14.26,2.41,0,5.43-13.2,6.71-19.24h.83c1.36,7.85,3.62,19.24,5.88,19.24s4.98-10.49,5.66-16.82c-3.17-.83-5.36-3.39-5.36-6.49,0-2.04,1.21-3.62,2.87-3.62,2.26,0,3.47,2.79,3.47,7.39,0,.6,0,1.28-.08,2.04,.45,.08,.91,.15,1.43,.15v.83c-.53,0-1.06-.08-1.51-.15-.75,6.71-3.47,17.58-6.49,17.58s-4.83-9.96-6.34-18.33c-1.66,8.37-4.22,18.33-7.09,18.33-2.49,0-3.39-5.43-4.6-15.46-.68-5.51-1.28-10.11-2.11-10.11-.98,0-2.64,3.62-2.64,6.64Zm28.52,.38l.08-1.66c0-4.6-1.06-6.79-2.64-6.79-1.21,0-2.04,1.21-2.04,2.79,0,2.72,1.81,4.9,4.6,5.66Z"
        mask="url(#m-will-w)" />
      <path id="will-i"
        d="M156.77,42.64c0,6.87,.68,10.86,2.94,10.86v.9c-2.94,0-3.77-4.07-3.77-11.62,0-4.75,.3-9.81,.53-12.75-.15,.38-.38,.83-.6,1.28-1.81,3.39-4.9,5.66-8.98,5.66v-.83c4.68,0,8-3.24,9.58-7.85h.83c-.3,5.43-.53,10.33-.53,14.33Zm1.06-29.19l.98,.08-.75,6.87h-.83l.6-6.94Z"
        mask="url(#m-will-i)" />
      <path id="will-l1"
        d="M168.84,44.15c-3.24,6.11-6.64,10.26-9.13,10.26v-.9c2.11,0,5.73-4.38,8.9-10.79-.68-3.92-.91-8.6-.91-13.13,0-14.56,2.26-24.82,6.19-24.82,2.26,0,3.24,2.87,3.24,8.9,0,9.43-3.55,20.9-7.69,29.27,.98,6.19,2.79,10.56,5.58,10.56v.9c-3.17,0-5.13-4.3-6.19-10.26Zm.38-2.79c3.85-7.92,7.09-18.78,7.09-27.76,0-5.43-.83-7.92-2.41-7.92-3.09,0-5.36,9.66-5.36,23.91,0,4.15,.23,8.22,.68,11.77Z"
        mask="url(#m-will-l1)" />
      <path id="will-l2"
        d="M184.15,44.15c-3.24,6.11-6.64,10.26-9.13,10.26v-.9c2.11,0,5.73-4.38,8.9-10.79-.68-3.92-.91-8.6-.91-13.13,0-14.56,2.26-24.82,6.19-24.82,2.26,0,3.24,2.87,3.24,8.9,0,9.43-3.55,20.9-7.69,29.27,.98,6.19,2.79,10.56,5.58,10.56,2.41,0,3.39-3.7,3.47-4.07l.75,.3c-.15,.75-1.36,4.68-4.22,4.68-3.17,0-5.13-4.3-6.19-10.26Zm.38-2.79c3.85-7.92,7.09-18.78,7.09-27.76,0-5.43-.83-7.92-2.41-7.92-3.09,0-5.36,9.66-5.36,23.91,0,4.15,.23,8.22,.68,11.77Z"
        mask="url(#m-will-l2)" />
      <path id="always-a1"
        d="M237.21,44.23c0,6.04,.75,9.28,3.09,9.28v.9c-3.09,0-3.92-3.92-3.92-10.18,0-2.87,.23-6.41,.38-10.03l-.53,2.26c-1.89,7.02-5.51,17.95-9.66,17.95-2.72,0-4.9-5.43-4.9-11.69,0-8.22,2.72-15.39,9.13-15.39,2.79,0,5.36,1.06,7.02,2.72-.3,5.43-.6,10.34-.6,14.18Zm-10.64,9.28c4.68,0,9.73-19.61,10.33-23.24-1.58-1.21-3.62-2.11-6.11-2.11-5.88,0-8.3,6.87-8.3,14.56,0,5.81,1.96,10.79,4.07,10.79Z"
        mask="url(#m-always-a1)" />
      <path id="always-l"
        d="M249.43,44.15c-3.24,6.11-6.64,10.26-9.13,10.26v-.9c2.11,0,5.73-4.38,8.9-10.79-.68-3.92-.91-8.6-.91-13.13,0-14.56,2.26-24.82,6.19-24.82,2.26,0,3.24,2.87,3.24,8.9,0,9.43-3.55,20.9-7.69,29.27,.98,6.19,2.79,10.56,5.58,10.56v.9c-3.17,0-5.13-4.3-6.19-10.26Zm.38-2.79c3.85-7.92,7.09-18.78,7.09-27.76,0-5.43-.83-7.92-2.41-7.92-3.09,0-5.36,9.66-5.36,23.91,0,4.15,.23,8.22,.68,11.77Z"
        mask="url(#m-always-l)" />
      <path id="always-w"
        d="M263.38,38.79c-2.34,7.92-4.45,15.62-7.77,15.62v-.9c2.64,0,4.9-7.77,6.86-14.64,2.04-6.86,3.17-10.86,4.75-10.86,1.74,0,2.04,3.85,2.94,11.24,.91,6.56,1.81,14.26,3.77,14.26,2.41,0,5.43-13.2,6.71-19.24h.83c1.36,7.85,3.62,19.24,5.88,19.24s4.98-10.49,5.66-16.82c-3.17-.83-5.36-3.39-5.36-6.49,0-2.04,1.21-3.62,2.87-3.62,2.26,0,3.47,2.79,3.47,7.39,0,.6,0,1.28-.08,2.04,.45,.08,.91,.15,1.43,.15v.83c-.53,0-1.06-.08-1.51-.15-.75,6.71-3.47,17.58-6.49,17.58s-4.83-9.96-6.34-18.33c-1.66,8.37-4.22,18.33-7.09,18.33-2.49,0-3.39-5.43-4.6-15.46-.68-5.51-1.28-10.11-2.11-10.11-.91,0-2.26,4.68-3.85,9.96Zm29.72-2.94l.08-1.66c0-4.6-1.06-6.79-2.64-6.79-1.21,0-2.04,1.21-2.04,2.79,0,2.72,1.81,4.9,4.6,5.66Z"
        mask="url(#m-always-w)" />
      <path id="always-a2"
        d="M317.62,44.23c0,6.04,.75,9.28,3.09,9.28v.9c-3.09,0-3.92-3.92-3.92-10.18,0-2.87,.23-6.41,.38-10.03l-.53,2.26c-1.89,7.02-5.51,17.95-9.66,17.95-2.72,0-4.9-5.43-4.9-11.69,0-3.24,.45-6.34,1.36-8.9-1.58,1.43-4.3,3.17-8.07,3.17v-.83c5.05,0,8.07-3.32,9.05-4.45,1.43-2.72,3.7-4.37,6.79-4.37,2.79,0,5.36,1.06,7.02,2.72-.3,5.43-.6,10.34-.6,14.18Zm-10.64,9.28c4.68,0,9.73-19.61,10.33-23.24-1.58-1.21-3.62-2.11-6.11-2.11-5.88,0-8.3,6.87-8.3,14.56,0,5.81,1.96,10.79,4.07,10.79Z"
        mask="url(#m-always-a2)" />
      <path id="always-y"
        d="M345.91,50.86c0,14.33-.08,26.03-7.17,26.03-2.87,0-4.9-2.19-4.9-5.2,0-4.38,4.45-10.71,11.24-18.71v-2.26c0-4.98,0-9.73,.3-14.56l.08-1.36c-2.72,10.41-6.34,19.61-10.26,19.61-3.24,0-4-3.7-4-10.79,0-4.3,.23-9.58,.38-12.52l-.45,2.04c-2.19,7.85-6.11,21.27-10.41,21.27v-.9c4,0,8.9-17.05,10.86-25.2h.83c-.23,6.11-.38,10.26-.38,15.46,0,6.56,.68,9.73,3.17,9.73,3.39,0,7.92-10.56,11.01-25.2h.75l-.38,1.73c-.68,6.87-.68,14.11-.68,20.82Zm-7.17,25.2c5.73,0,6.26-9.58,6.34-21.65-6.41,7.39-10.41,13.28-10.41,17.28,0,2.56,1.66,4.37,4.07,4.37Z"
        mask="url(#m-always-y)" />
      <path id="always-s"
        d="M358.43,33.29c-1.28-2.04-2.19-4-2.19-5.66,0-1.89,.91-3.09,2.26-3.09,1.28,0,2.11,.98,2.11,2.79s-.45,3.62-1.28,5.88c2.87,4.6,7.47,10.03,7.47,14.94,0,3.77-2.11,6.26-5.36,6.26-2.41,0-4.07-1.21-4.98-2.79l.75-.45c.68,1.36,2.19,2.34,4.22,2.34,2.72,0,4.53-2.04,4.53-5.36,0-4.45-4.15-9.51-7.02-13.96-2.19,4.9-6.41,11.17-13.13,19.31l-.53-.68c6.79-8.22,11.09-14.56,13.13-19.54Zm.38-.98c.68-1.89,.98-3.55,.98-4.98,0-1.28-.45-1.96-1.28-1.96s-1.43,.91-1.43,2.19c0,1.43,.68,3.02,1.74,4.75Z"
        mask="url(#m-always-s)" />
      <path id="outlive-o"
        d="M31.86,130.49c.08,1.06,.15,2.19,.15,3.32,0,8.68-3.09,14.18-7.92,14.18s-7.85-5.43-7.85-13.05,3.55-13.35,7.85-13.35c.45,0,1.06,.08,1.51,.3,.38-.98,1.13-1.58,1.96-1.58,2.04,0,3.7,4,4.22,9.35,.38,.08,.75,.08,1.13,.08v.83l-1.06-.08Zm-7.77,16.6c4.3,0,7.09-5.13,7.09-13.28,0-1.21-.08-2.34-.15-3.47-3.62-.75-5.66-3.7-5.66-6.94l.08-.75c-.45-.15-.91-.23-1.36-.23-3.77,0-7.02,5.81-7.02,12.52,0,7.09,2.94,12.15,7.02,12.15Zm6.86-17.58c-.6-4.68-1.96-8.3-3.39-8.3-.75,0-1.36,.91-1.36,2.19,0,2.72,1.66,5.28,4.75,6.11Z"
        mask="url(#m-outlive-o)" />
      <path id="outlive-u"
        d="M56.6,136.23c0,6.87,.68,10.86,2.94,10.86v.9c-2.94,0-3.77-4.07-3.77-11.62,0-3.62,.15-7.39,.38-10.34-2.87,11.84-6.87,21.95-10.86,21.95-3.24,0-4-3.77-4-10.86,0-4.3,.23-10.94,.45-13.5-1.51,3.62-4.6,6.94-8.83,6.94v-.83c4.38,0,7.32-3.92,8.75-7.85h.83c-.23,6.11-.38,11.09-.38,15.09,0,7.09,.68,10.11,3.17,10.11,3.32,0,7.77-10.18,11.01-25.2h.83c-.3,5.43-.53,10.33-.53,14.33Z"
        mask="url(#m-outlive-u)" />
      <path id="outlive-t"
        d="M70.79,118.2h1.28c2.26,0,4.22-.23,5.43-1.06l.38,.75c-1.28,.98-3.62,1.13-5.88,1.13h-1.21c-.08,1.13-.08,2.11-.15,3.02-.15,3.32-.3,6.41-.3,9.35,0,10.34,1.43,15.69,4.22,15.69v.9c-3.47,0-5.05-5.51-5.05-16.52v-2.64c-.08,.53-.15,1.06-.23,1.58-1.66,8.6-5.73,17.58-9.73,17.58v-.9c4.15,0,9.43-13.35,10.26-25.2l.15-2.94c-1.28,0-2.56-.08-3.55-.08-1.28,0-2.26,.08-2.87,.38l-.3-.83c.75-.3,1.96-.38,3.24-.38,1.06,0,2.26,.08,3.55,.08l.38-8.83,.83,.08-.45,8.83Z"
        mask="url(#m-outlive-t)" />
      <path id="outlive-l"
        d="M83.68,137.74c-3.24,6.11-6.64,10.26-9.13,10.26v-.9c2.11,0,5.73-4.38,8.9-10.79-.68-3.92-.91-8.6-.91-13.13,0-14.56,2.26-24.82,6.19-24.82,2.26,0,3.24,2.87,3.24,8.9,0,9.43-3.55,20.9-7.69,29.27,.98,6.19,2.79,10.56,5.58,10.56v.9c-3.17,0-5.13-4.3-6.19-10.26Zm.38-2.79c3.85-7.92,7.09-18.78,7.09-27.76,0-5.43-.83-7.92-2.41-7.92-3.09,0-5.36,9.66-5.36,23.91,0,4.15,.23,8.22,.68,11.77Z"
        mask="url(#m-outlive-l)" />
      <path id="outlive-i"
        d="M99.98,136.23c0,6.87,.68,10.86,2.94,10.86v.9c-2.94,0-3.77-4.07-3.77-11.62,0-2.87,.08-5.88,.23-8.45l-.3,1.73c-1.74,8.9-5.73,18.33-9.2,18.33v-.9c3.47,0,8.6-13.65,9.81-25.2h.83c-.3,5.43-.53,10.33-.53,14.33Zm1.06-29.19l.98,.08-.75,6.87h-.83l.6-6.94Z"
        mask="url(#m-outlive-i)" />
      <path id="outlive-ve"
        d="M145.01,148c-3.55,0-5.96-3.17-6.64-8.37h-.68c-3.47,0-6.19-1.28-8.22-3.47-1.51,6.11-4,11.84-6.34,11.84-2.64,0-4-6.86-5.88-16.67-1.06-4.9-1.89-8.9-2.72-8.9-.91,0-2.26,4.68-3.85,9.96-2.34,7.92-4.45,15.62-7.77,15.62v-.9c2.64,0,4.9-7.77,6.86-14.64,2.04-6.86,3.17-10.86,4.75-10.86,1.74,0,2.41,4.15,3.92,11.69,1.36,6.64,2.79,13.81,4.75,13.81,1.73,0,4.15-5.73,5.58-11.69-1.89-2.49-2.87-5.81-2.87-9.51,0-3.24,.98-5.43,2.72-5.43s2.41,1.89,2.41,5.28c0,2.49-.53,5.96-1.28,9.43,1.81,2.26,4.53,3.62,7.92,3.62h.6c-.08-.68-.08-1.36-.08-2.11,0-8.22,3.39-15.09,7.47-15.09,2.19,0,3.62,1.89,3.62,4.98,0,6.49-4.53,12.07-10.11,12.9,.6,4.75,2.79,7.62,5.81,7.62,4.53,0,6.49-5.06,6.49-5.06l.75,.3s-2.11,5.66-7.24,5.66Zm-15.92-13.73c.68-3.09,1.13-6.19,1.13-8.45,0-3.02-.6-4.53-1.58-4.53-1.06,0-1.89,1.81-1.89,4.6,0,3.17,.83,6.11,2.34,8.37Zm10.03,4.37c5.13-.83,9.35-5.96,9.35-12.07,0-2.56-1.06-4.15-2.79-4.15-3.47,0-6.64,6.64-6.64,14.26,0,.68,0,1.36,.08,1.96Z"
        mask="url(#m-outlive-ve)" />
      <path id="the-t"
        d="M173.23,118.2h1.28c2.26,0,4.22-.23,5.43-1.06l.38,.75c-1.28,.98-3.62,1.13-5.88,1.13h-1.21c-.08,1.13-.08,2.11-.15,3.02-.15,3.32-.3,6.41-.3,9.35,0,10.34,1.43,15.69,4.22,15.69v.9c-3.47,0-5.05-5.51-5.05-16.52,0-3.02,.08-6.04,.3-9.43l.15-3.09c-1.28,0-2.56-.08-3.55-.08-1.28,0-2.26,.08-2.87,.38l-.3-.83c.75-.3,1.96-.38,3.24-.38,1.06,0,2.26,.08,3.55,.08l.38-8.83,.83,.08-.45,8.83Z"
        mask="url(#m-the-t)" />
      <path id="the-h"
        d="M199.93,139.62c0-4.07,.45-8.22,.45-12,0-3.02-.3-5.2-1.66-5.2-3.62,0-9.66,10.79-12.15,25.27h-.75c0-4.22,.08-8.68,.08-13.2l-.9,2.11c-3.32,7.77-5.73,11.39-8,11.39v-.9c1.81,0,4.15-3.62,7.32-11.01l1.58-3.85c.08-3.77,.08-7.47,.08-10.94,0-14.56,2.04-22.93,6.04-22.93,1.96,0,3.17,1.81,3.17,4.83,0,5.51-3.92,18.18-8.45,29.35l-.15,11.32c3.02-13.58,8.3-22.26,12.22-22.26,2.11,0,2.41,2.79,2.41,6.11s-.45,7.7-.45,12,.6,7.39,2.94,7.39v.9c-2.94,0-3.77-3.55-3.77-8.37Zm-5.58-36.44c0-2.56-.9-3.92-2.34-3.92-3.24,0-5.2,8.22-5.2,22.03,0,2.87,0,5.81-.08,8.83,4.22-10.64,7.62-21.95,7.62-26.93Z"
        mask="url(#m-the-h)" />
      <path id="the-e"
        d="M215.62,148c-2.26,0-4.15-1.36-5.28-3.77-2.49,2.34-4.98,3.77-6.64,3.77v-.9c1.51,0,3.85-1.43,6.26-3.7-.75-1.81-1.13-4.07-1.13-6.71,0-8.22,3.39-15.09,7.39-15.09,2.26,0,3.7,1.89,3.7,5.06,0,5.58-4.45,12.52-8.98,16.97,1.06,2.26,2.64,3.47,4.68,3.47,4.53,0,6.49-5.06,6.49-5.06l.75,.3s-2.11,5.66-7.24,5.66Zm-5.05-5.2c4.3-4.22,8.52-10.79,8.52-16.14,0-2.64-1.06-4.22-2.87-4.22-3.39,0-6.56,6.56-6.56,14.26,0,2.41,.3,4.45,.91,6.11Z"
        mask="url(#m-the-e)" />
      <path id="people-p1"
        d="M236.52,129.14c0-3.92,2.11-7.54,4.37-7.54,2.11,0,2.79,2.94,2.79,8,0,2.87-.23,6.79-.45,10.56,1.58-7.85,4.98-18.56,9.66-18.56,3.09,0,5.51,5.06,5.51,11.24,0,8.07-2.56,13.28-6.49,13.28-.3,0-.83-.08-1.36-.23,.91,.53,2.57,1.21,4.75,1.21v.9c-2.72,0-4.45-1.13-5.81-2.19l.38-.75c.45,.15,1.13,.38,1.89,.38,3.47,0,5.81-4.98,5.81-12.6,0-5.66-2.19-10.41-4.68-10.41-5.28,0-9.81,19.24-9.81,25.12,0,3.62-.15,15.92-.15,22.4h-.83c0-6.49,.15-18.78,.15-22.48,0-5.66,.6-12.75,.6-18.03,0-4.15-.45-7.02-2.04-7.02s-3.47,3.02-3.47,6.71c0,2.19,.68,3.17,.68,3.17l-.75,.3s-.75-1.06-.75-3.47Z"
        mask="url(#m-people-p1)" />
      <path id="people-e1"
        d="M266.09,143.39c-3.47,2.79-7.32,4.6-10.79,4.6v-.9c3.32,0,7.17-1.81,10.49-4.6-.45-1.66-.75-3.62-.75-5.81,0-8.22,3.39-15.09,7.47-15.09,2.19,0,3.62,1.74,3.62,4.68,0,5.51-4.15,12.07-9.35,16.52,1.06,2.72,2.79,4.3,5.05,4.3v.9c-2.56,0-4.53-1.73-5.73-4.6Zm.45-1.51c4.9-4.22,8.75-10.41,8.75-15.62,0-2.41-1.06-3.85-2.79-3.85-3.47,0-6.64,6.56-6.64,14.26,0,1.96,.23,3.77,.68,5.2Z"
        mask="url(#m-people-e1)" />
      <path id="people-o"
        d="M299.06,130.49c.08,1.06,.15,2.19,.15,3.32,0,8.68-3.09,14.18-7.92,14.18-4.45,0-7.62-5.05-7.85-12.22-2.94,6.41-6.94,12.22-11.62,12.22v-.9c4.53,0,8.52-6.19,11.62-13.43,.45-6.71,3.77-12.07,7.85-12.07,.45,0,1.06,.08,1.51,.3,.38-.98,1.13-1.58,1.96-1.58,2.04,0,3.7,4,4.22,9.35,.38,.08,.75,.08,1.13,.08v.83l-1.06-.08Zm-7.77,16.6c4.3,0,7.09-5.13,7.09-13.28,0-1.21-.08-2.34-.15-3.47-3.62-.75-5.66-3.7-5.66-6.94l.08-.75c-.45-.15-.9-.23-1.36-.23-3.77,0-7.02,5.81-7.02,12.52,0,7.09,2.94,12.15,7.02,12.15Zm6.87-17.58c-.6-4.68-1.96-8.3-3.39-8.3-.75,0-1.36,.91-1.36,2.19,0,2.72,1.66,5.28,4.75,6.11Z"
        mask="url(#m-people-o)" />
      <path id="people-p2"
        d="M307.2,124.23c.83-1.58,1.36-2.64,2.34-2.64,1.28,0,1.58,1.89,1.58,5.28s-.38,8.37-.68,13.35c1.58-7.85,4.98-18.63,9.66-18.63,3.09,0,5.51,5.06,5.51,11.24,0,8.07-2.56,13.28-6.49,13.28-.3,0-.83-.08-1.36-.23,.9,.53,2.56,1.21,4.75,1.21v.9c-2.72,0-4.45-1.13-5.81-2.19l.38-.75c.45,.15,1.13,.38,1.89,.38,3.47,0,5.81-4.98,5.81-12.6,0-5.66-2.19-10.41-4.68-10.41-5.28,0-9.81,19.24-9.81,25.12,0,3.62-.15,15.92-.15,22.4h-.83c0-6.49,.15-18.78,.15-22.48,0-6.71,.83-15.84,.83-20.75,0-2.57-.23-4.3-.83-4.3-.38,0-.75,.75-1.36,1.89-1.66,3.02-3.85,6.26-8,6.26v-.83c3.85,0,5.73-3.17,7.09-5.51Z"
        mask="url(#m-people-p2)" />
      <path id="people-l"
        d="M335.42,136.45c-3.92,6.79-8.6,11.54-12.9,11.54v-.9c4.07,0,8.98-5.21,12.67-11.99-.45-3.62-.68-7.7-.68-11.92,0-15.39,2.26-24.82,6.11-24.82,2.19,0,3.39,3.09,3.39,8.52,0,8.83-3.32,19.92-7.92,28.37,.91,6.86,2.79,11.84,5.73,11.84v.9c-3.32,0-5.36-4.75-6.41-11.54Zm.45-2.64c4-7.85,7.32-18.56,7.32-27.08,0-4.68-1.06-7.47-2.56-7.47-3.02,0-5.28,9.28-5.28,23.99,0,3.62,.15,7.24,.53,10.56Z"
        mask="url(#m-people-l)" />
      <path id="people-e2"
        d="M353.75,148c-2.26,0-4.15-1.36-5.28-3.77-2.49,2.34-4.98,3.77-6.64,3.77v-.9c1.51,0,3.85-1.43,6.26-3.7-.75-1.81-1.13-4.07-1.13-6.71,0-8.22,3.39-15.09,7.39-15.09,2.26,0,3.7,1.89,3.7,5.06,0,5.58-4.45,12.52-8.98,16.97,1.06,2.26,2.64,3.47,4.68,3.47,4.53,0,6.49-5.06,6.49-5.06l.75,.3s-2.11,5.66-7.24,5.66Zm-5.05-5.2c4.3-4.22,8.52-10.79,8.52-16.14,0-2.64-1.06-4.22-2.87-4.22-3.39,0-6.56,6.56-6.56,14.26,0,2.41,.3,4.45,.91,6.11Z"
        mask="url(#m-people-e2)" />
      <path id="who-w"
        d="M31.9,219.34c0,3.09,1.28,3.7,1.51,3.85l-.53,.6c-.3-.15-1.81-1.13-1.81-4.53s1.81-7.39,3.47-7.39,2.04,3.85,2.94,11.24c.91,6.56,1.81,14.26,3.77,14.26,2.41,0,5.43-13.2,6.71-19.24h.83c1.36,7.85,3.62,19.24,5.88,19.24s4.98-10.49,5.66-16.82c-3.17-.83-5.36-3.39-5.36-6.49,0-2.04,1.21-3.62,2.87-3.62,2.26,0,3.47,2.79,3.47,7.39,0,.6,0,1.28-.08,2.04,.45,.08,.91,.15,1.43,.15v.83c-.53,0-1.06-.08-1.51-.15-.75,6.71-3.47,17.58-6.49,17.58s-4.83-9.96-6.34-18.33c-1.66,8.37-4.22,18.33-7.09,18.33-2.49,0-3.39-5.43-4.6-15.46-.68-5.51-1.28-10.11-2.11-10.11-.98,0-2.64,3.62-2.64,6.64Zm28.51,.38l.08-1.66c0-4.6-1.06-6.79-2.64-6.79-1.21,0-2.04,1.21-2.04,2.79,0,2.72,1.81,4.9,4.6,5.66Z"
        mask="url(#m-who-w)" />
      <path id="who-h"
        d="M70.9,217.37c-2.34,2.11-5.13,3.47-8.22,3.47v-.83c3.17,0,5.88-1.43,8.22-3.77v-4.45c0-14.79,2.04-23.16,6.04-23.16,1.96,0,3.17,1.81,3.17,4.83,0,7.17-2.94,17.43-8.37,23.08-.08,5.73-.15,11.84-.23,17.58,3.02-13.58,8.3-22.26,12.22-22.26,2.11,0,2.41,2.79,2.41,6.11s-.45,7.7-.45,12,.6,7.39,2.94,7.39v.9c-2.94,0-3.77-3.55-3.77-8.37,0-4.07,.45-8.22,.45-12,0-3.02-.3-5.2-1.66-5.2-3.62,0-9.66,10.79-12.15,25.27h-.75c0-6.56,.08-13.8,.15-20.59Zm8.37-23.91c0-2.56-.91-3.92-2.34-3.92-3.24,0-5.21,8.22-5.21,22.25v3.55c4.9-5.66,7.54-15.16,7.54-21.88Z"
        mask="url(#m-who-h)" />
      <path id="who-o"
        d="M110.58,220.77c.08,1.06,.15,2.19,.15,3.32,0,8.68-3.09,14.18-7.92,14.18-3.55,0-6.34-3.24-7.39-8.3-1.89,5.21-4.38,8.3-6.79,8.3v-.9c2.04,0,4.6-3.32,6.56-9.05-.15-.98-.23-2.04-.23-3.09,0-7.32,3.55-13.35,7.85-13.35,.45,0,1.06,.08,1.51,.3,.38-.98,1.13-1.58,1.96-1.58,2.04,0,3.7,4,4.22,9.35,.38,.08,.75,.08,1.13,.08,3.32,0,4.75-2.19,4.75-2.19l.6,.6s-1.66,2.41-5.36,2.41l-1.06-.08Zm-7.77,16.6c4.3,0,7.09-5.13,7.09-13.28,0-1.21-.08-2.34-.15-3.47-3.62-.75-5.66-3.7-5.66-6.94l.08-.75c-.45-.15-.91-.23-1.36-.23-3.77,0-7.02,5.81-7.02,12.52,0,7.09,2.94,12.15,7.02,12.15Zm6.86-17.58c-.6-4.68-1.96-8.3-3.39-8.3-.75,0-1.36,.91-1.36,2.19,0,2.72,1.66,5.28,4.75,6.11Z"
        mask="url(#m-who-o)" />
      <path id="hate-h"
        d="M165.16,216.39c-2.19,2.11-4.68,3.47-7.39,3.47-2.87,0-4.83-1.66-4.83-4.3,0-2.11,1.06-3.77,1.51-4.45l.75,.45c-.53,.75-1.43,2.26-1.43,3.92,0,2.19,1.58,3.55,4,3.55,2.72,0,5.21-1.43,7.39-3.77v-2.64c0-15.39,2.04-23.99,6.04-23.99,1.96,0,3.09,1.81,3.09,4.83,0,6.41-3.17,16.45-8.3,22.1l-.15,18.56c3.02-13.58,8.3-22.26,12.22-22.26,2.11,0,2.41,2.79,2.41,6.11s-.45,7.7-.45,12,.6,7.39,2.94,7.39v.9c-2.94,0-3.77-3.55-3.77-8.37,0-4.07,.45-8.22,.45-12,0-3.02-.3-5.2-1.66-5.2-3.62,0-9.66,10.79-12.15,25.27h-.75l.08-21.58Zm8.3-22.93c0-2.56-.83-3.92-2.26-3.92-3.24,0-5.21,8.45-5.21,22.78v2.04c4.6-5.58,7.47-14.86,7.47-20.9Z"
        mask="url(#m-hate-h)" />
      <path id="hate-a"
        d="M204.99,228.09c0,6.04,.75,9.28,3.09,9.28v.9c-3.09,0-3.92-3.92-3.92-10.18,0-2.87,.23-6.41,.38-10.03l-.53,2.26c-1.89,7.02-5.51,17.95-9.66,17.95-2.19,0-4-3.47-4.68-8.15-1.89,5.13-4.3,8.15-6.71,8.15v-.9c2.11,0,4.6-3.39,6.56-9.05-.08-.6-.08-1.13-.08-1.73,0-8.22,2.72-15.39,9.13-15.39,2.79,0,5.36,1.06,7.02,2.72-.3,5.43-.6,10.34-.6,14.18Zm-10.64,9.28c4.68,0,9.73-19.61,10.34-23.24-1.58-1.21-3.62-2.11-6.11-2.11-5.88,0-8.3,6.87-8.3,14.56,0,5.81,1.96,10.79,4.07,10.79Z"
        mask="url(#m-hate-a)" />
      <path id="hate-t"
        d="M219.32,208.47h1.28c2.26,0,4.22-.23,5.43-1.06l.38,.75c-1.28,.98-3.62,1.13-5.88,1.13h-1.21c-.08,1.13-.08,2.11-.15,3.02-.15,3.32-.3,6.41-.3,9.35,0,10.34,1.43,15.69,4.22,15.69v.9c-3.47,0-5.05-5.51-5.05-16.52v-2.64c-.08,.53-.15,1.06-.23,1.58-1.66,8.6-5.73,17.58-9.73,17.58v-.9c4.15,0,9.43-13.35,10.26-25.2l.15-2.94c-1.28,0-2.57-.08-3.55-.08-1.28,0-2.26,.08-2.87,.38l-.3-.83c.75-.3,1.96-.38,3.24-.38,1.06,0,2.26,.08,3.55,.08l.38-8.83,.83,.08-.45,8.83Z"
        mask="url(#m-hate-t)" />
      <path id="hate-e"
        d="M235.01,238.27c-2.26,0-4.15-1.36-5.28-3.77-2.49,2.34-4.98,3.77-6.64,3.77v-.9c1.51,0,3.85-1.43,6.26-3.7-.75-1.81-1.13-4.07-1.13-6.71,0-8.22,3.39-15.09,7.39-15.09,2.26,0,3.7,1.89,3.7,5.06,0,5.58-4.45,12.52-8.98,16.97,1.06,2.26,2.64,3.47,4.68,3.47,4.53,0,6.49-5.06,6.49-5.06l.75,.3s-2.11,5.66-7.24,5.66Zm-5.05-5.2c4.3-4.22,8.52-10.79,8.52-16.14,0-2.64-1.06-4.22-2.87-4.22-3.39,0-6.56,6.56-6.56,14.26,0,2.41,.3,4.45,.91,6.11Z"
        mask="url(#m-hate-e)" />
      <path id="us-u"
        d="M314.67,226.5c0,6.87,.68,10.86,2.94,10.86v.9c-2.94,0-3.77-4.07-3.77-11.62,0-3.55,.15-7.24,.38-10.11-3.02,11.92-6.79,21.73-10.86,21.73-3.24,0-4-3.62-4-11.09,0-4.15,.23-9.2,.45-15.01h.83c-.23,6.11-.45,11.24-.45,15.09,0,7.09,.68,10.11,3.17,10.11,3.32,0,7.54-9.66,11.01-25.2h.83v.08c-.3,5.43-.53,10.26-.53,14.26Z"
        mask="url(#m-us-u)" />
      <path id="us-s"
        d="M329.15,217.15c-1.28-2.11-2.19-4.07-2.19-5.73,0-1.81,.98-3.02,2.34-3.02,1.13,0,2.04,.98,2.04,2.56,0,1.13-.53,3.32-1.36,6.04,2.94,4.6,7.62,10.03,7.62,15.01,0,3.77-2.19,6.26-5.43,6.26-2.41,0-4.07-1.21-4.9-2.87l.68-.38c.68,1.36,2.19,2.34,4.22,2.34,2.72,0,4.6-2.04,4.6-5.36,0-4.45-4.15-9.51-7.09-14.03-2.72,8.37-8.15,20.29-12.07,20.29v-.9c3.32,0,8.9-12.15,11.54-20.22Zm.3-1.06c.68-2.19,1.06-4,1.06-5.05s-.45-1.81-1.28-1.81-1.43,.91-1.43,2.19c0,1.36,.68,2.94,1.66,4.68Z"
        mask="url(#m-us-s)" />
      <path id="comma-close"
        d="M344.69,193.61c0,5.43-1.36,8.98-4,10.03l-.38-.75c2.34-.98,3.55-4.38,3.55-9.28,0-2.04-.15-4.15-.45-6.04l.83-.15c.3,1.96,.45,4.07,.45,6.19Z"
        mask="url(#m-comma-close)" />
    </g>
  </g>
  <defs>
  <g id="headline-mask-2">
    <mask id="m-comma-open">
      <path id="mask-comma-open" d="M6.69,3.37s-2.87,1.04-3.56,5.81c-.25,2.61-.47,3.51,.16,10.04" fill="none"
        stroke="#39b54a" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-we-w">
      <path id="mask-we-w"
        d="M22.13,30.56s-3.01-.02-6.01-3.49c-1.59-1.89-3.53-5.5-3.81-9.65-.23-2.48-.5-4.04,.91-8.11,.62-1.08,1.06-2.78,3.74-3.91,1.16-.17,2.82-.88,5.29,1.76,1.27,1.55,1.95,2.86,2.6,4.34s2.35,6.28,2.97,9.47c.12,.64,.24,1.48,.45,2.4,.86,3.69,1.61,8.85,1.61,8.85l2.18,15.71s.58,4.15,.88,5.06c.23,.54,.02,.5,.65,1.02,.16-.05,.61-.09,1.61-1.45,.66-1.09,2.6-4.47,3.18-5.74s2.98-7.18,3.48-8.89,2.54-8.58,2.72-10.16c.28-1.58,1.01-5.48,1.01-5.48,.35,.6,1.06,3.57,1.06,3.57l2.31,9.61,1.61,7.49,1.68,7.29s.76,2.44,1.04,2.97c.17,.29,.45,.68,.85,.69s.94-.46,1.41-1.17,2.07-3.36,2.58-4.53,1.79-4.33,2.1-5.08c.38-.92,2.17-7.34,2.17-7.34l.38-1.62s1.71-8.94,1.68-10.67c.21-1.76,.63-10.44,.21-13.28-.3-1.96-.9-5.32-1.55-6.45-.38-.69-.8-1.7-1.73-2.12-.82-.29-1.21-.49-2.57,.36-.71,.76-1.64,2.14-2.27,4.19-.68,2.2-1.14,5.56-1.14,5.56,0,0-.46,4.93-.1,7.83,.13,1.23,.64,5.55,1.35,7.49,.34,.89,1.12,3.43,2.48,5.12,.68,.93,2.86,2.84,2.86,2.84l1.21,.68s1.73,.67,3.89,.81"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-we-e">
      <g id="mask-we-e">
        <polyline id="mask-we-e-tail"
          points="67.09 36.54 67.98 36.54 69.25 36.35 70.9 35.88 72.3 35.24 73.58 34.46 74.9 33.46 76.16 32.46"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <path id="mask-we-char-e"
          d="M75.37,48.87l1.91-1.81,2.16-2.37,1.08-1.49,1.15-1.93,.75-1.54,.77-1.82,.51-1.76,.31-1.82,.07-1.55-.07-1.22-.25-1.1-.81-1.2s-.79-.8-1.71-.87-1.87,.22-2.38,.62-1.39,1.33-1.79,1.88c-.43,.59-1.14,1.94-1.49,2.93s-1.27,3.77-1.42,5.26-.36,3.63-.25,5.07,.37,3.4,.51,3.95,.56,1.67,.56,1.67c0,0,.84,1.66,1.32,2.25s1.45,1.25,1.45,1.25c0,0,1.03,.62,1.95,.64s1.81-.04,2.51-.33,1.51-.58,2.06-1.1,1.26-1.22,1.54-1.66,1.34-2.23,1.34-2.23"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-will-w">
      <path id="mask-will-w"
        d="M117.3,39.64s-1.18-1.09-1.44-2.41c-.09-.69-.18-2.35-.09-3.09s.62-2.91,1.11-3.76,1.01-1.73,1.56-1.98c.34-.05,.87-.02,1.17,.69s.51,2,.51,2l.6,3.77,.55,4.57,.76,5.67,1.04,5.21,.84,2.34s.69,1.13,1.29,1.27c.56,.06,1.21-.16,1.61-.79s1.69-2.93,2.06-4.42c.55-1.39,1.56-5.21,1.56-5.21l1.17-4.85,.97-4.27,.45,1.89,.33,2.03,1,5.09,.96,4.18,1.03,3.15s.74,1.78,1.17,2.24c.3,.32,.74,.93,1.29,.96,.4-.02,.88-.15,1.25-.64s1.07-1.58,1.07-1.58l.96-2.38,.91-2.84,.72-2.71,.52-2.59,.58-3.31,.22-2.25,.09-2.28-.14-2.03-.34-1.71-.83-1.71s-.63-.93-1.85-.95-1.8,1.05-1.8,1.05c0,0-.68,.98-.58,2.42,.16,1.26,.5,2.33,.79,2.79s1.44,1.69,1.44,1.69c0,0,1.52,.94,1.88,1.08s1.92,.47,1.92,.47c0,0,.71,.14,1.27,.08"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-will-i">
      <g id="mask-will-i-2">
        <path id="mask-will-char-i"
          d="M146.87,36.52l2.54-.29,2.76-1.35,1.77-1.5,1.14-1.48,.8-1.51,.96-2.01,.07,1.18-.1,1.45-.3,4.51-.16,4.22-.03,2.46,.05,3.49,.17,2.79,.53,2.71,.62,1.54s.6,.75,1.02,.96c.38,.13,.58,.31,.97,.27"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <line id="mask-will-i-dot" x1="158.3" y1="13.45" x2="157.65" y2="20.13" fill="none" stroke="#39b54a"
          stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-will-l1">
      <path id="mask-will-l1"
        d="M159.7,53.97l1.48-.48,1.89-1.55,1.51-1.81,.74-1.03,.83-1.26,.95-1.45,1.15-2.1,.83-1.6,.72-1.51,.62-1.39,.63-1.53,.71-1.78,.75-1.98,.64-1.83,.48-1.45,.55-1.89,.45-1.52,.57-2.24,.42-2.05,.34-1.8,.23-1.5,.28-2.22,.21-2.47v-2.31l-.06-2.14-.19-2.1-.49-2.02s-.66-1.08-.85-1.26-.66-.5-1.18-.5-1.05,.3-1.05,.3l-.95,.85-.83,1.34-.73,1.84-.53,1.91-.44,1.88-.35,2.12-.31,2.31-.27,2.41-.16,2.43-.1,2.38-.08,2.6-.04,2.71,.04,2.44,.1,2.19,.17,2.46,.18,2.17,.24,2.14,.46,2.68,.38,2.01,.51,1.84,.61,1.77,.94,1.74,1.2,1.42,.94,.59,1.16,.19"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-will-l2">
      <path id="mask-will-l2"
        d="M175.01,53.91l1.52-.43,1.79-1.56,1.57-1.78,.74-1.03,.83-1.26,.95-1.45,1.15-2.1,.83-1.6,.72-1.51,.62-1.39,.63-1.53,.71-1.78,.75-1.98,.64-1.83,.48-1.45,.55-1.89,.45-1.52,.57-2.24,.42-2.05,.34-1.8,.23-1.5,.28-2.22,.21-2.47v-2.31l-.06-2.14-.19-2.1-.49-2.02s-.66-1.08-.85-1.26-.66-.5-1.18-.5-1.05,.3-1.05,.3l-.95,.85-.83,1.34-.73,1.84-.53,1.91-.44,1.88-.35,2.12-.31,2.31-.27,2.41-.16,2.43-.1,2.38-.08,2.6-.04,2.71,.04,2.44,.1,2.19,.17,2.46,.18,2.17,.24,2.14,.46,2.68,.38,2.01,.51,1.84,.61,1.77,.94,1.74,1.2,1.42,.94,.59,.98,.21s.89-.07,1.13-.2c.31-.16,.81-.44,.81-.44l.97-.99,.88-1.93,.24-.8"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-always-a1">
      <path id="mask-always-a1"
        d="M237.39,30.15l-1.67-1.2s-1.1-.63-2.29-.9-2.75-.37-2.75-.37c0,0-1.63,0-2.51,.5s-1.48,.67-2.26,1.56-1.45,1.88-1.45,1.88l-1.07,2.24-.61,2.21-.47,2.8-.25,2.57,.05,2.96,.25,2.26,.53,2.47,.66,1.8,.96,1.78,.75,.7,.82,.43,.52,.06,.68-.09,.64-.31,.62-.5,.68-.74,.77-1.05,.64-1,.67-1.26,.85-1.72,1-2.45,.78-2.36,.68-2.03,.64-1.94,.76-2.81,.53-2.11,.46-1.63,.35-1.42,.22,.12-.17,1.89-.22,1.66-.06,1.18-.08,1.6-.13,2.04-.06,2.34-.06,2.83,.06,2.32,.15,2.12,.38,2.34,.49,1.25,.56,.95,.64,.5,.57,.21,.68,.1"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-always-l">
      <path id="mask-always-l"
        d="M240.29,53.94l1.71-.57,1.88-1.69,1.25-1.53,.74-1.03,.83-1.26,.95-1.45,1.15-2.1,.83-1.6,.72-1.51,.62-1.39,.63-1.53,.71-1.78,.75-1.98,.64-1.83,.48-1.45,.55-1.89,.45-1.52,.57-2.24,.42-2.05,.34-1.8,.23-1.5,.28-2.22,.21-2.47v-2.31l-.06-2.14-.19-2.1-.53-2.16s-.63-1.12-.99-1.3c-.23-.11-.29-.24-1.02-.32-.52-.06-1.05,.3-1.05,.3l-.95,.85-.83,1.34-.73,1.84-.53,1.91-.44,1.88-.35,2.12-.31,2.31-.27,2.41-.16,2.43-.1,2.38-.08,2.6,.05,2.69,.04,2.42v2.23s.18,2.46,.18,2.46l.18,2.17,.24,2.14,.46,2.68,.38,2.01,.51,1.84,.69,1.68,.86,1.83,1.2,1.42,.94,.59,1.2,.18"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-always-w">
      <path id="mask-always-w"
        d="M255.6,53.91l1.59-.75,1.8-2.75,1.32-3.17,.97-2.91,1.21-4.16s.48-1.99,.96-3.14c.2-.66,.56-2.09,.85-2.74,.21-.7,.75-2.79,1.23-3.64s.79-1.95,1.34-2.21c.34-.05,.87-.02,1.17,.69s.62,2.06,.62,2.06l.48,3.7,.55,4.57,.82,5.66,.98,5.22,.84,2.34s.72,1.07,1.32,1.21c.67,.07,1.13-.13,1.58-.73s1.69-2.93,2.06-4.42c.55-1.39,1.56-5.21,1.56-5.21l1.17-4.85,1.02-4.25,.39,1.87,.33,2.03,1,5.09,1.03,3.93,.86,3.06s.84,2.13,1.27,2.59c.3,.32,.74,.85,1.29,.96,.4-.02,.88-.15,1.25-.64s1.07-1.58,1.07-1.58l.96-2.38,.96-2.75,.67-2.8,.62-2.58,.48-3.32,.22-2.25,.09-2.28-.14-2.03-.34-1.71-.72-1.68s-.74-.95-1.96-.98-1.8,1.05-1.8,1.05c0,0-.68,.98-.58,2.42,.16,1.26,.57,2.3,.86,2.76s1.41,1.67,1.41,1.67c0,0,1.48,.98,1.84,1.13s1.92,.47,1.92,.47c0,0,.74,.22,1.31,.16"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-always-a2">
      <g id="mask-always-a2-2">
        <polyline id="mask-always-char-a2"
          points="303.7 34.37 303.22 36.11 302.75 38.91 302.5 41.48 302.55 44.45 302.79 46.7 303.32 49.18 303.98 50.98 304.95 52.76 305.7 53.46 306.52 53.89 307.04 53.94 307.71 53.76 308.28 53.55 308.98 53.04 309.66 52.3 310.43 51.25 311.07 50.25 311.74 48.98 312.59 47.27 313.59 44.82 314.37 42.46 315.05 40.43 315.69 38.49 316.45 35.68 316.98 33.57 317.44 31.94 317.68 30.59 318 30.64 317.83 32.53 317.61 34.19 317.55 35.37 317.47 36.97 317.34 39.01 317.28 41.35 317.22 44.18 317.28 46.5 317.43 48.62 317.81 50.96 318.29 52.21 318.85 53.15 319.49 53.65 320.06 53.86 320.7 53.91"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-always-a2-up"
          points="295.36 36.64 297.95 36.31 301.01 35.03 303.75 33.24 304.84 31.77 305.82 30.26 307.64 28.63 309.6 27.88 311.87 27.71 314.25 28.13 316.49 29.05 317.42 29.63"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-always-y">
      <polyline id="mask-always-y"
        points="320.7 53.91 321.98 53.5 323.41 52.06 324.54 50.27 325.33 48.64 326.43 46.26 327.37 43.98 328.2 41.42 328.99 38.94 330.13 35.19 331.17 31.53 331.96 28.28 331.8 33.16 331.78 35.56 331.66 39.18 331.62 41.52 331.66 46.89 331.96 49.41 332.22 51.26 332.76 52.44 333.34 53.26 334.16 53.77 334.96 53.93 335.82 53.86 336.76 53.37 337.54 52.7 338.5 51.55 339.22 50.38 339.87 49.26 340.6 47.92 341.26 46.32 341.94 44.65 342.71 42.47 343.53 40.1 344.29 37.55 344.73 35.97 345.39 33.52 345.92 31.03 346.52 28.28 345.81 36.01 345.65 38.26 345.57 41 345.55 43.38 345.51 45.67 345.46 47.89 345.46 50.13 345.47 52.87 345.49 55.17 345.47 57.54 345.4 59.9 345.24 63.5 345 66.35 344.61 68.99 344.08 71.23 343.32 73.16 342.65 74.43 341.72 75.43 340.93 75.91 340.07 76.27 339 76.47 337.88 76.39 337.04 76.22 336.39 75.87 335.86 75.42 335.05 74.61 334.55 73.56 334.31 72.32 334.3 71.16 334.46 69.91 334.73 68.84 335.16 67.71 335.77 66.47 336.45 65.2 337.18 63.88 338.01 62.57 338.86 61.5 339.69 60.37 340.6 59.14 341.3 58.21 342.28 57 343.14 55.94 343.98 54.94 344.68 54.15 345.54 53.1"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-always-s">
      <polyline id="mask-always-s"
        points="345.54 53.1 349.08 48.68 350.18 47.25 351.27 45.81 352.28 44.46 353.54 42.71 354.9 40.67 356.22 38.52 357.44 36.29 358.65 33.84 359.6 31.12 360.11 28.86 360.22 27.05 360.05 26.07 359.59 25.34 358.96 24.96 358.11 24.92 357.53 25.28 356.89 26.07 356.63 27.35 356.63 28.21 356.86 29.16 357.12 30.02 357.66 31.12 358.31 32.32 359.27 33.91 360.13 35.28 360.99 36.39 362.01 37.9 362.87 39.23 363.85 40.78 364.69 42.26 365.54 44.13 366.18 46.06 366.4 47.75 366.38 49.23 365.97 50.73 365.28 52.03 364.41 52.95 363.55 53.52 362.24 53.88 360.98 53.93 359.77 53.68 358.85 53.39 358.16 52.91 357.45 52.22 356.76 51.32"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-outlive-o">
      <polyline id="mask-outlive-o"
        points="25.31 122.19 23.89 121.94 22.4 122.32 21.05 123.13 20.01 124.14 19.05 125.43 17.98 127.51 17.46 129.05 17.06 130.76 16.77 132.44 16.62 134.36 16.62 136.26 16.86 138.07 17.21 140.13 17.76 142.03 18.48 143.47 19.2 144.74 20.19 145.88 21.27 146.7 22.49 147.29 23.5 147.49 24.84 147.49 26.15 147.14 27.28 146.5 28.19 145.7 28.99 144.73 29.65 143.59 30.25 142.41 30.6 141.36 30.92 139.98 31.36 138.04 31.54 136.26 31.54 134.73 31.54 132.99 31.48 130.73 31.31 129.05 30.94 126.73 30.49 124.94 29.93 123.34 29.35 122.1 28.57 121.18 27.83 120.74 27.28 120.74 26.72 121 26.13 121.66 25.83 122.63 25.78 123.58 25.9 124.86 26.25 125.85 26.65 126.79 27.19 127.6 27.95 128.39 28.66 128.95 29.44 129.35 30.29 129.71 31.35 130.02 32.9 130.09"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-outlive-u">
      <polyline id="mask-outlive-u"
        points="32.9 130.09 34.57 129.93 36.63 129.18 39.11 127.23 40.75 124.77 41.68 122.86 42.04 122 42.19 123.08 42.06 124.17 41.87 127.97 41.73 131.4 41.75 133.72 41.68 136.53 41.71 139.92 41.92 142.88 42.38 144.87 42.97 146.26 43.63 146.97 44.24 147.35 44.95 147.49 45.62 147.49 46.33 147.22 47.05 146.77 47.94 145.95 48.78 144.91 49.27 143.98 50.23 142.35 50.99 140.69 51.56 139.38 52.3 137.47 52.9 135.71 53.56 133.91 54.04 132.25 54.53 130.58 55.1 128.47 55.52 126.84 56.03 124.85 56.44 123.3 56.71 121.82 56.61 125.7 56.51 127.03 56.41 128.29 56.3 130.23 56.25 131.94 56.19 134.59 56.19 137.23 56.27 139.61 56.43 142.06 56.77 144.34 57.41 146.08 57.99 146.89 58.61 147.34 59.53 147.51"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-outlive-t">
      <g id="mask-outlive-t-2">
        <polyline id="mask-outlive-t-up"
          points="59.53 147.51 60.72 147.25 62.45 145.8 64.11 143.6 64.65 142.61 65.43 141.04 66.28 139.11 67.12 136.76 67.9 134.38 68.69 131.31 69.3 128.3 69.92 124.91 70.08 123.58 70.22 121.88 70.31 119.47 70.44 117.08 70.57 115.01 70.65 112.61 70.77 110.66 70.84 109.27"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.8" />
        <polyline id="mask-outlive-t-down"
          points="70.06 123.86 69.95 129.47 69.95 132.64 69.95 134.98 70.11 137.61 70.31 139.67 70.66 142.03 71.19 143.96 71.73 145.36 72.46 146.5 73.06 147.04 73.75 147.41 74.55 147.53"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-outlive-t-cross"
          points="77.55 117.51 76.8 117.98 75.65 118.31 74.43 118.45 73 118.53 71.22 118.53 70.19 118.53 67.96 118.43 66.27 118.37 65.12 118.41 64.08 118.53 63.38 118.77"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-outlive-l">
      <path id="mask-outlive-l"
        d="M74.55,147.53l1.61-.51,1.99-1.71,1.27-1.58,.74-1.03,.83-1.26,.95-1.45,1.15-2.1,.83-1.6,.72-1.51,.62-1.39,.63-1.53,.71-1.78,.75-1.98,.64-1.83,.48-1.45,.55-1.89,.45-1.52,.57-2.24,.42-2.05,.34-1.8,.23-1.5,.28-2.22,.21-2.47v-2.31l-.06-2.14-.19-2.1-.53-2.16s-.63-1.12-.99-1.3c-.23-.11-.29-.24-1.02-.32-.52-.06-1.05,.3-1.05,.3l-.95,.85-.83,1.34-.73,1.84-.53,1.91-.44,1.88-.35,2.12-.31,2.31-.27,2.41-.16,2.43-.1,2.38-.08,2.6,.05,2.69,.04,2.42v2.23s.18,2.46,.18,2.46l.18,2.17,.24,2.14,.46,2.68,.38,2.01,.51,1.84,.69,1.68,.86,1.83,1.2,1.42,.94,.59,1.17,.22"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-outlive-i">
      <g id="mask-outlive-i-2">
        <path id="mask-outlive-char-i"
          d="M89.86,147.53l1.6-.66,1.89-2.19,1.38-2.83,1.45-3.26,1.7-5.1,1.53-6.93,.73-4.84-.09,1.39-.1,1.45-.3,4.51-.02,4.44-.05,2.67,.07,3.35,.23,2.73,.37,2.48,.7,1.59s.5,.71,.92,.91c.38,.13,.66,.29,1.05,.25"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <line id="mask-outlive-i-dot" x1="101.49" y1="107.04" x2="100.86" y2="113.84" fill="none" stroke="#39b54a"
          stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-outlive-ve">
      <path id="mask-outlive-ve"
        d="M102.91,147.5l1.63-.72,1.36-2.03,.72-1.39,.59-1.45,.45-1.21,.68-2,.63-2.08,.62-2.1,.55-1.84,.54-1.9,.6-1.97,.61-1.97,.59-1.67,.62-1.67,.73-1.19,.71-.35,.56,.18,.33,.55,.37,.92,.38,1.07,.28,1.18,.25,.98,.31,1.36,.28,1.33,.32,1.66,.33,1.67,.26,1.27,.29,1.46,.32,1.51,.29,1.35,.25,1.13,.29,1.27,.3,1.19,.45,1.48,.49,1.4,.71,1.31,.36,.61,.58,.53,.6,.19,.83-.3,.89-.8,.48-.68,.48-.77,.63-1.23,.53-1.31,.47-1.17,.47-1.34,.54-1.54,.3-1.27,.27-1.06,.5-1.8,.25-1.27,.39-1.9,.27-1.89,.12-1.51,.07-1.82v-1.49l-.14-1.31-.44-1.2-.46-.79-.71-.27-.77,.07-.63,.48-.48,.74-.36,.95-.2,1-.09,1.59,.02,1.44,.17,1.46,.3,1.36,.3,1.15,.33,.98,.51,1.17,.51,.86,.57,.93,.88,.96,.69,.69,.64,.5,.65,.43,.9,.5,.92,.4,1.24,.39,.92,.17,.94,.1h1.3l.26-.04,2.21-.42,2.36-1.06,1.86-1.47,1.24-1.34,.89-1.32,1-2,.51-1.76,.31-1.82,.07-1.55-.07-1.22-.25-1.1-.81-1.2s-.79-.8-1.71-.87-1.87,.22-2.38,.62-1.39,1.33-1.79,1.88c-.43,.59-1.06,1.7-1.58,2.95-.41,1-1.04,2.78-1.33,5.24-.18,1.49-.36,3.63-.25,5.07s.29,3.29,.51,3.95c.18,.54,.56,1.67,.56,1.67,0,0,.84,1.66,1.32,2.25s1.45,1.25,1.45,1.25c0,0,.97,.54,1.89,.61s1.65,.06,2.57-.29c.71-.27,1.45-.65,2.06-1.1s1.26-1.22,1.54-1.66,1.34-2.23,1.34-2.23"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-the-t">
      <g id="mask-the-t-2">
        <polyline id="mask-the-t-cross"
          points="180.13 117.51 179.23 117.98 178.08 118.31 176.87 118.45 175.43 118.53 173.65 118.53 172.62 118.53 170.4 118.43 168.7 118.37 167.55 118.41 166.52 118.62 165.81 118.77"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-the-t-down"
          points="173.26 109.3 173.19 111.2 173.04 113.19 172.89 115.52 172.89 117.77 172.73 120.24 172.56 123.15 172.43 125.94 172.38 128.72 172.38 131.62 172.38 134.25 172.49 136.76 172.69 139.08 172.99 141.42 173.46 143.49 174.18 145.36 174.89 146.51 175.69 147.18 176.48 147.48 176.99 147.48"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-the-h">
      <polyline id="mask-the-h"
        points="176.99 147.48 178.7 146.84 180.21 145.04 181.75 142.45 182.47 141.09 183.3 139.36 183.98 137.81 184.91 135.74 185.76 133.72 186.59 131.7 187.24 129.97 188.1 127.69 189.02 125.3 189.74 123.33 190.62 120.59 191.5 117.94 192.44 114.76 193.34 111.34 194 108.71 194.55 106 194.78 103.85 194.78 102.23 194.5 100.98 193.85 99.67 193.15 99.05 192.39 98.79 191.45 98.81 190.41 99.33 189.69 100.14 189.07 101.2 188.41 102.7 187.91 104.2 187.62 105.65 187.34 107 187.12 108.36 186.92 110.13 186.72 111.98 186.6 113.79 186.48 115.59 186.4 117.89 186.36 120.26 186.36 122.31 186.37 124.12 186.36 126.53 186.33 128.2 186.3 129.55 186.26 131.15 186.27 134.19 186.29 135.61 186.27 137.36 186.23 139.17 186.21 140.75 186.21 142.6 186.17 144.42 186.14 146.37 186.17 147.49 186.55 146.33 186.85 144.58 187.15 143.17 187.49 141.57 187.96 139.83 188.4 138.35 188.99 136.51 189.49 134.89 190.1 133.24 190.59 132.14 191.11 130.97 191.82 129.41 192.55 128.06 193.31 126.75 194.25 125.38 195.23 124.07 196.32 123.09 197.36 122.34 198.24 122.03 198.97 122.01 199.67 122.27 200.22 122.99 200.46 123.74 200.66 124.81 200.76 126.16 200.76 127.56 200.76 129.51 200.73 131.31 200.64 132.65 200.5 134.34 200.35 137.39 200.31 139.38 200.38 141.53 200.59 143.45 200.88 144.93 201.44 146.16 202.12 147.01 203.03 147.46 203.69 147.49"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-the-e">
      <path id="mask-the-e"
        d="M203.69,147.49l1.65-.36,1.84-1.01,2.89-2.16,2.45-2.71,1.73-2.05,1.44-2.14,1.12-1.8,.85-1.62,.84-2.11,.51-1.76,.44-1.72,.07-1.67-.2-1.19-.25-1.1-.69-1.27s-.91-.73-1.83-.8-1.87,.22-2.38,.62-1.39,1.33-1.79,1.88c-.43,.59-1.06,1.7-1.58,2.95-.41,1-1.04,2.78-1.33,5.24-.18,1.49-.36,3.63-.25,5.07s.29,3.29,.51,3.95c.18,.54,.56,1.67,.56,1.67,0,0,.94,1.57,1.42,2.16s1.21,1.21,1.21,1.21c0,0,1.12,.67,2.03,.74s1.65,.06,2.57-.29c.71-.27,1.45-.65,2.06-1.1s1.21-1.26,1.54-1.66,1.34-2.23,1.34-2.23"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-people-p1">
      <g id="mask-people-p1-2">
        <polyline id="mask-people-p1-down"
          points="237.59 132.44 237.08 130.97 236.9 129.44 237.05 127.56 237.4 126 237.99 124.38 238.75 123.15 239.72 122.29 240.63 122 241.39 122.09 242.06 122.51 242.57 123.35 242.87 124.53 243.09 125.9 243.2 127.22 243.2 128.4 243.2 130.36 243.13 133.11 243.02 136.04 242.87 139.22 242.78 142.11 242.7 145.74 242.65 148.02 242.65 151.02 242.63 153.28 242.57 156.02 242.57 158.61 242.57 161.9 242.52 164.58 242.5 166.67 242.47 169.92"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-people-char-p1"
          points="242.71 145.53 243.37 141.51 243.69 139.68 244.25 137.53 244.97 134.53 245.78 132.09 246.59 129.8 247.62 127.28 248.93 124.95 250.05 123.51 251.31 122.39 252.49 122 253.44 122 254.58 122.54 255.29 123.29 256.01 124.31 256.63 125.49 257.17 127.09 257.58 128.62 257.84 130.41 257.97 132.67 257.97 134.98 257.64 137.59 257.23 139.75 256.37 142.07 255.4 143.74 254.02 145.09 252.53 145.74 251.28 145.74 250.06 145.42 249.9 145.87 250.66 146.32 252.3 147.1 254.1 147.48 255.29 147.5"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-people-e1">
      <path id="mask-people-e1"
        d="M255.29,147.5l2.81-.35,4.3-1.76,2.7-1.71,3.19-2.83,1.8-1.97,1.56-1.99,1.12-1.66,.89-1.59,.92-2.02,.59-1.77,.41-1.76,.11-1.61-.05-1.34-.3-1.11-.69-1.27s-.91-.73-1.83-.8-1.87,.22-2.38,.62-1.39,1.33-1.79,1.88c-.43,.59-1.06,1.7-1.58,2.95-.41,1-1,2.77-1.33,5.24-.2,1.49-.36,3.63-.25,5.07s.3,3.32,.52,3.98c.18,.54,.55,1.64,.55,1.64,0,0,.78,1.6,1.26,2.19s1.36,1.18,1.36,1.18c0,0,.97,.64,2.03,.74"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-people-o">
      <g id="mask-people-o-2">
        <polyline id="mask-people-char-o"
          points="284.77 133.72 283.85 135.89 284.06 138.07 284.41 140.14 284.96 142.03 285.69 143.47 286.41 144.75 287.4 145.89 288.47 146.71 289.69 147.3 290.7 147.5 292.04 147.5 293.35 147.15 294.49 146.51 295.39 145.7 296.2 144.73 296.85 143.59 297.45 142.42 297.81 141.36 298.13 139.99 298.56 138.04 298.75 136.26 298.75 134.73 298.75 132.99 298.68 130.73 298.51 129.05 298.15 126.73 297.7 124.94 297.13 123.34 296.55 122.11 295.77 121.19 295.03 120.75 294.49 120.75 293.92 121 293.33 121.66 293.03 122.64 292.98 123.59 293.1 124.86 293.45 125.85 293.85 126.79 294.39 127.61 295.16 128.39 295.86 128.96 296.65 129.35 297.49 129.71 298.55 130.02 300.1 130.13"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-people-o-up"
          points="271.22 147.46 274.04 147.06 277.24 145.05 279.85 141.42 281.89 137.91 283.37 134.83 283.79 133.75 283.98 132.63 284.12 131.47 284.37 130.1 284.7 128.87 285.1 127.79 285.57 126.67 286.18 125.51 286.78 124.61 287.52 123.74 288.42 122.95 289.34 122.39 290.41 122.04 291.31 121.94 292.14 122.05 292.76 122.24"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-people-p2">
      <g id="mask-people-p2-2">
        <polyline id="mask-people-p2-down"
          points="300.1 130.13 302.46 129.8 305.09 127.94 307.36 124.72 308.62 122.5 308.98 122.02 309.83 122.02 310.29 122.58 310.64 123.96 310.64 125.1 310.64 126.24 310.64 127.74 310.64 129.95 310.45 132.9 310.34 135.82 310.19 139 310.03 142.13 309.91 145.74 309.84 148.26 309.89 151.29 309.84 153.56 309.79 156.49 309.79 159.06 309.76 162.13 309.7 164.94 309.69 166.9 309.69 169.92"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-people-char-p2"
          points="310.03 145.31 310.69 141.3 311.02 139.46 311.58 137.31 312.29 134.31 313.11 131.87 313.91 129.59 314.94 127.06 316.26 124.74 317.56 123.26 318.76 122.27 319.92 121.92 320.91 122.07 321.94 122.65 322.61 123.38 323.28 124.35 323.83 125.53 324.47 127.15 324.81 128.67 325.08 130.5 325.18 132.7 325.12 134.93 324.87 137.45 324.44 139.62 323.69 141.86 322.6 143.73 321.53 144.79 320.14 145.61 318.72 145.69 317.39 145.21 317.23 145.65 318 146.22 319.59 147.01 321.26 147.46 322.51 147.52"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-people-l">
      <path id="mask-people-l"
        d="M322.51,147.52l2.09-.36,2.52-1.35,2.4-2.09,1.07-1.14,.86-.98,.89-1.23,.99-1.41,1.28-1.97,.95-1.74,.7-1.15,.47-1.08,.75-1.52,.76-1.78,.77-1.8,.67-1.78,.51-1.53,.61-1.8,.45-1.53,.63-2.23,.46-1.98,.4-1.77,.23-1.5,.28-2.22,.21-2.47,.15-2.3-.1-2.21s-.19-1.53-.3-2.03c-.12-.55-.62-2.18-.62-2.18,0,0-.63-1.06-.99-1.23-.23-.11-.19-.28-.92-.36-.52-.06-1.33,.4-1.33,.4l-.74,.76-.88,1.44-.66,1.77-.53,1.89-.39,1.86-.35,2.12-.31,2.31-.27,2.41-.16,2.43-.1,2.38-.08,2.6,.05,2.69,.04,2.42v2.23s.18,2.46,.18,2.46l.24,2.16,.26,2.1,.48,2.72,.39,2.01,.51,1.81,.6,1.71,.86,1.83,1.2,1.42,.93,.52,1.2,.28"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-people-e2">
      <polyline id="mask-people-e2"
        points="341.82 147.52 343.8 147.07 346.34 145.5 349.36 142.76 351.21 140.65 353.57 137.46 355.3 134.47 356.76 131.11 357.61 127.51 357.61 124.93 356.98 123.43 355.89 122.39 354.47 122.05 352.72 122.39 350.9 123.93 349.06 127.13 347.98 130.45 347.58 133.08 347.36 136.31 347.36 138.95 347.78 141.26 348.26 142.68 349.28 144.92 350.49 146.37 351.8 147.24 353.37 147.52 354.89 147.43 356.9 146.63 358.68 145.13 359.98 143.37 360.62 142.16"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-who-w">
      <path id="mask-who-w"
        d="M33.09,223.53s-1.18-1.09-1.44-2.41c-.09-.69-.18-2.35-.09-3.09s.62-2.91,1.11-3.76,1.01-1.73,1.56-1.98c.34-.05,.87-.02,1.17,.69s.51,2,.51,2l.6,3.77,.55,4.57,.76,5.67,1.04,5.21,.84,2.34s.69,1.13,1.29,1.27c.56,.06,1.21-.16,1.61-.79s1.69-2.93,2.06-4.42c.55-1.39,1.56-5.21,1.56-5.21l1.17-4.85,.97-4.27,.45,1.89,.33,2.03,1,5.09,.96,4.18,1.03,3.15s.74,1.78,1.17,2.24c.3,.32,.74,.93,1.29,.96,.4-.02,.88-.15,1.25-.64s1.07-1.58,1.07-1.58l.96-2.38,.91-2.84,.72-2.71,.52-2.59,.58-3.31,.22-2.25,.09-2.28-.14-2.03-.34-1.71-.83-1.71s-.63-.93-1.85-.95-1.8,1.05-1.8,1.05c0,0-.68,.98-.58,2.42,.16,1.26,.5,2.33,.79,2.79s1.44,1.69,1.44,1.69c0,0,1.52,.94,1.88,1.08s1.92,.47,1.92,.47c0,0,.72,.14,1.28,.08"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-who-h">
      <polyline id="mask-who-h"
        points="62.67 220.42 65.14 220.05 67.58 219.15 69.79 217.74 71.34 216.36 72.77 214.61 73.87 213.13 75.27 210.83 76.47 208.22 77.61 205.29 78.6 201.77 79.16 199.06 79.53 196.28 79.62 194.08 79.61 192.49 79.48 191.25 78.83 189.94 78.13 189.33 77.37 189.07 76.43 189.09 75.53 189.46 74.56 190.45 73.97 191.54 73.39 192.97 72.88 194.48 72.6 195.92 72.32 197.28 72.09 198.63 71.9 200.4 71.7 202.25 71.58 204.06 71.46 205.86 71.38 208.17 71.33 210.54 71.33 212.59 71.35 214.4 71.33 216.81 71.31 218.47 71.28 219.83 71.23 221.43 71.25 224.47 71.27 225.88 71.25 227.63 71.21 229.44 71.19 231.03 71.19 232.87 71.15 234.7 71.12 236.65 71.15 237.77 71.52 236.61 71.83 234.86 72.13 233.44 72.47 231.85 72.94 230.11 73.37 228.63 73.96 226.79 74.47 225.16 75.08 223.52 75.57 222.42 76.09 221.24 76.8 219.69 77.53 218.33 78.29 217.02 79.23 215.66 80.21 214.34 81.3 213.37 82.33 212.61 83.22 212.31 83.95 212.29 84.65 212.54 85.18 213.38 85.44 214.01 85.64 215.09 85.74 216.43 85.74 217.83 85.74 219.79 85.61 221.79 85.48 223.13 85.47 224.62 85.32 227.67 85.29 229.66 85.36 231.8 85.57 233.72 85.86 235.21 86.3 236.39 87.09 237.29 87.62 237.63 88.62 237.8"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-who-o">
      <g id="mask-who-o-2">
        <polyline id="mask-who-char-o"
          points="96.45 228.88 95.88 230.08 95.92 230.41 96.48 232.31 97.2 233.75 97.92 235.02 98.91 236.16 99.98 236.98 101.21 237.57 102.21 237.77 103.55 237.77 104.86 237.42 106 236.78 106.91 235.98 107.71 235.01 108.36 233.87 108.97 232.69 109.32 231.64 109.64 230.26 110.07 228.32 110.26 226.54 110.26 225.01 110.26 223.27 110.19 221.01 110.03 219.33 109.66 217.01 109.21 215.22 108.65 213.62 108.06 212.38 107.28 211.46 106.54 211.02 106 211.02 105.43 211.28 104.84 211.94 104.55 212.91 104.49 213.86 104.61 215.14 104.96 216.13 105.37 217.06 105.9 217.88 106.67 218.67 107.38 219.23 108.16 219.63 109 219.99 110.07 220.3 111.04 220.37 112.27 220.37 113.23 220.26 114.2 219.95 115.27 219.39 116.14 218.65 117.03 217.74 117.94 216.56 118.73 215.29 119.51 213.93"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-who-o-up"
          points="88.62 237.8 90.55 237.17 92.88 234.39 94.32 231.6 95.57 228.6 95.41 225.09 95.46 224.05 95.49 222.9 95.63 221.74 95.88 220.37 96.22 219.14 96.62 218.06 97.08 216.95 97.69 215.78 98.3 214.89 99.04 214.01 99.93 213.22 100.85 212.67 101.93 212.32 102.83 212.21 103.65 212.32 104.27 212.51"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-hate-h">
      <polyline id="mask-hate-h"
        points="154.76 211.39 153.87 212.97 153.3 215.14 153.43 216.62 154.16 218.04 155.69 219.12 157.56 219.47 160.05 219.15 162.02 218.29 163.28 217.38 165.04 215.98 166.47 214.37 167.58 212.9 168.98 210.64 170.23 208.11 171.43 205.21 172.61 201.75 173.24 199.06 173.71 196.33 173.85 194.06 173.84 192.46 173.66 191.29 173.06 189.99 172.38 189.37 171.65 189.06 170.58 189.11 169.63 189.59 168.88 190.46 168.2 191.52 167.62 192.95 167.12 194.45 166.83 195.9 166.55 197.25 166.33 198.61 166.13 200.38 165.93 202.23 165.81 204.04 165.69 205.84 165.61 208.14 165.57 210.52 165.57 212.56 165.58 214.37 165.57 216.79 165.54 218.45 165.51 219.8 165.47 221.41 165.48 224.45 165.5 225.86 165.48 227.61 165.44 229.42 165.42 231.01 165.42 232.85 165.38 234.67 165.35 236.62 165.38 237.75 165.76 236.59 166.06 234.84 166.36 233.42 166.71 231.83 167.17 230.09 167.61 228.6 168.2 226.76 168.7 225.14 169.33 223.58 169.8 222.4 170.32 221.22 171 219.83 171.76 218.31 172.53 217 173.46 215.64 174.5 214.33 175.54 213.34 176.57 212.59 177.45 212.29 178.18 212.26 178.96 212.55 179.44 213.3 179.67 213.99 179.87 215.07 179.97 216.41 179.97 217.81 179.97 219.76 179.9 221.77 179.84 223.13 179.71 224.6 179.61 227.65 179.52 229.64 179.59 231.78 179.8 233.7 180.09 235.18 180.61 236.35 181.32 237.18 181.79 237.56 182.95 237.78"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-hate-a">
      <g id="mask-hate-a-2">
        <polyline id="mask-hate-char-a"
          points="190.08 230.53 190.72 232.97 191.28 234.8 192.24 236.33 192.99 237.28 193.81 237.71 194.43 237.77 194.93 237.68 195.83 237.34 196.27 236.86 196.86 236.41 197.94 234.94 198.52 233.99 199.22 232.65 199.88 231.09 200.88 228.64 201.78 226.26 202.34 224.25 202.98 222.31 203.74 219.5 204.27 217.39 204.73 215.76 204.97 214.41 205.3 214.46 205.13 216.35 204.91 218.02 204.84 219.19 204.76 220.8 204.63 222.83 204.57 225.17 204.51 228 204.57 230.32 204.72 232.45 205.1 234.78 205.59 236.03 206.15 236.98 206.78 237.47 207.35 237.68 208.07 237.77"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-hate-a-up"
          points="182.95 237.78 184.85 237.18 187.48 233.99 189.83 229.48 189.87 227.41 189.87 224.8 190.26 221.41 190.86 218.49 192.33 215.13 194.34 212.86 196.46 211.79 198.5 211.59 200.59 211.79 202.09 212.18 203.65 212.81 204.98 213.71"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-hate-t">
      <g id="make-hate-t">
        <polyline id="mask-hate-t-up"
          points="208.07 237.77 209.62 237.44 211.32 235.79 212.65 233.92 213.19 232.93 213.97 231.35 214.82 229.43 215.66 227.07 216.44 224.7 217.23 221.62 217.84 218.62 218.46 215.23 218.62 213.9 218.76 212.2 218.85 209.79 218.98 207.4 219.11 205.33 219.19 202.93 219.31 200.97 219.38 199.58"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-hate-t-down"
          points="218.6 214.18 218.49 219.78 218.49 222.95 218.49 225.29 218.65 227.92 218.85 229.98 219.2 232.34 219.73 234.28 220.27 235.67 221 236.82 221.79 237.44 222.48 237.74 223.08 237.82"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
        <polyline id="mask-hate-t-cross"
          points="226.09 207.83 225.25 208.27 224.19 208.63 222.97 208.77 221.54 208.84 219.76 208.84 218.73 208.84 216.5 208.75 214.81 208.69 213.66 208.73 212.62 208.84 211.92 209.09"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
      </g>
    </mask>
    <mask id="m-hate-e">
      <polyline id="mask-hate-e"
        points="223.08 237.82 225.01 237.29 226.7 236.29 228.71 234.85 230.85 232.75 232.76 230.51 234.7 228.01 236.53 224.92 237.92 221.88 238.75 218.49 238.9 215.79 238.25 213.69 237 212.55 235.01 212.26 233.3 213.15 231.6 214.98 230.31 217.43 229.25 220.65 228.69 223.88 228.69 227.29 229.04 231.19 229.54 233.13 230.62 235.43 231.87 236.74 233.75 237.66 235.51 237.8 237.09 237.45 238.58 236.7 240.37 235.02 241.72 232.79"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-us-u">
      <polyline id="mask-us-u"
        points="300.21 212.31 300.21 213.46 300.07 214.54 299.99 218.47 299.89 221.84 299.77 224.1 299.69 226.91 299.87 230.33 300.08 233.35 300.54 235.31 301.01 236.41 301.48 237.11 302.21 237.59 303.01 237.75 303.64 237.77 304.35 237.6 305.07 237.15 305.96 236.33 306.8 235.28 307.37 234.29 308.24 232.72 309 231.07 309.57 229.76 310.31 227.84 310.95 226.17 311.58 224.29 312.06 222.63 312.55 220.95 313.12 218.84 313.54 217.22 314.05 215.22 314.45 213.67 314.75 212.06 314.63 216.08 314.52 217.4 314.43 218.66 314.32 220.6 314.26 222.31 314.21 224.97 314.2 227.6 314.28 229.99 314.44 232.43 314.87 234.67 315.54 236.44 316.08 237.16 316.63 237.59 317.6 237.77"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-us-s">
      <polyline id="mask-us-s"
        points="317.6 237.77 319.35 237.22 321.55 234.49 322.51 233.16 323.19 231.9 324.13 230.25 324.97 228.57 325.78 226.87 326.66 224.82 327.6 222.67 328.41 220.26 329.36 217.55 330.19 214.79 330.73 212.63 330.96 210.91 330.79 209.93 330.32 209.2 329.69 208.82 328.96 208.82 328.26 209.14 327.6 210.05 327.36 211.21 327.36 212.06 327.6 213.02 327.85 213.88 328.4 214.98 329.04 216.18 330.01 217.76 330.87 219.14 331.73 220.25 332.74 221.76 333.6 223.09 334.58 224.64 335.43 226.12 336.27 227.99 336.92 229.92 337.22 231.63 337.12 233.09 336.77 234.67 336.1 235.92 335.15 236.81 334.28 237.37 332.82 237.78 331.71 237.78 330.57 237.62 329.59 237.24 328.9 236.77 328.18 236.08 327.6 235.19"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
    <mask id="m-comma-close">
      <polyline id="mask-comma-close"
        points="343.85 187.27 344.06 189.67 344.26 192.15 344.15 195.65 344 197.31 343.51 199.46 342.96 200.85 342.12 202.11 341.1 202.98 340.51 203.26"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" />
    </mask>
  </g>
  </defs>
</svg>`;

const audioQuote = `<svg id="audio-quote" xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 524.59 115.91">
  <g id="audio-quote-path">
    <g id="audio-paths">
      <path id="i-i" mask="url(#m-i-i)"
        d="M5.98,30.26c0-9.5,8.3-22.2,14.4-22.2,4.9,0,6.8,11.6,6.8,30.8,0,26.3-3.6,40.2-11.2,40.2-4.7,0-7.1-4.3-7.1-9.6h1.7c0,4.2,1.7,7.9,5.4,7.9,6.1,0,9.5-13.7,9.5-38.5,0-18.9-2-29.1-5.3-29.1-4.8,0-12.5,11.9-12.5,20.5,0,4.3,2.2,6.9,4.7,6.9v1.7c-3.6,0-6.4-3.3-6.4-8.6Z" />
      <path id="love-l" mask="url(#m-love-l)"
        d="M54.78,61.86c-1.6,1.5-3.3,2.3-5,2.3-6.5,0-6.6-7.9-6.6-7.9h1.7s.1,6.2,4.9,6.2c1.6,0,3.2-1,4.8-2.7-.4-4.1-.6-8.8-.6-13.9,0-18.4,2.7-32.8,8.4-32.8,3.2,0,4.6,3.8,4.6,11.1,0,13.8-4.7,29-10.6,36,1.1,11.1,3.6,17.2,7.1,17.2v1.7c-4.6,0-7.4-6.4-8.7-17.2Zm1.4-4c5-7.1,9.1-21.2,9.1-33.7,0-6.3-1-9.4-2.9-9.4-3.7,0-6.7,12.6-6.7,30.5,0,4.7,.2,8.9,.5,12.6Z" />
      <path id="love-o" mask="url(#m-love-o)"
        d="M92.98,56.06c.1,1.2,.1,2.5,.1,3.9,0,11.8-4.2,19.1-10.8,19.1-4.7,0-8.3-4.1-9.9-10.4-2.4,6.5-5.6,10.4-8.9,10.4v-1.7c2.6,0,5.9-4.5,8.4-11.7-.2-1.3-.3-2.7-.3-4.1,0-9.8,4.8-17.9,10.7-17.9,.6,0,1.1,.1,1.7,.2,.6-1.3,1.7-2,2.9-2,2.9,0,5.1,5.2,5.9,12.4,.4,.1,.8,.1,1.2,.1v1.7h-1Zm-10.7,21.3c5.5,0,9.1-6.7,9.1-17.5,0-1.4-.1-2.8-.2-4.1-4.8-1-7.7-4.8-7.7-9.4l.1-.8c-.4-.1-.8-.2-1.3-.2-4.8,0-9,7.5-9,16.2,0,9.2,3.8,15.8,9,15.8Zm8.8-23.4c-.8-5.9-2.5-10.4-4.2-10.4-1,0-1.7,1.2-1.7,2.8,0,3.5,2.1,6.6,5.9,7.6Z" />
      <path id="love-ve" mask="url(#m-love-ve)"
        d="M108.48,58.76c1.9,9.3,3.7,18.6,6.1,18.6,2.1,0,5.2-7.2,7.2-15-2.6-3.3-4-7.7-4-12.7,0-4.5,1.5-7.5,4-7.5s3.6,2.6,3.6,7.3c0,3.5-.7,8-1.8,12.5,2.5,2.7,5.9,4.4,10.2,4.4h.6c-.1-.8-.1-1.6-.1-2.5,0-11,4.5-20.2,10.1-20.2,3.1,0,5.1,2.7,5.1,6.9,0,8.6-5.9,15.9-13.3,17.3,.8,5.9,3.5,9.5,7.3,9.5,5.8,0,8.3-6.5,8.3-6.5l1.6,.6s-2.9,7.6-9.9,7.6c-4.8,0-8-4.2-8.9-11h-.8c-4.4,0-8-1.6-10.7-4.2-2.1,8-5.5,15.2-8.6,15.2-3.8,0-5.2-7.9-8.2-22.7-.7-3.5-1.3-6.2-1.9-8.1-.9,3.4-4.2,7.8-10.4,7.8v-1.7c6.5,0,9.1-5.6,9.1-8.3,0-.3-.1-.8-.2-1l1.2-.7,.2-.1c1.4,1.5,2.5,5.5,4.2,14.5Zm13.8,1.4c.9-3.8,1.4-7.5,1.4-10.5,0-3.8-.7-5.8-1.9-5.8-1.3,0-2.3,2.3-2.3,5.8,0,4,1,7.7,2.8,10.5Zm13.8,6c6.5-1.3,11.7-7.9,11.7-15.6,0-3.3-1.3-5.2-3.4-5.2-4.4,0-8.4,8.6-8.4,18.5l.1,2.3Z" />
      <path id="being-be" mask="url(#m-being-be)"
        d="M181.78,61.76c-2,1.5-4.1,2.4-6.4,2.4-6.2,0-7.5-6.1-7.5-7.6l1.6-.3c0,1.4,1.2,6.2,5.9,6.2,2.2,0,4.2-1,6.1-2.7-.4-4-.6-8.5-.6-13.5,0-18.9,3-33.2,8.7-33.2,3.2,0,4.5,3.9,4.5,12.1,0,14.3-4.3,28.5-10.8,35.2,1.3,11,4.4,17,8.6,17,3.9,0,7.5-5.9,9-14.1-3.6-2.9-5.7-7.5-5.7-13.2,0-3.7,1.3-6.4,3.5-6.4,2.8,0,4.7,4.4,4.7,11.3,0,2.7-.2,5.2-.6,7.6,2.3,1.6,5.1,2.4,8.4,2.4h1.1v-1.1c0-11,4.6-20.2,10.1-20.2,3.1,0,5.2,2.6,5.2,6.4,0,8.7-5.9,15.1-13.5,16.4,.6,6.8,3.4,10.9,7.5,10.9v1.7c-5.1,0-8.5-4.7-9.2-12.4h-1.2c-3.3,0-6.3-.8-8.7-2.3-1.8,8.6-5.8,14.7-10.6,14.7-5.2,0-8.6-6.1-10.1-17.3Zm1.3-3.7c5.6-6.6,9.3-19.8,9.3-32.9,0-7.2-.9-10.4-2.8-10.4-3.9,0-7,13-7,31.5,0,4.4,.2,8.3,.5,11.8Zm18.2,3.3c.2-2,.4-4.2,.4-6.4,0-5.4-1.4-9.6-3-9.6-1.1,0-1.8,2.2-1.8,4.7,0,4.8,1.6,8.7,4.4,11.3Zm12.7,3.3c6.7-1.2,11.9-6.8,11.9-14.6,0-2.9-1.4-4.7-3.5-4.7-4.3,0-8.4,8.6-8.4,18.5v.8Z" />
      <path id="being-i" mask="url(#m-being-i)"
        d="M242.08,63.36c0,9.1,.9,14,3.6,14v1.7c-4,0-5.3-4.8-5.3-15.2,0-4.8,.3-9.5,.5-13.1-.3,1.4-.7,2.8-1,3.9-3.1,10.2-9.7,24.4-18.4,24.4v-1.7c10.7,0,18.5-27,19.6-33.2h1.7c-.4,7.3-.7,13.9-.7,19.2Zm.8-38.7l2,.1-1.1,9.1h-1.7l.8-9.2Z" />
      <path id="being-n" mask="url(#m-being-n)"
        d="M281.08,68.16c0-5.5,.6-11,.6-16.6,0-3.6-.3-6.2-1.9-6.2-4.7,0-12.8,15.1-15.8,33.2h-1.6c0-7.7,1.2-19.9,1.2-28.1,0-3-.2-5.1-.9-5.1-1.4,0-3.2,5.5-5.7,12.8-3.8,11.1-6.5,20.9-11.3,20.9v-1.7c3.3,0,6-8.9,9.2-18.2,3.1-9.1,4.8-15.5,7.9-15.5,2.1,0,2.5,2.4,2.5,7.5,0,4.8-.6,12.1-1,18.9,4-16,10.5-26.4,15.6-26.4,3.1,0,3.5,3.6,3.5,8,0,4.9-.6,10.6-.6,16.7,0,5,.7,9,3.6,9v1.7c-4,0-5.3-4.3-5.3-10.9Z" />
      <path id="being-g" mask="url(#m-being-g)"
        d="M316.68,46.76c-.9,8.6-.9,17.9-.9,26.4v6.8c1.1-.3,2.2-.4,3.4-.4,2,0,3.7,.3,5.2,1l-.6,1.6c-1.2-.6-2.6-.9-4.6-.9-1.2,0-2.3,.2-3.4,.5-.3,15.9-1.6,27-9.8,27-4.2,0-6.8-3.1-6.8-7.9,0-7.8,6.7-17.3,14.9-20.3v-7.9c0-5.6,.2-12,.5-17.8l-.7,2.7c-2.6,9.2-7,21.5-12.4,21.5-2.9,0-5.4-4.2-6.3-10.1-2.4,6.3-5.6,10.1-8.8,10.1v-1.7c2.6,0,5.9-4.5,8.4-11.7-.1-.8-.1-1.5-.1-2.3,0-11.3,3.9-20.6,12.4-20.6,3.9,0,7.4,1.7,9.6,3.9v.1Zm-15.1,30.6c5.5,0,12.3-23.9,13.2-30.1-1.9-1.6-4.4-2.8-7.7-2.8-7.4,0-10.7,8.6-10.7,18.9,0,7.5,2.6,14,5.2,14Zm4.4,29.7c6.6,0,7.8-10.4,8-24.7-7.2,3-13.1,11.7-13.1,18.5,0,3.9,1.9,6.2,5.1,6.2Z" />
      <path id="jewish-je" mask="url(#m-jewish-je)"
        d="M333.68,30.16c0-9.1,8.1-22.1,14.4-22.1s7.3,19.9,7.3,50c0,8.4-.2,15.9-.7,22.3,1.4-1.2,3-2.4,4.7-3.6,2.1-1.5,4.6-3.4,7-5.6-.6-2.1-.9-4.6-.9-7.3,0-11,4.5-20.2,10.1-20.2,3.2,0,5.1,2.7,5.1,6.9,0,7.6-5.9,15.2-12.4,21.1,1.3,3.6,3.6,5.7,6.5,5.7v1.7c-3.5,0-6.2-2.3-7.8-6.2-2.3,2-4.6,3.8-6.7,5.3-2.1,1.5-4.1,3-5.8,4.4-1.6,17.2-5.2,26.2-11.1,26.2-3.2,0-5.1-2.4-5.1-6.1,0-6.2,4.6-12.7,14.5-20.8,.6-6.6,.9-14.5,.9-23.8,0-27.9-.9-48.3-5.7-48.3s-12.6,11.9-12.6,20.4c0,3.9,2.2,7,4.7,7v1.7c-3.6,0-6.4-3.9-6.4-8.7Zm9.7,76.91c4.3,0,7.6-7.4,9.2-22.9-8.6,7.2-12.6,13.1-12.6,18.5,0,2.5,1,4.4,3.4,4.4Zm24.4-37.2c5.9-5.6,11.2-12.5,11.2-19.3,0-3.3-1.3-5.2-3.4-5.2-4.4,0-8.4,8.6-8.4,18.5,0,2.2,.2,4.2,.6,6Z" />
      <path id="jewish-w" mask="url(#m-jewish-w)"
        d="M391.88,53.06c-3.4,11.1-7.7,26-17.1,26v-1.7c7.8,0,11.8-13,14.8-22.6,2.2-7.1,3-11.1,5.4-11.1,2.7,0,3,5,4.3,15.3,1.1,8.4,2.3,18.4,4.6,18.4,2.6,0,6.7-15.9,8.6-25.1h1.7c1.9,10.7,4.9,25.1,7.5,25.1s6.3-13.5,7.2-21.7c-4.2-1.2-7.1-4.6-7.1-8.8,0-2.9,1.7-5.1,4.1-5.1,3.2,0,4.9,3.8,4.9,10.1l-.1,2.4c.5,.1,1.1,.1,1.6,.1v1.7c-.6,0-1.2,0-1.7-.1-1,9.3-4.8,23.1-8.9,23.1s-6.3-11-8.4-23.3c-2.6,12.7-5.9,23.3-9.4,23.3-3.3,0-4.5-5.5-6.3-20.1-.9-7.5-1.7-13.6-2.6-13.6s-1.8,3.5-3.1,7.7Zm37.2,.8v-1.4c0-6.3-1.3-9-3.2-9-1.4,0-2.4,1.4-2.4,3.4,0,3.4,2.2,6,5.6,7Z" />
      <path id="jewish-i" mask="url(#m-jewish-i)"
        d="M445.68,63.36c0,9.1,.9,14,3.6,14v1.7c-4,0-5.3-4.8-5.3-15.2,0-6.3,.4-12.3,.7-16.1-.2,.6-.5,1.2-.9,1.9-2.4,4-6.5,6.4-11.5,6.4v-1.7c6.1,0,10.3-3.9,12.4-10.2h1.7c-.4,7.3-.7,13.9-.7,19.2Zm.8-38.7l2,.1-1.1,9.1h-1.7l.8-9.2Z" />
      <path id="jewish-s" mask="url(#m-jewish-s)"
        d="M464.28,51.16c-1.7-2.8-3-5.5-3-7.8,0-2.5,1.5-4.4,3.5-4.4,1.8,0,3.1,1.6,3.1,4.1,0,1.5-.7,4.3-1.8,7.8,3.9,6.1,10,13.2,10,19.7,0,5.2-3,8.5-7.6,8.5-2.9,0-5.4-1.5-6.6-3.8l1.3-.9c1,1.7,2.9,3,5.3,3,3.7,0,5.9-2.6,5.9-6.8,0-5.6-5.1-11.8-8.9-17.6-3.8,10.9-11,26.1-16.2,26.1v-1.7c4,0,11.5-15.6,15-26.2Zm.7-2.2c.8-2.5,1.2-4.7,1.2-6s-.5-2.3-1.5-2.3-1.7,1.2-1.7,2.7c0,1.6,.8,3.6,2,5.6Z" />
      <path id="jewish-h" mask="url(#m-jewish-h)"
        d="M486.38,61.16c-4.5,9.2-10.3,17.9-16.7,17.9v-1.7c6.2,0,12.4-10.6,16.8-20.4,.1-6,.2-11.2,.2-13.2,0-20.7,3.1-30.7,8.3-30.7,2.8,0,4.5,2.5,4.5,6.6,0,4.9-2.6,14.4-6.5,25.3-1.2,3.2-2.8,7.8-4.9,12.5l-.3,13.4c4-16.4,10.6-27.2,15.8-27.2,3.1,0,3.5,3.6,3.5,8,0,4.9-.6,10.6-.6,16.7,0,5,.7,9,3.6,9s4.1-4.3,4.3-5.2l1.6,.4c-.4,1.6-2.2,6.5-5.9,6.5-4,0-5.3-4.3-5.3-10.9,0-5.5,.6-11,.6-16.6,0-3.6-.3-6.2-1.9-6.2-4.7,0-12.8,15.1-15.8,33.2h-1.6c0-4.2,.1-10.9,.3-17.4Zm4.9-16.4c3.9-10.9,6.5-20.6,6.5-25.3,0-3-1.1-4.7-2.8-4.7-3.8,0-6.6,10.3-6.6,28,0,1.5-.1,5.4-.2,10.2,1.3-3.2,2.3-6,3.1-8.2Z" />
    </g>
  </g>
  <defs>
  <g id="audio-quote-mask">
    <mask id="m-i-i">
      <path id="mask-i-i"
        d="M9.4,69.46s.67,4.3,.97,4.82,1.91,3.24,3.17,3.61,3.61,.44,4.42,0,2.72-2.53,3.53-4.06,2.65-7.06,3.17-10,1.47-12.96,1.47-15.24V29.59s-.59-9.57-.81-10.68-2.21-7.85-2.21-7.85c0,0-1.99-2.25-2.77-2.3s-2.56,.78-3.19,1.15-4.55,4.44-5.12,5.33-2.88,5.49-2.88,5.49l-2.2,7.22s-.1,5.02,.31,6.07,3.09,3.61,3.09,3.61l2.03,.37"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
    </mask>
    <mask id="m-love-l">
      <path id="mask-love-l"
        d="M44,56.26s.79,5.33,2.38,6.12,3.96,1.45,6.01,0,4.62-4.52,4.62-4.52l4.56-9.1,3.24-11.08,1.39-10.04-.4-9.71s-1.32-3.63-2.58-3.96-2.84-.26-3.7,1.39-2.77,7.93-2.77,7.93l-1.65,8.78v18.49s.59,12.35,.59,12.35l1.92,9.25,1.78,3.44,3.02,2.47,1.09,.25"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
    </mask>
    <mask id="m-love-o">
      <g id="mask-love-o">
        <polyline id="mask-love-char-o"
          points="73.27 67.37 72.97 67.98 73.03 68.42 73.77 70.94 74.72 72.85 75.68 74.54 76.99 76.05 78.42 77.14 80.04 77.92 81.38 78.19 83.16 78.19 84.89 77.72 86.4 76.88 87.6 75.81 88.67 74.52 89.54 73 90.34 71.45 90.81 70.05 91.23 68.22 91.81 65.64 92.05 63.28 92.05 61.25 92.05 58.95 91.96 55.94 91.75 53.72 91.26 50.64 90.66 48.26 89.91 46.14 89.14 44.5 88.1 43.28 87.12 42.7 86.4 42.7 85.65 43.03 84.87 43.91 84.47 45.21 84.4 46.46 84.56 48.15 85.03 49.47 85.56 50.71 86.27 51.8 87.29 52.84 88.23 53.59 89.27 54.11 90.39 54.59 91.8 55 93.98 55.15"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
        <polyline id="mask-love-o-up"
          points="63.48 78.18 65.91 77.39 68.99 73.7 70.91 70 72.56 66.02 72.35 61.36 72.42 59.98 72.46 58.46 72.65 56.92 72.97 55.1 73.42 53.47 73.95 52.03 74.57 50.56 75.38 49.01 76.18 47.83 77.16 46.67 78.35 45.61 79.57 44.88 81 44.41 82.19 44.27 83.28 44.42 84.11 44.67"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
      </g>
    </mask>
    <mask id="m-love-ve">
      <path id="mask-love-ve"
        d="M93.98,55.15l3.69-.47,2.22-1.31,2.26-2.15,1.12-2.09,.3-1.4s-.43-2.36,.36-2.59c.2-.06,.43,.61,.43,.61l.25,1.15,.32,.9,.37,1.57,.33,1.3,.41,1.8,.37,1.76,.42,2.2,.44,2.22,.34,1.69,.38,1.94,.42,2,.38,1.79,.33,1.5,.38,1.69,.4,1.58,.6,1.96,.65,1.86,.94,1.74,.48,.81,.77,.71,.79,.26,1.1-.4,1.18-1.06,.64-.9,.64-1.02,.84-1.63,.92-1.55,.62-1.55,.52-1.67,.77-2.08,.5-1.79,.5-1.37,.61-2.39,.37-1.8,.47-2.64,.33-2.4,.27-2.14,.1-2.67-.17-1.94-.45-1.44-.58-1.59-.61-1.05-.94-.36-1.02,.09-.84,.64-.64,.98-.48,1.26-.27,1.33-.12,2.11,.03,1.91,.23,1.94,.4,1.8,.4,1.53,.44,1.3,.68,1.55,.68,1.14,.75,1.23,1.17,1.27,.92,.92,.85,.66,.86,.57,1.19,.66,1.22,.53,1.65,.52,1.22,.23,1.25,.13h1.72l.35-.05,2.85-.28,3.24-1.42,2.61-1.95,1.72-1.95,1.25-1.78,1.31-2.76,.76-2.54,.36-2.33v-2.14l-.15-1.68-.5-1.18-1.08-1.6s-1.05-1.06-2.27-1.15-2.33,.51-3,1.04-1.83,1.66-2.36,2.39c-.56,.78-1.38,2.27-2.07,3.93-.55,1.33-1.27,3.61-1.66,6.88-.24,1.98-.78,4.78-.63,6.7s.38,4.37,.67,5.24c.24,.71,.75,2.22,.75,2.22,0,0,1.11,2.2,1.75,2.99s1.93,1.66,1.93,1.66c0,0,1.29,.72,2.51,.81s2.19,.08,3.41-.39c.94-.36,1.93-.86,2.73-1.46s2.03-1.78,2.39-2.36,1.43-2.81,1.43-2.81"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-being-be">
      <polyline id="mask-being-be"
        points="168.51 56.44 169.56 59.78 171.87 62.4 174.3 63.37 177.22 63.01 180.38 61.85 183.66 58.51 187 53.36 189.8 46.53 191.62 39.72 192.72 34.37 193.14 28.42 193.14 22.09 192.38 16.74 190.47 13.83 188.4 13.83 186.64 15.59 185.06 19.24 182.99 27.63 182.02 36.41 181.65 45.07 181.96 56.2 182.87 64.1 184.39 70.6 187.19 76.14 190.28 78.09 193.14 78.09 196.88 75.5 199.28 70.95 201.06 66.08 202.61 59.27 202.35 51.54 200.73 45.96 198.98 44.6 196.88 45.36 196.38 47.84 195.99 52.26 197.16 56.74 199.28 60.57 203.46 64.01 207.03 65.3 211.9 65.82 216.83 64.66 220.98 62.45 224.75 58.06 226.7 51.09 226.18 46.61 223.97 44.73 220.46 44.73 218.06 46.87 215.86 50.11 214.36 54.27 213.39 58.42 213.06 62.97 213.45 68.55 214.49 72.9 216.18 75.69 219.36 78.09 221.48 78.09"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-being-i">
      <g id="mask-being-i">
        <line id="mask-being-i-dot" x1="243.94" y1="25.28" x2="243.15" y2="33.66" fill="none" stroke="#39b54a"
          stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
        <polyline id="mask-being-i-char"
          points="221.48 78.09 224.56 77.52 228.16 74.91 231.31 71.26 234.74 65.23 236.9 59.97 239.45 53.99 241.17 47.9 241.89 44.16 241.5 53.88 241.39 59.41 241.28 66.83 241.89 73.64 243.6 77.74 245.68 78.09"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
      </g>
    </mask>
    <mask id="m-being-n">
      <polyline id="mask-being-n"
        points="245.68 78.09 247.89 77.36 250.13 73.86 253.66 65.27 256.27 57.34 259.26 49.26 260.99 45.36 262.93 44.49 264.1 46.06 264.52 50.23 264.24 57.15 263.48 68.15 263.14 78.56 265.42 68.84 267.01 63.17 269.71 56.25 272.75 50.23 275.93 46.43 279.18 44.49 281.6 45.36 282.36 48.36 282.36 54.11 282.36 62.13 281.95 67.66 282.36 72.78 282.85 76.24 285.13 78.09 286.38 78.16"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-being-g">
      <g id="mask-being-g">
        <polyline id="mask-being-g-up"
          points="286.38 78.16 288.67 77.36 291.49 74.57 293.12 71.44 295.15 66.85 295.57 63.64 295.88 58.88 296.59 53.81 298.45 49.11 301.52 45.39 305.04 43.66 309.52 43.84 313.09 44.91 315.8 46.63"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
        <polyline id="mask-being-g-char"
          points="295.87 66.59 296.24 69.64 297.07 73.12 298.64 76.39 300.73 78.16 302.89 78.16 305.06 75.99 307.8 71.53 310.03 66.4 312.08 60.11 313.72 54.93 315.26 48.66 315.8 48.66 315.66 52.88 315.16 58.89 314.89 67.17 314.94 74.9 314.92 82.21 314.47 91.37 313.27 100.32 311.15 105.37 308.22 107.44 305.38 107.84 302.59 106.91 300.55 104.12 299.8 100.38 300.65 95.94 302.97 91 306.34 86.8 309.92 83.59 314.23 81.3 318.88 80.48 324.11 81.29"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
      </g>
    </mask>
    <mask id="m-jewish-je">
      <polyline id="mask-jewish-je"
        points="340.08 38.06 337.86 37.39 335.36 34.64 334.57 30.6 334.94 25.97 335.86 22.88 337.57 18.88 339.53 15.25 342.15 12.25 344.91 9.96 347.74 9 349.7 9.54 351.24 11.96 352.54 16.63 353.25 22.38 354.04 31.39 354.29 39.06 354.54 48.82 354.54 61.08 354.2 73.04 353.25 87.76 352.2 92.76 350.58 100.18 347.91 105.44 344.55 107.84 341.95 107.84 339.98 106.56 338.99 102.6 339.98 98.35 341.9 93.93 345.45 89.97 349.83 85.38 355.75 80.59 361.54 76.17 369.17 69.66 374.78 63.33 377.93 58.11 379.68 52.69 379.68 48.36 378.3 45.69 376.22 44.48 374.09 44.81 370.88 47.15 368.96 50.28 367.63 54.07 366.55 59.16 366.3 63.33 366.5 67.75 368.09 73.33 369.71 76.21 372.39 77.73 374.78 78.28"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-jewish-w">
      <path id="mask-jewish-w"
        d="M374.78,78.28s3.31-.7,4.9-1.85c.64-.89,3.29-3.18,4.48-5.49,.23-.77,1.82-3.45,3.16-6.92,2.45-6.34,5.22-14.83,5.45-15.67,.36-1.29,1.16-3.7,1.92-4.05,.47-.06,.29-.64,.82-.2,.84,.7,1.21,2.37,1.21,2.37l.55,4.62,.99,6.16,1.05,8.19,1.3,7.67,.79,3.3s.95,1.55,1.77,1.74c.77,.08,1.65-.22,2.21-1.09s2.32-4.02,2.83-6.06c.76-1.91,2.14-7.15,2.14-7.15l1.61-6.65,1.33-5.86,.62,2.59,.46,2.79,1.37,6.99,1.32,5.74,1.42,4.32s1.01,2.44,1.61,3.07c.41,.44,1.02,1.28,1.77,1.31,.55-.03,1.21-.21,1.71-.88s1.46-2.16,1.46-2.16l1.32-3.27,1.25-3.89,.98-3.72,.72-3.55,.45-4.69,.24-3.02,.12-3.26-.54-2.28-.47-2.35-.84-1.65s-.66-.65-2.33-.69-2.05,.52-2.05,.52c0,0-1.1,.64-.96,2.62,.22,1.72,.2,3.47,.59,4.11s1.46,2.64,1.46,2.64c0,0,2.69,1.37,3.18,1.57s2.98,.84,2.98,.84c0,0,.41,.16,1.18,.08"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-jewish-i">
      <g id="mask-jewish-i">
        <polyline id="mask-jewish-i-char"
          points="432.28 55.17 436.05 54.7 439.73 52.75 443.13 49.35 445.59 44.16 445.31 50.19 445.08 56 444.85 63.82 444.89 70.01 446.1 75.73 447.36 77.78 449.28 78.28"
          fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
        <line id="mask-jewish-i-dot" x1="447.45" y1="24.66" x2="446.42" y2="33.86" fill="none" stroke="#39b54a"
          stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
      </g>
    </mask>
    <mask id="m-jewish-s">
      <polyline id="mask-jewish-s"
        points="449.28 78.28 451.25 77.54 454.08 74.49 456.78 70.21 459.94 64.16 462.79 57.63 464.88 51.9 466.46 46.11 467.05 41.82 465.7 40.01 463.68 40.1 462 43.1 462.48 46.2 464.31 49.48 467.47 54.36 470.04 58.26 473.19 63.26 474.82 67.62 475.09 70.82 474.34 74.84 472.77 76.79 470.05 78.28 467.51 78.28 464.96 77.17 462.44 74.87"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
    <mask id="m-jewish-h">
      <polyline id="mask-jewish-h"
        points="469.68 78.28 473.53 77.17 476.58 74.84 479.09 71.53 482.14 66.99 486.59 59.01 489.9 50.91 492.98 41.67 496.14 32.29 498.22 23.43 498.64 18.84 497.54 14.76 495.16 14.01 492.45 14.98 490.29 18.93 488.63 25.76 487.83 34.62 487.36 45.53 487.19 61.77 486.93 72.08 486.55 77.68 487.19 77.64 488.8 70.34 491.35 61.22 494.57 53.67 498.64 47.39 501.99 44.81 504.28 44.76 505.94 46.59 506.24 50.4 506.24 55.96 505.64 65.68 505.81 72.08 506.49 75.43 508.06 77.6 510.31 78.28 512.9 77.26 514.34 74.88 515.17 72.36"
        fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5" />
    </mask>
  </g>
  </defs>
</svg>`;

const sectBreak = `<svg id="section-break" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 60"><path d="M320.3,29.88s-2.21-1.55-3.02-2.51c0,0-4.13-4.68-4.13-8.96s0-3.55,0-3.55c0,0-.03-7.7,6.97-10.26" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M320.54,32.87c-1.36,0-3.37-.75-7.39-3.82s-3.02-3.38-9.88-6.61c-1.54-.46-8.57-2.2-14.3-.25,.46,.52,4.95,3.61,9.21,8.6,1.05,1.2,4.73,6.08,9.65,9.57,1.55,.86,6.45,3.38,12.47,3.38" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M320.24,48.23s-6.74,.39-14.97-2.3c-3.6-1.2-13.11-4.34-22.16-10.29-3.22-2.11-16.98-12.55-23.28-14.1-3.59-.92-12.34-3.76-18.97,2.29-2.65,2.27-8.07,7.88-7.69,16.35s5.18,14.23,10.91,14.91c3.68,.45,4.9,.25,6.68,0,2.88-.59,7.12-1.54,8.51-7.25,.82-5.89-.28-7.79-3.28-10.05-2.98-1.99-10.42-3.49-13,4.45" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M296.25,46.6s-4.29-2.42-9.25-2.93c-2.62-.17-9.38-1.15-13.33,1.07-2.49,1.66-4.17,3.24-5.16,4.25,.21,.61,1.14,1.8,1.67,2.09,.64-.04,5.99,.24,9.5-.45,2.49-.64,7.66-2.49,10.64-2.88,2.49-.39,5.93-1.15,5.93-1.15Z" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path id="circle" d="M228.61,40.41c0-1.28-.89-3.6-3.58-3.6-2.39,0-3.53,2.04-3.53,3.6,0,1.07,.84,3.57,3.53,3.57,1.97,0,3.58-1.4,3.58-3.57Z" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line id="line" x1="216.57" y1="40.19" x2="4.73" y2="40.19" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M320.3,29.88s2.24-1.58,3.05-2.54c0,0,4.13-4.68,4.13-8.96s0-3.55,0-3.55c0,0-.18-7.67-7.18-10.23" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M320.54,32.87c1.35,0,2.92-.77,6.94-3.85s3.02-3.38,9.88-6.61c1.54-.46,8.57-2.2,14.3-.25-.46,.52-4.95,3.61-9.21,8.6-1.05,1.2-4.73,6.08-9.65,9.57-1.55,.86-6.48,3.41-12.5,3.41" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M320.24,48.23s6.89,.36,15.12-2.33c3.6-1.2,13.11-4.34,22.16-10.29,3.22-2.11,16.98-12.55,23.28-14.1,3.59-.92,12.34-3.76,18.97,2.29,2.65,2.27,8.07,7.88,7.69,16.35-.38,8.48-5.18,14.23-10.91,14.91-3.68,.45-4.9,.25-6.68,0-2.88-.59-7.12-1.54-8.51-7.25-.82-5.89,.28-7.79,3.28-10.05,2.98-1.99,10.42-3.49,13,4.45" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M344.38,46.57s4.29-2.42,9.25-2.93c2.62-.17,9.38-1.15,13.33,1.07,2.49,1.66,4.17,3.24,5.16,4.25-.21,.61-1.14,1.8-1.67,2.09-.64-.04-5.99,.24-9.5-.45-2.49-.64-7.66-2.49-10.64-2.88-2.49-.39-5.93-1.15-5.93-1.15Z" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path id="circle" d="M412.02,40.38c0-1.28,.89-3.6,3.58-3.6,2.39,0,3.53,2.04,3.53,3.6,0,1.07-.84,3.57-3.53,3.57-1.97,0-3.58-1.4-3.58-3.57Z" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line id="line" x1="424.06" y1="40.16" x2="635.9" y2="40.16" fill="none" stroke="#39b54a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`;

function animateHeadline() {
  const masks = [
    "comma-open",
    "we-w",
    "we-e-tail",
    "we-char-e",
    "will-w",
    "will-char-i",
    "will-l1",
    "will-l2",
    "will-i-dot",
    "always-a1",
    "always-l",
    "always-w",
    "always-a2-up",
    "always-char-a2",
    "always-y",
    "always-s",
    "outlive-o",
    "outlive-u",
    "outlive-t-up",
    "outlive-t-down",
    "outlive-l",
    "outlive-char-i",
    "outlive-ve",
    "outlive-t-cross",
    "outlive-i-dot",
    "the-t-down",
    "the-h",
    "the-e",
    "the-t-cross",
    "people-p1-down",
    "people-char-p1",
    "people-e1",
    "people-o-up",
    "people-char-o",
    "people-p2-down",
    "people-char-p2",
    "people-l",
    "people-e2",
    "who-w",
    "who-h",
    "who-o-up",
    "who-char-o",
    "hate-h",
    "hate-a-up",
    "hate-char-a",
    "hate-t-up",
    "hate-t-down",
    "hate-e",
    "hate-t-cross",
    "us-u",
    "us-s",
    "comma-close",
  ];

  let animDelay = 0;

  masks.forEach((mask, index, masksArray) => {
    const id = `#mask-${mask}`;
    let path = document.querySelector(id);
    const length = path.getTotalLength();

    path.style.strokeDasharray = length + 0.1;
    path.style.strokeDashoffset = length + 0.1;
    path.style.fill = "none";
    path.style.stroke = "white";
    path.style.strokeMiterlimit = "10";
    path.style.display = "none";

    let animLength = Number(length / 300);

    if (index < masksArray.length - 23) {
      path.style.display = "unset";
      animLength = 0;
    } else if (mask.includes("comma")) {
      animLength = 0.5;
    } else if (mask.includes("dot") || mask.includes("cross")) {
      animLength = 0.3;
    }

    // hide last comma
    if (index < masksArray.length - 1) {
      path.style.animation = `strokeOffset ${animLength}s linear ${animDelay}s 1 forwards`;
      animDelay += animLength;
    }
  });
}

function initHeadline() {
  const headlineContainer = document.querySelector(".quote .headline > div");
  headlineContainer.innerHTML += headlineData;
  animateHeadline();
}

function animateSectionBreak() {
  const svgPaths = document.querySelectorAll(
    ".section-break svg path, .section-break svg line"
  );
  svgPaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    if (path.id == "line" || path.id == "circle") {
      path.style.animationDelay = "2s";
    }
  });
}

function initSectBreaks() {
  const sectionBreaks = document.querySelectorAll(".section-break");

  sectionBreaks.forEach((section) => {
    section.innerHTML += sectBreak;
  });

  animateSectionBreak();

  window.addEventListener("scroll", onScroll);
}

function onScroll() {
  // Section Divider animation
  let windowHeight = window.innerHeight;
  const sectionBreaks = document.querySelectorAll(".section-break");

  sectionBreaks.forEach((section) => {
    const sectionMasks = section.querySelectorAll("path, line");
    const inOffset = section.getAttribute("data-in-offset")
      ? section.getAttribute("data-in-offset")
      : -40;

    sectionMasks.forEach((mask) => {
      let positionFromTop = section.getBoundingClientRect().top;

      // Fade-in section break when scrolled into view
      if (positionFromTop - windowHeight <= inOffset) {
        mask.classList.add("section-break-reveal");
      }
    });
  });

  // Picture animations
  const animElements = document.querySelectorAll(".animated");

  animElements.forEach((element) => {
    const positionFromTop = element.getBoundingClientRect().top;
    const animClass = element.getAttribute("data-anim-class");
    const inOffset = element.getAttribute("data-in-offset")
      ? element.getAttribute("data-in-offset")
      : -100;

    if (positionFromTop - windowHeight <= inOffset) {
      element.classList.add(animClass);
    } else if (positionFromTop - windowHeight > -40) {
      element.classList.remove(animClass);
    }

    const image = element.parentElement.querySelector("img");

    if (
      element.localName == "figcaption" &&
      element.parentElement.localName == "figure"
    ) {
      if (positionFromTop - windowHeight <= inOffset) {
        image.style.borderRadius = "10px 10px 0 0";
      } else if (positionFromTop - windowHeight > -40) {
        image.style.borderRadius = "10px";
      }
    }
  });

  // Quote animation
  const quoteCard = document.querySelector(".quote .container");
  const quoteContainer = document.querySelector(".quote .headline > div");
  const quoteMasks = document.querySelectorAll("#headline-mask-2 mask *");
  let positionFromTop = quoteCard.getBoundingClientRect().top;

  if (positionFromTop - windowHeight <= 0 - windowHeight * 0.25) {
    quoteMasks.forEach((mask) => {
      mask.style.display = "unset";
    });
  } else if (positionFromTop - windowHeight > windowHeight) {
    quoteMasks.forEach((mask, index, masksArray) => {
      mask.style.display = "none";
      if (index < masksArray.length - 29) {
        mask.style.display = "unset";
      }
    });
  }

  // Show/hide nav
  const scrollContainer = document.querySelector(".quote");
  const nav = document.querySelector("nav");

  if (
    scrollContainer.getBoundingClientRect().top <= 0 &&
    scrollContainer.getBoundingClientRect().bottom >= nav.clientHeight
  ) {
    nav.style.backgroundColor = "transparent";
    slug.style.display = "none";
  }
}

function typeHeader() {
  const headline = document.querySelector("header .headline-container");
  const headlineSpan = headline.querySelector("span");
  const text = "‘We will always outlive the people who hate us’";
  const cursorContainer = headline.querySelector(".cursorContainer");

  let index = 0;
  let timer = setInterval(() => {
    if (index < text.length) {
      const char = document.createElement("span");
      char.innerHTML = text.charAt(index++);
      headlineSpan.insertBefore(char, cursorContainer);
    } else {
      clearInterval(timer);

      setTimeout(() => {
        headline.querySelector(".cursor").style.opacity = "0";
      }, 4500);
    }
  }, 85);
}

typeHeader();
initHeadline();
initSectBreaks();
