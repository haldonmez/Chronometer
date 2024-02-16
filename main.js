var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped
var currentTime;
var elapsedTime=0;
var index=0;

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
    elapsedTime = 0;
    
  }

function updateStopwatch() {
    currentTime = new Date().getTime(); // get current time in milliseconds
    elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
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
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    index=index+1;
    newLabel.textContent = index+".    "+displayTime;
    newLabel.className = 'myClass';
    newLabel.style.fontSize="20px"
    var containerDiv2 = document.querySelector(".savedTimesC");
    containerDiv2.style.display="block"
    var containerDiv = document.querySelector(".savedTimes");
    var clearButton = document.querySelector("#clearButton");
    containerDiv.appendChild(newLabel);
    containerDiv.style.display="block"
    clearButton.style.display="inline-block"

}

function clearRecords()
{
  index =0;
  var containerDiv = document.querySelector(".savedTimes");
  var labels = containerDiv.querySelectorAll('.myClass');
  labels.forEach(function(label) {
    containerDiv.removeChild(label);
  });
  var clearButton1 = document.querySelector("#clearButton");
  clearButton1.style.display="none"
  var clearButton2 = document.querySelector(".savedTimesC")
  clearButton2.style.display="none"
}

function takeScreenShot()
{
  html2canvas(document.body)
    .then(canvas=> {
      const url =canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const currentDate = new Date().toDateString();
      a.setAttribute("download", currentDate);
      a.setAttribute("href", url);
      a.click();
    })
}