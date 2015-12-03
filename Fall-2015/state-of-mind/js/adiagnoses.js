$(function () {
  Highcharts.setOptions({
                lang: {
                  thousandsSep: ','
                }
              });
    $('#adiagnoses').highcharts({
           credits: {
            enabled: false
        },
        chart: {
            type: 'area'
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
          max: 3000,
            stackLabels: {
                      style: {
                          color: 'grey'
                      },
                      enabled: true,
                      y: -8,
                      // formatter: function () {
                      //     return this.total + "  ";
                      // },
                      verticalAlign: 'top',
                      pointFormat: "{point.y:,.0f}"
                  },
            
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
        plotOptions: {
                  area: {
                      stacking: 'normal',
                      lineColor: '#666666',
                      lineWidth: 1,
                      marker: {
                          lineWidth: 1,
                          lineColor: '#666666'
                      }
                  }
              },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: 'By Counselor',
            color: '#991C26',
            data: [1439, 1706, 1824, 1867],
            //     marker: {
            //     symbol: 'circle'
            // }
        }, {
            name: 'By Physiatrist',
            color: '#C1767C',
            data: [398, 408, 454, 388]
        }]
    });
});