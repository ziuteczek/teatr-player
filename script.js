'use strict'

const videoEl = document.querySelector('video')
const showCurrVidEl = document.querySelector('.current-video')
const playBarEl = document.querySelector('.video-bar')
const videoHider = document.querySelector('.video-shadowing')

let currVid = 0
const vidURLs = [
	'./files/video/Wspolczesna_kolenda(edit).mp4',
	'./files/video/Ave Verum by Albinoni (Adagio in G Minor).mp4',
	'./files/video/Bóg jest Miłością-(480p).mp4',
	'./files/video/Przybieżeli do Betlejem.mp4',
]

videoEl.src = vidURLs[0]
showCurrVidEl.textContent = vidURLs[0]

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
			if (showCurrVidEl.style.opacity === '1') {
				showCurrVidEl.style.opacity = '0'
				playBarEl.style.display = 'none'
			} else {
				showCurrVidEl.style.opacity = '1'
				playBarEl.style.display = 'block'
			}
			break
		case 'KeyH':
			if (document.body.style.cursor === 'none') {
				document.body.style.cursor = 'auto'
			} else {
				document.body.style.cursor = 'none'
			}
		case 'Comma':
			if (currVid !== 0) {
				changeVid(--currVid)
				hideVid()
			}
			break
		case 'Period':
			if (vidURLs.length - 1 !== currVid) {
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

function changeVid(index) {
	lowerSound()
	setTimeout(() => {
		videoEl.src = vidURLs[index]
		showCurrVidEl.textContent = vidURLs[index]
		videoEl.currentTime = 0.1
		playBarEl.max = videoEl.duration
		updateProgressBar()
	}, 10000)
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
	let vol = 1000
	const sound = setInterval(() => {
		if (vol <= 0 + lowerTo) {
			clearInterval(sound)
		}
		vol -= 2
		videoEl.volume = vol <= 0 ? 0 : Number('0.' + `${vol}`.padStart(3, '0'))
    if (vol % 100 === 0) console.log(videoEl.volume)
	}, 1)
}
