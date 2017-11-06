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
