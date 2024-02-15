var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startChronoMeter() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}
function stopChronoMeter() {
    clearInterval(stopwatchInterval); // stop the interval
    if(startTime==undefined) // Takes care of the "NULL" first time the chronometer is started.
    {
      startFirstTime = new Date().getTime()
      elapsedPausedTime = new Date().getTime() - startFirstTime; // calculate elapsed paused time
      stopwatchInterval = null;
    }
    else
    {
      elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
      stopwatchInterval = null; // reset the interval variable
    }
    
  }

function resetChronoMeter() {
    stopChronoMeter(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("icon").innerHTML = "00:00:00"; // reset the display
  }

function updateStopwatch() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    document.getElementById("timer").innerHTML = displayTime; // update the display
    document.getElementById("icon").innerHTML = displayTime; // update the display
}
  
function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
}

function saveChronoMeter()
{
    const newLabel = document.createElement('p');
    newLabel.textContent = 'Click me!';
    newLabel.className = 'myClass';
    var containerDiv = document.querySelector(".savedTimes");
    containerDiv.appendChild(newLabel);
    containerDiv.style.display="block"

}