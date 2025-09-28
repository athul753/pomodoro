
let modes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};
let currentMode = 'pomodoro';
let timeLeft = modes[currentMode];
let timerInterval = null;
let display = document.getElementById('timerDisplay');

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.onclick = function() {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        currentMode = btn.getAttribute('data-mode');
        resetTimer();
    };
});

document.getElementById('startPauseBtn').onclick = function() {
    if (!timerInterval) startTimer();
    else pauseTimer();
};

document.getElementById('resetBtn').onclick = resetTimer;

function startTimer() {
    document.getElementById('startPauseBtn').textContent = "PAUSE";
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Timer Finished!');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('startPauseBtn').textContent = "START";
}

function resetTimer() {
    timeLeft = modes[currentMode];
    updateDisplay();
    pauseTimer();
}

function updateDisplay() {
    let min = Math.floor(timeLeft/60);
    let sec = timeLeft%60;
    display.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

updateDisplay();
