const train = document.getElementById("train");
const smoke_cont = document.getElementById("smoke-container")

let trainW = train.clientWidth;

let particles = []

onscroll = (e) => {
    let w = window.innerWidth - trainW;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    let scroll = document.documentElement.scrollTop;
    let trainX = ((scroll / maxScroll) * w);
    train.style.left = trainX + "px";
    train.style.width = trainW + "px";

    // Create a new particle
    let smoke = document.createElement("div");
    smoke.classList.add("smoke");
    smoke.style.left = (trainX + trainW - trainW / 9 + Math.random()*10) + "px";
    smoke.style.bottom = trainW / 5.5 + "px"
    smoke.style.opacity = 1;
    smoke.style.width = "5px";
    smoke.style.height = "5px";

    smoke_cont.appendChild(smoke);
    particles.push(smoke);
}

const uSpeed = 1;
const lSpeed = 1;
const grow = 0.8;
const jitter = 2;

function updateSmoke() {
    let nps = []
    for (let i = 0; i != particles.length; ++i) {
        let p = particles[i];
        let cur = parseFloat(p.style.bottom);
        p.style.bottom = (cur + uSpeed + Math.random()*jitter) + "px";
        p.style.left = (parseFloat(p.style.left) - lSpeed - Math.random()*jitter)+ "px"
        p.style.opacity = parseFloat(p.style.opacity) - 0.03;
        p.style.width = (parseFloat(p.style.width) + grow) + "px"
        p.style.height = (parseFloat(p.style.height) + grow) + "px"
        if (parseFloat(p.style.opacity) > 0) {
            nps.push(p);
        } else {
            smoke_cont.removeChild(p);
        }
    }
    particles = nps;
}

setInterval(updateSmoke, 20)
