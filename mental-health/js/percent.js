$(function () {
    $('#percent').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: ' '
        },
        
        xAxis: {
            categories: ['2012', '2013', '2014', '2015'],
            title: {
                text: null
            }
        },
        yAxis: {
             opposite: true,
            min: 0,
            max: 100,
            title: {
                text: 'Percent',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },

        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            },
            
            series: {
                
            groupPadding: 0.09
            },
        
            
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            x: 20,

            verticalAlign: 'top',
            borderWidth: 0
        },
        
                         

        credits: {
            enabled: false
        },

        series: [{
            name: 'Clients with anxiety',
            color: '#C1767C',
            maxPointWidth: 100,
            data: [43, 45, 47, 50]
        }, {
            name: 'Clients with depression',
            maxPointWidth: 100,
            color: '#628ca8',
            data: [51, 52, 54, 55]
        }]
    });
});