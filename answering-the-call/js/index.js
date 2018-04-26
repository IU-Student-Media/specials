new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016],
    datasets: [{
        data: [3,3,4,0,3,7,13,9,16,56,65,54,63,110,152,170,239,296],
        label: "Heroin",
        borderColor: "#3e95cd",
        fill: false
      }, {
        data: [25,24,49,43,92,98,118,135,195,214,259,229,250,206,168,250,274,488],
        label: "Opioid pain relievers",
        borderColor: "#8e5ea2",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Opioid overdose deaths in Indiana from 1999-2016'
    }
  }
});
