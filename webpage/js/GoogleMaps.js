/**
 * wtfsigfd - v0.2.0 - 2014-02-23
 * o
 * Copyright (c) 2014 Glenn Angelo | glenn@coolography.co.uk; Licensed MIT
 */
function getLocation() {
    Modernizr.geolocation ? (navigator.geolocation.getCurrentPosition(currentLocation, handle_error, {
        timeout: 1e4
    }), console.log("browser has geolocation")) : (console.log("browser has no geolocation"), $wait.fadeOut(), $locationBar.fadeIn())
}
function handle_error(err) {
    $locationBar.css("opacity", 1), showError("can't find your fucking location"), console.log("can't find location"), 0 == err.code && console.log("unknown"), 1 == err.code && console.log("denied"), 2 == err.code && console.log("unreliable"), 3 == err.code && console.log("taking ages")
}
function currentLocation(position) {
    $wait.fadeIn(), $locationBar.fadeOut();
    var latitude = position.coords.latitude, longitude = position.coords.longitude;
    currentlatlng = new google.maps.LatLng(latitude, longitude), console.log("current position is: " + currentlatlng), getPlaces(currentlatlng)
}
function getPlaces(currentlatlng) {
    userLoc = currentlatlng, homeMarker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: currentlatlng,
        icon: homeIcon
    });
    var requestBar = {
        location: currentlatlng,
        radius: 1e3,
        keyword: "restaurant"
    };
    service.search(requestBar, storeRequestBar)
}
function storeRequestBar(request) {
    barResultsStore = request;
    var requestPub = {
        location: currentlatlng,
        radius: 1e3,
        keyword: "restaurant"
    };
    service.search(requestPub, storeRequestPub)
}
function storeRequestPub(request) {
    for (pubResultsStore = request, totalResults = barResultsStore.concat(pubResultsStore)
        , console.log("there are " + totalResults.length + "pubs & bars"), resultsStore = removeDupes(totalResults, "id"), resultsStore = resultsStore.sort(function() {
        return Math.random() - .5
    }), i = 0;
    i < resultsStore.length;
    i++)console.log(resultsStore[i].name);
    0 == resultsStore && showError("can't find shit there. try somewhere else"), chooseBar(resultsStore)
}
function chooseBar(results) {
    barRef = {
        reference: results[shitCounter].reference
    }, service.getDetails(barRef, showBar)
}
function showBar(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (i in markersArray)
            markersArray[i].setMap(null);
        drinkMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location,
            icon: drinkIcon
        }), markersArray.push(drinkMarker), placeName = place.name, calcRoute(userLoc, place.geometry.location), directionsDisplay.setMap(null), directionsDisplay.suppressMarkers=!0, directionsDisplay.polylineOptions = {
            strokeColor: "#ff8400",
            strokeOpacity: .8,
            strokeWeight: 5
        }, directionsDisplay.setMap(map), placeSite = place.website ? place.website : place.url, placeAddress = place.formatted_address, $(".recommendation__destination").html("Why don't you fucking go to <br/><a href='" + placeSite + "' target='_blank' title='VISIT THE FUCKING WEBSITE'>" + placeName + "</a>"), $(".map__address").html(placeAddress), $(".grid__row--links,.grid__row--actions,.fyyfs,.recommendation,.map__address,.recommendation__destination").fadeIn(function() {
            $wait.fadeOut()
        })
    }
}
function calcRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(result, status) {
        status == google.maps.DirectionsStatus.OK && directionsDisplay.setDirections(result)
    })
}
function codeAddress() {
    $wait.fadeIn(function() {
        $locationBar.fadeOut();
        var address = document.getElementById("locationsearch").value;
        console.log("manual location:" + address), geocoder.geocode({
            address: address
        }, function(results, status) {
            console.log("manual location:" + address), status == google.maps.GeocoderStatus.OK ? (currentlatlng = results[0].geometry.location, getPlaces(currentlatlng)) : (console.log("Geocode was not successful for the following reason: " + status), showError("can't find your fucking location. try again"))
        })
    })
}
function showError(msg) {
    $wait.fadeOut(), $locationBar.fadeIn(), $(".locator__message").text(msg).fadeIn()
}
function removeDupes(arr, prop) {
    var new_arr = [], lookup = {};
    for (var i in arr)
        lookup[arr[i][prop]] = arr[i];
    for (i in lookup)
        new_arr.push(lookup[i]);
    return new_arr
}
var resultref, marker, markersArray = [], shitCounter = 0, iteration = 0, drinkIcon = "img/food.png", homeIcon = "img/home.png", resultsStore, totalResults = [], pubResultsStore, barResultsStore, userLoc, currentlatlng;
$wait = $(".loader"), $locationBar = $(".locator"), $mapCanvas = $(".map__canvas");
var lowSat = [{
    featureType: "all",
    stylers: [{
        saturation: -100
    }
    ]
}
], myOptions = {
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: lowSat,
    mapTypeControl: !1,
    panControl: !1,
    zoomControl: !0,
    mapTypeControl: !1,
    scaleControl: !1,
    streetViewControl: !1,
    overviewMapControl: !1
};
map = new google.maps.Map(document.getElementById("googlemap"), myOptions), geocoder = new google.maps.Geocoder;
var service = new google.maps.places.PlacesService(map);
$(document).ready(function() {
    var str = window.location.href, substr = str.split("?");
    "wherethefuck" == substr[1] ? ($locationBar.css("opacity", 1), console.log("manual location entry")) : getLocation()
});
var directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: !0
}), directionsService = new google.maps.DirectionsService;
$(".locator").on("submit", function(e) {
    codeAddress(), e.preventDefault()
}), $(".actions__shit").click(function() {
    return shitCounter < resultsStore.length-1 ? shitCounter++ : (shitCounter = 0, console.log("repeat")), console.log(shitCounter), chooseBar(resultsStore), window.scroll(0, 0), !1
});
var autoOptions = {
    types: ["geocode"]
}, autoInput = document.getElementById("locationsearch");
autocomplete = new google.maps.places.Autocomplete(autoInput, autoOptions);
