// interface Storage {
  // getter any getItem(in DOMString key);
  // setter creator void setItem(in DOMString key, in any data);
// };
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var map;
var infoWindow;
var service;
//var target_location;
var target_address;

//var geocoder = new google.maps.Geocoder();
var current_lat = 33.698154;
var current_long = -117.846688;

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function loadResultPage(){
	supports_html5_storage();
	sessionStorage.setItem("restaurant_name", "Taco Bell");
	window.location.href = "result.html";

}

function setRestaurantIcon(name){
	if (name == "In-N-Out"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/In-N-Out-Logo.png";
	} else 	if (name == "Burger King"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/Burger-King-Logo.png";
	} else 	if (name == "Carl's Jr"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/Carls-Jr-Logo.png";
	} else 	if (name == "Taco Bell"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/taco_bell.png";
	} else 	if (name == "Subway"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/Subway-Logo.png";
	} else 	if (name == "Mc Donalds"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/Mcdonalds-Logo.png";
	} else if (name == "KFC"){
		document.getElementById("restaurant_logo").src="images/restaurant_logo/KFC.png";
	}
	
}


function performSearch(new_bound, new_keyword) {
	var temp = (sessionStorage.getItem("sumCalories") / 72.0 * 1.61)
	temp = Math.floor(temp) * 1000;
	//alert(temp);
	var request = {
	//bounds: new_bound,
	location: new google.maps.LatLng(current_lat, current_long),
	radius: temp,
	keyword: new_keyword
	};
	service.radarSearch(request, callback);
}

function callback(results, status) {
	if (status != google.maps.places.PlacesServiceStatus.OK) {

		return;
	}	

	createMarker(results[results.length -1]);
	/*for (var i = 0, result; result = results[i]; i++) {
	createMarker(result);
	} */
}

function createMarker(place) {
		  var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			icon: {
			  // Star
			  path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
			  fillColor: '#ffff00',
			  fillOpacity: 1,
			  scale: 1/4,
			  strokeColor: '#bd8d2c',
			  strokeWeight: 1
			}
		  });

		  service.getDetails(place, function(result, status) {
			  if (status != google.maps.places.PlacesServiceStatus.OK) {
				//alert(status);
				return;
			  }
			  //alert("1   "+ result.formatted_address);
			calcRoute(result.geometry.location);
			  //codeAddress(result.formatted_address);
			}//
		)
		  
		  google.maps.event.addListener(marker, 'click', function() {
			service.getDetails(place, function(result, status) {
			  if (status != google.maps.places.PlacesServiceStatus.OK) {
				//alert(status);
				return;
			  }
				//sessionStorage.setItem("target_address", result.formatted_address);
				//target_address = result.formatted_address;
			  infoWindow.setContent("<b>" + result.name + "</b><br>" + result.formatted_address);
			  infoWindow.open(map, marker);
			  
			  
			  //routing
				
				
				
				
			});
		  });
		}
		


function initialize() {
		  map = new google.maps.Map(document.getElementById('map-canvas'), {
			//find the current latitude, longtitude
			
			
			//set them to center of the map		  
			center: new google.maps.LatLng(current_lat, current_long),
			zoom: 12,
			styles: [
			  {
				stylers: [
				  { visibility: 'simplified' }
				]
			  },
			  {
				elementType: 'labels',
				stylers: [
				  { visibility: 'off' }
				]
			  }
			]
		  });

		  infoWindow = new google.maps.InfoWindow();
		  service = new google.maps.places.PlacesService(map);

		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directionsPanel'));
		  
		  
		  //calcRoute();
		}		

//distance of how far you should walk to burn off the calculated calories
function degree(calories) {
	var R = 6371;                 // km
	var dist = calories / 72.61; //miles
	dist = dist * 1.61;          //kilometers
	var degree = dist/R;
	degree = 180/Math.PI * degree / 4;
	return degree;
}		
		
