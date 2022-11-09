String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const progressBarWidth = $('.votePerc-bar').width();
Chart.defaults.font.size = 14;
Chart.defaults.font.family = "'Lato'";
Chart.defaults.font.weight = '400';
const parties = ['R', 'D', 'I']
let partyColor = {}
var getChartWidth = function (context) {
    const chart = context.chart;
    const meta = chart.getDatasetMeta(context.datasetIndex);
    const model = meta.data[context.dataIndex];
    const { width } = model.getProps(['width'], true);
    return width
}

var drawChart = function (chartData, district, raceFinished, type) {
    if (raceFinished == 'TRUE') partyColor = { 'R': 'rgba(193, 34, 34,.5)', 'D': 'rgba(25, 74, 200,.5)', 'I': 'rgba(218, 165, 32,.5)' }
    else partyColor = { 'R': 'rgba(193, 34, 34,1)', 'D': 'rgba(25, 74, 200,1)', 'I': 'rgba(218, 165, 32,1)' }
    if (type == 'school') {
        if (raceFinished == 'TRUE') partyColor = { 'R': 'rgba(248, 169, 32,.5)', 'D': 'rgba(248, 169, 32,.5)', 'I': 'rgba(248, 169, 32,.5)' }
        else partyColor = { 'R': 'rgba(248, 169, 32,1)', 'D': 'rgba(248, 169, 32,1)', 'I': 'rgba(248, 169, 32,1)' }
    }
    if (district == 'referendum') partyColor = { 'R': 'rgba(248, 169, 32,1)', 'D': 'rgba(248, 169, 32,1)', 'I': 'rgba(248, 169, 32,1)' }
    i = 0
    chartData.map(obj => {
        obj.party = parties[i]
        i++;
    })
    // sort bars based on vote count
    chartData.sort((a, b) => parseInt(a.votes) < parseInt(b.votes) ? 1 : -1);
    let candidates = [];
    let votes = [];
    let colors = [];
    let mostVotes = 0;
    let winningCandidate = chartData[0];
    let winningColor = '';
    chartData.map((row) => {
        if (row.candidate !== '') {
            candidates.push(row.candidate);
            votes.push(row.votes);
            if (row == winningCandidate) {
                winningColor = partyColor[row.party].replaceAt(partyColor[row.party].length - 2, '99')
                colors.push(winningColor);
            } else {
                colors.push(partyColor[row.party]);

            }
        }
    });
    if (candidates.length == 1) aspectRatio = 5
    else if (candidates.length == 2) aspectRatio = 4
    else aspectRatio = 3
    if (window.innerWidth < 576) aspectRatio /= 1.5
    if (district == 'Bloomington_Township_Board_Member') colors = ['rgb(25, 74, 200)', 'rgb(25, 74, 200)', 'rgb(25, 74, 200)']
    const ctx = document.querySelector('#chart-' + district).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: candidates,
            datasets: [{
                data: votes,
                backgroundColor: colors,
            }],
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: aspectRatio,
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    labels: {
                        index: {
                            color: function (context) {
                                const width = getChartWidth(context);
                                if (width < 100) return 'black';
                                else return 'white';
                            },
                            align: 'left',
                            offset: function (context) {
                                const width = getChartWidth(context);
                                if (width < 100 && width >= 10) return -90;
                                else if (width < 10) return -80;
                                else return 5;
                            },
                            anchor: 'end',
                            font: function (context) {
                                const width = context.chart.width
                                let fontObj = {
                                    family: 'Lato',
                                    weight: '500',
                                    size: 14
                                }
                                if (width < 500) fontObj.size = 12
                                return fontObj;
                            },
                            formatter: function (value, context) {
                                var label = Math.floor(parseInt(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' votes'
                                if (value == winningCandidate.votes && raceFinished == 'TRUE' && context.chart.width > 400) label = 'Winner: ' + label
                                return label
                            }
                        },
                        name: {
                            color: winningColor,
                            align: 'right',
                            offset: 1,
                            anchor: 'end',
                            font: function (context) {
                                const width = getChartWidth(context);
                                let fontObj = {
                                    family: 'FontAwesome',
                                    weight: '700',
                                    size: 30
                                }
                                if (width < 100) fontObj.size = 16
                                if (width >= 100 && width < 370) fontObj.size = 24;
                                return fontObj;
                            },
                            formatter: function (value, context) {
                                if (raceFinished == 'TRUE' && winningCandidate.votes == value) {
                                    return '\uf00c'
                                } else {
                                    return ''
                                }
                            }
                        },
                    }
                },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return Math.floor(parseInt(context.parsed.x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' votes'
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
var chartData = function (data, district, raceFinished, type) {
    var chartData = [];
    for (var i = 1; i < data.length - 1; i++) {
        var row = data[i];
        var candidate = row['cellsArray'][0];
        var votes = row['cellsArray'][1];
        if (candidate !== 'Total Est. Votes') {
            // check if first letter of candidate is asterisk 
            if (candidate.charAt(0) == '*') {
                $('.' + district + '>.incumbentOr').append(`<p class="votePercMsg incumbent">*Incumbent</p>
                `)
            }
            chartData.push({
                candidate: candidate,
                votes: votes,
            });
        }
    }
    // raced finished?
    drawChart(chartData, district, raceFinished, type);
}