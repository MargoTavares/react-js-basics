        //${String.fromCharCode(176)}F degrees sign


const calculateCelsius = ((fahrenheit) => {
        const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
        return `${fToC}`;
});

function changeToCelsius(temp) {
        temp = document.getElementById("changeMe").innerHTML;
        const calculateCelsius = ((fahrenheit) => {
                const fToC = Math.round(fahrenheit * 9 / 5 + 32);
                return `${fToC}`;
        });
        calculateCelsius(temp);
        return document.getElementById("changeMe").innerHTML = calculateCelsius(temp);
}


function letterChange(letter) {
        letter = document.getElementById("tempLetter").innerHTML;
        letter === "C" ? letter == "F" : letter == "C";
        return letter;
}

/////////////////////////

function changeTemp(temp, tempLetter) {
        temp = document.getElementById("changeMe").innerHTML;
        tempLetter = document.getElementById("tempLetter").innerHTML;

        const calculateFahrenheit = ((celsius) => {
                const cToF = Math.round(celsius * 9 / 5 + 32);
                return `${cToF}`;
        });

        const letterChange = ((letter) => {
                var change = letter === "C" ? "F" : "C";
                return change;
        });

        const calculateCelsius = ((fahrenheit) => {
                const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
                return `${fToC}`;
        });



        if (tempLetter === "F") {
                calculateFahrenheit(temp);
                letterChange("C");
                console.log(tempLetter);
                console.log(temp);
                return document.getElementById("changeMe").innerHTML = calculateFahrenheit(temp);
        } else {
                calculateCelsius(temp);
                letterChange(tempLetter);
                console.log(tempLetter);
                return document.getElementById("changeMe").innerHTML = calculateCelsius(temp);
        }
        letterChange(tempLetter);
        return document.getElementById("tempLetter").innerHTML = letterChange(tempLetter);
}

///////// Yahoo image using xml
<div className="yahoo-ad" id="yahoo">
        <img id="example" src={httpGetAsync(url, callback)} />
</div>

// <input value={this.state.inputValue} onChange={inputCity => this.Weather(inputCity)} />
