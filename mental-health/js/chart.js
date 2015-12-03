$(function () {
  Highcharts.setOptions({
                lang: {
                  thousandsSep: ','
                }
              });
    $('#diagnoses').highcharts({
           credits: {
            enabled: false
        },

        title: {
            text: ' ',
            x: -20 //center
        },
        subtitle: {
            text: ' ',
            x: -20
        },
        xAxis: {
            categories: ['2012', '2013', '2014', '2015']
        },
        yAxis: {
            
            title: {
                text: 'Number of Diagnoses'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' Students'
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: 'Anixety by Therapist',
            color: '#991C26',
            data: [1439, 1706, 1824, 1867],
                marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Anixety by Physiatrist',
            color: '#C1767C',
            data: [398, 408, 454, 388]
        }, {
            name: 'Depression by Therapist',
            color: '#1F5B83',
            data: [1570, 1744, 1877, 1872],
              marker: {
                    symbol: 'square'
                }
        }, {
            name: 'Depression by Physiatrist',
            color: '#8fadc1',
            data: [653, 708, 741, 600],
              marker: {
                    symbol: 'square'
                }
        }]
    });
});