const request = require('request');

const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/e7a0fe309cac02ef0c68acf693ba664e/${lat},${long}?units=si&lang=en`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to connect to weather services!!!' }, undefined);
        } else if (body.error) {
            callback({ error: 'Unable to find weather information!!!' }, undefined)
        } else {
            callback(undefined, `${body.currently.summary}. It is currently  ${body.currently.temperature} degress out. There is a ${body.currently.precip} change of rain. Wind Speed: ${body.currently.windSpeed}`)
        }
    })
}

module.exports = forecast