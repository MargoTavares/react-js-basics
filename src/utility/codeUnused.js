        //${String.fromCharCode(176)}F degrees sign


const calculateCelsius = ((fahrenheit) => {
        const fToC = Math.round(((fahrenheit - 32) * 5) / 9);
        return `${fToC}`;
});
