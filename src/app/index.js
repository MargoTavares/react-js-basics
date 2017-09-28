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
                    condition: {}
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
            console.log(res.body.query);
        });
    }

    render() {
        const weather = this.state.weather;

        return (
            <div className="container">
                <h1>Hello!</h1>
                <p className="weather"> Description: {weather.description}</p>
                <p> Language: {weather.language}</p>
                <p> Sunrise: {weather.astronomy.sunrise}</p>
                <p> Sunset: {weather.astronomy.sunset}</p>
                <h3>Atmosphere</h3>
                <p> Humidity: {weather.atmosphere.humidity}</p>
                <p> Date: {weather.lastBuildDate}</p>
                <p> Wind Chill: {weather.wind.chill}</p>
                <p> Temperature:
                    {weather.item.condition.temp}
                    {weather.units.temperature}
                </p>
                <p>
                    <img alt="ad" src="http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif" />
                </p>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
