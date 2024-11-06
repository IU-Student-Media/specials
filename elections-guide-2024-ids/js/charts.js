// Idk why I decided to use a legit map here.
const nameToDisplay = new Map();

nameToDisplay.set("McCray, Valerie Valerie", "Valerie McCray")
nameToDisplay.set("Banks, James James", "Jim Banks")
nameToDisplay.set("Harris, Kamala Kamala", "Kamala Harris")
nameToDisplay.set("Trump, Donald Donald", "Donald Trump")
nameToDisplay.set("Wells, Destiny Destiny", "Destiny Wells")
nameToDisplay.set("Rokita, Todd Todd", "Todd Rokita*")
nameToDisplay.set("McCormick, Jennifer Jennifer", "Jennifer McCormick")
nameToDisplay.set("Rainwater, Donald Donald", "Donald Rainwater")
nameToDisplay.set("Braun, Mike Mike", "Mike Braun")
nameToDisplay.set("Peck, Timothy Timothy", "Tim Peck")
nameToDisplay.set("Houchin, Erin Erin", "Erin Houchin*")
nameToDisplay.set("MADEIRA, JODY JODY", "Jody Madeira")
nameToDisplay.set("VANDEVENTER, JOSEPH JOSEPH", "Joe VanDeventer")
nameToDisplay.set("Horrocks, Thomas Thomas", "Thomas Horrocks")
nameToDisplay.set("Hall, David David", "Dave Hall*")
nameToDisplay.set("Cummings, Kurtis Kurtis", "Kurtis Cummings")
nameToDisplay.set("Heaton, Robert Robert", "Bob Heaton*")
nameToDisplay.set("Todd Rokita", "Todd Rokita*")
nameToDisplay.set("Erin Houchin", "Erin Houchin*")

const expected_totals = {
  "president": 3033118, // 2020 Election
  "governor": 3020388, // 2020 Election
  "senate": 3030443, // Extrapolated from 2016 senate : pres
  "attorney_general": 2951651, //2020
  "us_district_9": 359038, // 2020
  "in_district_62": 15000, // Sum of primaries + wiggle room
  "in_district_46": 9000,  // Sum of primaries + wiggle room
  "monroe_commissioner_3": 45000 //Taken from 2020, and scaled
}

// Storing the charts so that we can do the requisite destroy calls
let all_charts = {
  "president": null,
  "governor": null,
  "senate": null,
  "attorney_general": null,
  "us_district_9": null,
  "in_district_62": null,
  "in_district_46": null, 
  "monroe_commissioner_3": null
}

// const req_url = 'http://silo.soic.indiana.edu:56988/state-races'
const req_url = 'https://electionmiddle.onrender.com/state-races'
// const req_url = 'http://localhost:56988/state-races'

var reportingRequest = new Request(req_url, {method: 'GET'});

function update() {
  return fetch(reportingRequest)
    .then((res) => {
      if (!res.ok) {
        throw new Error
          (`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      // console.log(data)
      Object.keys(data).forEach(k => {
        let v = data[k]
        let num_votes = 0
        // Modifications so that we match the 2022 code.
        v = v.map(x => {
          let n = x["CandidateName"]
          x["votes"] = x["TOTAL"]
          num_votes += x["votes"]
          if (nameToDisplay.has(n)) {
            x["candidate"] = nameToDisplay.get(n)
          } else {
            x["candidate"] = n
          }
          // Comment this to show others
          // if (n == "Other") return undefined;
          x["party"] = x["PARTY"]
          return x;
        })
        let percVote = num_votes / expected_totals[k]
        $('.votePerc-' + k).text((percVote * 100).toString().slice(0, 4) + '%');
        $('.votePerc-progress-' + k).css('width', percVote * progressBarWidth);

        v = v.filter((x) => x)
        drawChart(v, k, false,)
      })
    })
    .catch((error) =>
      console.error("Unable to fetch data:", error));
}

/* I stole the code from 2022! */
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

var called = new Set(["president", "governor", "senate", "attorney_general", "us_district_9", "monroe_commissioner_3"])

var drawChart = function (chartData, district, raceFinished, type) {

  raceFinished = called.has(district) ? 'TRUE' : 'FALSE'
  if (called.has(district)) partyColor = { 'R': 'rgba(193, 34, 34,.5)', 'D': 'rgba(25, 74, 200,.5)', 'I': 'rgba(218, 165, 32,.5)', 'O': 'rgba(98, 165, 32,.5)', 'L': 'rgba(218, 165, 32,.5)' }
  else partyColor = { 'R': 'rgba(193, 34, 34,1)', 'D': 'rgba(25, 74, 200,1)', 'I': 'rgba(218, 165, 32,1)', 'O': 'rgba(98, 165, 32,1)', 'L': 'rgba(218, 165, 32,1)' }

  // Sort bars based on vote count
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
  const ctx = document.querySelector('#chart-' + district).getContext('2d');

  if (all_charts[district]) {
    all_charts[district].destroy()
  }

  all_charts[district] = new Chart(ctx, {
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
                if ((value == winningCandidate.votes && raceFinished == 'TRUE' && context.chart.width > 400) || district == 'Bloomington_Township_Board_Member') label = 'Winner: ' + label
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
                if ((raceFinished == 'TRUE' && winningCandidate.votes == value) || district == 'Bloomington_Township_Board_Member') {
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
          grace: '20%',
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

// Initialize!
update()
setInterval(update, 60 * 1000)
