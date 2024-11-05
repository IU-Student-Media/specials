
const type_pick = document.getElementById("analyze-type")

const path_start = "VoteShift_"
const view_path_start = ""

const mc = document.querySelector(".map-container")

const map_img = document.getElementById("img-l")

const left_select = document.getElementById("left")
const right_select = document.getElementById("right")
const view_select = document.getElementById("view-select")

const dem_perc = document.getElementById("dem-percent");
const rep_perc = document.getElementById("rep-percent");
const oth_perc = document.getElementById("other-percent");

let left_map = "16_PRES"
let right_map = "20_PRES"
let view_map = "20_PRES"


// const pairs = {
//   "16_GOV": new Set(["16_PRES", "16_SEN", "18_SEN", "20_GOV", "20_PRES"]),
//   "16_PRES": new Set(["18_SEN", "20_GOV", "20_PRES"]),
//   "16_SEN": new Set(["16_PRES", "20_GOV", "20_PRES"]),
//   "18_SEN": new Set(["20_GOV", "20_PRES"]),
//   "20_GOV": new Set(["20_PRES"])
// }

const path_to_ceo = {
    "16_GOV_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/30a1ba18-ef72-4735-a3d8-44799f1db60a.original.svg",
    "16_PRES_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/6694e373-8f9c-45ec-aac7-d50bba5f44d0.original.svg",
    "16_SEN_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/5ac1e51c-ad4c-4c62-8c7d-61b9a95fd7ff.original.svg",
    "18_SEN_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/2c7c636b-8a3e-4d07-aa12-781e77d60d2f.original.svg",
    "20_GOV_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/64e43add-6e14-46a7-b643-734324742c9e.original.svg",
    "20_PRES_VM.svg" : "https://s3.amazonaws.com/snwceomedia/ids/84c54f9e-35ca-4c5d-968a-21a306bab20e.original.svg",
    "VoteShift_16_GOV_to_16_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/79b795c0-6596-4f9b-b5a6-e58bcf7f0e3a.original.svg",
    "VoteShift_16_GOV_to_16_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/072e4787-545c-4ed9-92b3-1c8513d76dc0.original.svg",
    "VoteShift_16_GOV_to_18_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/88f80625-454c-4bd8-9273-4cc3d0d381e7.original.svg",
    "VoteShift_16_GOV_to_20_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/d9a755ef-271c-4188-bdfd-e858d80570d9.original.svg",
    "VoteShift_16_GOV_to_20_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/bc1a3c4d-5007-4cd3-bedd-c5c1eb2dbc34.original.svg",
    "VoteShift_16_PRES_to_16_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/e8c748ef-e3ec-4d7a-84f5-25847d405425.original.svg",
    "VoteShift_16_PRES_to_16_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/f2ab4e50-7359-41ae-90df-afc37e348ea3.original.svg",
    "VoteShift_16_PRES_to_18_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/01373418-f483-4d21-929b-7229583bba35.original.svg",
    "VoteShift_16_PRES_to_20_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/431748f5-cfd3-4495-9c81-7d691570caab.original.svg",
    "VoteShift_16_PRES_to_20_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/1772b4c8-7a29-4d9f-a0a2-795d5a57c2ce.original.svg",
    "VoteShift_16_SEN_to_16_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/6f20a235-eaa8-49ae-8314-2a7a9ed8d4f3.original.svg",
    "VoteShift_16_SEN_to_16_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/c6b93262-6faa-43dc-a381-f5494695a3e1.original.svg",
    "VoteShift_16_SEN_to_18_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/5112a67d-e9cd-4937-b549-40bc70a8a178.original.svg",
    "VoteShift_16_SEN_to_20_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/35a0e60b-02cc-426a-91db-220463aaaa88.original.svg",
    "VoteShift_16_SEN_to_20_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/9ef42854-9b47-481b-9b43-d6fc7eb140bb.original.svg",
    "VoteShift_18_SEN_to_16_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/6c3bfdd3-c6cf-4b78-8dd0-acef40110685.original.svg",
    "VoteShift_18_SEN_to_16_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/7bcba89c-f872-42dd-b58b-8103fdec4a3c.original.svg",
    "VoteShift_18_SEN_to_16_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/74b41442-7543-4def-8f2a-caf44c5aeada.original.svg",
    "VoteShift_18_SEN_to_20_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/aa880d30-6e76-486f-aedd-3673ab0bc009.original.svg",
    "VoteShift_18_SEN_to_20_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/64cf0ddd-5bf8-48e7-b082-03e2688927eb.original.svg",
    "VoteShift_20_PRES_to_16_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/6603187b-a52f-4771-bed1-1028f63c4547.original.svg",
    "VoteShift_20_PRES_to_16_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/b803cce3-8765-40ea-a62b-87853bdfa890.original.svg",
    "VoteShift_20_PRES_to_16_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/2bede159-290c-4881-979e-b3474a9d1c88.original.svg",
    "VoteShift_20_PRES_to_18_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/a54f1dc8-fa1f-40fa-9234-046cf74e10d5.original.svg",
    "VoteShift_20_PRES_to_20_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/9403afd5-ad3e-428d-9039-d3284f49ce3d.original.svg",
    "VoteShift_20_GOV_to_16_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/36664381-0164-439b-bab8-72156c896a93.original.svg",
    "VoteShift_20_GOV_to_16_GOV.svg" : "https://s3.amazonaws.com/snwceomedia/ids/dd726000-3d17-4c74-a886-c2aaf8173fe8.original.svg",
    "VoteShift_20_GOV_to_16_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/bdae8fd3-233a-437f-8964-f4b82875c374.original.svg",
    "VoteShift_20_GOV_to_18_SEN.svg" : "https://s3.amazonaws.com/snwceomedia/ids/64109562-dbd1-439c-a631-1ae0fc4cbdf8.original.svg",
    "VoteShift_20_GOV_to_20_PRES.svg" : "https://s3.amazonaws.com/snwceomedia/ids/580ffc3d-0cb2-4940-add9-fae6aa3cfa19.original.svg",
}


