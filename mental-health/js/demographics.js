$(function () {
  Highcharts.setOptions({
                lang: {
                  thousandsSep: ','
                }
              });
    $('#demographics').highcharts({
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
                text: ' '
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
            name: 'Female',
            color: '#C1767C',
            data: [2601, 2806, 2899, 2746],
              // marker: {
              //       symbol: 'square'
              //   }
        },{
            name: 'Male',
            color: '#628ca8',
            data: [1692, 1827, 1914, 1750],
              // marker: {
              //       symbol: 'square'
              //   }
        }, {
            name: 'Non-Binary',
            color: '#4a7a52',
            data: [3, 3, 4, 2],
              // marker: {
              //       symbol: 'square'
              //   }
        }]
    });
});