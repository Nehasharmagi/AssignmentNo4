/*
    Assignment #4
    {Neha Sharma}
*/

$(function () {
    // your code here
    navigator.permissions.query({ name: 'geolocation' }).then((permission) => { 
        if(permission.state === 'denied') {
            alert('You need to allow geolocation to use this application');
            location.reload();
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                $("div#locationhere").html(`Your current location: Latitude - <strong>${position.coords.latitude}</strong> and Longitude - <strong>${position.coords.longitude}</strong> <br>The accuracy of geolocation is ${position.coords.accuracy}`);
                
                if(localStorage.getItem('latitude') && localStorage.getItem('longitude')) {
                    $("section#content").append(`<p><small>Your last known location: Latitude - ${localStorage.getItem('latitude')} and Longitude - ${localStorage.getItem('longitude')}</small></p>`)
                    $("section#content").append(`<h1>Dear user, welcome back to our application</h1>`);

                    let distanceMovedInKM = calcDistanceBetweenPoints(parseFloat(localStorage.getItem('latitude')), parseFloat(localStorage.getItem('longitude')), position.coords.latitude, position.coords.longitude) / 1000;
                    
                    $("section#content").append(`<h2>You have moved ${distanceMovedInKM} kilometers (KM) since your last visit</h2>`);
                } else {
                    $("header").html(`<h1 style="text-align: center; padding-top: 2rem;">Dear first time visitor, we welcome you to our webpage. Greetings!</h1>`)
                }
                
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
            })
        }
    })

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


