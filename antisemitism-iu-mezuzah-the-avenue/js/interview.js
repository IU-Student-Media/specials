let currentTimeInterval;
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
