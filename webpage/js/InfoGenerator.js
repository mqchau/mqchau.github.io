function parseDatabase(request, budget)
{
  var json_file = RestaurantDatabase;
  var restaurantList = [];
  var itemList = [];

  var sum = 0;
  var sumCalories = 0;
  var sumFat = 0;
  var sumProtein = 0;
  var sumCarbs = 0;
  var sumsodium = 0;
  
  for(var restaurant in json_file)
  {
    restaurantList.push(restaurant);
    
    criteria = [];
    prices = [];
    
    for(var item in restaurant)
    {
      itemList.push(item);
      
      if(request == "calories")
        criteria.push(restaurant[item].calories);
      else if(request == "fat")
        criteria.push(restaurant[item].fat);
      else if(request == "protein")
        criteria.push(restaurant[item].protein);
      else if(request == "carbs")
        criteria.push(restaurant[item].carbs);
      else if(request == "sodium")
        criteria.push(restaurant[item].sodium);
      
      prices.push(restaurant[item].price);
    }
    
    var result = knapsack(criteria, prices, budget);
    
    for(var index in result)
    {
      sum += prices[index];
      resultItemList.push(itemList[index]);
      
      sumCalories += restaurant[itemList[index]]["calories"];
      sumFat += restaurant[itemList[index]]["fat"];
      sumProtein += restaurant[itemList[index]]["protein"];
      sumCarbs += restaurant[itemList[index]]["protein"];
      sumSodium += restaurant[itemList[index]]["sodium"];
    }
	
	
	
	
  }
  
  
  
  sessionStorage.setItem("sumCalories", sumCalories);
	sessionStorage.setItem("sumFat", sumFat);
	sessionStorage.setItem("sumProtein", sumProtein);
	sessionStorage.setItem("sumCarbs", sumCarbs);
	sessionStorage.setItem("sumSodium", sumSodium);
	
	sessionStorage.setItem("sumPrice", sumPrice);
	sessionStorage.setItem("resultItemList", resultItemList);
	sessionStorage.setItem("bestRestaurant", restaurantList[0]);		//just for testing purpose. MUST CHANGE
}
  







