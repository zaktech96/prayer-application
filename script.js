const date = new Date();
const currentMonth = date.getMonth();
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

function getTime(){
  const time = new Date()
  const minutes = String(time.getMinutes()).padStart(2, '0');
  currentTime.innerHTML = `${time.getHours()}:${minutes}`
}

getTime()
setInterval(getTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
  const lat = (position.coords.latitude);
  const long = (position.coords.longitude);

  fetch(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=15&month=${currentMonth}&year=${currentYear}`)
    .then((res) => {
      if (!res.ok) {
        console.log('Please allow access to location')
        throw Error("Please allow access to location");
      }
      return res.json();
    })
    .then((data) => {
      Fajr.textContent = data.data[0].timings.Fajr.slice(0, 5);
      Dhuhr.innerHTML = data.data[0].timings.Dhuhr.slice(0, 5);
      Asr.innerHTML = data.data[0].timings.Asr.slice(0, 5);
      Maghrib.innerHTML = data.data[0].timings.Maghrib.slice(0, 5);
      Isha.innerHTML = data.data[0].timings.Isha.slice(0, 5);   
      Sunrise.innerHTML = data.data[0].timings.Sunrise.slice(0,5);
      let result = /[^/]*$/.exec(`${data.data[0].meta.timezone}`)[0];
      area.innerHTML = result
    });
});

