import React from 'react';
import request from 'superagent';

class Weather extends React.Component {
    constructor() {
        super();

        this.state = {
            weather: {
                astronomy: {},
                atmosphere: {},
                image: {
                    url: ""
                },
                item: {
                    condition: {
                        text: ""
                    },
                    forecast: [],
                    description: "",
                },
                location: {},
                units: {},
                wind: {},
                lastBuildDate: {}
            }
        };
    }

    componentDidMount() {
        this.Weather();
    }

    Weather() {
        const url = 'https://query.yahooapis.com/v1/public/yql'; //?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        const yLocation = 'Waterloo, ON';

        request
            .get(url)
            .query({
                q: "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + yLocation + "')",
                format: 'json'
            })
            .end((err, res) => {
                this.setState({ weather: res.body.query.results.channel });
            });
    }

    render() {
        const calculateCelsius = ((fahrenheit) => {
            const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
            return `${fToC}${String.fromCharCode(176)}C`;
        });

        const calculateFahrenheit = ((celsius) => {
            const cToF = Math.round(celsius * 9 / 5 + 32);
            return <span> {cToF}&deg;F </span>;
        });

        // function change(calculateCelsius, calculateFahrenheit, fahrenheit) {
        //     const temp = 80;
        //     temp > 40 ? calculateCelsius(fahrenheit) : calculateFahrenheit(fahrenheit);
        //     console.log(fahrenheit);
        // }

        const weather = this.state.weather;
        const conditions = weather.item.condition.text;
        const fahrenheit = weather.item.condition.temp;

        var dateRegEx = /(\w{3})\,\s(\d{2})\s(\w{3})\s(\d{4})/g;
        const dateMod = dateRegEx.exec(weather.lastBuildDate) || [];
        let dateItem = "";
        if (dateMod.length) {
            dateItem = dateMod[0];
        }

        var timeRegEx = /(\d{2})\:(\d{2})\s(\w{2})/g;
        const timeMod = timeRegEx.exec(weather.lastBuildDate) || [];
        let timeItem = "";
        if (timeMod.length) {
            timeItem = timeMod[0];
        }

        var imgRegEx = /<img src="(.*)"\/>/g;
        const imageArray = imgRegEx.exec(weather.item.description) || [];
        let imageItem = "";
        if (imageArray.length) {
            imageItem = imageArray[1];
        }

        const forecast = weather.item.forecast.map((dailyForecast, key) => {
            return (
                <div className="forecast" key={key}>
                    <ul className="forecast-detail">
                        <p> {dailyForecast.day} - {dailyForecast.date}</p>
                        <p>
                            Low: {calculateCelsius(dailyForecast.low)}
                            High: {calculateCelsius(dailyForecast.high)}
                        </p>
                    </ul>
                </div>
            )
        });

        const windChill = weather.wind.chill;

        return (
            <div className="container">
                <div className="app-info">
                    <h1>Weather App</h1>
                    <p> {weather.description}</p>
                </div>
                <div className="today-info">
                    <img src={imageItem} />
                    <p> Current Conditions: {conditions} </p>
                    <p> Date: {dateItem} </p>
                    <p> Weather Last Updated At: {timeItem} </p>
                    <p className="temperature">
                        Temperature: {calculateCelsius(fahrenheit)}
                    </p>
                    <p>
                        Sunrise: {weather.astronomy.sunrise} -
                        Sunset: {weather.astronomy.sunset}
                    </p>
                    <p>
                        Humidity: {weather.atmosphere.humidity}% -
                        Wind Chill:
                            <span className="wind-chill">
                                {calculateCelsius(windChill)}
                            </span>
                    </p>
                </div>
                <div className="forecast-info">
                    <h3> 10 Day Forecast </h3>
                    <div className="forecast">
                        {forecast}
                    </div>
                </div>
                <div className="yahoo-ad">
                    <img src={weather.image.url} />
                </div>
            </div>
        );
    }
}

export default Weather;
