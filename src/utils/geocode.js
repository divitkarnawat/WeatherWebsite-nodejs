const request  = require('request')

const geocode = (address, callback) => 
{
    const url_lat_long = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGl2aXRrIiwiYSI6ImNrN3dlcmR6NTAxaDAzZnBwNmZ0a3pjcWkifQ.FgFny8408a_K6VsNHybj9A&limit=1'
    request({ url: url_lat_long, json: true}, (error, { body }) =>
    {
        if(error)
        {
            callback('Error in connecting to geocoding api', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Kindly enter different loacation', undefined)
        }
        else
        {
            const res = body.features[0].center
            const lat = res[1]
            const long = res[0]
            const place = body.features[0].place_name
            callback(undefined, {lat, long, place})
        }   
    })

}




module.exports = geocode