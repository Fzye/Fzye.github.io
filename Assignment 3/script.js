let isDraggingItem = false;
const activeItems = [];
const timerDisplay = document.getElementById("timer");
const timerIcon = document.getElementById("timer-icon");

//loading the audio file so it is ready to use later
const chimeSound = new Audio("audio/chime.mp3");

const STARTING_TIME = 20*60; 
let timeRemaining = STARTING_TIME;
let copyEnabled = false;
let justDragged = false;
let countdown;
//set the timer to 20 minutes, not to much time but not too little to enocourage user to focus

function updateDisplay() {
    const mins = Math.floor(timeRemaining/60);
    const secs = timeRemaining % 60;

    timerDisplay.textContent = 
     `${mins}:${secs < 10 ? "0" : ""}${secs}`; //creating timer logic similar to A2, update text block and adds leading 0 if seconds are under 10

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

/*different stages occur at 10 minutes and 5 minutes.
updates icon next to timer to give the user some sense of urgency*/
function startTimer () {
    clearInterval(countdown); //prevent multiple timers from running simultaneously
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
/*deletes work and locks the text box if timer hits 0.
Due to visual cues, such as icon next to the timer, background color changing,
spawned emojis becoming more urgent as the timer goes down, the user will be inclined
to keep resetting the timer before reaching this point, but if they do, they are ultimately
punished for not staying focused. */
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
/*Prevents the user from being able to copy their text too early and gives
them an alert reminder. */
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
//deletes all emojis currently on the screen when timer is reset to avoid clutter and affirm that the user has performed the correct action
clearInterval(countdown);
startTimer();

if (chimeSound.paused) {
chimeSound.currentTime = 0;
chimeSound.play();
}

/*preventing audio from playing rapidly upon drag by checking it hasn't started yet before playing the sound*/

const timerBox = document.querySelector(".timer-box");
timerBox.classList.add("flash-green");

/*triggers green flash animation on timer box for instant visual feedback
that the user has correctly dragged and dropped and item onto the timer to reset it*/

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

/*changes emoji array based on time left, spawning emojis with more of an urgent
connotation if time left is below 5 minutes - paired with red "danger zone"
background user can draw the assumption that something bad will happen if they
don't reset the timer */

    const margin = 80;
    const x = Math.random() * (window.innerWidth - margin);
    const y = Math.random () * (window.innerHeight - margin);

    spawn.style.left = `${x}px`;
    spawn.style.top = `${y}px`;

spawnArea.appendChild(spawn);
activeItems.push(spawn);
popAnimation(spawn)

/*calls animation at the bottom of the file for spawning emojis. Animation
adds something reminiscent of a game to keep the user somewhat stimulated and focused
while writing their essay, while limiting amount of items at a time prevents overstimulation.
As the user will probably come to the webpage with the intention of needing
to write an essay within a certain amount of time, they have probably procrastinataed
the task due to it being too understimulating, as writing on a page is very mundane.
By adding some visual elements, visual feedback and targeted interaction, such as 
drag and drop rather than just clicking on items, it turns the task into a simple game
while maintaining pressure with decreasing timer.*/

setTimeout(() => {
    const itemIndex = activeItems.indexOf(spawn);

    if (itemIndex > -1) {
        spawn.remove();
        activeItems.splice(itemIndex, 1);

    }
}, 15000);

/*timeout system to delete spawned emojis if they have remained there for 15
seconds to avoid clutter and uneccessary distraction on the screen, by individually
tracking each emoji with its own timer.*/


/*originally I had it so I was using the typical dragstart, dragover, drop etc. 
But this left an annoying ghost image of the dragged element and i wanted it to be more visually understandable and not confusing.
I asked ChatGPT how I could fix the image ghosting and it advised me that using pointer events
would prevent this, so I learned to do it through calculating distance
between the mouse cursor and element being dragged. (ChatGPT 5.0) This way it was made much easier for the user to understand that they
had to move the spawned elements onto the timer in an encouraging game-like sense rather than have a system
reminiscent of doing something more technical like dragging a file.*/

spawn.addEventListener("pointerdown", (e) => {
    const el = e.currentTarget;

    isDraggingItem = true;

    el.style.zIndex = 9999;

    let offsetX = e.clientX - el.getBoundingClientRect().left;
    let offsetY = e.clientY - el.getBoundingClientRect().top;

//Calculates distance between mouse cursour and the element's edge 
//ensures element doesn't snap suddenly when dragged

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

 // point to point box collission detection
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

//user cannot use save button before 20 minutes has elapsed and gets an alert if they try to interact with the butto n.
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

/*Checks if physical box of the save button is overlapping the box of the timer unlike point-to-point 
collission above just tracking the mouse pointer. I needed some help ensuring this was written correctly (Gemini 3.1 Pro)
but this ensures that if all four criteria are met, meaning that the boxes haven't failed to 
meet each other, then the physical elements are actually overlapping on the screen. */

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

/*save button unlcoks after 20 minutes and icon changes from a greyed out version
to an emoji. The user also gets an alert which advises them that they can drag
the save button onto the timer to enable copying once for 10 seconds. This forces them 
to not only have to write for at least 20 minutes but to have to choose wisely when to save,
as they will only be able to do it once during the session, encouraging them to finish
writing their essay and constantly resetting the timer before ultimately saving, */

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
    });
}
/*Uses web animations API to dynamically animate the items as they spawn on the page.
Initially I just had it so that the items scale change as they pop up, but it didn't feel
dynamic enough, so I asked Gemini for some suggestions on how to make my spawn animation 
more dynamic, where I was introduced to cubic-bezier easing and realised I could
also experiment with rotation (Gemini 3.1 Pro)  */