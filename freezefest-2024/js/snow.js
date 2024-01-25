const snowContainer = document.getElementById("snow-container");

const snowContent = ['&#10052', '&#10053', '&#10054'];

let screenWidth = window.innerWidth;

const getRandomStyles = () => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const dur = Math.floor(Math.random() * 10) + 10;
    const size = (Math.floor(Math.random() * 25) + 25) * screenWidth / 1500;
    return ` 
        top: -${top}%; 
        left: ${left}%; 
        font-size: ${size}px; 
        animation-duration: ${dur}s; 
        `;
}


const createSnow = (num) => {
    for (var i = num; i > 0; i--) {
      var snow = document.createElement("div");
      snow.className = "snow";
      snow.style.cssText = getRandomStyles();
      snow.innerHTML = snowContent[Math.floor(Math.random() * 2)]
      snowContainer.append(snow);
    }
  }

  window.addEventListener("load", () => {
    createSnow(30)
  });

  window.onresize = e => {
    screenWidth = window.innerWidth;
    console.log(screenWidth);
  }