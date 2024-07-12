async function getWeather(location) {
        
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd1d887415cmsh985b8cd21e3d018p1ed1ebjsn723510c1ce85',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            return JSON.parse(result);  
    }

module.exports = getWeather;