const request = require('request')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiMDg2MjE0NDkwMCIsImEiOiJjazZoeDJkamsyeXRlM2duem8xbXA2MTBiIn0.YdDS6B_CVJJcKOgM3hCjeg`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to connect to location services!!!' }, undefined);
        } else if (body.features.length === 0) {
            callback({ error: 'Unable to find exact data!!!' }, undefined)
        } else {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode