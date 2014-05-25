// interface Storage {
  // getter any getItem(in DOMString key);
  // setter creator void setItem(in DOMString key, in any data);
// };

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
	}
	
}

function populateResultPage(){

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
	document.getElementById("CaloriesDisplay").innerHTML = sessionStorage.getItem("sumCalories") + " g";
	document.getElementById("SodiumDisplay").innerHTML = sessionStorage.getItem("sumSodium") + " mg";
	document.getElementById("FatDisplay").innerHTML = sessionStorage.getItem("sumFat") + " g";
	
	//the price
	document.getElementById("PriceDisplay").innerHTML = sessionStorage.getItem("sumPrice");
}

function AllInitialize(){
	//load json file
	var restaurant_database = loadJSON("database/example_data.json");
	//save it to sessionStorage
	sessionStorage.setItem("restaurant_database", restaurant_database);

}

function doCalculation(){
	//get the selection and money
	var selection = document.getElementById("Criteria").value;
	var budget = parseFloat(document.getElementById("budget").value);	
	
	if (budget > 200.0) budget = 200.0;
	
	parseDatabase(selection, budget);			//we're supposed to call it
	
	// sessionStorage.setItem("sumCalories", 2000);
	// sessionStorage.setItem("sumFat", 12);
	// sessionStorage.setItem("sumProtein", 56);
	// sessionStorage.setItem("sumCarbs", 78);
	// sessionStorage.setItem("sumSodium", 89);
	
	// sessionStorage.setItem("sumPrice", 586);
	// var abc = ["Cheeseburger", "Hamburger", "Onion ring"];
	// sessionStorage.setItem("resultItemList",abc );
	// sessionStorage.setItem("bestRestaurant", "Carl's Jr");
	
	loadResultPage();
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