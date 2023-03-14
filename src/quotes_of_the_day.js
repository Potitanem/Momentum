import getRandomNum from './slider';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const change_quote = document.querySelector('.change-quote');
let random;
async function getQuates() {
	const quotes = require('./data.json');
	const res = await fetch(quotes);
	const data = await res.json();
	random = getRandomNum(0, data.length-1);
	quote.textContent = data[random].text;
	author.textContent = data[random].author;
}

getQuates();

change_quote.addEventListener('click', refreshQuate);

function refreshQuate(){
	getQuates();
}