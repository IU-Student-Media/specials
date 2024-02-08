const nest = document.getElementById("nest-button");
const nestFooter = document.getElementById("nest-button-footer");
const main = document.getElementById("main");
const snowContainer = document.getElementById("bird-div");


nest.onclick = e =>{
    let birds = document.getElementsByClassName("flying-bird");
    while(birds.length > 0) birds[0].remove();
    createSnow(Math.floor(Math.random() * 100) + 50);
    setTimeout(() => main.scrollIntoView({behavior : "smooth"}), 50);
}

nestFooter.onclick = e =>{
    let birds = document.getElementsByClassName("flying-bird");
    while(birds.length > 0) birds[0].remove();
    createSnow(Math.floor(Math.random() * 100) + 50);
}


let screenWidth = window.innerWidth;

const getRandomStyles = () => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 70);
    const dur = Math.random() * .9 + .5;
    const sizeMult = Math.floor(Math.random() * 100) + 30;
    return ` 
        top: ${top}%; 
        left: -${left}%; 
        animation-duration: ${dur}s; 
        width : ${sizeMult}px;
        `;
}


const createSnow = (num) => {
    for (var i = num; i > 0; i--) {
      var snow = document.createElement("div");
      snow.className = `flying-bird bird${Math.floor(Math.random() * 9)}`;
      snow.style.cssText = getRandomStyles();
      snowContainer.append(snow);
    }
}

window.onresize = e => {
    screenWidth = window.innerWidth;
}