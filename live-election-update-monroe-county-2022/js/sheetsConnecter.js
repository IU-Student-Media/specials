// google sheets urls containing voting data
const elections = {
    'senate': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=886228773',
    'district_9': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=360782252',
    'district_60': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=1320574252',
    'district_62': 'https://docs.google.com/spreadsheets/d/1S1-muJyvr2tS306noLMLfq4mBhkP1vPIkb0HTwwS-co/edit#gid=555854463'
}
const progressBarWidth = $('.votePerc-bar').width();
const path = window.location.pathname;
const page = path.split("/").pop();

Chart.defaults.font.size = 11;
Chart.defaults.font.family = "'Lato'";
Chart.defaults.font.weight = '400';
const parties = ['R', 'D', 'I']
const partyColor = { 'R': 'rgba(255, 10, 10, 1)', 'D': 'rgba(54, 100, 235, 1)', 'I': 'rgba(255, 205, 86, 1)' }
var drawChart = function (chartData, district) {
    console.log(chartData)
    i = 0
    chartData.map(obj => {
        obj.party = parties[i]
        i++;
    })

    // sort bars based on vote count
    chartData.sort((a, b) => parseInt(a.votes) < parseInt(b.votes) ? 1 : -1);

    let candidates = [];
    let votes = [];
    let colors = []
    chartData.map((row) => {
        if (row.candidate === "Thomas McDermott, Jr.") {
            candidates.push([row.candidate.split(" ")[0], row.candidate.split(" ")[1] + row.candidate.split(" ")[2]]);
        } else {
            candidates.push(row.candidate);
        }
        votes.push(0);
        colors.push(partyColor[row.party]);
    });
    console.log(district)
    const ctx = document.querySelector('#chart-' + district).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: candidates,
            datasets: [{
                data: votes,
                backgroundColor: colors,
                // borderColor: [
                //     'rgba(0, 10, 10, 1)',
                //     'rgba(0, 50, 135, 1)',
                //     'rgba(255, 205, 86, 1)',
                // ],
                // borderWidth: 1,
                // barThickness: 55
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    color: 'black',
                    align: 'left',
                    offset: function (context) {
                        const chart = context.chart;
                        const meta = chart.getDatasetMeta(context.datasetIndex);
                        const model = meta.data[context.dataIndex];
                        const { width } = model.getProps(['width'], true);
                        if (width < 100) {
                            return -85;
                        }
                        else {
                            return 5;
                        }
                    },
                    anchor: 'end',
                    font: {
                        family: 'Lato',
                        weight: '500',
                    },
                    formatter: function (value, context) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " votes";
                    }
                },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' votes'
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        // display: false
                    },
                    title: {
                        text: 'Votes',
                        display: true,
                        font: {
                            weight: '500',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            weight: '500',
                            size: 12
                        }
                    }

                },
                y: {
                    grid: {
                        display: false
                    }
                },
            },

        },

    });
}
var chartData = function (data, district) {
    var chartData = [];
    for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];
        var candidate = row['cellsArray'][0];
        var votes = row['cellsArray'][1];
        chartData.push({
            candidate: candidate,
            votes: votes,
        });
    }
    console.log(data)
    drawChart(chartData, district);
}
// inserts data into html
var insertData = function (response, district) {
    var percVote = response.rows[1]['cellsArray'][2];
    if (district === 'senate') {
        $('.last-updated').text(response.rows[5]['cellsArray'][1]);
        response.rows = response.rows.slice(0, 5);
    }
    $('.votePerc-' + district).text('0%');
    // $('.votePerc-progress-' + district).css('width', percVote * progressBarWidth);
    chartData(response.rows, district);
}

// get data from google sheets using Sheetrock then call insertData()
function getData(district) {
    var url = elections[district];
    $('#statistics').sheetrock({
        url: url,
        callback: (error, options, response) => {
            if (error) {
                console.error(error);
            } else {
                insertData(response, district);
            }
        }
    });
}

// inserts % voted counted for each district in the elections object
Object.keys(elections).forEach(district => {
    getData(district);
})
