$(function () {
    $('#chart1').highcharts({
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
            categories: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014' ]
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
            valueSuffix: ' Deaths'
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: 'Heroin',
            color: '#427e8c',
            marker: {
                symbol: 'circle',
                },
            data: [0, 0, 0, 0, 0, 7, 13, 9, 16, 56, 65, 54, 63, 111, 152, 170 ]
        },{
            name: 'Opioid pain relievers',
            color: '#BF6363',
            marker: {
                symbol: 'circle',
                },
            data: [25, 24, 49, 43, 92, 98, 118, 135, 195, 214, 259, 229, 250, 206, 168, 250]
        }, {
            name: 'Cocaine and other stimulants',
            color: '#8C5042',
            marker: {
                symbol: 'circle',
                },
            data: [27, 14, 17, 27, 36, 60, 46, 64, 58, 58, 54, 61, 45, 51, 64, 85]
        }, {
            name: 'Other and Unspecified',
            color: '#BF8654',
            marker: {
                symbol: 'circle',
                },
            data: [114, 145, 177, 209, 317, 416, 478, 569, 591, 616, 681, 661, 758, 756, 754, 853]
        },  {
            name: 'Benzodiazepines',
            color: '#D9C3A9',
            marker: {
                symbol: 'circle',
                },
            data: [7, 5, 7, 10, 21, 18, 25, 31, 45, 60, 96, 88, 90, 94, 74, 84]
        },  {
            name: 'Total',
            color: '#42708C',
            marker: {
                symbol: 'circle',
                },
            data: [184, 203, 266, 281, 426, 537, 609, 728, 771, 818, 903, 923, 957, 999, 1049, 1152 ]
        }

        ]
    });
});