'use strict'

let currentPlayer = document.querySelector('video')

const audioPlayer = document.querySelector("audio")
const videoPlayer = document.querySelector("video")

const showCurrVidEl = document.querySelector('.current-video')
const playBarEl = document.querySelector('.video-bar')
const videoHider = document.querySelector('.video-shadowing')

let currVid = 0

const vid = {
	URL:[
		"1. Słowo.mp3","2.Prawdziwa światłość.mp3","3. A słowo.mp3","4. Rozmowa.mp3","5. Wzgardzony i odepchnięty 1.mp3","5. Wzgardzony i odepchnięty 2.mp3","6. lecz on się obarczył 1.mp3","6. lecz on się obarczył 2.mp3","8. jak baranek 1.mp3","8. jak baranek 2.mp3","9. Umiweram w twoim ubraniu.mp3","Ave Verum by Albinoni (Adagio in G Minor).mp4","Bóg jest Miłością-(480p).mp4","Przybieżeli do Betlejem.mp4","Wspolczesna_kolenda(edit).mp4","nie zapomnij o mnie 1.mp3","nie zapomnij o mnie 2.mp3","nie zapomnij o mnie 3.mp3","nie zapomnij o mnie 4.mp3"
	],
	audioExtensions:['mp3', 'ogg', 'wav', 'aac', 'flac'],
	getFileUrl:index => "./files/" + vid.URL[index],
	isAudio:link => vid.audioExtensions.includes(link.slice(link.lastIndexOf('.') + 1)),
}

let trackIsAudio = vid.isAudio(vid.URL[0]);
if(trackIsAudio) {
	currentPlayer = document.querySelector("audio")
}
else {
	currentPlayer = document.querySelector("video")
}

currentPlayer.src = vid.getFileUrl(0)
showCurrVidEl.textContent = vid.URL[0]

currentPlayer.currentTime = 0.1

function playPause() {
	if (currentPlayer.paused) {
		currentPlayer.play()
	} else {
		currentPlayer.pause()
	}
}
document.addEventListener('keydown', e => {
	switch (e.code) {
		case 'Space':
			playPause()
			break
		case 'KeyR':
			currentPlayer.currentTime = 0
			hideVid()
			currentPlayer.pause()
			break
		case 'ArrowLeft':
			if (currentPlayer.currentTime > 5) {
				currentPlayer.currentTime -= 5
			} else {
				currentPlayer.currentTime = 0.1
			}
			break
		case 'ArrowRight':
			if (currentPlayer.currentTime + 5 < currentPlayer.duration) {
				currentPlayer.currentTime += 5
			} else {
				currentPlayer.currentTime = currentPlayer.duration
			}
			break
		case 'KeyS':
      dataVisibility();
			break
		case 'KeyH':
      hideCoursor()
      break;
		case 'Comma':
			if (currVid !== 0) {
				changeVid(--currVid)
				hideVid()
			}
			break
		case 'Period':
			if (vid.URL.length - 1 !== currVid) {
				hideVid()
				changeVid(++currVid)
			}
			break
	}
})
const updateProgressBar = () =>	playBarEl.value = (currentPlayer.currentTime / currentPlayer.duration) * 100


const hideCoursor = () => {
  if (document.body.style.cursor === 'none') {
    document.body.style.cursor = 'auto'
  } else {
    document.body.style.cursor = 'none'
  }
}

const dataVisibility = () => {
  if (showCurrVidEl.style.opacity === '1') {
    showCurrVidEl.style.opacity = '0'
    playBarEl.style.display = 'none'
  } else {
    showCurrVidEl.style.opacity = '1'
    playBarEl.style.display = 'block'
  }
}

async function changeVid(index) {
	const vidURL = vid.getFileUrl(index)
	await lowerSound()
		updatePlayer(vidURL);
		currentPlayer.src = vidURL
		showCurrVidEl.textContent = vid.URL[index]
		currentPlayer.currentTime = 0.1
		playBarEl.max = currentPlayer.duration
		console.log(vid.URL[index])
		updateProgressBar()
}

const hideVid = () => {
	videoHider.classList.add('shown')
	videoHider.classList.remove('hidden')
}
const showVid = () => {
	videoHider.classList.add('hidden')
	videoHider.classList.remove('shown')
}
const updatePlayer = (vidLink) => {
	if (vid.isAudio(vidLink)) {
		currentPlayer = audioPlayer
	} else {
		currentPlayer = videoPlayer
	}
	currentPlayer.addEventListener('ended', () => {
		hideVid()
	})
	currentPlayer.addEventListener('play', () => {
		currentPlayer.volume = 1
		showVid()
	})
	playBarEl.addEventListener('input', function () {
		const seekTime = (playBarEl.value / 100) * currentPlayer.duration
		currentPlayer.currentTime = seekTime
	})
	currentPlayer.addEventListener('timeupdate', updateProgressBar)
}
updatePlayer(vid.getFileUrl(0));
const lowerSound = (lowerTo = 0) => {
  return new Promise (resolve => {
  let vol = 1000
	const sound = setInterval(() => {
		if (vol <= 0 + lowerTo) {
			clearInterval(sound)
      resolve()
		}
		vol -= 2
		currentPlayer.volume = vol <= 0 ? 0 : Number('0.' + `${vol}`.padStart(3, '0'))
		if (vol % 100 === 0) console.log(currentPlayer.volume * 10)
	}, 1)
  })
}
