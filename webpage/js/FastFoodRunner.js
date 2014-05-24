function debugFunction1(){
	
	
	//do what ever you want
	
	var values = [10,1,2,3,4,15,5];
	var weights =[5,9,2,1,4,1,20];
	if (weights.length != values.length) {
		alert("The number of weights must match the number of values.");
		return;
	}
	var capacity = 15;
	capacity = Math.min(sum(weights), capacity);
	var matrix = getSolutionMatrix(values, weights, capacity);
	var optimalSubset = getOptimalSubset(matrix, weights);
	
	//write a string to text area
	clearDebugMsg();
	debugMsgConcat("The optimal set of items to take: {" + optimalSubset + "}\n"
				+ "The total value of these items: " + matrix[weights.length][capacity])
}

//values = cal, weights = cost, capacity = price limit
function knapsack(values, weights, capacity)
{
	if (weights.length != values.length) {
		alert("The number of weights must match the number of values.");
		return;
	}
	capacity = Math.min(sum(weights), capacity);
	var matrix = getSolutionMatrix(values, weights, capacity);
	var optimalSubset = getOptimalSubset(matrix, weights);
	
	//write a string to text area
	clearDebugMsg();
	debugMsgConcat("The optimal set of items to take: {" + optimalSubset + "}\n"
				+ "The total value of these items: " + matrix[weights.length][capacity])
	return optimalSubset;
}

function debugMsgConcat(new_msg){
	document.getElementById('debug').value += new_msg;
}

function clearDebugMsg(){
	document.getElementById('debug').value = "";
}

function getSolutionMatrix(itemValues, weights, capacity) {
		var matrix =  new Array(itemValues.length + 1);
		for (var i = 0; i < matrix.length; i++){
			matrix[i] = new Array(capacity);
			for(var j = 0; j <= capacity; j++) {
				matrix[i][j] = 0;
			}
		}
		for(var i = 1; i <= itemValues.length; i++) {
			for (var j = 0; j <= capacity; j++) {
				if (j - Number(weights[i-1])  >= 0) {
					matrix[i][j] = Math.max(matrix[i-1][j], Number(itemValues[i-1]) + matrix[i-1][j-Number(weights[i-1])]);
				} else {
					matrix[i][j] = matrix[i-1][j];
				}
			}
		}
		return matrix;
	}

function getOptimalSubset(solutionMatrix, weights) {
		var subset = new Array(1);
		var numItems = 0;
		var i = solutionMatrix.length - 1;
			for (var j = solutionMatrix[0].length - 1; j >= 0 && i > 0; i--) {
				// If the item is in the optimal subset, add it and subtract its weight
				// from the column we are checking.
				if (solutionMatrix[i][j] != solutionMatrix[i-1][j]) {
					subset[numItems] = i;
					j -= Number(weights[i-1]);
					numItems++;
				}
			}
			for(var b = 0; b < subset.length; b++)
			{
				subset[b] = subset[b] - 1;
			}
		return subset;
	}

function sum(array) {
	var sum = 0;
	for(var i = 0; i < array.length; i++) {
		sum += Number(array[i]);
	}
	return sum;
}
