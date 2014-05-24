function debugFunction1(){
	
	
	//do what ever you want
	
	
	
	//write a string to text area
	clearDebugMsg();
	debugMsgConcat("Put string or int together " + 1000)
}

function debugMsgConcat(new_msg){
	document.getElementById('debug').value += new_msg;
}

function clearDebugMsg(){
	document.getElementById('debug').value = "";
}