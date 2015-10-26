$(function () {
    $('#chart1').highcharts({
             
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Students per counselor at Big 10 Universities'
                },
                subtitle: {
                    text: 'Sources: The counseling services and offices of enrollment at each university<br>By: James Benedict '
                },
                legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'top',
                        x: 0,
                        y: 55,
                        borderWidth: 0
                    },
                xAxis: {
                    categories: ['Minnesota', 'Michigan State', 'Iowa', 'Maryland', 'Ohio State', 'Indiana', 'Purdue', 'Nebraska', 'Penn State', 'Michigan', 'Illinois', 'Wisconsin', 'Rutgers', 'Northwestern'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    plotLines: [{
                        value: 1500,
                        color: '#c1ba9d', 
                        width: 5,
                        zIndex: 4,
                        }],                       
                   
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                     valueSuffix: ' Students per counselor',
                  

                },
                plotOptions: {
                    series: {
                        animation: true,
                         borderWidth: 2,
                        pointPadding: 10,


                        pointWidth: 20
                    },
                    bar: {

                          // dataLabels: {
                          //       style: {
                          //           fontWeight: 'bold',
                          //           color: 'grey'
                                

                          //       },
                                
                          //       enabled: true,
                          //        format: '{y} : 1',
                          //        shared: true
                          //   }                       
                            }
                        },
           
            
              series: [{
                name: 'Students to counselor ratio',
                data: [3653, 3454, 2501, 2477, 2405, 2110, 2107, 1985, 1920, 1897, 1744, 1728, 1433, 902],
                    color: '#436983'
                }, {
                name: 'Minimum ratio according to <br> the International Associations <br> of Counseling Services',
                    data: null,
                    color: '#c1ba9d'
                }]        
        });
        });
