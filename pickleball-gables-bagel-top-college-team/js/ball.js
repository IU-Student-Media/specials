const ball = document.getElementById("ball");

const ballW = ball.clientWidth;

onscroll = (e) => {

    let w = window.innerWidth - ballW;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let rotateCoef = 10 / (Math.sqrt(window.innerWidth));

    let scroll = document.documentElement.scrollTop;
    ball.style.left = ((scroll / maxScroll) * w) + "px";
    ball.style.width = ballW + "px";
    ball.style.transform = `rotate(${scroll * rotateCoef}deg)`;
}
