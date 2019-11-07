var chart_labels = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
var temp_dataset = ['1', '8', '10', '10', '9', '7'];
var rain_dataset = ['0', '0', '6', '32', '7', '2'];
var ctx = document.getElementById("forecast").getContext('2d');
var config = {
    type: 'bar',
    data: {
        labels: chart_labels,
        datasets: [{
            type: 'line',
            label: "Temperature (Celsius)",
            yAxisID: "y-axis-0",
            fill: false,
            data: temp_dataset,
        }, {
            type: 'bar',
            label: "Precipitation (%)",
            yAxisID: "y-axis-1",
            data: rain_dataset,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                position: "left",
                "id": "y-axis-0",
            }, {
                position: "right",
                "id": "y-axis-1",
            }]
        }
    }
};
var forecast_chart = new Chart(ctx, config);
$("#0").click(function() {
    var data = forecast_chart.config.data;
    data.datasets[0].data = temp_dataset;
    data.datasets[1].data = rain_dataset;
    data.labels = chart_labels;
    forecast_chart.update();
});
$("#1").click(function() {
    var chart_labels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    var temp_dataset = ['5', '3', '4', '8', '10', '11', '10', '9'];
    var rain_dataset = ['0', '0', '1', '4', '19', '19', '7', '2'];
    var data = forecast_chart.config.data;
    data.datasets[0].data = temp_dataset;
    data.datasets[1].data = rain_dataset;
    data.labels = chart_labels;
    forecast_chart.update();
});