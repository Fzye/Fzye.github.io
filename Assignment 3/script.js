let isDraggingItem = false;
const activeItems = [];
const timerDisplay = document.getElementById("timer");
const timerIcon = document.getElementById("timer-icon");

const STARTING_TIME = 20*60; 
let timeRemaining = STARTING_TIME;
let countdown;

function updateDisplay() {
    const mins = Math.floor(timeRemaining/60);
    const secs = timeRemaining % 60;

    timerDisplay.textContent = 
     `${mins}:${secs < 10 ? "0" : ""}${secs}`; //creating timer logic similar to A2

updateDangerState();
}

function updateDangerState() {
    document.body.classList.remove(
    "safe-mode",
    "warning-mode",
    "danger-mode"
);

if (timeRemaining <= 300) {//5 mins 
    timerIcon.textContent = "⛔";
    timerIcon.className = "timer-check danger";

    document.body.classList.add("danger-mode");
} else if (timeRemaining <=600) {//10 min mark
    timerIcon.textContent = "⚠️";
    timerIcon.className = "timer-check warning";

    document.body.classList.add("warning-mode");
} else {
    timerIcon.textContent = "✅";
    timerIcon.className = "timer-check safe";

    document.body.classList.add("safe-mode");
}
}
function startTimer () {
    clearInterval(countdown);
    countdown = setInterval(() => {
    timeRemaining--;

    if (timeRemaining <= 0) {
        clearInterval(countdown);
        timeRemaining = 0;

        updateDisplay();

        timerDisplay.textContent = "Time's up!";

        const textarea = document.querySelector("textarea");
        textarea.value = "";
        textarea.disabled = true;

        return;
    }

    updateDisplay();
}, 1000);
}

function resetTimer() {
    timeRemaining = STARTING_TIME;
    updateDisplay();

    activeItems.forEach(item => item.remove());
    activeItems.length = 0;

clearInterval(countdown);
startTimer();
}

updateDisplay();
startTimer();

const spawnArea = document.getElementById("spawn-area");

function spawnItem () {
    if (timeRemaining <= 0) return;

    const spawn = document.createElement("div");
    spawn.classList.add("spawn");
    const emojis = timeRemaining <= 300
    ? ["⛔", "💥", "🔥"]
    : timeRemaining <= 600
    ? ["⏳", "⚠️", "🔄"]
    : ["🧠", "✍️", "📌"];
    spawn.textContent = emojis [Math.floor(Math.random() * emojis.length)];

    const margin = 80;
    const x = Math.random() * (window.innerWidth - margin);
    const y = Math.random () * (window.innerHeight - margin);

    spawn.style.left = `${x}px`;
    spawn.style.top = `${y}px`;

spawnArea.appendChild(spawn);
activeItems.push(spawn);

/*originally I had it so I was using the typical dragstart, dragover, drop etc. 
But this left an annoying ghost image of the dragged element and i wanted it to be more visually understandable and not confusing.*/
spawn.addEventListener("pointerdown", (e) => {
    const el = e.currentTarget;

    isDraggingItem = true;

    el.style.zIndex = 9999;

    let offsetX = e.clientX - el.getBoundingClientRect().left;
    let offsetY = e.clientY - el.getBoundingClientRect().top;

function move(e) {
    el.style.left = (e.clientX - offsetX) + "px";
    el.style.top = (e.clientY - offsetY) + "px";

    const timerRect = timerIcon.getBoundingClientRect();

    if (
        e.clientX >= timerRect.left &&
        e.clientX <= timerRect.right &&
        e.clientY >= timerRect.top &&
        e.clientY <= timerRect.bottom
    ) {
        resetTimer();
    }
}

    function stop() {
        isDraggingItem = false;

        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", stop);
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
});

setTimeout(() => {
    spawn.remove();

    const index = activeItems.indexOf(spawn);
    if (index > -1) {
        activeItems.splice(index, 1);
    }
}, 15000);
}

setInterval(spawnItem, 10000);