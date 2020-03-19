console.log('Javascript running')



const formWeather = document.getElementById('formAddress')
const searchAddress = document.querySelector('input') 
const mp = document.getElementById('forecastMessage')
const ep = document.getElementById('errorMessage')
formWeather.addEventListener('submit', (e) =>
{
    e.preventDefault()
    mp.innerHTML="Loading......"
    ep.innerHTML=""
    const address = '/weather?address=' + searchAddress.value
    fetch(address).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                mp.innerHTML=""
                ep.innerHTML=data.error
            }
            else
            {
                mp.innerHTML=data.message + data.temperature
              
            }
        })
})
})