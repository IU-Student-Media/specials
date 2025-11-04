// TODO: Touchscreen events
// TODO: Disable on mobile (CSS)
let onMobile = window.innerWidth < 992;


let backboardX = window.innerWidth - 160
let backboardY = 160
let backboardHeight = 240

const hoopR = 3;

let hoopX1 = window.innerWidth - hoopR - 230
let hoopX2 = window.innerWidth - hoopR - 110
let hoopY = 210 + hoopR;

function setHitboxes() {
  if (window.innerWidth < 1200) {
    backboardX = window.innerWidth - 20;
    backboardY = 200
    backboardHeight = 240
    hoopX1 = window.innerWidth - hoopR - 160
    hoopX2 = window.innerWidth - hoopR - 70
    hoopY = 270 + hoopR;
  } else {
    backboardX = window.innerWidth - 110
    backboardY = 160
    backboardHeight = 240
    hoopX1 = window.innerWidth - hoopR - 230
    hoopX2 = window.innerWidth - hoopR - 110
    hoopY = 210 + hoopR;
  }
}




// Use the 900 thing?
window.addEventListener("resize", () => {
  setHitboxes();

  // TODO: Check this number
  onMobile = window.innerWidth < 992;



  // on smaller size

})



const ball = {
  element: document.getElementById("basketball"),
  r: 50 / 1.5,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  rot: 0,
}

const scoreboard = document.getElementById("scoreboard");
const tooltip = document.getElementById("play-me");
// tooltip.style.bottom = (ball.y + ball.r * 1.2) + "px"
// tooltip.style.left = (ball.x + ball.r * 1.2) + "px"
tooltip.style.display = "block";



const grav = -1;
const friction = 0.1;
const body = document.querySelector("body")

let held = false;

// Assuming obj2 is fixed
function getNewVelocity(o1, o2) {

  let x1 = [o1.x + o1.r, o1.y + o1.r]
  let x2 = [o2.x + o2.r, o2.y + o2.r]
  let v1 = [o1.vx, o1.vy];
  let v2 = [o2.vx, o2.vy];

  let scalar1 = 1.8 * dotProduct(subVectors(v1, v2), subVectors(x1, x2)) / dotProduct(subVectors(x1, x2), subVectors(x1, x2));
  let newVel1 = subVectors(v1, vectorScale(subVectors(x1, x2), scalar1));

  let scalar2 = dotProduct(subVectors(v2, v1), subVectors(x2, x1)) / dotProduct(subVectors(x2, x1), subVectors(x2, x1));
  let newVel2 = subVectors(v2, vectorScale(subVectors(x2, x1), scalar2));

  return newVel1
}

let handleStart = (e) => {
  // e.preventDefault()
  let clickX = e.clientX;
  let clickY = window.innerHeight - e.clientY;


  let ballCenter = { x: ball.x + ball.r, y: ball.y + ball.r }
  // console.log(clickX, clickY, ballCenter.x, ballCenter.y)

  if (dist(clickX, clickY, ballCenter.x, ballCenter.y) <= ball.r) {
    tooltip.style.display = "none"
    held = true;
    body.style.userSelect = "none"
    ball.x = e.clientX - ball.r;
    ball.y = window.innerHeight - e.clientY - ball.r

    ball.element.style.bottom = ball.y + "px"
    ball.element.style.left = ball.x + "px"
  }
}

let handleEnd = (e) => {
  held = false;
  body.style.userSelect = ""
}

let handleMove = (e) => {
  if (held) {
    // console.log(e)
    ball.vx = e.movementX
    ball.x = e.clientX - ball.r;
    ball.vy = -e.movementY
    ball.y = window.innerHeight - e.clientY - ball.r
  }
  ball.element.style.bottom = ball.y + "px"
  ball.element.style.left = ball.x + "px"
}

window.addEventListener("mousedown", handleStart)

let lastTouchX = 0;
let lastTouchY = 0;

window.addEventListener("touchstart", (e) => {
  e.preventDefault()
  lastTouchX = e.changedTouches[0].clientX
  lastTouchY = e.changedTouches[0].clientY
  handleStart(e.changedTouches[0])
});
window.addEventListener("touchend", (e) => {
  // console.log("touchend")
  e.preventDefault()
  handleEnd(e)
});
window.addEventListener("touchmove", (e) => {
  if (held) {
    e.preventDefault()

  }
  let touch = e.changedTouches[0]
  touch.movementX = touch.clientX - lastTouchX;
  touch.movementY = touch.clientY - lastTouchY;

  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;

  handleMove(e.changedTouches[0])
},
  { passive: false });


