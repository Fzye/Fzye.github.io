let isDraggingItem = false;
const activeItems = [];
const timerDisplay = document.getElementById("timer");
const timerIcon = document.getElementById("timer-icon");

const chimeSound = new Audio("audio/chime.mp3");

const STARTING_TIME = 20*60; 
let timeRemaining = STARTING_TIME;
let copyEnabled = false;
let justDragged = false;
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

    updateDisplay();

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
const textarea = document.querySelector("textarea");

textarea.addEventListener("copy", (e) => {
    if (!copyEnabled) {
        e.preventDefault();
        alert("Copy is locked!");
    }
});

const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", () => {
    const confirmClear = confirm("Clear text? It's free!");

    if (confirmClear) {
        const textarea = document.querySelector ("textarea");
        textarea.value = "";
    }
});

function resetTimer() {
    timeRemaining = STARTING_TIME;
    updateDisplay();

    activeItems.forEach(item => item.remove());
    activeItems.length = 0;

clearInterval(countdown);
startTimer();

if (chimeSound.paused) {
chimeSound.currentTime = 0;
chimeSound.play();
}
/*preventing audio from playing rapidly upon drag by checking it hasn't started yet before playing the sound*/

const timerBox = document.querySelector(".timer-box");
timerBox.classList.add("flash-green");

setTimeout(() => {
    timerBox.classList.remove("flash-green");
}, 300);
}

function enableCopyFor10Seconds() {
    copyEnabled = true;

    setTimeout(() => {
        copyEnabled = false;
    }, 10000);
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
    ? ["⏳"]
    : ["⏳"];
   spawn.textContent = emojis [Math.floor(Math.random() * emojis.length)];

    const margin = 80;
    const x = Math.random() * (window.innerWidth - margin);
    const y = Math.random () * (window.innerHeight - margin);

    spawn.style.left = `${x}px`;
    spawn.style.top = `${y}px`;

spawnArea.appendChild(spawn);
activeItems.push(spawn);
popAnimation(spawn)

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

    justDragged = true;

    setTimeout(() => {
    justDragged = false;
}, 200);
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
});
}


setInterval(spawnItem, 10000);

let saveUnlocked = false;
const saveButton = document.getElementById("save");

saveButton.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    if (!saveUnlocked) {
        alert("Save unlocks after 20 minutes!");
        return;
    }

    let offsetX = e.clientX - saveButton.getBoundingClientRect().left;
    let offsetY = e.clientY - saveButton.getBoundingClientRect().top;

    function move(e) {
        saveButton.style.position = "absolute";
        saveButton.style.left = (e.clientX - offsetX) + "px";
        saveButton.style.top = (e.clientY - offsetY) + "px";
    }

function stop() {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);

    const saveRect = saveButton.getBoundingClientRect();
    const timerRect = timerIcon.getBoundingClientRect();

    const isOverTimer =
        saveRect.left < timerRect.right &&
        saveRect.right > timerRect.left &&
        saveRect.top < timerRect.bottom &&
        saveRect.bottom > timerRect.top;

    if (isOverTimer) {
        enableCopyFor10Seconds();
        saveButton.style.display = "none";
    }
}
window.addEventListener("pointermove", move);
window.addEventListener("pointerup", stop);
});

setTimeout(() => {
    saveUnlocked = true;
    saveButton.disabled = false;
    saveButton.textContent = "💾";

    alert("Save unlocked! Drag the save button to the timer to enable copying for 10 seconds. You can only do this once, so better do it when your task is done ;)");

    const tipBox = document.querySelector(".tip-box");
    if (tipBox) {
        tipBox.innerHTML = "Tip: Drag the save button to the timer to enable copying for 10 seconds! One-time use, choose wisely!";
    }
}, 20*60*1000);
/*I temporarily changed the above line to }, 5000); to test the save button functionality
without having to wait 20 minutes (since I can't limit the user being on the page
for 20 minutes through the console which is a bit annoying, but at least it works)*/

function popAnimation(element) {
    element.animate([
        { transform: 'scale(0) rotate(-45deg)', opacity: 0 },
        { transform: 'scale(1.2) rotate(10deg)', opacity: 1, offset: 0.8 },
        { transform: 'scale(1) rotate(0deg)', opacity: 1 }
    ], {
        duration: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'
    });
}