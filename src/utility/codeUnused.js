        //${String.fromCharCode(176)}F degrees sign


// const calculateCelsius = ((fahrenheit) => {
//         const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
//         return `${fToC}`;
// });

// function changeToCelsius(temp) {
//         temp = document.getElementById("changeMe").innerHTML;
//         const calculateCelsius = ((fahrenheit) => {
//                 const fToC = Math.round(fahrenheit * 9 / 5 + 32);
//                 return `${fToC}`;
//         });
//         calculateCelsius(temp);
//         return document.getElementById("changeMe").innerHTML = calculateCelsius(temp);
// }


// function letterChange(letter) {
//         letter = document.getElementById("tempLetter").innerHTML;
//         letter === "C" ? letter == "F" : letter == "C";
//         return letter;
// }

/////////////////////////

// function changeTemp(temp, tempLetter) {
//         temp = document.getElementById("changeMe").innerHTML;
//         tempLetter = document.getElementById("tempLetter").innerHTML;

//         const calculateFahrenheit = ((celsius) => {
//                 const cToF = Math.round(celsius * 9 / 5 + 32);
//                 return `${cToF}`;
//         });

//         const letterChange = ((letter) => {
//                 var change = letter === "C" ? "F" : "C";
//                 return change;
//         });

//         const calculateCelsius = ((fahrenheit) => {
//                 const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
//                 return `${fToC}`;
//         });



//         if (tempLetter === "F") {
//                 calculateFahrenheit(temp);
//                 letterChange("C");
//                 console.log(tempLetter);
//                 console.log(temp);
//                 return document.getElementById("changeMe").innerHTML = calculateFahrenheit(temp);
//         } else {
//                 calculateCelsius(temp);
//                 letterChange(tempLetter);
//                 console.log(tempLetter);
//                 return document.getElementById("changeMe").innerHTML = calculateCelsius(temp);
//         }
//         letterChange(tempLetter);
//         return document.getElementById("tempLetter").innerHTML = letterChange(tempLetter);
// }

///////// Yahoo image using xml
// <div className="yahoo-ad" id="yahoo">
//         <img id="example" src={httpGetAsync(url, callback)} />
// </div>


///////// Keep for future city lookup
// <input value={this.state.inputValue} onChange={inputCity => this.Weather(inputCity)} />
// onInputChange(inputValue) {
//         this.setState({ inputValue });
//         this.props.onTermChange(inputValue);
//         console.log(inputValue);
// }


/// url for weather api requiring keys
//?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


///
// function weatherIcon(code) {
//         code = document.getElementById("codeValue").innerHTML;
//         switch (code) {
//                 case 5:
//                         document.getElementById("codeValue2").innerHTML = "Mixed Rain and Snow";
//                         break;
//                 default:
//                         document.getElementById("codeValue2").innerHTML = "N/A";
//         }
// }

// if case for displaying photos
// if (code === 5) {
//         code2 = "./images/weather-icons.jpg"
//         return code2;
// } else if (code === 28) {
//         code = "./images/cat.png";
//         return code2;
// } else {
//         code = "./images/weather-icons.jpg";
//         console.log(code);
//         return code2;
// };

/// switch for displaying weather icons
// function renderPhoto() {
//         var code = document.getElementById("codeValue");
//         var code2 = "";
//         switch (code) {
//                 case 5:
//                         code2 = "./images/weather-icons.jpg";
//                         break;
//                 case 34:
//                         code2 = "./images/weather-icons.jpg";
//                         break;
//                 case 28:
//                         code2 = "./images/weather-icons.jpg";
//                         break;
//                 case 26:
//                         code2 = "./images/weather-icons.jpg";
//                         break;
//                 case 12:
//                         code2 = "./images/weather-icons.jpg";
//                         break;
//                 default:
//                         code2 = "./images/cat.png";
//                         break;
//                         return code2;
//         };
// };
