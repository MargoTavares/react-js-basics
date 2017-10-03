//Fill in your consumer Key & Secret from Yahoo's App & adjust location as needed
var consumerKey = "dj0yJmk9ZnhiNFhiMUdRMmFTJmQ9WVdrOVZ6WkpiWEI0TXpBbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zZQ--";
var consumerSecret = "ce0eabb3b799ddb10628ecf73f7fbc802de5695f";
var locationToQuery = "4051"; //Can be zip code or anything that works in the query select woeid from geo.places(1) where text=<Your Location>

var makeSignedRequest = function (ck, cs, loc) {

    var encodedurl = "https://query.yahooapis.com/v1/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + loc + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    var accessor = { consumerSecret: cs, tokenSecret: "" };
    var message = { action: encodedurl, method: "GET", parameters: [["oauth_version", "1.0"], ["oauth_consumer_key", ck]] };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message);
    var baseStr = OAuth.decodeForm(OAuth.SignatureMethod.getBaseString(message));
    var theSig = "";

    if (parameterMap.parameters) {
        for (var item in parameterMap.parameters) {
            for (var subitem in parameterMap.parameters[item]) {
                if (parameterMap.parameters[item][subitem] == "oauth_signature") {
                    theSig = parameterMap.parameters[item][1];
                    break;
                }
            }
        }
    }

    var paramList = baseStr[2][0].split("&");
    paramList.push("oauth_signature=" + encodeURIComponent(theSig));
    paramList.sort(function (a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
        return 0;
    });

    var locString = "";
    for (var x in paramList) {
        locString += paramList[x] + "&";
    }

    var finalStr = baseStr[1][0] + "?" + locString.slice(0, locString.length - 1);

    return finalStr;
};

var encodedURL = makeSignedRequest(consumerKey, consumerSecret, locationToQuery);

document.getElementById("url").innerHTML = '<a href="' + encodedURL + '" target="_blank">' + encodedURL + '</a>';
