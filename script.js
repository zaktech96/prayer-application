const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();
const currentHours = date.getHours();
const currentMinutes = date.getMinutes();


let Fajr = document.getElementById("fajr");
let Sunrise = document.getElementById("sunrise")
let Dhuhr = document.getElementById("duhr");
let Asr = document.getElementById("asr");
let Maghrib = document.getElementById("maghrib");
let Isha = document.getElementById("isha");
let timing = document.getElementById("test");
let currentTime = document.getElementById('current_time')
let area = document.querySelector(".country")
let background = document.querySelector('body')

let quote = document.querySelector('.quote')

function getTime(){
  const time = new Date()
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const hours = String(time.getHours()).padStart(2, '0');
  currentTime.innerHTML = `${hours}:${minutes}`
}

getTime()
setInterval(getTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
  const lat = (position.coords.latitude);
  const long = (position.coords.longitude);
  const date = new Date();
  const day = date.getDate() - 1
  fetch(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=15&month=${currentMonth}&year=${currentYear}`)
    .then((res) => {
      if (!res.ok) {
        console.log('Please allow access to location')
        throw Error("Please allow access to location");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data)
      Fajr.textContent = data.data[day].timings.Fajr.slice(0, 5);
      Dhuhr.innerHTML = data.data[day].timings.Dhuhr.slice(0, 5);
      Asr.innerHTML = data.data[day].timings.Asr.slice(0, 5);
      Maghrib.innerHTML = data.data[day].timings.Maghrib.slice(0, 5);
      Isha.innerHTML = data.data[day].timings.Isha.slice(0, 5);   
      Sunrise.innerHTML = data.data[day].timings.Sunrise.slice(0,5);
      let result = /[^/]*$/.exec(`${data.data[day].meta.timezone}`)[0];
      area.innerHTML = result

      
    });

});
fetch("./quotes.json")
  .then(res=> res.json())
  .then(data => {
    console.log(data)
    console.log(i)
    let i = Math.floor(Math.random()*4)
    quote.innerHTML = data.quotes[i].text
  })

// Get the checkbox elements
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");
const checkbox3 = document.getElementById("checkbox3");
const checkbox4 = document.getElementById("checkbox4");
const checkbox5 = document.getElementById("checkbox5");
const checkbox6 = document.getElementById("checkbox6");

// An array to store all the checkbox elements
const checkboxes = [checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6];

checkboxes.forEach((checkbox, index) => {
    // Check if there is a saved value in localStorage
    if (localStorage.getItem(`checkbox${index+1}Value`)) {
      // If there is, set the checkbox to the saved value
      checkbox.checked = JSON.parse(localStorage.getItem(`checkbox${index+1}Value`));
    }
  
    // Add an event listener to the checkbox to listen for changes
    checkbox.addEventListener("change", (event) => {
      // Save the current value of the checkbox in localStorage
      localStorage.setItem(`checkbox${index+1}Value`, event.target.checked);
    });
})

const today = new Date();

// Get the date of the last time the checkboxes were cleared
let lastCleared;
if (localStorage.getItem("lastCleared")) {
  lastCleared = new Date(localStorage.getItem("lastCleared"));
} else {
  lastCleared = new Date(0);
}

// Check if the current date is a new day
if (today.getDate() !== lastCleared.getDate()) {
  // If it is, clear the checkboxes and update the last cleared date
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  localStorage.setItem("lastCleared", today);
}

fetch('quotes.json')
  .then(res => res.json())
  .then(data => {
    console.log(data.quotes[0])
    quote.textContent = data.quotes[0].text
    document.querySelector('.quote-ref').textContent = `${data.quotes[0].author}`
  })

//$2y$10$jhJBF4h8hoVgZ4HFybBbWFWThqcMpM2FJm6m7uQzrBlzCTNuepq

//"I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.""

console.log(Math.floor(Math.random()*5))
