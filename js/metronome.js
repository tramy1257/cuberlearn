"use strict";

// BPM Audio Objects
var metro60 = null;
var metro80 = null;
var metro100 = null;
var metro120 = null;
var metro140 = null;
var metro160 = null;
var metro180 = null;

var startBtn = null; // Start Button
var stopBtn = null; // Stop Button
var bpmRange = null; // BPM Slider

var metroStatus = "stop"; // The status of the Metronome: start and stop

/* This function play the correct audio file according to the bpm chosen using the slider
 * Event-handler for clicking the start button
 * @parameter: none
 * @return: none
 */
function clickStart(){
	clickStop(); // stop any audio that is being played
	
	// Play the correct audio files based on the bpm
	switch(parseInt(bpmRange.value)) {	
		case 60:
			metro60.play();
			break;
		case 80:
			metro80.play();
			break;
		case 100:
			metro100.play();
			break;
		case 120:
			metro120.play();
			break;
		case 140:
			metro140.play();
			break;
		case 160:
			metro160.play();
			break;
		case 180:
			metro180.play();
			break;
		default:
			break;
	} // end switch cases
	
	metroStatus = "start"; // Change the status of the metronome to start
}// end clickStart()

/*This function stops any audio files that is playing
 * Event-handler for clicking the stop button
 * @parameter: none
 * @return: none
 */
function clickStop(){
	metro60.pause();
	metro60.currentTime = 0;
	
	metro80.pause();
	metro80.currentTime = 0;
	
	metro100.pause();
	metro100.currentTime = 0;
	
	metro120.pause();
	metro120.currentTime = 0;
	
	metro140.pause();
	metro140.currentTime = 0;
	
	metro160.pause();
	metro160.currentTime = 0;
	
	metro180.pause();
	metro180.currentTime = 0;
	
	metroStatus = "stop"; //change the metronome status to stop
}

/* This function display the BPM according to the input from the slider
 * Event-handler for changing the slider
 * @parameter: none
 * @return: none 
 */
function changeBpm(){
	document.getElementById("showBpm").innerHTML = "BPM:" + bpmRange.value; // output BPM
	
	// if the slider is changed while metronome is playing, set the metronome to play the new bpm 
	if (metroStatus === "start")
	{
			clickStart();
	}
}

/* This function is called when the page is done loading
 * @parameter: none
 * @return: none
 */
function pageLoad(){
	
	// Initialize metronome audio objects and set them on repeat
	metro60 = document.getElementById("metro60");
	metro60.loop = true;
	
	metro80 = document.getElementById("metro80");
	metro80.loop = true;
	
	metro100 = document.getElementById("metro100");
	metro100.loop = true;
	
	metro120 = document.getElementById("metro120");
	metro120.loop = true;
	
	metro140 = document.getElementById("metro140");
	metro140.loop = true;
	
	metro160 = document.getElementById("metro160");
	metro160.loop = true;
	
	metro180 = document.getElementById("metro180");
	metro180.loop = true;
	
	// Initialize the buttons and the slider and set interactive events functions
	startBtn = document.getElementById("startBtn");
	startBtn.onclick = clickStart;
	
	stopBtn = document.getElementById("stopBtn");
	stopBtn.onclick = clickStop;
	
	bpmRange = document.getElementById("bpmRange");
	bpmRange.oninput = changeBpm;
	
	changeBpm();// Display the initial position of the slider
	
}

window.onload = pageLoad;