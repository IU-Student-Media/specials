$(function () {
    $('#doccount').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'bar'
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
            categories: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']
        },
        yAxis: {
            title: {
                text: ' '
            },
            plotLines: [{
                value: 0,
                width: 0,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' Doctors'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            },
            series:{
                groupPadding: 0.05
            },
        },
        legend: {
            layout: 'horizontal',
            align: 'left',

            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '30 Patients',
            maxPointWidth: 100,
            color: '#BF6363',
            marker: {
                symbol: 'circle'
                },
            data: [3, 5, 9, 14, 15, 23, 25, 6, 14, 13, 18, 21, 20, 74]

        },  {
            name: '100 Patients',
            color: '#42708C',
            marker: {
                symbol: 'circle'
                },
            data: [null, null, null, null, null, 29, 12, 11, 13, 12, 23, 15, 34, 30]
        }

        ]
    });
});