"use strict";

/* Timer Status:
 *		before	-	Before each solve
 * 	done  	-  After each solve
 *		inspect	-	Inspection time
 *		ready		-	After inspection, ready to solve
 *		solving	-	Solving time
 */
var timerStatus = "done";

var timeDisplay = null; //the heading tag that display the time

var remainInspectTime = 15; // Inspect time before each solve is 15 seconds
var inspectTime = null; // SetInterval variable for inspection timer

var solveTimeInterval = null; // SetInterval variable for solving stop-watch
var centisecond = 0; // Counter for solving stop-watch, in centi-second

var solveArr = []; // Keep track of the latest 5 solves

/* If the space-bar is pressed down, specific tasks are done depends on the state of the timer
 * @parameter: none
 * @return: none
 */
function spaceDown(event) {
	// this if statement checked if the key pressed was the space-bar key
	if (event.keyCode == 32) {
		event.preventDefault();
		// Space-bar down when inspecting: stop inspecting timer and get ready to solve
		if (timerStatus === "inspect"){
			timerStatus = "ready";
			timeDisplay.className = "redTime"; // change timer color to red
			timeDisplay.innerHTML = "0.00"; // set timer to 0.00
			
			clearInterval(inspectTime); // stop the inspecting timer
			remainInspectTime = 15; // reset inspecting time to 15 or next solve
		} // end if "inspect" state
		
		// Space-bar down when solving: stop the stop-watch
		if (timerStatus === "solving"){
			timerStatus = "after";
			clearInterval(solveTimeInterval); // stopping the stop-watch
			updateRecord();
		} // end if "solving" state
	} // end if check space key
} // end spaceDown()

/* If the space-bar is pressed up, specific tasks are done depends on the state of the timer
 * @parameter: none
 * @return: none
 */
function spaceUp(event) {
	// this if statement checked if the key pressed was the space-bar key
	if (event.keyCode == 32) {
		// Space-bar up when done: start the inspecting timer
		if (timerStatus === "done") {
			timerStatus = "inspect";
			timeDisplay.className = "greenTime"; // change timer color to green
			
			// Counting down from 15
			inspectFunc();
			inspectTime = setInterval(inspectFunc, 1000);
		}
		
		// Space-bar up when ready: start the stop-watch for solving
		if (timerStatus === "ready") {
			timeDisplay.className = "blackTime"; // change timer color to black
			timerStatus = "solving";
			solveTimeInterval = setInterval(solveFunc, 10); // start the stop-watch
		} // end if
		
		// Space-bar up after solved: timer reset, ready for new solve
		if (timerStatus === "after") {
			timerStatus = "done";
			centisecond = 0; // reset the stop-watch counter to 0
		} // end if
	} // end if check space-bar
} // end spaceUp()

/* This function display the inspection count down. If there're only 7 seconds left, the timer turns red
 * @parameter: none
 * @return: none
 */
function inspectFunc() {
	timeDisplay.innerHTML = "" + remainInspectTime; // display the count down
	
	// change the text to red when there're only 7 seconds left
	if (remainInspectTime == 7){
			timeDisplay.className = "redTime";
	}
	
	// if the inspections time ran out, start the solving stop-watch immediately
	if (remainInspectTime == 0){
		// reset inspection timer
		clearInterval(inspectTime);
		remainInspectTime = 15;
		
		// start the stop-watch
		timeDisplay.className = "blackTime";
		timerStatus = "solving";
		solveTimeInterval = setInterval(solveFunc, 10);
	}
	else {
		--remainInspectTime;	// counting down
	}
}

/* This function display the stop-watch
 * @parameter: none
 * @return: none
 */
function solveFunc() {
	timeDisplay.innerHTML = displayTime(centisecond / 100); // display the current time
	++centisecond; // Stop-watch counting up, 10 centiseconds each time
}

/* This function takes in an amount of time in minutes and output the right format
 * string representation of the time (min:second.centisecond)
 * @parameter: timeInMin - the time in minutes needed to be processed
 * @return: a string representation of the time if the format min:second.centisecond
 */
function displayTime(timeInMin) {
	if (timeInMin >= 60) {
		return (timeInMin / 60).toFixed(0) + ":" + (timeInMin % 60).toFixed(2);
	}// end if
	return (timeInMin % 60).toFixed(2);
}

/* This function updates the best result, ao5, and recent solve after each solve
 */
function updateRecord() {
	solveArr.unshift(parseFloat(timeDisplay.innerHTML));
	console.log(timeDisplay.innerHTML);
	var temp;
	for (var i = 0 ; i < solveArr.length && i < 5 ; i++){
		temp = document.getElementById("solve" + i);
		temp.innerHTML = solveArr[i].toFixed(2) + "";
	}
	
	var best = document.getElementById("best");
	best.innerHTML = "Best Solve: " + minArr(solveArr).toFixed(2);
	
	if (solveArr.length >= 5) {
		var ao5 = document.getElementById("ao5");
		ao5.innerHTML = "AO5: " + aveOf5(solveArr).toFixed(2);
	}
}

/* This function return the minimum value of an array of positive number
 *	@param: The array to find the minimum
 * @return: The minimum value
 */
function minArr(arr){
	var minVal = arr[0];
	for (var i = 0 ; i < arr.length ; i++){
		if (arr[i] < minVal){
			minVal = arr[i];		
		}	
	}
	return minVal;
}
/* This function calculates the average of 5 of 5 solves
 */
function aveOf5(arr) {
	var minimum = arr[0];
	var maximum = arr[0];
	var sum = 0;
	
	for (var i = 0 ; i < 5 ; i++ ) {
		sum += arr[i];
		if (arr[i] < minimum) {
			minimum = arr[i];		
		}
		if (arr[i] > maximum) {
			maximum = arr[i];		
		}
	}
	return (sum - minimum - maximum) / 3.0;
}
/* This function is called when the page is done loading
 * @parameter: none
 * @return: none
 */
function pageLoad(){
	timeDisplay = document.getElementById("timeDisplay");	

	document.onkeydown = spaceDown;
	document.onkeyup = spaceUp;
	
}// end pageLoad()

window.onload = pageLoad;