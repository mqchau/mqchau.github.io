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
  
  budget = Math.floor(budget*10);
  
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
      criteria.push(parseInt(json_file[restaurant][item][request]));

      prices.push(parseFloat(json_file[restaurant][item]["price"]));
    }
  
    
    for(var i = 0; i<prices.length;i++)
      prices[i] = Math.floor(prices[i]*10);

    result= knapsack(criteria, prices, budget);
	
    
    for(var counter in result)
    {
      var index = result[counter];
      sum += criteria[index];
      resultItemList.push(itemList[index]);
      
      // sumCalories += json_file[restaurant][itemList[index]]["calories"];
      // sumFat += json_file[restaurant][itemList[index]]["fat"];
      // sumProtein += json_file[restaurant][itemList[index]]["protein"];
      // sumCarbs += json_file[restaurant][itemList[index]]["protein"];
      // sumSodium += json_file[restaurant][itemList[index]]["sodium"];
	  
	 
    }
	
	//alert(result + "                    " + sum + "    " + restaurant);
	if(sum > max )
	{
      max = sum;
      maxRestaurant = restaurant;
      maxItemList = resultItemList;      
    }	
	
	//break;
  }
  
    sumCalories = 0;
    sumFat = 0;
    sumProtein = 0;
    sumCarbs = 0;
    sumSodium = 0;
	sumPrice = 0
  
  for(var index in maxItemList)
  {
    var currentItem = maxItemList[index];
	sumPrice += json_file[maxRestaurant][currentItem]["price"];
    sumCalories += parseInt(json_file[maxRestaurant][currentItem]["calories"]);
    sumFat += parseInt(json_file[maxRestaurant][currentItem]["fat"]);
    sumProtein += parseInt(json_file[maxRestaurant][currentItem]["protein"]);
    sumCarbs += parseInt(json_file[maxRestaurant][currentItem]["carbs"]);
    sumSodium += parseInt(json_file[maxRestaurant][currentItem]["sodium"]);
	
  }

 // alert(result + "                    " + sum + "    " + restaurant + "       " + sumProtein);
  
  sessionStorage.setItem("sumCalories", sumCalories);
  sessionStorage.setItem("sumFat", sumFat);
  sessionStorage.setItem("sumProtein", sumProtein);
  sessionStorage.setItem("sumCarbs", sumCarbs);
  sessionStorage.setItem("sumSodium", sumSodium);
	
  sessionStorage.setItem("sumPrice", Number(sumPrice.toFixed(2))	);
  sessionStorage.setItem("resultItemList", maxItemList);
  sessionStorage.setItem("bestRestaurant", maxRestaurant);		//just for testing purpose. MUST CHANGE
  
  
}
  







