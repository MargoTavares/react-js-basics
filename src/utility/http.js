function httpGet(theUrl) { //SYNC
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback) { //ASYNC
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else {
            console.err(xmlHttp.status, xmlHttp.statusText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

// //SYNCHRONOUS SCENARIO/////////////
// httpGet(some_url_to_an_iamge);
// //^^^ this guy returned after WAITING for the image to come back from the server, so now the interpreter moves on to the next line
// console.log("Will this log out while we're waiting for the image to come back from the server"); //NO


// //A-SYNCHRONOUS SCENARIO//////////
// let renderImage(image) {  //1 define function
//     console.log(image)
// }

// httpGetAsync(some_url_to_an_image, renderImage); //2 calls function || This called function returned IMMEDIATELY
// //^^^ this guy returned so now the interpreter moves on to the next line

// console.log("Will this log out while we're waiting for the image to come back from the server"); //3 logs out a string to console

// //4 Eventually renderImage is called


// var getJSON = function (url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = 'json';
//     xhr.send();

//     xhr.onreadystatechange = function () {
//         var status = xhr.status;
//         if (status == 200) {
//             callback(xhr.response);
//         } else {
//             console.error(status, xhr.statusText);
//             //call some other function to show the user that there was some sort of error.
//         }
//     };
// };

// var myCallback = function(response){}
