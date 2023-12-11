"use strict";

const videoEl = document.querySelector("video");
const showCurrVidEl = document.querySelector(".current-video");

let currVid = 0;
const vidURLs = [
  "./files/video/ROBLOX death sound origin.mp4",
  "./files/video/Gragas wytacza beczkę - greenscreen.mp4",
];

videoEl.src = vidURLs[0];
showCurrVidEl.textContent = vidURLs[0];

videoEl.currentTime = 0.1;

function changeVid(index) {
  videoEl.src = vidURLs[index];
  showCurrVidEl.textContent = vidURLs[index];
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
      if (videoEl.currentTime > 5) {
        videoEl.currentTime -= 5;
      }
      break;
    case "ArrowRight":
      if (videoEl.currentTime + 5 < videoEl.duration) {
        videoEl.currentTime += 5;
      }
      break;
    case "KeyS":
      if (showCurrVidEl.style.opacity === "1")
        showCurrVidEl.style.opacity = "0";
      else showCurrVidEl.style.opacity = "1";
      break;
    case "KeyH":
      if (document.body.style.cursor === "none") {
        document.body.style.cursor = "auto";
      } else {
        document.body.style.cursor = "none";
      }
    case "Comma":
      if (currVid !== 0) changeVid(--currVid);
      break;
    case "Period":
      if (vidURLs.length - 1 !== currVid) changeVid(++currVid); 
      break;
  }
  console.log(e.code);
});
