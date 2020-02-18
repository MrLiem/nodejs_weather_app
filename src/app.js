const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()
    // Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Liem Dinh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Liem Dinh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page',
        title: 'Help page',
        name: 'Liem Dinh'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!!!'
        })
    }
    geocode(req.query.address, (error, { long, lat, location } = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecastData,
                location,
                address: req.query.address,
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Liem Dinh',
        errorMessage: 'Help article can not be found!!!'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Liem Dinh',
        errorMessage: '404 Error'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000!!!')
})