let background = document.querySelector('.container')

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => {
        if (!res.ok) {
            throw Error("L")
        }
        console.log(res.status)
        return res.json()
    })
    .then(data => {
        console.log(data)
        background.style.backgroundImage = `url('${data.urls.full}')`
        document.querySelector('.author').textContent = `By: ${data.user.name}`
        console.log(data.urls.regular)

    })
    .catch(err => {
        console.error((err))
        console.log('https://i.kym-cdn.com/photos/images/original/002/283/888/620.jpg')
        background.style.backgroundImage = `url('https://i.kym-cdn.com/photos/images/original/002/283/888/620.jpg')`
        document.querySelector('.author').textContent = 'lol'
    })



fetch('https://api.coingecko.com/api/v3/coins/terra-luna')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('.crypto').innerHTML = 
        `
        <h2 class='align'><img src= '${data.image.thumb}'></img>${data.name}</h2>
        <p>🎯: £${data.market_data.current_price.gbp}</p>
        <p>👆: £${data.market_data.high_24h.gbp}</p>
        <p>👇: £${data.market_data.low_24h.gbp}</p>
        `
    })
    .catch(err =>{
        console.error((err))
    })

function getTime(){
    const time = new Date()
    const minutes = String(time.getMinutes()).padStart(2, '0');
    document.querySelector('.time').textContent = `${time.getHours()}:${minutes}`
}

getTime()
setInterval(getTime, 1000)

  
navigator.geolocation.getCurrentPosition(position => {
    const lat = (position.coords.latitude)
    const long = (position.coords.longitude)

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`)
        .then(res => {
            if(!res.ok){
                throw Error('Weather broken')
            }
            return res.json()
        })
        .then(data =>{
            console.log(data)
            console.log(data.weather[0].icon)
            document.querySelector('.weather').innerHTML =
            `<div class='block'>
            <img src=' http://openweathermap.org/img/wn/${data.weather[0].icon}.png'></img>
            <h2>${Math.round(data.main.temp)}°C</h2>
            </div>
            <h4>${data.name}</h4>
            `
        })
        .catch(err => console.log(err))
});

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'ed59df7961mshc329a8eff9b394cp1d5c1fjsn92ceee6ac5cf',
		'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
	},
	body: '{"key1":"value","key2":"value"}'
};

fetch('https://motivational-quotes1.p.rapidapi.com/motivation', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => {
        console.log('oops')
        console.log(err)
    })

  