function populateResultPage(){

	initialize();

	//alert(localStorage.getItem("item1"));
	document.getElementById("restaurant_name").innerHTML = sessionStorage.getItem("bestRestaurant");
	
	//set restaurant icon
	setRestaurantIcon(sessionStorage.getItem("bestRestaurant"));
	
	//clear order item
	var curr_list = document.getElementById("OrderItems");
	curr_list.innerHTML = '';
	
	//set order items
	var itemListRaw = 	(sessionStorage.getItem("resultItemList"));
	var itemList = itemListRaw.split(",");
	
	
	for (var item in itemList){
		var list = document.getElementById("OrderItems");
		var temp = document.createElement('li');
		temp.appendChild(document.createTextNode(itemList[item]));
		list.appendChild(temp);
		
	}
	
	
	//the nutritions
	document.getElementById("ProteinDisplay").innerHTML = sessionStorage.getItem("sumProtein") + " g";
	document.getElementById("CarbDisplay").innerHTML = sessionStorage.getItem("sumCarbs") + " g";
	document.getElementById("CaloriesDisplay").innerHTML = sessionStorage.getItem("sumCalories") + "";
	document.getElementById("SodiumDisplay").innerHTML = sessionStorage.getItem("sumSodium") + " mg";
	document.getElementById("FatDisplay").innerHTML = sessionStorage.getItem("sumFat") + " g";
	
	//the price
	document.getElementById("PriceDisplay").innerHTML = sessionStorage.getItem("sumPrice");
	
	//adjust the map
	//get current location
	if (false) {
	  navigator.geolocation.getCurrentPosition(function(position){
	  
		current_lat = position.coords.latitude;
		current_long = position.coords.longitude;
	  
		populateMap();
	  
	  
	  });
	} else {
		//alert("no navigator");
		populateMap();
	}	
	
	
	
	
	
	
	
	
}

function populateMap(){
	//calculate the target coordinate
	var lat_displacement = degree(sessionStorage.getItem("sumCalories")); //0.10;
	var long_displacement = degree(sessionStorage.getItem("sumCalories")); 
	var new_lat_low = current_lat - lat_displacement;
	var new_lat_high = current_lat + lat_displacement;
	var new_long_low = current_long - long_displacement;
	var new_long_high = current_long + long_displacement;
	var new_bound = "((" + new_lat_low + "," + new_long_low + "),(" + new_lat_high + "," + new_long_high +"))";
	
	//set new bound
	var bounds = new google.maps.LatLngBounds( new google.maps.LatLng(new_lat_low,new_long_low ), new google.maps.LatLng(new_lat_high,new_long_high ));
	map.fitBounds(bounds);
	
	//perform the search
	performSearch(bounds, sessionStorage.getItem("bestRestaurant"));
}


  function codeAddress(address) {
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
  var   geocoder = new google.maps.Geocoder();

  alert(address);
    geocoder.geocode( { 'address': address}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			target_location = results.location;
			alert(results.location);
			//sessionStorage.setItem("target_coord", results.location);
			//calcRoute(target_location	);
      } else {
        alert("Geocode was not successful for " + address + " bc of the following reason: " + status);
      }
	
	});
	
  }

function calcRoute(target_location) {

  var request = {
    origin: new google.maps.LatLng(current_lat, current_long),//'Los Angeles, CA',
    destination: target_location,
   // waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
		//alert("You'll need to walk for " + computeTotalDistance(response) + " miles");
      directionsDisplay.setDirections(response);
	  document.getElementById("DistanceDisplay").innerHTML = "You'll have to walk " + computeTotalDistance(response) + " miles to burn all calories in this meal";
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.0 * 0.62;
  total = Number(total.toFixed(2));
  return total;
 // document.getElementById('total').innerHTML = total + ' km';
}	


function AllInitialize(){
	//load json file
	var restaurant_database = loadJSON("database/example_data.json");
	//save it to sessionStorage
	sessionStorage.setItem("restaurant_database", restaurant_database);

}

function doCalculation(){
	//get the selection and money
	try {
		var selection = document.getElementById("Criteria").value;
		var budget = parseFloat(document.getElementById("budget").value);	
		
		if (budget > 200.0) budget = 200.0;
		else if (budget >= 1.00){ 
		
			parseDatabase(selection, budget);			//we're supposed to call it
			
			loadResultPage();
		}
	} catch (err){
		
	}
}

function loadJSON(file_name){
	
	for (var res in RestaurantDatabase){
		for (var item in RestaurantDatabase[res]){
			RestaurantDatabase[res][item]['calories'] = parseInt(RestaurantDatabase[res][item]['calories'])
			RestaurantDatabase[res][item]['carbs'] = parseInt(RestaurantDatabase[res][item]['carbs'])
			RestaurantDatabase[res][item]['protein'] = parseInt(RestaurantDatabase[res][item]['protein'])
			RestaurantDatabase[res][item]['sodium'] = parseInt(RestaurantDatabase[res][item]['sodium'])
			RestaurantDatabase[res][item]['fat'] = parseInt(RestaurantDatabase[res][item]['fat'])
			RestaurantDatabase[res][item]['price'] = parseFloat(RestaurantDatabase[res][item]['price'])
		}
	
	}
	
	return RestaurantDatabase;
	//return JSON.parse(file_name);
}

function reDoEverything(){
	window.location.href = "index.html";
}