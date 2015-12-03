$(function () {
  Highcharts.setOptions({
                lang: {
                  thousandsSep: ','
                }
              });
    $('#ddiagnoses').highcharts({
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
        series: [  {
            name: 'By Counselor',
            color: '#1F5B83',
            data: [1570, 1744, 1877, 1872],
              // marker: {
              //       symbol: 'square'
              //   }
        }, {
            name: 'By Physiatrist',
            color: '#8fadc1',
            data: [653, 708, 741, 600],
              // marker: {
              //       symbol: 'square'
              //   }
        }]
    });
});