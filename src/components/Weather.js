import React from 'react';
import request from 'superagent';

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {
                astronomy: {},
                atmosphere: {},
                image: {
                    url: ""
                },
                item: {
                    condition: {
                        text: "",
                        temp: {}
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
        const weather = this.state.weather;
        const conditions = weather.item.condition.text;
        const fahrenheit = weather.item.condition.temp;
        const windChill = weather.wind.chill;
        const url = 'https://static.bbc.co.uk/weathermobile/0.1.1212/images/responsive/icons/weather/vector/infographic/en/1.svg';
        const degree = String.fromCharCode(176);

        const calculateCelsius = ((fahrenheit) => {
            const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
            return `${fToC}`;
        });

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
                        <p> {dailyForecast.day} </p>
                        <p> {dailyForecast.date}</p>
                        <p> Low: {calculateCelsius(dailyForecast.low)}{degree} C </p>
                        <p> High: {calculateCelsius(dailyForecast.high)}{degree} C </p>
                    </ul>
                </div>
            )
        });

        function httpGetAsync(url, callback) {
            var test = new XMLHttpRequest();
            test.onreadystatechange = function () {
                if (test.readyState == 4 && test.status == 200) {
                    callback(url);
                } else if (test.status >= 400) {
                    console.error(test.status, test.statusText);
                }
            };
            test.open("GET", url, true);
            test.send(null);
        };

        function callback (url, error) {
            if (error) {
                console.error('Download error!', error)
            } else {
                document.getElementById('example').src = url;
            }
        };

        function changeTemp(temp, tempLetter) {
            temp = document.getElementById("changeMe").innerHTML;
            tempLetter = document.getElementById("tempLetter").innerHTML;

            const calculateFahrenheit = ((celsius) => {
                const cToF = Math.round(celsius * 9 / 5 + 32);
                return `${cToF}`;
            });

            const letterChange = ((letter) => {
                var change = letter === "F" ? "C" : "F";
                return change;
            });

            const calculateCelsius = ((fahrenheit) => {
                const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
                return `${fToC}`;
            });

            if (tempLetter === "C") {
                calculateFahrenheit(temp);
                return document.getElementById("changeMe").innerHTML = calculateFahrenheit(temp),
                    document.getElementById("tempLetter").innerHTML = letterChange(tempLetter)

            } else {
                return document.getElementById("changeMe").innerHTML = calculateCelsius(temp),
                    document.getElementById("tempLetter").innerHTML = letterChange(tempLetter)

            }
        }

        const letterC = "C";

        console.log(weather);

        return (
            <div className="container">
                <div className="app-info">
                    <h1>WEATHER</h1>
                    <p> {weather.description} </p>
                </div>
                <div className="contain-elements-for-weather">
                    <div className="today-info">
                        <h3> {dateItem} </h3>
                        <img src={imageItem} className="weather-image"/>
                        <p> {conditions} </p>
                        <p> {timeItem} </p>
                        <p className="temperature">
                            Temperature: <span id="changeMe">{calculateCelsius(fahrenheit)}</span>
                            <span>{degree}</span>
                            <span id="tempLetter">{letterC}</span>
                            &nbsp;
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round" onClick={changeTemp}></span>
                            </label>
                        </p>
                        <p>
                            Sunrise: {weather.astronomy.sunrise} -
                            Sunset: {weather.astronomy.sunset}
                        </p>
                        <p>
                            Humidity: {weather.atmosphere.humidity}% -
                            Wind Chill: {calculateCelsius(windChill)}{degree}
                        </p>
                    </div>
                    <div className="forecast-info">
                        <h3> 10 Day Forecast </h3>
                        <div className="forecast">
                            {forecast}
                        </div>
                    </div>
                </div>
                <div className="yahoo-ad" id="yahoo">
                    <img id="example" src={httpGetAsync(url, callback)} />
                </div>
            </div>
        );
    }
}

export default Weather;
