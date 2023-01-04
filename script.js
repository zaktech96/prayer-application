const date = new Date();
const currentMonth = date.getMonth()
const currentYear = date.getFullYear()
const currentHours = date.getHours();
const currentMinutes = date.getMinutes();

let Fajr = document.getElementById('fajr')
let Dhuhr = document.getElementById('duhr')
let Asr = document.getElementById('asr')
let Maghrib = document.getElementById('maghrib')
let Isha = document.getElementById('isha')
let timing = document.getElementById('test')
let time2 = document.getElementById('time')

function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours and ${remainingMinutes} minutes`;
  }

  function timeLeft(hours1, minutes1) {
    // Get the current date and time
    const now = new Date();
  
    // Set the time for 6am tomorrow
    const target = new Date();
    target.setHours(hours1);
    target.setMinutes(minutes1);
    target.setSeconds(0);
    target.setMilliseconds(0);
    if (target < now) {
      target.setDate(target.getDate() + 1);
    }
  
    // Calculate the time left until 6am tomorrow
    const timeLeft = target - now;
  
    // Convert the time left to hours and minutes
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    if(seconds.toString().length == 1){
        seconds = '0' + seconds
    }
    if(minutes.toString().length == 1){
        minutes = '0' + minutes
    }
    time2.innerHTML = `${hours}:${minutes}:${seconds}`
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds from now`;
  }


navigator.geolocation.getCurrentPosition(position => {
    const lat = (position.coords.latitude)
    const long = (position.coords.longitude)

fetch(`http://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${long}&method=15&month=${currentMonth}&year=${currentYear}`)
    .then((res) => {
        if(!res.ok){
            throw Error('Please allow access to location')
        }
        return res.json()
    })
    .then((data) => {
        Fajr.innerHTML = data.data[0].timings.Fajr.slice(0,5)
        Dhuhr.innerHTML = data.data[0].timings.Dhuhr.slice(0,5)
        Asr.innerHTML = data.data[0].timings.Asr.slice(0,5)
        Maghrib.innerHTML = data.data[0].timings.Maghrib.slice(0,5)
        Isha.innerHTML = data.data[0].timings.Isha.slice(0,5)

        const fajrHours = data.data[0].timings.Fajr.split(':')[0];
        const fajrMinutes = data.data[0].timings.Fajr.slice(0,5).split(':')[1]
        const dhuhrHours = data.data[0].timings.Dhuhr.split(':')[0];
        const dhuhrMinutes = data.data[0].timings.Dhuhr.slice(0,5).split(':')[1];
        const asrHours = data.data[0].timings.Asr.split(':')[0];
        const asrMinutes = data.data[0].timings.Asr.slice(0,5).split(':')[1];
        const maghribHours = data.data[0].timings.Maghrib.split(':')[0];
        const maghribMinutes = data.data[0].timings.Maghrib.slice(0,5).split(':')[1];
        const ishaHours = data.data[0].timings.Isha.split(':')[0];
        const ishaMinutes = data.data[0].timings.Isha.slice(0,5).split(':')[1];

        let nextPrayer = 'Fajr'


        if( dhuhrHours >= currentHours || currentHours === dhuhrHours && dhuhrMinutes >= currentMinutes ){
            nextPrayer = 'Dhuhr'
           return console.log(timeLeft(dhuhrHours, dhuhrMinutes))
        }
        else if(asrHours >= currentHours || currentHours === asrHours && asrMinutes >= currentMinutes){
            nextPrayer = 'Asr'
           return console.log(`The next prayer is ${timeLeft(asrHours, asrMinutes)}`)
        }
        else if(maghribHours >= currentHours || currentHours === maghribHours && maghribMinutes >= currentMinutes){
            nextPrayer = 'Maghrib'
           return console.log(`The next prayer is ${nextPrayer}${timeLeft(maghribHours, maghribMinutes)}`)
        }
        else if(ishaHours >= currentHours || currentHours === ishaHours && ishaMinutes >= currentMinutes){
            nextPrayer = 'Isha'
           return console.log(timeLeft(ishaHours, ishaMinutes))
        }
        else{
            function fajrTimeLeft(){
                return timeLeft(fajrHours,fajrMinutes)
            }
            
            return timing.innerHTML = `The next prayer is ${nextPrayer} which is ${fajrTimeLeft()}`
        }

        
    })
})
