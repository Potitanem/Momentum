import playList from './playList.js';
const musicName = document.querySelector('.track-name');
const musicArtist = document.querySelector('.track-artist');
const playpauseBtn = document.querySelector('.play');
const nextSong = document.querySelector('.play-next');
const prevSong = document.querySelector('.play-prev');
const progress = document.querySelector('.progress');
const slider = document.querySelector('.slider');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const thumb = document.querySelector('.slider-thumb');
const time = document.querySelector('.current-time');
const fullTime = document.querySelector('.total-duration');
const repeatSong = document.querySelector('.repeat-track');


const audio = new Audio();

let track_id = 1;

window.addEventListener('load', ()=>{
	loadMusic(track_id);
})

function loadMusic(indexNumber){
	musicName.textContent = playList[indexNumber].name;
	musicArtist.textContent = playList[indexNumber].artist; 
	audio.src = playList[indexNumber].src;
	progress.style.width = 0;
	thumb.style.left = 0;
	audio.addEventListener('loadeddata', () => {
		setTime(fullTime, audio.duration);
		slider.setAttribute("max", audio.duration);
	})
}

function playMusic(){
	playpauseBtn.classList.add('pause');
	audio.play();
}

function pauseMusic(){
	playpauseBtn.classList.remove('pause');
	audio.pause();
}

playpauseBtn.addEventListener('click',()=>{
	if(playpauseBtn.classList.contains('pause')){
		pauseMusic();
	} else {
		playMusic()
	};
})

function nextTrack(){
		track_id++;
		if(track_id > playList.length-1){
			track_id = 0;
		}
		loadMusic(track_id);
		playMusic();
}

function prevTrack(){
	track_id--;
	if(track_id < 0){
		track_id = playList.length - 1;
	}
	loadMusic(track_id);
	playMusic();
}

nextSong.addEventListener('click', nextTrack);
prevSong.addEventListener('click', prevTrack);
/* audio.addEventListener('ended', nextTrack); */

function setTime(output, input){
	const minutes = Math.floor(input / 60);
	const seconds = Math.floor(input % 60);
	if(seconds < 10){
		output.textContent = minutes + ":0" + seconds;
	} else {
		output.textContent = minutes + ":" + seconds;
	}
}

/* setTime(fullTime, audio.duration); */
audio.addEventListener('timeupdate', ()=>{
	const currentAudioTime = Math.floor(audio.currentTime);
	const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
	setTime(time, currentAudioTime);

	progress.style.width = timePercentage;
	thumb.style.left = timePercentage;
})

function customSlider(){
	const val = (slider.value / audio.duration) * 100 + "%";
	progress.style.width = val;
	thumb.style.left = val;
	setTime(time, slider.value);
	audio.currentTime = slider.value;
}

slider.addEventListener('input', customSlider);

function customVolumeSlider(){
	const maxVal = volumeSlider.getAttribute("max");
	const	val = (volumeSlider.value / maxVal) * 100 + "%";
	volumeProgress.style.width = val;
	audio.volume = volumeSlider.value / 100;
}

volumeSlider.addEventListener("input", customVolumeSlider);

repeatSong.addEventListener("click", ()=>{
	repeatSong.classList.toggle("select");
})

audio.addEventListener('ended', ()=>{
	if(repeatSong.classList.contains("select")){
		loadMusic(track_id);
		playMusic();
	} else{
		nextTrack();
	}
});