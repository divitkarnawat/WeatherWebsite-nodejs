const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname, '../public')
const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About Page'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help'
    })
})


app.get('/weather', (req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
                                error: 'Kindly enter address'
                        }
            )
    }
    
    geocode(req.query.address, (error, geocodes) =>
    {
        if(error)
        {
            return res.send({
                                error
                        }
            )
        }
            const {place} = geocodes
            
            forecast(geocodes, (error, forecastData) =>
            {
                if(error)
                {
                    return res.send({
                        error
                }
                )
                }
                
                 res.send({
                            message: "temperature is : ",
                            temperature: forecastData.temperature})
            
            })
    
    
    
    })
    
})

app.get('*', (req,res) =>
{
    res.send('404: PAGE NOT FOUND')
})

app.listen(port, ()=>
{
    console.log('Server is running')
})