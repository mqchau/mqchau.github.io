function parseDatabase(request, budget)
{
  var json_file = RestaurantDatabase;
  var restaurantList = [];
  var itemList = [];
  var resultItemList = [];
  var result = [];

  var maxRestaurant = -1;
  var maxItemList = [];
  var max = 0;

  var sum = 0;
  var sumCalories = 0;
  var sumFat = 0;
  var sumProtein = 0;
  var sumCarbs = 0;
  var sumSodium = 0;
  
  for(var restaurant in json_file)
  {
    restaurantList.push(restaurant);
    
    criteria = [];
    prices = [];
    itemList = [];
    resultItemList = [];
    sum = 0;
    
    sumCalories = 0;
    sumFat = 0;
    sumProtein = 0;
    sumCarbs = 0;
    sumSodium = 0;
        
    for(var item in json_file[restaurant])
    {
      itemList.push(item);
      criteria.push(json_file[restaurant][item][request]);

      prices.push(json_file[restaurant][item]["price"]);
    }
    
    budget = Math.floor(budget*100);
    for(var i = 0; i<prices.length;i++)
      prices[i] = Math.floor(prices[i]*100);

    result= knapsack(criteria, prices, budget);
    
    for(var counter in result)
    {
      var index = result[counter];
      sum += prices[index];
      resultItemList.push(itemList[index]);
      
      sumCalories += json_file[restaurant][itemList[index]]["calories"];
      sumFat += json_file[restaurant][itemList[index]]["fat"];
      sumProtein += json_file[restaurant][itemList[index]]["protein"];
      sumCarbs += json_file[restaurant][itemList[index]]["protein"];
      sumSodium += json_file[restaurant][itemList[index]]["sodium"];
    }
	
	if(sum > max)
	{
      max = sum;
      maxRestaurant = restaurant;
      maxItemList = resultItemList;      
    }	
  }
  
    sumCalories = 0;
    sumFat = 0;
    sumProtein = 0;
    sumCarbs = 0;
    sumSodium = 0;
  
  for(var index in maxItemList)
  {
    var currentItem = maxItemList[index];
    sumCalories += json_file[maxRestaurant][currentItem]["calories"];
    sumFat += json_file[maxRestaurant][currentItem]["fat"];
    sumProtein += json_file[maxRestaurant][currentItem]["protein"];
    sumCarbs += json_file[maxRestaurant][currentItem]["protein"];
    sumSodium += json_file[maxRestaurant][currentItem]["sodium"];
  }

  
  
  sessionStorage.setItem("sumCalories", sumCalories);
  sessionStorage.setItem("sumFat", sumFat);
  sessionStorage.setItem("sumProtein", sumProtein);
  sessionStorage.setItem("sumCarbs", sumCarbs);
  sessionStorage.setItem("sumSodium", sumSodium);
	
  sessionStorage.setItem("sumPrice", max);
  sessionStorage.setItem("resultItemList", maxItemList);
  sessionStorage.setItem("bestRestaurant", restaurantList[maxIndex]);		//just for testing purpose. MUST CHANGE
}
  







