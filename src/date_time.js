const time = document.querySelector('.time');
const ourDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting'); 
const timeOfDay = getTimeOfDay();
const nameOfUser = document.querySelector('.name');
const greetingText = `Good ${timeOfDay},`;
function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
	const options = {weekday: 'long', month: 'long', day: 'numeric'};
	const currentDate = date.toLocaleDateString('en-EN', options);
	ourDate.textContent = currentDate;
	greeting.textContent = greetingText;
	setTimeout(showTime, 1000);
}
showTime();

export default function getTimeOfDay(){
	const greetingYou = new Date();
	const hours = greetingYou.getHours();
	const arrDay = ['morning', 'afternoon', 'evening', 'night'];
	return arrDay[Math.floor(hours/6)];
}

function setLocalStorage() {
  localStorage.setItem('name', nameOfUser.value);
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  if(localStorage.getItem('name')) {
    nameOfUser.value = localStorage.getItem('name');
  } else{
		nameOfUser.placeholder = "[Enter name]";
	}
}
window.addEventListener('load', getLocalStorage)