// change this variable to alter disk speed
const windowSizeSpeedFactor = 400

const recordInfo = {
    record1 : {
        element : document.getElementById("record1"),
        initX : -10,
        yAnchor : "bottom",
        initY : 0.8,
        width : 1400,
        moveFactor : -0.1,
        rotateFactor : -0.2,
    },
    record2 : {
        element : document.getElementById("record2"),
        initX : 55,
        yAnchor : "bottom",
        initY : 0.7,
        width : 1200,
        moveFactor : 0.11,
        rotateFactor : 0.6,
    },
    record3 : {
        element : document.getElementById("record3"),
        initX : 55,
        yAnchor : "top",
        initY : 0.6,
        width : 700,
        moveFactor : 0.07,
        rotateFactor : 0.3,
    },
}

function processRecord(record) {
    const ele = recordInfo[record].element
    const width = recordInfo[record].width * Math.pow(window.innerWidth, .75) / 300
    const left = recordInfo[record].initX + window.scrollY * (recordInfo[record].moveFactor * windowSizeSpeedFactor / Math.pow(window.innerWidth, .9))
    const y = recordInfo[record].initY * width - width
    const rotation = (window.scrollY * recordInfo[record].rotateFactor) % 360

    ele.style.left = left + "%"
    ele.style[recordInfo[record].yAnchor] = y + "px"
    ele.style.width = width + "px"
    ele.style.rotate = rotation + "deg"
}

window.onload = window.onscroll = window.onresize = (e) => {
    for (const record in recordInfo) {
        processRecord(record)
    }
}
