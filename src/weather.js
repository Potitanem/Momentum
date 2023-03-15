const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const weatherError = document.querySelector('.weather-error');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

window.addEventListener('beforeunload',ourStorage());

function ourStorage(){
	if(localStorage.getItem('city') === null){
		defaultCity();
	}
  if(localStorage.getItem('city').length !== 0){
    city.value = localStorage.getItem('city');
  } else {
    defaultCity();
  }
}

function defaultCity(){
  city.value = "Minsk";
  localStorage.setItem('city', city.value);
  localStorage.getItem('city');
}

async function getWeather() { 
  try{ 
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=r&appid=1aa690b6eb41f891afcc717b61c220be&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
	weatherDescription.textContent = data.weather[0].description;
	windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
	humidity.textContent = `Humidity: ${data.main.humidity} %`;
	}
	catch(err){
		weatherIcon.style.display = 'none';
		temperature.style.display = 'none';
		weatherDescription.style.display = 'none';
		windSpeed.style.display = 'none';
		humidity.style.display = 'none';
		weatherError.textContent = `Error! city not found for '${city.value}' !`;
	}
}

document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('keydown', e =>{
		if (e.key == 'Enter') {
			localStorage.setItem('city', city.value);
			city.value = localStorage.getItem('city');
			if(city.value.length !== 0){
				getWeather();
			} else{
				city.placeholder = '[Enter city]';
				weatherIcon.style.display = 'none';
				temperature.style.display = 'none';
				weatherDescription.style.display = 'none';
				windSpeed.style.display = 'none';
				humidity.style.display = 'none';
				weatherError.textContent = 'Error! Nothing to geocode for \' \' !';
			}
		}
});