window.addEventListener("mouseup", handleEnd)

window.addEventListener("mousemove", handleMove)

let totalPoints = 0;
let scoreFlag = false;


function update() {
  setHitboxes();

  let borderRight = window.innerWidth - 2 * ball.r



  if (!held) {
    // Update velocities
    if (ball.y != 0) {
      ball.vy += grav;
    }

    ball.vx -= Math.sign(ball.vx) * friction;

    if (Math.abs(ball.vx) < 1) {
      ball.vx = 0
    }

    let oldX = ball.x
    let oldY = ball.y

    // Update position
    ball.x += ball.vx
    ball.rot += ball.vx
    ball.y += ball.vy

    // Handle collision

    // Walls and floor
    if (ball.y < 0) {
      if (ball.vy > -2) {
        ball.vy = 0; ball.y = 0
      }
      else {
        ball.vy = -ball.vy * 0.5
        ball.y = -ball.y
      }
    }

    if (ball.x < 0) {
      ball.vx = -ball.vx * 0.5
      ball.x = -ball.x
    }

    if (ball.x > borderRight) {
      ball.vx = -ball.vx * 0.5
      ball.x = borderRight - (ball.x - (borderRight))
    }

    // TODO: Only backboard collision if on mobile? / Lock play area to top of page
    if (!onMobile) {

      // Backboard:
      // let backboardX = window.innerWidth - 110;
      if (ball.y + ball.r > backboardY && ball.y - ball.r < backboardY + backboardHeight) {
        if (ball.vx > 0 && ball.x + 2 * ball.r >= backboardX && ball.x < backboardX) {
          // Bounce left
          ball.vx = -ball.vx
          ball.x = backboardX - (ball.x + 2 * ball.r - backboardX) - 2 * ball.r
        } else if (ball.vy < 0 && ball.x - ball.r < backboardX) {
          // Bounce right
        }
      }

      // Left rim
      if (dist(ball.x + ball.r, ball.y + ball.r, hoopX1 + hoopR, hoopY + hoopR) < hoopR + ball.r) {
        // TODO: Hit left rim, do circle collision
        [vx1, vy1] = getNewVelocity(ball, { x: hoopX1 + hoopR, y: hoopY + hoopR, r: hoopR, vx: 0, vy: 0 })
        ball.vx = vx1
        ball.x += vx1
        ball.vy = vy1
        ball.y += vy1
      }

      // Right rim
      if (dist(ball.x + ball.r, ball.y + ball.r, hoopX2 + hoopR, hoopY + hoopR) < hoopR + ball.r) {
        // TODO: Hit left rim, do circle collision
        [vx1, vy1] = getNewVelocity(ball, { x: hoopX2 + hoopR, y: hoopY + hoopR, r: hoopR, vx: 0, vy: 0 })
        ball.vx = vx1
        ball.x += vx1
        ball.vy = vy1
        ball.y += vy1
      }

      // ball.x between hoopx and hoopT
      // score collider
      if (ball.x > hoopX1 && ball.x < hoopX2 && ball.y + ball.r / 2 > hoopY && ball.y - ball.r / 2 < hoopY) {
        if (!scoreFlag) {
          totalPoints++;
          scoreFlag = true;
          console.log(totalPoints)
        }
          ball.vx = ball.vx / 1.7;
          ball.vy = ball.vy / 1.5;


      } else {
        scoreFlag = false;
      }
      scoreboard.innerText = totalPoints;
    }

    // Draw ball
    ball.element.style.bottom = ball.y + "px";
    ball.element.style.left = ball.x + "px";
    ball.element.style.transform = `rotate(${ball.rot}deg)`;
  }
}

setInterval(update, 16)



// Physics stuff :)
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

function dotProduct(v1, v2) {
  let sum = 0;
  for (let i = 0; i < Math.min(v1.length, v2.length); ++i)
    sum += v1[i] * v2[i];
  return sum;
}
function subVectors(v1, v2) {
  let newVec = [];
  for (let i = 0; i < Math.min(v1.length, v2.length); ++i)
    newVec[i] = v1[i] - v2[i];
  return newVec;
}
function vectorScale(v, a) {
  let newVec = [];
  for (let i = 0; i < v.length; ++i)
    newVec[i] = v[i] * a;
  return newVec;
}
function normSquared(v) {
  return dotProduct(v, v);
}