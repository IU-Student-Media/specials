$(function () {
  Highcharts.setOptions({
                lang: {
                  thousandsSep: ','
                }
              });
    $('#total').highcharts({
      chart: {
            type: 'bar'
        },	  
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
          	min: 0,
            title: {
                text: null
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
            name: 'Anixety diagnoses',
          	color: '#C1767C',
            data: [1837, 2114, 2278, 2255],
          		marker: {
                symbol: 'circle'
            }
        }, {
            name: 'Depression diagnoses',
          	color: '#628ca8',
            data: [2223, 2452, 2618, 2472],
              marker: {
                    symbol: 'square'
                }
        }]
    });
});