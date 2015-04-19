$(document).ready(function(){
	//try to get the current date, time and set it to first or 2nd half of the month
	updateForm();
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



