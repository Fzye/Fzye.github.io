const button2 = document.getElementById("example_button_2");

button2.addEventListener("mouseenter", () => {
button2.style.backgroundColor = "blue";
button2.style.transform = "scale(1.2)";
button2.style.border = "solid purple";
button2.innerText = "Hello";
});

button2.addEventListener ("mouseleave", () => {
    button2.style.backgroundColor = "";
    button2.style.transform = "scale(1.0)";
    button2.style.border = "none";
    button2.innerText = "Hover Me";
});

document.body.style.margin = 0
const cnv = document.getElementById ("canvas")
const ctx = cnv.getContext ("2d")
const clickPositions = []

function setSize () {
cnv.width = window.innerWidth
cnv.height = window.innerHeight

}

setSize ()
window.onresize = setSize

function drawFrame (ms) {
    ctx.fillStyle = "turquoise"
    ctx.fillRect (0,0, cnv.width, cnv.height)

    ctx.fillStyle = "hotpink";
    clickPositions.forEach (pos => {
    const x = pos.x + Math.random () * 10
    ctx.fillRect (x, pos.y, 10, 10)
})
window.requestAnimationFrame (drawFrame)
}

drawFrame ()

function handleClick (clickEvent) {
}

function handleMove (moveEvent){
    clickPositions.push ({
        x:clickEvent.clientX,
        y:clickEvent.clientY
    })
}

cnv.onclick = handleClick
