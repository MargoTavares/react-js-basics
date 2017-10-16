function httpGet(theUrl) { //SYNC
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    console.log('sync response', xmlHttp);
    return xmlHttp;
}

function httpGetAsync(theUrl, callback) { //ASYNC
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else if (xmlHttp.status >= 400) {
            console.error(xmlHttp.status, xmlHttp.statusText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

var myCallback = function (response) {
    console.dir('async response', response);
}
///////////

var imageUrl = 'https://pbs.twimg.com/profile_images/884146429/aqua_teen_hunger_force_colon_movie_film_for_theatres_004_400x400.jpg';

console.log("About to do blocking request")
var myImage = httpGet(imageUrl);
console.dir("AM I WAITING?")
console.log('')
console.log("About to do non-blocking request");
httpGetAsync(imageUrl, myCallback);
console.log("AM I WAITING AGAIN?")