const result_percs = {
  "16_GOV" : {"Dem" : 45.42023822, "Rep" : 51.36891078, "Other" : 3.210851005},
  "16_SEN" : {"Dem" : 42.39688063, "Rep" : 52.09234761, "Other" :	5.510771766},
  "16_PRES": {"Dem" : 37.42599242, "Rep" : 56.41094747, "Other" :	6.16306011},
  "18_SEN" : {"Dem" : 45.07997203, "Rep" : 51.0199274,  "Other" :	3.90010057},
  "20_GOV" : {"Dem" : 32.05267518, "Rep" : 56.50811404, "Other" :	11.43921079},
  "20_PRES": {"Dem" : 40.98954361, "Rep" : 57.06733446, "Other" :	1.943121927}
}



const pairs = {
  "16_GOV" : new Set(["16_PRES", "16_SEN", "18_SEN", "20_GOV", "20_PRES"]),
  "16_PRES": new Set(["16_GOV", "16_SEN", "18_SEN", "20_GOV", "20_PRES"]),
  "16_SEN" : new Set(["16_GOV", "16_PRES", "18_SEN", "20_GOV", "20_PRES"]),
  "18_SEN" : new Set(["16_GOV", "16_PRES", "16_SEN", "20_GOV", "20_PRES"]),
  "20_GOV" : new Set(["16_GOV", "16_PRES", "16_SEN", "18_SEN", "20_PRES"]),
  "20_PRES" : new Set(["16_GOV", "16_PRES", "16_SEN", "18_SEN", "20_GOV"]),
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
  map_img.setAttribute("src", path_to_ceo[build_path(l, r)])
}

function updateView(x) {
  map_img.setAttribute("src", path_to_ceo[view_path_start + x + "_VM.svg"])
}


left_select.addEventListener('change', (e) => {
  left_map = e.target.value
  mc.classList.remove("hide")
  right_map = updateSelectors(left_map, right_map)
  updateMaps(left_map, right_map);

  update_percs(true);
})

right_select.addEventListener('change', (e) => {
  right_map = e.target.value
  mc.classList.remove("hide")
  right_map = updateSelectors(left_map, right_map)
  updateMaps(left_map, right_map);

  update_percs(true);
})

view_select.addEventListener('change', (e) => {
  mc.classList.remove("hide")
  view_map = e.target.value;
  updateView(e.target.value)

  update_percs(false);
})

map_img.addEventListener('load', () => {
  mc.classList.add("hide")
})


function update_percs(comp_huh) {
  if(comp_huh){
    perc_res1 = result_percs[right_map];
    perc_res2 = result_percs[left_map];

    dem_fp = (perc_res1["Dem"] - perc_res2["Dem"]).toFixed(0)
    rep_fp = (perc_res1["Rep"] - perc_res2["Rep"]).toFixed(0)
    oth_fp = (perc_res1["Other"] - perc_res2["Other"]).toFixed(0)

    dem_perc.setAttribute("value", dem_fp < 0 ? dem_fp : "+" + dem_fp);
    rep_perc.setAttribute("value", rep_fp < 0 ? rep_fp : "+" + rep_fp)
    oth_perc.setAttribute("value", oth_fp < 0 ? oth_fp : "+" + oth_fp)
  } else {
    perc_res = result_percs[view_map];
    dem_perc.setAttribute("value", perc_res["Dem"].toFixed(0));
    rep_perc.setAttribute("value", perc_res["Rep"].toFixed(0))
    oth_perc.setAttribute("value", perc_res["Other"].toFixed(0))
  } 
}

var update = (e) => {
  mc.classList.remove("hide")
  if (e.target.value == 'comp') {
    document.getElementById("view-div").style.display = "none";
    document.getElementById("comp-div").style.display = "";
    // Init
    left_select.value = left_map
    right_map = updateSelectors(left_map, right_map)
    updateMaps(left_map, right_map)
    update_percs(true);
  } else {
    document.getElementById("comp-div").style.display = "none";
    document.getElementById("view-div").style.display = "";
    view_select.value = view_map;
    updateView(view_map);
    update_percs(false);
  }
}
// Choosing types
type_pick.addEventListener('change', update)
type_pick.value = "view"
left_select.value = left_map
right_select.value = right_map
update({target: {value: "view"}})


