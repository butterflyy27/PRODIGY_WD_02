let isRunning = false;
let intervalId;
let startTime;
let laps = [];
let lapsContainer = document.getElementById('laps');

function startStop() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    intervalId = setInterval(updateTime, 10);
    document.getElementById('startStopBtn').textContent = 'Stop';
    document.getElementById('lapResetBtn').textContent = 'Lap';
  } else {
    isRunning = false;
    clearInterval(intervalId);
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('lapResetBtn').textContent = 'Reset';
  }
}

function updateTime() {
  const currentTime = Date.now();
  const elapsedTime = new Date(currentTime - startTime);
  const formattedTime = elapsedTime.toISOString().substr(11, 8);
  document.getElementById('display').textContent = formattedTime;
}

function lapReset() {
  if (isRunning) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    laps.push(lapTime);
    const formattedLapTime = new Date(lapTime).toISOString().substr(11, 8);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formattedLapTime}`;
    lapsContainer.appendChild(lapItem);
  } else {
    startTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00';
    lapsContainer.innerHTML = '';
  }
}
