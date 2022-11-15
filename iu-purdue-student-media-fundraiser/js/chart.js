'use strict';

const ctx = document.getElementById('myChart').getContext('2d');

// Chart.defaults.font.size = 20;
Chart.defaults.font.family = "Inter";
Chart.defaults.font.weight = '600';
Chart.defaults.color = 'white';

const chart_data = [3583, 1816]
var labels = [];
for (var i = 0; i < 2; ++i) {
    labels.push('$' + chart_data[i]);
}

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['IDS', 'Exponent'],
        datasets: [{
            label: 'Money raised',
            data: chart_data,
            backgroundColor: [
                '#99000090',
                '#b1946c9d',
            ],
            borderColor: [
                '#990000',
                '#B1946C',
            ],
            borderWidth: 1
        }]
    },
    plugins: [ChartDataLabels],

    options: {
        barPercentage: .7,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor: 'end',
                align: function (value) {
                    return value.dataset.data[value.dataIndex] < 4001 ? 'end' : 'start'
                },
                font: {
                    family: 'Inter',
                    weight: '500',
                    size: 18,
                },
                formatter: function (value, context) {
                    return "$" + value.toString();
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                // display: false,
                suggestedMax: 5000,
                ticks: {
                    padding: 0,
                    marginBottom: 10,
                    font: {
                        size: 16,
                        weight: 400
                    },
                    callback: function (val, index) {
                        // Hide every 2nd tick label
                        // console.log(parseInt(this.getLabelForValue(val)))
                        return this.getLabelForValue(val) == '5,000' ? 'GOAL: $5,000' : '';
                    },
                    mirror: true,

                },

                grid: {
                    display: true,
                    borderDash: [3],
                    borderDashOffset: 3,
                    drawTicks: false,
                    color: 'rgba(255,255,255,.25)',
                }
            },
            x: {
                offset: 100,
                // display: false
            }
        },
    }
});
