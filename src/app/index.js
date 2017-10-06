import React from "react";
import { render } from "react-dom";
import style from "../styles/main.scss";
import Gif from "../components/Gif.js";
import Weather from "../components/Weather.js"
import GifList from "../components/GifList.js";
import request from 'superagent';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: []
        };

        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(term) {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data })
        });
    }
    render() {
        return (
            <div>
                <Weather />
                <Gif onTermChange={this.handleTermChange} />
                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
