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
                image: {},
                item: {
                    condition: {},
                    forecast: [],
                    description: ""
                },
                location: {},
                units: {},
                wind: {}
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
        var myregpatternthing = /<img src="(.*)"\/>/g;
        const imageArray = myregpatternthing.exec(weather.item.description) || [];
        let image = "";



        if (imageArray.length) {
            image = imageArray[1];
        }


        const forecast = this.state.weather.item.forecast.map((dailyForecast, key) => {
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
        console.log(image);

        return (
            <div className="container">
                <h1>Weather App</h1>
                <p className="weather"> Description: {weather.description}</p>
                <p> Language: {weather.language}</p>
                <p> Sunrise: {weather.astronomy.sunrise}</p>
                <p> Sunset: {weather.astronomy.sunset}</p>
                <h2> Forecast </h2>
                <div className="forecast">
                    {forecast}
                </div>
                <h3>Atmosphere</h3>
                <p> Humidity: {weather.atmosphere.humidity}</p>
                <p> Date: {weather.lastBuildDate}</p>
                <p> Wind Chill: {weather.wind.chill}</p>
                <p> Temperature:
                    {weather.item.condition.temp}
                    {weather.units.temperature}
                    <img src={image} />
                </p>
                <p>
                    <img alt="ad" src="http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif" />
                </p>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
