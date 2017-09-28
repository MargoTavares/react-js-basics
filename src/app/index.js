import React from "react";
import { render } from "react-dom";
import style from "../styles/main.scss";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Hello!</h1>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));
