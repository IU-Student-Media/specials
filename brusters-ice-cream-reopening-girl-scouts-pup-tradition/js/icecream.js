const scrollFactor = 0.1
let prevScroll = 0

function updateScrolls() {
    for (const icecream of document.querySelectorAll('.bg-icecream')) {
        let rotate = parseInt(icecream.style.rotate.match(/(-?[0-9]+)deg/)[1])
        let newRotate = Math.floor((rotate + ((window.scrollY - prevScroll) * scrollFactor)) % 360)
        icecream.style.rotate = newRotate + "deg"
    }
    prevScroll = window.scrollY
}

window.onload = window.onresize = () => prevScroll = window.scrollY
window.onscroll = updateScrolls