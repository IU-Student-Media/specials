// Called train, because it was stolen from the haunted train buildout

const train = document.getElementById("train");

const trainW = train.clientWidth;

let particles = []

onscroll = (e) => {
    let w = window.innerWidth - trainW;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    let scroll = document.documentElement.scrollTop;
    let trainX = ((scroll / maxScroll) * w);
    train.style.left = trainX + "px";
    train.style.width = trainW + "px";
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
        }
    }
    particles = nps;
}

setInterval(updateSmoke, 20)
