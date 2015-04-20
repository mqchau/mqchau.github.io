var DefaultTotalMonthMinute = 282 * 60;

$(document).ready(function(){
	$("#ResultDiv").hide();
	
	//update the total time of month
	var DefaultTotalMonthTime = convertMinuteToTime(DefaultTotalMonthMinute);
	$("#TotalTimeInputHour").val(DefaultTotalMonthTime.Hour);
	$("#TotalTimeInputMinute").val(DefaultTotalMonthTime.Minute);

	//detect the half of month and number of day in month
	var CurrentTime = new Date();
	if (CurrentTime.getDate() <= 15){
		$("#MonthHalfSelect").val("0");
	} else {
		$("#MonthHalfSelect").val("1");
	}
	switch(CurrentTime.getMonth()){
		case 0:
		case 2:
		case 4:
		case 6:
		case 8:
		case 10:
			//jan, march...
			$("#MonthDaySelect").val("31");
			break;
		case 1:
			//february
			if ((CurrentTime.getFullYear()) % 4 == 0){
				//leap year
				$("#MonthDaySelect").val("29");
			} else {
				//not leap year
				$("#MonthDaySelect").val("28");

			}
			break;
		default:
			$("#MonthDaySelect").val("30");
			break;
	}

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

function sumMinute(timeobjarr){
	var total = 0;
	for (var i = 0; i < timeobjarr.length; i++){
		if (timeobjarr[i].Value != null)
			total += timeobjarr[i].Value;
	}
	return total;
}

function convertMinuteToTimeString(minute){
	if (minute == null) return "Not working";
	var converted = convertMinuteToTime(minute);
	return converted.Hour.toString() + ":" + converted.Minute.toString();
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
		//$("#ResultDiv").html("Thinking");
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
			var NewAmount = AverageTimeInDay + deviation;
			FinalTimeArray.push(NewAmount);
			TotalSoFar += NewAmount; 
		}

		FinalTimeArray.push(TotalTimeThisSection - TotalSoFar);

		var DividedTimeArray = divideFinalTimeArray(FinalTimeArray);

		displayFinalResult(DividedTimeArray, TotalTimeThisSection);

	} catch (e) {
		alert(e.message);
	}
	
}

function displayFinalResult(array, total){
	$("#ResultDiv").show();
	$("#TotalWorkTimeDisplay").html(convertMinuteToTimeString(total));
	$("#ResultTable tbody").empty();
	for (var i = 0 ; i < 7; i++){
		var NewRow = $("<tr>").append($("<td>").html(array[i].MonthValue.toString() + "/" + array[i].DateValue.toString()));
		NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(array[i].Value)));
		NewRow = $(NewRow).append($("<td>").html(array[i+7].MonthValue.toString() + "/" + array[i+7].DateValue.toString()));
		NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(array[i+7].Value)));
		NewRow = $(NewRow).append($("<td>").html(array[i+14].MonthValue.toString() + "/" + array[i+14].DateValue.toString()));
		NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(array[i+14].Value)));
		NewRow = $(NewRow).append($("<td>").html(array[i+21].MonthValue.toString() + "/" + array[i+21].DateValue.toString()));
		NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(array[i+21].Value)));
		$("#ResultTable tbody").append(NewRow);	
	}	
	var NewRow = $("<tr>").append($("<td>").append($("<u>").html("Week Total")));
	NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(sumMinute(array.slice(0,7)))));
	NewRow = $(NewRow).append($("<td>").append($("<u>").html("Week Total")));
	NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(sumMinute(array.slice(7,14)))));
	NewRow = $(NewRow).append($("<td>").append($("<u>").html("Week Total")));
	NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(sumMinute(array.slice(14,21)))));
	NewRow = $(NewRow).append($("<td>").append($("<u>").html("Week Total")));
	NewRow = $(NewRow).append($("<td>").html(convertMinuteToTimeString(sumMinute(array.slice(21,28)))));
	$("#ResultTable tbody").append(NewRow);	
}

function divideFinalTimeArray(TimeArray){
	var DividedTimeArray = [];
	
	//find current date
	var CurrentTime = new Date();
	if (CurrentTime.getDate() >= 15){
		var StartDateThisSection = new Date();
		StartDateThisSection.setFullYear(CurrentTime.getFullYear(),CurrentTime.getMonth(), 16); 
		console.log("Start Working Date = " + StartDateThisSection.toString());
		//padd with previous date to make full week
		for (var i = StartDateThisSection.getDay(); i > 0; i--){
			var VoidDate = new Date(StartDateThisSection);
			VoidDate.setDate(StartDateThisSection.getDate() - i);
			DividedTimeArray.push({
				DateValue: VoidDate.getDate(),
				MonthValue: VoidDate.getMonth() + 1,
				Value: null
			});
		}

		//start going with the calculated section
		var FinalWorkDate = null;
		for (var i = 0; i < TimeArray.length; i++){
			var WorkDate = new Date(StartDateThisSection);
			WorkDate.setDate(StartDateThisSection.getDate() + i);
			DividedTimeArray.push({
				DateValue: WorkDate.getDate(),
				MonthValue: WorkDate.getMonth() + 1,
				Value: TimeArray[i]
			});
			FinalWorkDate = WorkDate;
		}
		
		console.log("final workdate = " + FinalWorkDate.toString());
		//padd with later date to make full week
		var FinalPaddedDate = null;
		if (FinalWorkDate.getDay() < 6) {
			//not saturday
			for (var i = 1 ; i <= 6 - FinalWorkDate.getDay(); i++){
				var VoidDate = new Date(FinalWorkDate);
				VoidDate.setDate(FinalWorkDate.getDate() + i);
				//console.log(VoidDate.toString());
				DividedTimeArray.push({
					DateValue: VoidDate.getDate(),
					MonthValue: VoidDate.getMonth() + 1,
					Value: null
				});
			}
			FinalPaddedDate = VoidDate;
		}

		//maybe padd whole week just to make whole 4 weeks
		if (DividedTimeArray.length < 28){
			for (var i = 0; i < 7; i++){
				var VoidDate = new Date(FinalPaddedDate);
				VoidDate.setDate(FinalPaddedDate.getDate() + i);
				DividedTimeArray.push({
					DateValue: VoidDate.getDate(),
					MonthValue: VoidDate.getMonth() + 1,
					Value: null
				});
			}
		}
	}

	return DividedTimeArray;
}
