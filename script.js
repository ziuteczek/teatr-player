"use strict";

const videoEl = document.querySelector("video");
const showCurrVidEl = document.querySelector(".current-video");

let currVid = 0;
const vidURLs = [
  "./files/video/1.mp4",
  "./files/video/Gragas wytacza beczkę - greenscreen.mp4",
];

function changeVid(index) {
  videoEl.src = vidURLs[index];
  videoEl.currentTime = 0.1;
}

function playPause() {
  if (videoEl.paused) {
    videoEl.play();
  } else {
    videoEl.pause();
  }
}
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      playPause();
      break;
    case "KeyR":
      videoEl.currentTime = 0;
      videoEl.pause();
      break;
    case "ArrowLeft":
      if (currVid !== 0) changeVid(--currVid);
      break;
    case "ArrowRight":
      if (vidURLs.length - 1 !== currVid) changeVid(++currVid);
      break;
    case "KeyS":
      if (showCurrVidEl.style.opacity === "1")
        showCurrVidEl.style.opacity = "0";
      else showCurrVidEl.style.opacity = "1";
      break;
  }
  console.log(e.code);
});
