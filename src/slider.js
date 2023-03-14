import getTimeOfDay from './date_time.js';
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum = getRandomNum(1,20);
export default function getRandomNum(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
window.addEventListener('load', setBg);
function setBg(){
	const img = new Image();
	let bgNum = String(randomNum).padStart(2, "0");
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
	img.onload = () =>{
		document.body.style.backgroundImage = `url(${img.src})`;
	}
}
function getSlideNext(){
	if(randomNum < 20){
		randomNum++;
	} else{
		randomNum = 1;
	}
	setBg();
}

function getSlidePrev(){
	if(randomNum > 1){
		randomNum--;
	} else{
		randomNum = 20;
	}
	setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);