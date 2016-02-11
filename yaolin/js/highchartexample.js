$(function () {
            $('#chart1').highcharts({
                title: {
                    text: 'Full-Time Equivalent Counselors at CAPS ',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: CAPS<br> By James Benedict',
                    x: -20
                },
                xAxis: {
                    categories: [  '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014']
                },
                yAxis: {
                    title: {
                        text: 'Full-Time Equivalent Counselors'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                     pointFormat: '{point.y} {series.name}',
                   
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'vertical',
                    x: 0,
                    y: 15,
                    borderWidth: 0
                },
                series: [{
                    name: 'Full-Time Equivalent Counselors',
                    data: [14, 14, 14, 16, 16.5, 18.5, 18.5, 20, 21.5, 22],
                    color: '#436983'
                }]
            });
          });
