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
	document.getElementById("restaurant_name").innerHTML = sessionStorage.getItem("restaurant_name");
	
}

function AllInitialize(){
	//load json file
	var restaurant_database = loadJSON("database/example_data.json");
	//save it to sessionStorage
	sessionStorage.setItem("restaurant_database", restaurant_database);

}

function loadJSON(file_name){
	
	return RestaurantDatabase;
	//return JSON.parse(file_name);
}