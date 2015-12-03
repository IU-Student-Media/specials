$(function () {
    $('#meds').highcharts({
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
            color: '#991C26',
            maxPointWidth: 100,
            data: [43, 45, 47, 50]
        }, {
            name: 'Prescribed medication for anxiety',
            maxPointWidth: 100,
            color: '#C1767C',
            data: [82, 77, 61, 58]
        },{
            name: 'Clients with depression',
            maxPointWidth: 100,
            color: '#1F5B83',
            data: [51, 52, 54, 55]
        }, {
            name: 'Prescribed medication for depression',
            maxPointWidth: 100,
            color: '#8fadc1',
            data: [6, 7, 5, 7]
        }]
    });
});