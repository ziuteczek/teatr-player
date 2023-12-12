'use strict'

const videoEl = document.querySelector('video')
const showCurrVidEl = document.querySelector('.current-video')
const playBarEl = document.querySelector('.video-bar')
const videoHider = document.querySelector('.video-shadowing')

let currVid = 0
const vidURLs = ['./files/video/ROBLOX death sound origin.mp4', './files/video/Gragas wytacza beczkę - greenscreen.mp4']

videoEl.src = vidURLs[0]
showCurrVidEl.textContent = vidURLs[0]

videoEl.currentTime = 0.1

function changeVid(index) {
	videoEl.src = vidURLs[index]
	showCurrVidEl.textContent = vidURLs[index]
	videoEl.currentTime = 0.1
	playBarEl.max = videoEl.duration
}

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
				changeVid(++currVid)
        hideVid()
			}
			break
	}
	console.log(e.code)
})
function updateProgressBar() {
	const progress = (videoEl.currentTime / videoEl.duration) * 100
	playBarEl.value = progress
}

function changeVid(index) {
	videoEl.src = vidURLs[index]
	showCurrVidEl.textContent = vidURLs[index]
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
