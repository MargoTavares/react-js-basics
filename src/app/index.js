import React from "react";
import { render } from "react-dom";
import style from "../styles/main.scss";
import request from 'superagent';

class App extends React.Component {
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
                    condition: {},
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
        const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

        request.get(url, (err, res) => {
            this.setState({ weather: res.body.query.results.channel });
            console.dir(res.body.query.results.channel.item.forecast);
        });
    }

    render() {
        const weather = this.state.weather;

        const temp = weather.item.condition.temp;
        const fahrenheit = temp;
        const celsius = Math.round(((fahrenheit - 32) * 5) / 9);

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
                        <p> Low: {dailyForecast.low} High: {dailyForecast.high} </p>
                    </ul>
                </div>
            )
        });
        console.log(weather);
        console.log(weather.item.description);
        console.log(weather.lastBuildDate);

        return (
            <div className="container">
                <div className="app-info">
                    <h1>Weather App</h1>
                    <p> {weather.description}</p>
                </div>
                <div className="today-info">
                    <img src={imageItem} />
                    <p> Date: {dateItem} </p>
                    <p> Weather Last Updated At: {timeItem} </p>
                    <p className="temperature">
                        Temperature: {celsius} C
                    </p>
                    <p>
                        Sunrise: {weather.astronomy.sunrise} -
                        Sunset: {weather.astronomy.sunset}
                    </p>
                    <p>
                        Humidity: {weather.atmosphere.humidity} -
                        Wind Chill: {weather.wind.chill}
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

render(<App/>, window.document.getElementById("app"));
