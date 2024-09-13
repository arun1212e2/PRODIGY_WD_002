let startTime, updatedTime, difference, tInterval;
let running = false;
let lapTimes = [];

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('lapsList');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1000);
        running = true;
        startButton.disabled = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00";
    startButton.disabled = false;
    lapsList.innerHTML = '';
    lapTimes = [];
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const time = new Date(updatedTime);
    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    const seconds = String(time.getUTCSeconds()).padStart(2, "0");
    display.textContent = `${hours}:${minutes}:${seconds}`;
}
const lapButton = document.createElement('button');
lapButton.textContent = 'Lap';
lapButton.addEventListener('click', recordLap);
document.querySelector('.buttons').appendChild(lapButton);

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        lapTimes.push(lapTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}
