import React from "react";
import { render } from "react-dom";
import style from "../styles/main.scss";
import Gif from "../components/Gif.js";
import Weather from "../components/Weather.js"

class App extends React.Component {
    render() {
        return (
            <div>
                <Weather />
                <Gif />
            </div>
        )
    }
}

render(<App/>, window.document.getElementById("app"));
