const express = require('express');
const router = express.Router();
const modifyError = require('modifyerror');
const getWeather = require('../startup/getWeather');

let weatherDataBeograd;
let weatherDataNoviSad;
let weatherDataNis;

async function getInitialWeather() {
    try {
        weatherDataBeograd = await getWeather('Belgrade');
        weatherDataNoviSad = await getWeather('Novi Sad');
        weatherDataNis = await getWeather('Niš');
    } catch (error) {
        return null
    }
}
getInitialWeather()

setInterval(async () => {
    try {
        weatherDataBeograd = await getWeather('Belgrade');
        weatherDataNoviSad = await getWeather('Novi Sad');
        weatherDataNis = await getWeather('Niš');
    } catch (error) {
        return null
    }
    
}, 600000 )

router.get('/weather/:location', async (req, res) => {


    const location = req.params.location;
    
    try {  
        if(!weatherDataBeograd || !weatherDataNoviSad || !weatherDataNis) return res.json({weatherMsg: new WeatherMsg(false, 'Problem sa podacima za vreme')});
        if(location == 'Belgrade') return res.json({weatherMsg: new WeatherMsg(true, weatherDataBeograd)});
        if(location == 'Novi Sad') return res.json({weatherMsg: new WeatherMsg(true, weatherDataNoviSad)});
        if(location == 'Niš') return res.json({weatherMsg: new WeatherMsg(true, weatherDataNis)});

    } catch (error) {
        res.json({error: modifyError(error)});
    }
})

module.exports = router;


function WeatherMsg(isSuccess, result) {
    this.isSuccess = isSuccess; 
    if(isSuccess) {
        this.weatherData = result;
    }
    if(!isSuccess) {
        this.failureMsg = result;
    }
}