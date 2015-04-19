$(document).ready(function(){
	//try to get the current date, time and set it to first or 2nd half of the month
	updateForm();

	//assign callback to the button
	$("#CalculateButton").click(doCalculation);
});

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
		//collect data
		var TotalTime = parseInt($("#TotalTimeInput").val());
		var MonthHalf = $("#MonthHalfSelect").val();
		var PreviousTime = 0;
		if (MonthHalf == 1){
			//second half
			PreviousTime = parseInt($("#LastTotalTime").val());
		}
		var TotalDayInMonth = parseInt($("#MonthDaySelect").val());

		//process data
		var TotalTimeThisSection, NumDayThisSection;
		if (MonthHalf == 0){
			TotalTimeThisSection = TotalTime / TotalDayInMonth * 15;
			NumDayThisSection = 15;
		} else {
			TotalTimeThisSection = TotalTime - PreviousTime;
			NumDayThisSection = TotalDayInMonth - 15;
		}

		var AverageTimeInDay = TotalTimeThisSection / NumDayThisSection;

		//for (var i = 0; i < 

	} catch (e) {
		alert(e.message);
	}
	
}

