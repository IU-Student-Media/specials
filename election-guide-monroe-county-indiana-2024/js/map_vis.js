
const type_pick = document.getElementById("analyze-type")

const path_start = "./maps/compare_svg/VoteShift_"
const view_path_start = "./maps/reg_svg/"

const mc = document.querySelector(".map-container")

const map_img = document.getElementById("img-l")

const left_select = document.getElementById("left")
const right_select = document.getElementById("right")
const view_select = document.getElementById("view-select")

let left_map = "16_GOV"
let right_map = "16_GOV"
let view_map = "16GOV"

const pairs = {
  "16_GOV": new Set(["16_PRES", "16_SEN", "18_SEN", "20_GOV", "20_PRES"]),
  "16_PRES": new Set(["18_SEN", "20_GOV", "20_PRES"]),
  "16_SEN": new Set(["16_PRES", "20_GOV", "20_PRES"]),
  "18_SEN": new Set(["20_GOV", "20_PRES"]),
  "20_GOV": new Set(["20_PRES"])
}


function build_path(l, r) {
  return path_start + l + "_to_" + r + ".svg"
}

// Disables selectors on the right side
// Returns a value of a right side that is valid
function updateSelectors(l, r) {
  let works = "";
  let works_i = 0;
  let change = false;
  for (let i = 0; i != right_select.length; ++i) {
    let o = right_select.options[i]
    if (!pairs[l].has(o.value)) {
      o.disabled = true
      if (o.value == r) { change = true }
    } else {
      o.disabled = false
      works = o.value;
      works_i = i
    }
  }
  if (change) {
    right_select.value = works;
    return works;
  }
  return r;
}

function updateMaps(l, r) {
  map_img.setAttribute("src", build_path(l, r))
}

function updateView(x) {
  map_img.setAttribute("src", view_path_start + x + "_VM.svg")
}


left_select.addEventListener('change', (e) => {
  left_map = e.target.value
  mc.classList.remove("hide")
  right_map = updateSelectors(left_map, right_map)
  updateMaps(left_map, right_map);
})

right_select.addEventListener('change', (e) => {
  right_map = e.target.value
  mc.classList.remove("hide")
  right_map = updateSelectors(left_map, right_map)
  updateMaps(left_map, right_map);
})

view_select.addEventListener('change', (e) => {
  mc.classList.remove("hide")
  view_map = e.target.value;
  updateView(e.target.value)
})

map_img.addEventListener('load', () => {
  mc.classList.add("hide")
})



var update = (e) => {
  if (e.target.value == 'comp') {
    document.getElementById("view-div").style.display = "none";
    document.getElementById("comp-div").style.display = "";
    // Init
    left_select.value = left_map
    right_map = updateSelectors(left_map, right_map)
    updateMaps(left_map, right_map)
  } else {
    document.getElementById("comp-div").style.display = "none";
    document.getElementById("view-div").style.display = "";
    view_select.value = view_map;
    updateView(view_map);
  }
}
// Choosing types
type_pick.addEventListener('change', update)

update({target: {value: "comp"}})


