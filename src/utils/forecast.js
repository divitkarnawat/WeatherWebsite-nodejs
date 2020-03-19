const request = require('request')


const forecast = (geocodes, callback) => {
  
    const {lat, long} = geocodes
    const url = 'https://api.darksky.net/forecast/8bd23f201b6f9245ff415012fa74e1af/' + lat + ',' + long + '?units=si'
  //  console.log(url)

    request({ url, json: true }, (error, response) => {
        if(error)
        {
            callback('Error in connecting to the weather service', undefined)
        }
        else if(response.error)
        {
            callback('Incorrect latitutes or longitudes',undefined)
        }
        else if(response.body.currently == undefined)
        {
            callback('Incorrect latitutes or longitudes', undefined)
        }
        else
        {   
            callback(undefined,response.body.currently) 
        }
})
}


module.exports = forecast