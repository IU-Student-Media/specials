let menCont = document.getElementById("mens-articles")
let womenCont = document.getElementById("womens-articles")

let menBtn = document.getElementById("men-btn")
let womenBtn = document.getElementById("women-btn")

menCont.style.display = "grid";
womenCont.style.display = "none";

menBtn.addEventListener("click", (e) => {
  e.preventDefault()
  menCont.style.display = "grid";
  womenCont.style.display = "none";
})

womenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  menCont.style.display = "none";
  womenCont.style.display = "grid";
})
