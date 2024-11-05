var stateResults = function (raceJson) {
    item = {};
    total = 0;
    results = raceJson.Root.StatewideSummary.Race.Candidates.Candidate;
    for (var j = 0; j < results.length; j++) {
        candidate = results[j].CandidateName;
        if (candidate.includes("Harris, Kamala Kamala")) {
            item.dem = results[j].TOTAL;
        } else if (candidate.includes("Trump, Donald Donald")) {
            item.rep = results[j].TOTAL;
        } else {
            previous = item.other ?? 0;
            item.other = previous + results[j].TOTAL;
        }
        total += results[j].TOTAL;
    }
    item.total = total;
    if (total > 0) {
        item.dem = (100 * (item.dem ?? 0) / total).toFixed(1);
        item.rep = (100 * (item.rep ?? 0) / total).toFixed(1);
        item.other = (100 * (item.other ?? 0) / total).toFixed(1);
    }
    return item;
}

var countyResults = function (raceJson) {
    newList = {};
    region = raceJson.Root.OfficeCategory.Regions.Region;
    for (var i = 0; i < region.length; i++) {
        item = {};
        total = 0;
        results = region[i].RegionSummary.Race.Candidates.Candidate;
        for (var j = 0; j < results.length; j++) {
            candidate = results[j].CandidateName;
            if (candidate.includes("Harris, Kamala Kamala")) {
                item.dem = results[j].TOTAL;
            } else if (candidate.includes("Trump, Donald Donald")) {
                item.rep = results[j].TOTAL;
            } else {
                previous = item.other ?? 0;
                if (results[j].TOTAL > previous) {
                    item.other = results[j].TOTAL;
                }
            }
            total += results[j].TOTAL;
        }
        item.total = total;
        if (total > 0) {
            item.dem = (item.dem ?? 0) / total;
            item.rep = (item.rep ?? 0) / total;
            item.other = (item.other ?? 0) / total;
        }
        regionColour = ""
        if (item.dem > item.rep && item.dem > item.other) {
            // Democrats leading
            colourList = hwbToRgb([223, 100 * (1 - item.dem), 0]);
            regionColour = `rgb(${colourList[0]},${colourList[1]},${colourList[2]})`;
        } else if (item.rep > item.dem && item.rep > item.other) {
            // Republicans leading
            colourList = hwbToRgb([0, 100 * (1 - item.rep), 0]);
            regionColour = `rgb(${colourList[0]},${colourList[1]},${colourList[2]})`;
        } else if (item.other > item.dem && item.other > item.rep) {
            // "Others" are leading
            colourList = hwbToRgb([43, 100 * (1 - item.other), 0]);
            regionColour = `rgb(${colourList[0]},${colourList[1]},${colourList[2]})`;
        } else if (item.dem === 0 && item.rep === 0 && item.other === 0) {
            // Everyone has 0   
            colourList = hwbToRgb([0, 100, 20]);
            regionColour = `rgb(${colourList[0]},${colourList[1]},${colourList[2]})`;
        } else {
            // None of the above... make it white.
            colourList = hwbToRgb([0, 100, 0]);
            regionColour = `rgb(${colourList[0]},${colourList[1]},${colourList[2]})`;
        }
        item.colour = regionColour
        county = region[i].MAP_JURISDICTION_NAME;
        newList[county] = item;
    }
    return newList;
}

var getReporting = function (electionsJson) {
    item = {};
    item.totalPrecincts = electionsJson.Root.JurisdictionsReporting.TOTAL_ALLPRECINCTS ?? 0;
    list = electionsJson.Root.List
    foundFederal = false;
    foundPres = false;
    i = 0;
    j = 0;
    while (i < list.length && !foundFederal) {
        if (list[i].Heading === "Federal") {
            foundFederal = true;
            jsonItem = list[i].Items.Item;
            while (j < jsonItem.length && !foundPres) {
                if (jsonItem[j].OFFICECATEGORYID === "1019") {
                    foundPres = true;
                    item.reported = jsonItem[j].ALLREPORTED ?? 0;
                }
                j += 1;
            }
        }
        i += 1;
    }
    item.percent = (100 * (item.reported / item.totalPrecincts)) ?? 0;
    return item;
}


hwbToRgb = function (hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 0x01) !== 0) {
        f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
        default:
        case 6:
        case 0: r = v; g = n; b = wh; break;
        case 1: r = n; g = v; b = wh; break;
        case 2: r = wh; g = v; b = n; break;
        case 3: r = wh; g = n; b = v; break;
        case 4: r = n; g = wh; b = v; break;
        case 5: r = v; g = wh; b = n; break;
    }
    return [r * 255, g * 255, b * 255];
};

// var resultsRequest = new Request('http://silo.soic.indiana.edu:56988/presidential', {method: 'GET'});
var resultsRequest = new Request('https://electionmiddle.onrender.com/presidential', {method: 'GET'});

let autoUpdate;

function doFetch() {
    fetch(resultsRequest)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            stateData = data.pres.results.state;
            countyData = data.pres.results.county;
            reporting = data.pres.reporting;
            idsUpdates = data.updates;

            document.getElementById('reported-percent').setAttribute('value', reporting.percent.toFixed(1));

            // Fill Map
            for (county in countyData) {
                let id = String(county).toUpperCase().replace(" ", "");
                // console.log(`county: ${county} - colour: ${data[county].colour}`);
                document.getElementById(id).style.fill = countyData[county].colour;
            }

            // State-Wide Percentages
            document.getElementById('dem-percent').setAttribute('value', stateData.dem);
            document.getElementById('rep-percent').setAttribute('value', stateData.rep);
            document.getElementById('other-percent').setAttribute('value', stateData.other);

            if (!document.getElementById('live-polling').classList.contains('live')) {
                document.getElementById('live-polling').classList.add('live');
            }

            const element = document.getElementById("feed-container")
            element.innerHTML = ""

            
            idsUpdates.sort((a, b) => new Date(a.time) - new Date(b.time))
            idsUpdates.forEach(a => {
                let d = new Date(a.time + " GMT-0000");
                var liveupdate = document.createElement("live-update");
                liveupdate.setAttribute("time", d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
                liveupdate.setAttribute("author", a.author);
                liveupdate.setAttribute("title", a.title);
                liveupdate.setAttribute("href", a.link);
                element.prepend(liveupdate)
            });

        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}

function updateResults() {
    if (!autoUpdate) { // Don't start if autoUpdate is already running.
        console.log("Resuming auto updates...")
        doFetch();
        autoUpdate = setInterval(() => {
            doFetch()
        }, 60000);
    }
}

function pauseUpdates() {
    clearInterval(autoUpdate);
    autoUpdate = null;
    document.getElementById('live-polling').classList.remove('live');
    console.log("Auto updates suspended.")
}

window.addEventListener("load", (event) => {
    updateResults();
});

document.onvisibilitychange = () => {
    if (document.visibilityState === "hidden") {
        pauseUpdates();
    } else {
        updateResults();
    }
};