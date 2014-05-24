function parseDatabase(request, budget)
{
  var json_file = RestaurantDatabase;
  var restaurantList = [];
  var itemList = [];
  var resultItemList = [];
  var result = [];

  var maxIndex = 0;
  var max = 0;

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
        
    for(var item in json_file[restaurant])
    {
      itemList.push(item);
      
      if(request == "calories")
        criteria.push(json_file[restaurant][item]["calories"]);
      else if(request == "fat")
        criteria.push(json_file[restaurant][item]["fat"]);
      else if(request == "protein")
        criteria.push(json_file[restaurant][item]["protein"]);
      else if(request == "carbs")
        criteria.push(json_file[restaurant][item]["carbs"]);
      else if(request == "sodium")
        criteria.push(json_file[restaurant][item]["sodium"]);
      
      prices.push(json_file[restaurant][item]["price"]);
    }
    budget = Math.floor(budget*100);
<<<<<<< HEAD
    var result[restaurant] = knapsack(criteria, prices, budget);
=======
    for(var i = 0; i<prices.length;i++)
    {
      prices[i] = Math.floor(prices[i]*100);
    }
    var result = knapsack(criteria, prices, budget);
>>>>>>> FETCH_HEAD
    
    for(var index in result[restaurant])
    {
      sum += prices[index];
      resultItemList.push(itemList[index]);
      
      sumCalories += json_file[restaurant][itemList[index]]["calories"];
      sumFat += json_file[restaurant][itemList[index]]["fat"];
      sumProtein += json_file[restaurant][itemList[index]]["protein"];
      sumCarbs += json_file[restaurant][itemList[index]]["protein"];
      sumSodium += json_file[restaurant][itemList[index]]["sodium"];
    }
	
	if(sum > max)
      maxIndex = restaurant;	
  }
  
  for(var index in result[maxIndex])
  {
    sum += prices[index];
    resultItemList.push(itemList[index]);
    
    sumCalories += restaurant[itemList[index]]["calories"];
    sumFat += restaurant[itemList[index]]["fat"];
    sumProtein += restaurant[itemList[index]]["protein"];
    sumCarbs += restaurant[itemList[index]]["protein"];
    sumSodium += restaurant[itemList[index]]["sodium"];
  }
  
  
  sessionStorage.setItem("sumCalories", sumCalories);
  sessionStorage.setItem("sumFat", sumFat);
  sessionStorage.setItem("sumProtein", sumProtein);
  sessionStorage.setItem("sumCarbs", sumCarbs);
  sessionStorage.setItem("sumSodium", sumSodium);
	
  sessionStorage.setItem("sumPrice", sum);
  sessionStorage.setItem("resultItemList", resultItemList);
  sessionStorage.setItem("bestRestaurant", restaurantList[maxIndex]);		//just for testing purpose. MUST CHANGE
}
  







