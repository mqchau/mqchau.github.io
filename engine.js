var DefaultTotalMonthMinute = 282 * 60;

$(document).ready(function(){
	//update the total time of month
	var DefaultTotalMonthTime = convertMinuteToTime(DefaultTotalMonthMinute);
	$("#TotalTimeInputHour").val(DefaultTotalMonthTime.Hour);
	$("#TotalTimeInputMinute").val(DefaultTotalMonthTime.Minute);

	//try to get the current date, time and set it to first or 2nd half of the month
	updateForm();

	//assign callback to the button
	$("#CalculateButton").click(doCalculation);
	$("#MonthHalfSelect").change(updateForm);
});

function convertMinuteToTime(minute){
	return {
		Hour: Math.floor(minute / 60),
		Minute: paddedZero(minute % 60)
	}
}

function paddedZero(number){
	if (number < 10) return "0" + number.toString();
	else return number.toString();
}

function updateForm(){
	//based on whether this is first half or second half of the month, decide to ask the number of time last time
	if($("#MonthHalfSelect").val() == 0){
		//first half
		$("#LastTotalTime").hide();
	} else {
		//second half
		$("#LastTotalTime").show();
	}
}


function doCalculation(){
	try {
		$("#ResultDiv").html("Thinking");
		//collect data
		var TotalTime = parseInt($("#TotalTimeInputHour").val()) * 60 + parseInt($("#TotalTimeInputMinute").val());
		var MonthHalf = $("#MonthHalfSelect").val();
		var PreviousTime = 0;
		if (MonthHalf == 1){
			//second half
			PreviousTime = parseInt($("#PreviousTimeInputHour").val()) * 60 + parseInt($("#PreviousTimeInputMinute").val());
		}
		var TotalDayInMonth = parseInt($("#MonthDaySelect").val());

		//process data
		var TotalTimeThisSection, NumDayThisSection;
		if (MonthHalf == 0){
			TotalTimeThisSection = Math.floor(TotalTime / TotalDayInMonth * 15);
			NumDayThisSection = 15;
		} else {
			TotalTimeThisSection = TotalTime - PreviousTime;
			NumDayThisSection = TotalDayInMonth - 15;
		}

		var AverageTimeInDay = Math.floor(TotalTimeThisSection / NumDayThisSection);
		
		var FinalTimeArray = [];
		var TotalSoFar = 0;
		for (var i = 0; i < NumDayThisSection - 1; i++){
			var deviation = Math.floor ((i+2)/2);
			if (i % 2 == 0) deviation = 0 - deviation;
			console.log(deviation);
			var NewAmount = AverageTimeInDay + deviation;
			FinalTimeArray.push(NewAmount);
			TotalSoFar += NewAmount; 
		}

		FinalTimeArray.push(TotalTimeThisSection - TotalSoFar);

		console.log(FinalTimeArray);

		displayFinalResult(FinalTimeArray, TotalTimeThisSection);

	} catch (e) {
		alert(e.message);
	}
	
}

function displayFinalResult(array, total){
	$("#ResultDiv").empty();
	var timeobj = convertMinuteToTime(total);
	$("#ResultDiv").append($("<p>").html("Here is the result, total " + timeobj.Hour + ":" + timeobj.Minute));
	for (var i = 0; i < array.length; i++){
		var timeobj = convertMinuteToTime(array[i]);
		$("#ResultDiv").append($("<p>").html(timeobj.Hour + ":" + timeobj.Minute));
	}	

}
