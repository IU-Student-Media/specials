// google sheets urls containing voting data
const elections = {
    'senate': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1651224490',
    'district_9': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=360782252',
    'district_60': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1320574252',
    'district_62': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=555854463',
    'district_61': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=268456027',
    'district_46': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=2147039576',
    'referendum': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=2055690'
}
const localElections = {
    'Secretary_of_State': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=994729816',
    'State_Auditor': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1826884931',
    'Treasurer_of_State': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1236214383',
    'Bloomington_Township_Trustee': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1392449120',
    'Bloomington_Township_Board_Member': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1761437741',
    'Monroe_County_Council_District_1': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1693859215',
    'Monroe_County_Council_District_2': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1400295358',
    'Monroe_County_Council_District_3': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1229572867',
    'Monroe_County_Council_District_4': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=146555492',
    'County_Commissioner_District_1': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1347157282',
    'Monroe_County_Sheriff': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=177353892',
    'Monroe_County_Recorder': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1133603634',
    'Monroe_County_Assessor': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1774807989',
    'Monroe_County_Circuit_Court_Clerk': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=87904650',
    '10th_Judicial_Circuit_Number_1': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=530748390',
    '10th_Judicial_Circuit_Number_4': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=432985094',
    '10th_Judicial_Circuit_Number_7': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1681583811',
    'Prosecuting_Attorney': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=880456454'
}
const schoolBoard = {
    'MCCSC_District_1': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=252542869',
    'MCCSC_District_3': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1738826183',
    'MCCSC_District_7': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1388717922',
    'R-BB_Richland_District': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1781886960',
    'R-BB_Bean_Blossom_District': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=544815013',
}

const indexMapping = [1, 2, 3, 4, 5, '6a', '6b', '6c', '6d', 7, 8, 9, 10, 11, '12a', '12b', '12c', 13]
const schoolBoardMapping = ['mccsc-d1', 'mccsc-d3', 'mccsc-d7', 'rbb-richland', 'rbb-bb']

const localElectionsArray = Object.entries(localElections).map((e) => ({ [e[0]]: e[1] }))
const schoolBoardArray = Object.entries(schoolBoard).map((e) => ({ [e[0]]: e[1] }))
console.log(schoolBoardArray)
// inserts data into html
var insertData = function (response, district, type, index) {
    // console.log(response.rows, district)
    var percVote = response.rows[1]['cellsArray'][2];
    var url = ""
    if (type == 'local') {
        url = 'https://specials.idsnews.com/local-state-election-monroe-county-indiana-2022/#' + index
    } else if (type == 'school') {
        url = 'https://specials.idsnews.com/school-board-election-mccsc-rbb-indiana-2022/#' + index
    }
    if (type == "local" || type == "school") {
        var parent = $('.' + type + '-elections')
        if ((response.rows.length == 5 && response.rows[4]['cellsArray'][0] == 'Uncontested') || district == 'Monroe_County_Council_District_3') {
            // response.rows[2]['cellsArray'][0] = '**' + response.rows[2]['cellsArray'][0]
            let title_district = district
            parent.append(
                `<div class="section ${district}">
            <h4>${title_district.replace(/_/g, ' ')}</h4>
            <button class="info-btn">
                <a href="${url}"
                    target="_blank">Meet the Candidate</a></button>
            <hr>
            <div class="votePercMsg">
                <p>Estimated</p>
                <div style="display: inline-block; margin: auto .3em;
                ">
                    <span class="votePerc-${district}"></span>
                    <div class="votePerc-bar"></div>
                    <div class="votePerc-progress-${district}"></div>
                </div>
                <p>votes counted</p>
                <canvas id="chart-${district}" height="35" width="100"></canvas>
                </div>
                <div class="incumbentOr"></div>
                <p class="votePercMsg incumbent">Uncontested Race</p>
            </div>`
            )
        } else {
            parent.append(
                `<div class="section ${district}">
            <h4>${district.replace(/_/g, ' ')}</h4>
            <button class="info-btn">
                <a href="${url}"
                    target="_blank">Meet the Candidates</a></button>
            <hr>
            <div class="votePercMsg">
                <p>Estimated</p>
                <div style="display: inline-block;   margin: auto .3em;
                ">
                    <span class="votePerc-${district}"></span>
                    <div class="votePerc-bar"></div>
                    <div class="votePerc-progress-${district}"></div>
                </div>
                <p>votes counted</p>
            </div>
            <canvas id="chart-${district}" height="35" width="100"></canvas>
            <div class="incumbentOr"></div>
            </div>`
            )
        }
    } else {
        if (district === 'senate') {
            console.log(response.rows[5].cellsArray[1])
            $('.last-updated').text(response.rows[5].cellsArray[1]);
            response.rows = response.rows.slice(0, 5);
        }
    }
    console.log(district, response.rows)
    $('.votePerc-' + district).text((percVote * 100).toString().slice(0, 4) + '%');
    $('.votePerc-progress-' + district).css('width', percVote * progressBarWidth);
    chartData(response.rows, district, response.rows[1]['cellsArray'][3], type);
}

// get data from google sheets using Sheetrock then call insertData()
function getData(district, type, index = 0) {
    var url;
    if (type == "state") {
        url = elections[district];
    }
    else if (type == 'local') url = localElections[district];
    else url = schoolBoard[district];
    return $('#statistics').sheetrock({
        url: url,
        callback: (error, options, response) => {
            if (error) {
                console.error(error);
            } else {
                insertData(response, district, type, index);
            }
        }
    });
}

// insert get data for each district in the elections object
Object.keys(elections).forEach(district => {
    getData(district, "state");
})
var index = 0

// run getData() for each district in the localElections object in successive order
var getLocalElections = function (index) {
    if (index < Object.keys(localElections).length) {
        getData(Object.keys(localElectionsArray[index])[0], "local", indexMapping[index])
        setTimeout(function () {
            getLocalElections(index + 1)
        }, 100)
    }
}
var getSchoolBoard = function (index) {
    if (index < Object.keys(schoolBoard).length) {
        getData(Object.keys(schoolBoardArray[index])[0], "school", schoolBoardMapping[index])
        setTimeout(function () {
            getSchoolBoard(index + 1)
        }, 100)
    }
}
getSchoolBoard(0)
getLocalElections(0)
