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

function populateResultPage(){

	//alert(localStorage.getItem("item1"));
	document.getElementById("restaurant_name").innerHTML = sessionStorage.getItem("bestRestaurant");
	
	//set restaurant icon
	//setRestaurantIcon(sessionStorage.getItem("bestRestaurant"));
	
	//set
	
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
	
	parseDatabase(selection, budget);
}

function loadJSON(file_name){
	
	return RestaurantDatabase;
	//return JSON.parse(file_name);
}