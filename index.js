const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '55bc402565d23cd8985da7876c564a31'; //my api key
    const city = document.querySelector('.search-box input').value;

    if (city == '.search-box input')
        return;

    //fetching data from weather website through api key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            //if incorrect location then...
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            //if location is correct then...
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            //const main = document.querySelector('weather-box .main');
            const description = document.querySelector('.weather-box .description');
            const feelslike = document.querySelector('.weather-box .feelslike');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const visibility = document.querySelector('.weather-details .visibility span');
            const uvi = document.querySelector('.weather-details .uvi span');
            //const hPa = document.querySelector('.weather-details .hPa span');
            //const dt = document.querySelector('.weather-details .dt span');
            //const sunrise = document.querySelector('.weather-details .sunrise span');
            //const timezone = document.querySelector('.weather-details .timezone span');

            switch (json.weather[0].main) {
                case 'Clear':
                    type="Clear";
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    type="Rain";
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    type="Snow";
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    type="Clouds";
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    type="Mist";
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            //main.innerHTML = `${json.weather[0].main}`;
            description.innerHTML = `${json.weather[0].description}`;
            feelslike.innerHTML = `<span>Feels like </span>${parseInt(json.main.feels_like)}<span>°C</span>`;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;
            visibility.innerHTML = `${(json.visibility)/1000.00} km`;
            uvi.innerHTML = `${(json.uvi)} `;
            //sunrise.innerHTML = `${(json.sys.sunrise)} `;
            //timezone.innerHTML = `${(json.timezone)} `;
           // hPa.innerHTML = `${(json.main.grnd_level)} hPa `;
            //dt.innerHTML = `${(json.dt)} `;
            //sunrise.innerHTML = `${(dt.innerHTML(json.sys.sunrise))} `;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '850px';


        });


});