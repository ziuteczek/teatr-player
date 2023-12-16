'use strict'

let videoEl = document.querySelector('video')
const showCurrVidEl = document.querySelector('.current-video')
const playBarEl = document.querySelector('.video-bar')
const videoHider = document.querySelector('.video-shadowing')

let currVid = 0
const vidURLs = {
	getFileUrl:index => "./files/" + vidURLs.files[index],
	files:[
	'Wspolczesna_kolenda(edit).mp4',
	'Ave Verum by Albinoni (Adagio in G Minor).mp4',
	'Bóg jest Miłością-(480p).mp4',
	'Przybieżeli do Betlejem.mp4']
}

var audioExtensions = ['mp3', 'ogg', 'wav', 'aac', 'flac']

videoEl.src = vidURLs.getFileUrl(0)
showCurrVidEl.textContent = vidURLs.getFileUrl(0)

videoEl.currentTime = 0.1

function playPause() {
	if (videoEl.paused) {
		videoEl.play()
	} else {
		videoEl.pause()
	}
}
document.addEventListener('keydown', e => {
	switch (e.code) {
		case 'Space':
			playPause()
			break
		case 'KeyR':
			videoEl.currentTime = 0
			hideVid()
			videoEl.pause()
			break
		case 'ArrowLeft':
			if (videoEl.currentTime > 5) {
				videoEl.currentTime -= 5
			} else {
				videoEl.currentTime = 0.1
			}
			break
		case 'ArrowRight':
			if (videoEl.currentTime + 5 < videoEl.duration) {
				videoEl.currentTime += 5
			} else {
				videoEl.currentTime = videoEl.duration
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
			if (vidURLs.files.length - 1 !== currVid) {
				hideVid()
				changeVid(++currVid)
			}
			break
	}
})
function updateProgressBar() {
	const progress = (videoEl.currentTime / videoEl.duration) * 100
	playBarEl.value = progress
}
const isAudio = link => audioExtensions.includes(link.slice(link.lastIndexOf('.') + 1))

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
	await lowerSound()
		const vidURL = vidURLs.getFileUrl(index)
		if (isAudio(vidURL)) {
			videoEl = document.querySelector('audio')
		} else {
			videoEl = document.querySelector('video')
		}	
		videoEl.src = vidURL
		showCurrVidEl.textContent = vidURL
		videoEl.currentTime = 0.1
		playBarEl.max = videoEl.duration
		updateProgressBar()
}
videoEl.addEventListener('timeupdate', updateProgressBar)

playBarEl.addEventListener('input', function () {
	const seekTime = (playBarEl.value / 100) * videoEl.duration
	videoEl.currentTime = seekTime
})

videoEl.addEventListener('ended', () => {
	hideVid()
})
videoEl.addEventListener('play', () => {
	videoEl.volume = 1
	showVid()
})
const hideVid = () => {
	videoHider.classList.add('shown')
	videoHider.classList.remove('hidden')
}
const showVid = () => {
	videoHider.classList.add('hidden')
	videoHider.classList.remove('shown')
}
const lowerSound = (lowerTo = 0) => {
  return new Promise (resolve => {
  let vol = 1000
	const sound = setInterval(() => {
		if (vol <= 0 + lowerTo) {
			clearInterval(sound)
      resolve()
		}
		vol -= 2
		videoEl.volume = vol <= 0 ? 0 : Number('0.' + `${vol}`.padStart(3, '0'))
		if (vol % 100 === 0) console.log(videoEl.volume)
	}, 1)
  })
}
