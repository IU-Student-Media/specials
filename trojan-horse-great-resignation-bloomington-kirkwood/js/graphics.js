// console.log('d3 working');
/***************************************
*   D3 LINE CHART                      *
***************************************/

// set up mobile variable to change styles for mobile/desktop
let mobile;
if (window.innerWidth < 768) {
    mobile = true;
}
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        mobile = true;
    } else {
        mobile = false;
    }
});

//Read the data
let quits_data = [];
let convertDate = d3.timeParse('%m/%d/%Y');

async function loadData() {

    quits_data = [
        {
          "month": "1/1/2001",
          "total": 3245000,
          "leisure": 671000,
          "total_%": 2.4,
          "leisure_%": 5.6
        },
        {
          "month": "2/1/2001",
          "total": 3053000,
          "leisure": 557000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "3/1/2001",
          "total": 3054000,
          "leisure": 558000,
          "total_%": 2.3,
          "leisure_%": 4.7
        },
        {
          "month": "4/1/2001",
          "total": 3163000,
          "leisure": 605000,
          "total_%": 2.4,
          "leisure_%": 5
        },
        {
          "month": "5/1/2001",
          "total": 2993000,
          "leisure": 574000,
          "total_%": 2.3,
          "leisure_%": 4.8
        },
        {
          "month": "6/1/2001",
          "total": 2878000,
          "leisure": 551000,
          "total_%": 2.2,
          "leisure_%": 4.6
        },
        {
          "month": "7/1/2001",
          "total": 2947000,
          "leisure": 563000,
          "total_%": 2.2,
          "leisure_%": 4.6
        },
        {
          "month": "8/1/2001",
          "total": 2928000,
          "leisure": 596000,
          "total_%": 2.2,
          "leisure_%": 4.9
        },
        {
          "month": "9/1/2001",
          "total": 2703000,
          "leisure": 563000,
          "total_%": 2.1,
          "leisure_%": 4.7
        },
        {
          "month": "10/1/2001",
          "total": 2795000,
          "leisure": 536000,
          "total_%": 2.1,
          "leisure_%": 4.5
        },
        {
          "month": "11/1/2001",
          "total": 2560000,
          "leisure": 466000,
          "total_%": 2,
          "leisure_%": 3.9
        },
        {
          "month": "12/1/2001",
          "total": 2559000,
          "leisure": 483000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "1/1/2002",
          "total": 2845000,
          "leisure": 542000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "2/1/2002",
          "total": 2572000,
          "leisure": 523000,
          "total_%": 2,
          "leisure_%": 4.4
        },
        {
          "month": "3/1/2002",
          "total": 2493000,
          "leisure": 534000,
          "total_%": 1.9,
          "leisure_%": 4.5
        },
        {
          "month": "4/1/2002",
          "total": 2624000,
          "leisure": 525000,
          "total_%": 2,
          "leisure_%": 4.4
        },
        {
          "month": "5/1/2002",
          "total": 2537000,
          "leisure": 513000,
          "total_%": 1.9,
          "leisure_%": 4.3
        },
        {
          "month": "6/1/2002",
          "total": 2522000,
          "leisure": 488000,
          "total_%": 1.9,
          "leisure_%": 4.1
        },
        {
          "month": "7/1/2002",
          "total": 2561000,
          "leisure": 484000,
          "total_%": 2,
          "leisure_%": 4.1
        },
        {
          "month": "8/1/2002",
          "total": 2561000,
          "leisure": 476000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "9/1/2002",
          "total": 2521000,
          "leisure": 491000,
          "total_%": 1.9,
          "leisure_%": 4.1
        },
        {
          "month": "10/1/2002",
          "total": 2423000,
          "leisure": 457000,
          "total_%": 1.9,
          "leisure_%": 3.8
        },
        {
          "month": "11/1/2002",
          "total": 2403000,
          "leisure": 433000,
          "total_%": 1.8,
          "leisure_%": 3.6
        },
        {
          "month": "12/1/2002",
          "total": 2501000,
          "leisure": 471000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "1/1/2003",
          "total": 2429000,
          "leisure": 473000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "2/1/2003",
          "total": 2490000,
          "leisure": 501000,
          "total_%": 1.9,
          "leisure_%": 4.1
        },
        {
          "month": "3/1/2003",
          "total": 2394000,
          "leisure": 470000,
          "total_%": 1.8,
          "leisure_%": 3.9
        },
        {
          "month": "4/1/2003",
          "total": 2279000,
          "leisure": 466000,
          "total_%": 1.8,
          "leisure_%": 3.9
        },
        {
          "month": "5/1/2003",
          "total": 2291000,
          "leisure": 443000,
          "total_%": 1.8,
          "leisure_%": 3.7
        },
        {
          "month": "6/1/2003",
          "total": 2315000,
          "leisure": 483000,
          "total_%": 1.8,
          "leisure_%": 4
        },
        {
          "month": "7/1/2003",
          "total": 2271000,
          "leisure": 467000,
          "total_%": 1.7,
          "leisure_%": 3.8
        },
        {
          "month": "8/1/2003",
          "total": 2195000,
          "leisure": 430000,
          "total_%": 1.7,
          "leisure_%": 3.5
        },
        {
          "month": "9/1/2003",
          "total": 2354000,
          "leisure": 399000,
          "total_%": 1.8,
          "leisure_%": 3.3
        },
        {
          "month": "10/1/2003",
          "total": 2415000,
          "leisure": 485000,
          "total_%": 1.9,
          "leisure_%": 4
        },
        {
          "month": "11/1/2003",
          "total": 2411000,
          "leisure": 489000,
          "total_%": 1.8,
          "leisure_%": 4
        },
        {
          "month": "12/1/2003",
          "total": 2444000,
          "leisure": 468000,
          "total_%": 1.9,
          "leisure_%": 3.8
        },
        {
          "month": "1/1/2004",
          "total": 2354000,
          "leisure": 435000,
          "total_%": 1.8,
          "leisure_%": 3.5
        },
        {
          "month": "2/1/2004",
          "total": 2448000,
          "leisure": 485000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "3/1/2004",
          "total": 2582000,
          "leisure": 517000,
          "total_%": 2,
          "leisure_%": 4.2
        },
        {
          "month": "4/1/2004",
          "total": 2534000,
          "leisure": 490000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "5/1/2004",
          "total": 2428000,
          "leisure": 521000,
          "total_%": 1.8,
          "leisure_%": 4.2
        },
        {
          "month": "6/1/2004",
          "total": 2659000,
          "leisure": 502000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "7/1/2004",
          "total": 2609000,
          "leisure": 504000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "8/1/2004",
          "total": 2586000,
          "leisure": 516000,
          "total_%": 2,
          "leisure_%": 4.1
        },
        {
          "month": "9/1/2004",
          "total": 2531000,
          "leisure": 489000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "10/1/2004",
          "total": 2550000,
          "leisure": 496000,
          "total_%": 1.9,
          "leisure_%": 3.9
        },
        {
          "month": "11/1/2004",
          "total": 2789000,
          "leisure": 547000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "12/1/2004",
          "total": 2695000,
          "leisure": 555000,
          "total_%": 2,
          "leisure_%": 4.4
        },
        {
          "month": "1/1/2005",
          "total": 2732000,
          "leisure": 543000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "2/1/2005",
          "total": 2651000,
          "leisure": 526000,
          "total_%": 2,
          "leisure_%": 4.1
        },
        {
          "month": "3/1/2005",
          "total": 2747000,
          "leisure": 517000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "4/1/2005",
          "total": 2741000,
          "leisure": 533000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "5/1/2005",
          "total": 2763000,
          "leisure": 544000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "6/1/2005",
          "total": 2754000,
          "leisure": 518000,
          "total_%": 2.1,
          "leisure_%": 4
        },
        {
          "month": "7/1/2005",
          "total": 2735000,
          "leisure": 597000,
          "total_%": 2,
          "leisure_%": 4.6
        },
        {
          "month": "8/1/2005",
          "total": 2957000,
          "leisure": 592000,
          "total_%": 2.2,
          "leisure_%": 4.6
        },
        {
          "month": "9/1/2005",
          "total": 3046000,
          "leisure": 626000,
          "total_%": 2.3,
          "leisure_%": 4.9
        },
        {
          "month": "10/1/2005",
          "total": 2863000,
          "leisure": 636000,
          "total_%": 2.1,
          "leisure_%": 5
        },
        {
          "month": "11/1/2005",
          "total": 2895000,
          "leisure": 581000,
          "total_%": 2.1,
          "leisure_%": 4.5
        },
        {
          "month": "12/1/2005",
          "total": 2849000,
          "leisure": 558000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "1/1/2006",
          "total": 2945000,
          "leisure": 611000,
          "total_%": 2.2,
          "leisure_%": 4.7
        },
        {
          "month": "2/1/2006",
          "total": 2965000,
          "leisure": 594000,
          "total_%": 2.2,
          "leisure_%": 4.6
        },
        {
          "month": "3/1/2006",
          "total": 2956000,
          "leisure": 577000,
          "total_%": 2.2,
          "leisure_%": 4.4
        },
        {
          "month": "4/1/2006",
          "total": 2778000,
          "leisure": 499000,
          "total_%": 2,
          "leisure_%": 3.8
        },
        {
          "month": "5/1/2006",
          "total": 3002000,
          "leisure": 580000,
          "total_%": 2.2,
          "leisure_%": 4.4
        },
        {
          "month": "6/1/2006",
          "total": 3042000,
          "leisure": 642000,
          "total_%": 2.2,
          "leisure_%": 4.9
        },
        {
          "month": "7/1/2006",
          "total": 3047000,
          "leisure": 571000,
          "total_%": 2.2,
          "leisure_%": 4.4
        },
        {
          "month": "8/1/2006",
          "total": 3056000,
          "leisure": 592000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "9/1/2006",
          "total": 2888000,
          "leisure": 582000,
          "total_%": 2.1,
          "leisure_%": 4.4
        },
        {
          "month": "10/1/2006",
          "total": 2983000,
          "leisure": 591000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "11/1/2006",
          "total": 3043000,
          "leisure": 594000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "12/1/2006",
          "total": 2999000,
          "leisure": 610000,
          "total_%": 2.2,
          "leisure_%": 4.6
        },
        {
          "month": "1/1/2007",
          "total": 2956000,
          "leisure": 592000,
          "total_%": 2.1,
          "leisure_%": 4.4
        },
        {
          "month": "2/1/2007",
          "total": 2933000,
          "leisure": 584000,
          "total_%": 2.1,
          "leisure_%": 4.4
        },
        {
          "month": "3/1/2007",
          "total": 2997000,
          "leisure": 601000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "4/1/2007",
          "total": 2911000,
          "leisure": 622000,
          "total_%": 2.1,
          "leisure_%": 4.6
        },
        {
          "month": "5/1/2007",
          "total": 3010000,
          "leisure": 552000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "6/1/2007",
          "total": 2910000,
          "leisure": 636000,
          "total_%": 2.1,
          "leisure_%": 4.7
        },
        {
          "month": "7/1/2007",
          "total": 2951000,
          "leisure": 633000,
          "total_%": 2.1,
          "leisure_%": 4.7
        },
        {
          "month": "8/1/2007",
          "total": 3014000,
          "leisure": 604000,
          "total_%": 2.2,
          "leisure_%": 4.5
        },
        {
          "month": "9/1/2007",
          "total": 2691000,
          "leisure": 448000,
          "total_%": 1.9,
          "leisure_%": 3.3
        },
        {
          "month": "10/1/2007",
          "total": 2926000,
          "leisure": 622000,
          "total_%": 2.1,
          "leisure_%": 4.6
        },
        {
          "month": "11/1/2007",
          "total": 2784000,
          "leisure": 594000,
          "total_%": 2,
          "leisure_%": 4.4
        },
        {
          "month": "12/1/2007",
          "total": 2773000,
          "leisure": 590000,
          "total_%": 2,
          "leisure_%": 4.4
        },
        {
          "month": "1/1/2008",
          "total": 2847000,
          "leisure": 588000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "2/1/2008",
          "total": 2881000,
          "leisure": 560000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "3/1/2008",
          "total": 2661000,
          "leisure": 554000,
          "total_%": 1.9,
          "leisure_%": 4.1
        },
        {
          "month": "4/1/2008",
          "total": 2837000,
          "leisure": 548000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "5/1/2008",
          "total": 2607000,
          "leisure": 579000,
          "total_%": 1.9,
          "leisure_%": 4.3
        },
        {
          "month": "6/1/2008",
          "total": 2595000,
          "leisure": 547000,
          "total_%": 1.9,
          "leisure_%": 4.1
        },
        {
          "month": "7/1/2008",
          "total": 2489000,
          "leisure": 528000,
          "total_%": 1.8,
          "leisure_%": 3.9
        },
        {
          "month": "8/1/2008",
          "total": 2445000,
          "leisure": 504000,
          "total_%": 1.8,
          "leisure_%": 3.7
        },
        {
          "month": "9/1/2008",
          "total": 2468000,
          "leisure": 520000,
          "total_%": 1.8,
          "leisure_%": 3.9
        },
        {
          "month": "10/1/2008",
          "total": 2347000,
          "leisure": 494000,
          "total_%": 1.7,
          "leisure_%": 3.7
        },
        {
          "month": "11/1/2008",
          "total": 2157000,
          "leisure": 452000,
          "total_%": 1.6,
          "leisure_%": 3.4
        },
        {
          "month": "12/1/2008",
          "total": 2084000,
          "leisure": 426000,
          "total_%": 1.5,
          "leisure_%": 3.2
        },
        {
          "month": "1/1/2009",
          "total": 1976000,
          "leisure": 404000,
          "total_%": 1.5,
          "leisure_%": 3.1
        },
        {
          "month": "2/1/2009",
          "total": 1952000,
          "leisure": 417000,
          "total_%": 1.5,
          "leisure_%": 3.2
        },
        {
          "month": "3/1/2009",
          "total": 1834000,
          "leisure": 384000,
          "total_%": 1.4,
          "leisure_%": 2.9
        },
        {
          "month": "4/1/2009",
          "total": 1712000,
          "leisure": 367000,
          "total_%": 1.3,
          "leisure_%": 2.8
        },
        {
          "month": "5/1/2009",
          "total": 1683000,
          "leisure": 345000,
          "total_%": 1.3,
          "leisure_%": 2.6
        },
        {
          "month": "6/1/2009",
          "total": 1685000,
          "leisure": 353000,
          "total_%": 1.3,
          "leisure_%": 2.7
        },
        {
          "month": "7/1/2009",
          "total": 1685000,
          "leisure": 337000,
          "total_%": 1.3,
          "leisure_%": 2.6
        },
        {
          "month": "8/1/2009",
          "total": 1555000,
          "leisure": 345000,
          "total_%": 1.2,
          "leisure_%": 2.6
        },
        {
          "month": "9/1/2009",
          "total": 1627000,
          "leisure": 300000,
          "total_%": 1.2,
          "leisure_%": 2.3
        },
        {
          "month": "10/1/2009",
          "total": 1660000,
          "leisure": 331000,
          "total_%": 1.3,
          "leisure_%": 2.5
        },
        {
          "month": "11/1/2009",
          "total": 1810000,
          "leisure": 371000,
          "total_%": 1.4,
          "leisure_%": 2.9
        },
        {
          "month": "12/1/2009",
          "total": 1766000,
          "leisure": 372000,
          "total_%": 1.4,
          "leisure_%": 2.9
        },
        {
          "month": "1/1/2010",
          "total": 1742000,
          "leisure": 379000,
          "total_%": 1.3,
          "leisure_%": 2.9
        },
        {
          "month": "2/1/2010",
          "total": 1844000,
          "leisure": 374000,
          "total_%": 1.4,
          "leisure_%": 2.9
        },
        {
          "month": "3/1/2010",
          "total": 1856000,
          "leisure": 367000,
          "total_%": 1.4,
          "leisure_%": 2.8
        },
        {
          "month": "4/1/2010",
          "total": 1897000,
          "leisure": 365000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "5/1/2010",
          "total": 1813000,
          "leisure": 357000,
          "total_%": 1.4,
          "leisure_%": 2.7
        },
        {
          "month": "6/1/2010",
          "total": 1911000,
          "leisure": 327000,
          "total_%": 1.5,
          "leisure_%": 2.5
        },
        {
          "month": "7/1/2010",
          "total": 1785000,
          "leisure": 336000,
          "total_%": 1.4,
          "leisure_%": 2.6
        },
        {
          "month": "8/1/2010",
          "total": 1842000,
          "leisure": 336000,
          "total_%": 1.4,
          "leisure_%": 2.6
        },
        {
          "month": "9/1/2010",
          "total": 1895000,
          "leisure": 356000,
          "total_%": 1.5,
          "leisure_%": 2.7
        },
        {
          "month": "10/1/2010",
          "total": 1846000,
          "leisure": 362000,
          "total_%": 1.4,
          "leisure_%": 2.8
        },
        {
          "month": "11/1/2010",
          "total": 1887000,
          "leisure": 364000,
          "total_%": 1.4,
          "leisure_%": 2.8
        },
        {
          "month": "12/1/2010",
          "total": 1977000,
          "leisure": 385000,
          "total_%": 1.5,
          "leisure_%": 2.9
        },
        {
          "month": "1/1/2011",
          "total": 1832000,
          "leisure": 375000,
          "total_%": 1.4,
          "leisure_%": 2.9
        },
        {
          "month": "2/1/2011",
          "total": 1958000,
          "leisure": 371000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "3/1/2011",
          "total": 2033000,
          "leisure": 382000,
          "total_%": 1.5,
          "leisure_%": 2.9
        },
        {
          "month": "4/1/2011",
          "total": 1882000,
          "leisure": 372000,
          "total_%": 1.4,
          "leisure_%": 2.8
        },
        {
          "month": "5/1/2011",
          "total": 1965000,
          "leisure": 367000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "6/1/2011",
          "total": 1923000,
          "leisure": 392000,
          "total_%": 1.5,
          "leisure_%": 2.9
        },
        {
          "month": "7/1/2011",
          "total": 1986000,
          "leisure": 381000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "8/1/2011",
          "total": 2031000,
          "leisure": 419000,
          "total_%": 1.5,
          "leisure_%": 3.1
        },
        {
          "month": "9/1/2011",
          "total": 2041000,
          "leisure": 401000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "10/1/2011",
          "total": 1997000,
          "leisure": 339000,
          "total_%": 1.5,
          "leisure_%": 2.5
        },
        {
          "month": "11/1/2011",
          "total": 2039000,
          "leisure": 378000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "12/1/2011",
          "total": 1981000,
          "leisure": 406000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "1/1/2012",
          "total": 2030000,
          "leisure": 402000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "2/1/2012",
          "total": 2130000,
          "leisure": 414000,
          "total_%": 1.6,
          "leisure_%": 3
        },
        {
          "month": "3/1/2012",
          "total": 2167000,
          "leisure": 444000,
          "total_%": 1.6,
          "leisure_%": 3.2
        },
        {
          "month": "4/1/2012",
          "total": 2134000,
          "leisure": 437000,
          "total_%": 1.6,
          "leisure_%": 3.2
        },
        {
          "month": "5/1/2012",
          "total": 2138000,
          "leisure": 437000,
          "total_%": 1.6,
          "leisure_%": 3.2
        },
        {
          "month": "6/1/2012",
          "total": 2152000,
          "leisure": 454000,
          "total_%": 1.6,
          "leisure_%": 3.3
        },
        {
          "month": "7/1/2012",
          "total": 2072000,
          "leisure": 431000,
          "total_%": 1.5,
          "leisure_%": 3.1
        },
        {
          "month": "8/1/2012",
          "total": 2069000,
          "leisure": 388000,
          "total_%": 1.5,
          "leisure_%": 2.8
        },
        {
          "month": "9/1/2012",
          "total": 1950000,
          "leisure": 389000,
          "total_%": 1.4,
          "leisure_%": 2.8
        },
        {
          "month": "10/1/2012",
          "total": 2035000,
          "leisure": 413000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "11/1/2012",
          "total": 2078000,
          "leisure": 411000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "12/1/2012",
          "total": 2051000,
          "leisure": 420000,
          "total_%": 1.5,
          "leisure_%": 3
        },
        {
          "month": "1/1/2013",
          "total": 2280000,
          "leisure": 456000,
          "total_%": 1.7,
          "leisure_%": 3.3
        },
        {
          "month": "2/1/2013",
          "total": 2298000,
          "leisure": 484000,
          "total_%": 1.7,
          "leisure_%": 3.4
        },
        {
          "month": "3/1/2013",
          "total": 2124000,
          "leisure": 447000,
          "total_%": 1.6,
          "leisure_%": 3.2
        },
        {
          "month": "4/1/2013",
          "total": 2296000,
          "leisure": 449000,
          "total_%": 1.7,
          "leisure_%": 3.2
        },
        {
          "month": "5/1/2013",
          "total": 2234000,
          "leisure": 446000,
          "total_%": 1.6,
          "leisure_%": 3.1
        },
        {
          "month": "6/1/2013",
          "total": 2203000,
          "leisure": 429000,
          "total_%": 1.6,
          "leisure_%": 3
        },
        {
          "month": "7/1/2013",
          "total": 2363000,
          "leisure": 452000,
          "total_%": 1.7,
          "leisure_%": 3.2
        },
        {
          "month": "8/1/2013",
          "total": 2316000,
          "leisure": 424000,
          "total_%": 1.7,
          "leisure_%": 3
        },
        {
          "month": "9/1/2013",
          "total": 2302000,
          "leisure": 444000,
          "total_%": 1.7,
          "leisure_%": 3.1
        },
        {
          "month": "10/1/2013",
          "total": 2372000,
          "leisure": 522000,
          "total_%": 1.7,
          "leisure_%": 3.6
        },
        {
          "month": "11/1/2013",
          "total": 2391000,
          "leisure": 483000,
          "total_%": 1.7,
          "leisure_%": 3.3
        },
        {
          "month": "12/1/2013",
          "total": 2287000,
          "leisure": 456000,
          "total_%": 1.7,
          "leisure_%": 3.2
        },
        {
          "month": "1/1/2014",
          "total": 2311000,
          "leisure": 464000,
          "total_%": 1.7,
          "leisure_%": 3.2
        },
        {
          "month": "2/1/2014",
          "total": 2411000,
          "leisure": 529000,
          "total_%": 1.8,
          "leisure_%": 3.6
        },
        {
          "month": "3/1/2014",
          "total": 2449000,
          "leisure": 497000,
          "total_%": 1.8,
          "leisure_%": 3.4
        },
        {
          "month": "4/1/2014",
          "total": 2474000,
          "leisure": 506000,
          "total_%": 1.8,
          "leisure_%": 3.5
        },
        {
          "month": "5/1/2014",
          "total": 2483000,
          "leisure": 459000,
          "total_%": 1.8,
          "leisure_%": 3.1
        },
        {
          "month": "6/1/2014",
          "total": 2507000,
          "leisure": 513000,
          "total_%": 1.8,
          "leisure_%": 3.5
        },
        {
          "month": "7/1/2014",
          "total": 2633000,
          "leisure": 517000,
          "total_%": 1.9,
          "leisure_%": 3.5
        },
        {
          "month": "8/1/2014",
          "total": 2549000,
          "leisure": 544000,
          "total_%": 1.8,
          "leisure_%": 3.7
        },
        {
          "month": "9/1/2014",
          "total": 2732000,
          "leisure": 549000,
          "total_%": 2,
          "leisure_%": 3.7
        },
        {
          "month": "10/1/2014",
          "total": 2718000,
          "leisure": 586000,
          "total_%": 1.9,
          "leisure_%": 4
        },
        {
          "month": "11/1/2014",
          "total": 2600000,
          "leisure": 565000,
          "total_%": 1.9,
          "leisure_%": 3.8
        },
        {
          "month": "12/1/2014",
          "total": 2552000,
          "leisure": 553000,
          "total_%": 1.8,
          "leisure_%": 3.7
        },
        {
          "month": "1/1/2015",
          "total": 2764000,
          "leisure": 584000,
          "total_%": 2,
          "leisure_%": 3.9
        },
        {
          "month": "2/1/2015",
          "total": 2741000,
          "leisure": 544000,
          "total_%": 1.9,
          "leisure_%": 3.6
        },
        {
          "month": "3/1/2015",
          "total": 2754000,
          "leisure": 573000,
          "total_%": 2,
          "leisure_%": 3.8
        },
        {
          "month": "4/1/2015",
          "total": 2705000,
          "leisure": 545000,
          "total_%": 1.9,
          "leisure_%": 3.6
        },
        {
          "month": "5/1/2015",
          "total": 2743000,
          "leisure": 534000,
          "total_%": 1.9,
          "leisure_%": 3.5
        },
        {
          "month": "6/1/2015",
          "total": 2756000,
          "leisure": 597000,
          "total_%": 1.9,
          "leisure_%": 4
        },
        {
          "month": "7/1/2015",
          "total": 2764000,
          "leisure": 606000,
          "total_%": 1.9,
          "leisure_%": 4
        },
        {
          "month": "8/1/2015",
          "total": 2879000,
          "leisure": 648000,
          "total_%": 2,
          "leisure_%": 4.3
        },
        {
          "month": "9/1/2015",
          "total": 2778000,
          "leisure": 607000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "10/1/2015",
          "total": 2810000,
          "leisure": 600000,
          "total_%": 2,
          "leisure_%": 3.9
        },
        {
          "month": "11/1/2015",
          "total": 2897000,
          "leisure": 622000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "12/1/2015",
          "total": 3056000,
          "leisure": 651000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "1/1/2016",
          "total": 2875000,
          "leisure": 625000,
          "total_%": 2,
          "leisure_%": 4
        },
        {
          "month": "2/1/2016",
          "total": 2994000,
          "leisure": 651000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "3/1/2016",
          "total": 2917000,
          "leisure": 629000,
          "total_%": 2,
          "leisure_%": 4.1
        },
        {
          "month": "4/1/2016",
          "total": 2955000,
          "leisure": 652000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "5/1/2016",
          "total": 3009000,
          "leisure": 669000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "6/1/2016",
          "total": 3018000,
          "leisure": 655000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "7/1/2016",
          "total": 2967000,
          "leisure": 660000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "8/1/2016",
          "total": 2998000,
          "leisure": 651000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "9/1/2016",
          "total": 3047000,
          "leisure": 674000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "10/1/2016",
          "total": 3074000,
          "leisure": 687000,
          "total_%": 2.1,
          "leisure_%": 4.4
        },
        {
          "month": "11/1/2016",
          "total": 3026000,
          "leisure": 688000,
          "total_%": 2.1,
          "leisure_%": 4.3
        },
        {
          "month": "12/1/2016",
          "total": 2989000,
          "leisure": 669000,
          "total_%": 2.1,
          "leisure_%": 4.2
        },
        {
          "month": "1/1/2017",
          "total": 3166000,
          "leisure": 644000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "2/1/2017",
          "total": 3085000,
          "leisure": 639000,
          "total_%": 2.1,
          "leisure_%": 4
        },
        {
          "month": "3/1/2017",
          "total": 3145000,
          "leisure": 649000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "4/1/2017",
          "total": 3028000,
          "leisure": 659000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "5/1/2017",
          "total": 3125000,
          "leisure": 664000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "6/1/2017",
          "total": 3166000,
          "leisure": 659000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "7/1/2017",
          "total": 3107000,
          "leisure": 615000,
          "total_%": 2.1,
          "leisure_%": 3.8
        },
        {
          "month": "8/1/2017",
          "total": 3109000,
          "leisure": 613000,
          "total_%": 2.1,
          "leisure_%": 3.8
        },
        {
          "month": "9/1/2017",
          "total": 3214000,
          "leisure": 649000,
          "total_%": 2.2,
          "leisure_%": 4
        },
        {
          "month": "10/1/2017",
          "total": 3177000,
          "leisure": 629000,
          "total_%": 2.2,
          "leisure_%": 3.9
        },
        {
          "month": "11/1/2017",
          "total": 3166000,
          "leisure": 658000,
          "total_%": 2.1,
          "leisure_%": 4.1
        },
        {
          "month": "12/1/2017",
          "total": 3194000,
          "leisure": 666000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "1/1/2018",
          "total": 3034000,
          "leisure": 614000,
          "total_%": 2.1,
          "leisure_%": 3.8
        },
        {
          "month": "2/1/2018",
          "total": 3200000,
          "leisure": 693000,
          "total_%": 2.2,
          "leisure_%": 4.3
        },
        {
          "month": "3/1/2018",
          "total": 3305000,
          "leisure": 703000,
          "total_%": 2.2,
          "leisure_%": 4.3
        },
        {
          "month": "4/1/2018",
          "total": 3366000,
          "leisure": 713000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "5/1/2018",
          "total": 3401000,
          "leisure": 701000,
          "total_%": 2.3,
          "leisure_%": 4.3
        },
        {
          "month": "6/1/2018",
          "total": 3401000,
          "leisure": 691000,
          "total_%": 2.3,
          "leisure_%": 4.2
        },
        {
          "month": "7/1/2018",
          "total": 3444000,
          "leisure": 726000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "8/1/2018",
          "total": 3476000,
          "leisure": 743000,
          "total_%": 2.3,
          "leisure_%": 4.5
        },
        {
          "month": "9/1/2018",
          "total": 3424000,
          "leisure": 749000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "10/1/2018",
          "total": 3460000,
          "leisure": 714000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "11/1/2018",
          "total": 3435000,
          "leisure": 699000,
          "total_%": 2.3,
          "leisure_%": 4.3
        },
        {
          "month": "12/1/2018",
          "total": 3381000,
          "leisure": 694000,
          "total_%": 2.3,
          "leisure_%": 4.2
        },
        {
          "month": "1/1/2019",
          "total": 3521000,
          "leisure": 763000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "2/1/2019",
          "total": 3543000,
          "leisure": 782000,
          "total_%": 2.4,
          "leisure_%": 4.7
        },
        {
          "month": "3/1/2019",
          "total": 3524000,
          "leisure": 748000,
          "total_%": 2.3,
          "leisure_%": 4.5
        },
        {
          "month": "4/1/2019",
          "total": 3494000,
          "leisure": 764000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "5/1/2019",
          "total": 3487000,
          "leisure": 768000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "6/1/2019",
          "total": 3527000,
          "leisure": 789000,
          "total_%": 2.3,
          "leisure_%": 4.8
        },
        {
          "month": "7/1/2019",
          "total": 3627000,
          "leisure": 801000,
          "total_%": 2.4,
          "leisure_%": 4.8
        },
        {
          "month": "8/1/2019",
          "total": 3591000,
          "leisure": 813000,
          "total_%": 2.4,
          "leisure_%": 4.9
        },
        {
          "month": "9/1/2019",
          "total": 3449000,
          "leisure": 734000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "10/1/2019",
          "total": 3414000,
          "leisure": 774000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "11/1/2019",
          "total": 3482000,
          "leisure": 733000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "12/1/2019",
          "total": 3487000,
          "leisure": 752000,
          "total_%": 2.3,
          "leisure_%": 4.5
        },
        {
          "month": "1/1/2020",
          "total": 3568000,
          "leisure": 739000,
          "total_%": 2.3,
          "leisure_%": 4.4
        },
        {
          "month": "2/1/2020",
          "total": 3430000,
          "leisure": 690000,
          "total_%": 2.2,
          "leisure_%": 4.1
        },
        {
          "month": "3/1/2020",
          "total": 2902000,
          "leisure": 515000,
          "total_%": 1.9,
          "leisure_%": 3.2
        },
        {
          "month": "4/1/2020",
          "total": 2107000,
          "leisure": 316000,
          "total_%": 1.6,
          "leisure_%": 3.6
        },
        {
          "month": "5/1/2020",
          "total": 2206000,
          "leisure": 354000,
          "total_%": 1.7,
          "leisure_%": 3.5
        },
        {
          "month": "6/1/2020",
          "total": 2646000,
          "leisure": 440000,
          "total_%": 1.9,
          "leisure_%": 3.6
        },
        {
          "month": "7/1/2020",
          "total": 3182000,
          "leisure": 519000,
          "total_%": 2.3,
          "leisure_%": 4
        },
        {
          "month": "8/1/2020",
          "total": 2987000,
          "leisure": 502000,
          "total_%": 2.1,
          "leisure_%": 3.9
        },
        {
          "month": "9/1/2020",
          "total": 3307000,
          "leisure": 597000,
          "total_%": 2.3,
          "leisure_%": 4.5
        },
        {
          "month": "10/1/2020",
          "total": 3352000,
          "leisure": 605000,
          "total_%": 2.4,
          "leisure_%": 4.4
        },
        {
          "month": "11/1/2020",
          "total": 3296000,
          "leisure": 622000,
          "total_%": 2.3,
          "leisure_%": 4.6
        },
        {
          "month": "12/1/2020",
          "total": 3407000,
          "leisure": 687000,
          "total_%": 2.4,
          "leisure_%": 5.2
        },
        {
          "month": "1/1/2021",
          "total": 3306000,
          "leisure": 641000,
          "total_%": 2.3,
          "leisure_%": 4.9
        },
        {
          "month": "2/1/2021",
          "total": 3383000,
          "leisure": 625000,
          "total_%": 2.4,
          "leisure_%": 4.6
        },
        {
          "month": "3/1/2021",
          "total": 3568000,
          "leisure": 703000,
          "total_%": 2.5,
          "leisure_%": 5.1
        },
        {
          "month": "4/1/2021",
          "total": 3992000,
          "leisure": 752000,
          "total_%": 2.8,
          "leisure_%": 5.3
        },
        {
          "month": "5/1/2021",
          "total": 3630000,
          "leisure": 762000,
          "total_%": 2.5,
          "leisure_%": 5.3
        },
        {
          "month": "6/1/2021",
          "total": 3870000,
          "leisure": 772000,
          "total_%": 2.7,
          "leisure_%": 5.2
        },
        {
          "month": "7/1/2021",
          "total": 4028000,
          "leisure": 807000,
          "total_%": 2.7,
          "leisure_%": 5.3
        },
        {
          "month": "8/1/2021",
          "total": 4270000,
          "leisure": 971000,
          "total_%": 2.9,
          "leisure_%": 6.4
        },
        {
          "month": "9/1/2021",
          "total": 4362000,
          "leisure": 955000,
          "total_%": 3.0,
          "leisure_%": 6.2
        },
        {
            "month": "10/1/2021",
            "total": 4157000,
            "leisure": 840000,
            "total_%": 2.8,
            "leisure_%": 5.4
        },
        {
            "month": "11/1/2021",
            "total": 4527000,
            "leisure": 1002000,
            "total_%": 3.0,
            "leisure_%": 6.4
        },
       ]

    quits_data.map( (d) => {
        // convert dates to d3 date object
        d.month = new Date(convertDate(d.month));
        return d;
    });

    // call function to draw graph once data has loaded
    draw(quits_data);
}

// define draw function to generate graphic based on dynamic width + dataset
function draw(data) {

    // grab graphic container
    let bigImage = document.querySelector('.big-graphic');
    // set graphic width based on width of this container
    let width = bigImage.clientWidth;

    // reset graphic if it's being redrawn
    let graphic = document.querySelector('.lineChart svg');
    graphic.innerHTML = '';

    // set graphic height
    let graphheight;
    if (mobile) {
        graphheight = 300;
    } else {
        graphheight = 400;
    }

    // set margins + factor them into height/width
    let margin = { top: 20, right: 10, bottom: 30, left: 45 };
    width = width - margin.left - margin.right;
    let height = graphheight - margin.top - margin.bottom;

    // grab svg and define margin, height and width
    let svg = d3.select(".lineChart svg")
        .style("transform", `translate(${margin.left}px, ${margin.top }px)`);

    // set x axis scale based on months data
    let xScale = d3.scaleTime()
        .domain( [new Date('2001-01-01'), new Date('2021-11-01')] )
        .range([0, width]);
    // set y axis scale
    let yScale = d3.scaleLinear()
        .domain([0, 7.0])
        .range([height, 0]);

    // add annotation range for 2001 recession
    svg.append('rect')
        .attr('x', xScale(convertDate('3/1/2001')))
        .attr('y', 0)
        .attr('width', xScale(convertDate('11/1/2001')) - xScale(convertDate('3/1/2001')))
        .attr('height', height)
        .attr('fill', 'rgba(0,0,0,.1)');

    // add annotation range for great recession
    svg.append('rect')
        .attr('x', xScale(convertDate('12/1/2007')))
        .attr('y', 0)
        .attr('width', xScale(convertDate('6/1/2009')) - xScale(convertDate('12/1/2007')))
        .attr('height', height)
        .attr('fill', 'rgba(0,0,0,.1)');

    // add annotation range for covid recession
    svg.append('rect')
        .attr('x', xScale((convertDate('2/1/2020'))))
        .attr('y', 0)
        .attr('width', xScale(convertDate('4/1/2020')) - xScale(convertDate('2/1/2020')))
        .attr('height', height)
        .attr('fill', 'rgba(0,0,0,.1)');

    // add data for total quits rate
    svg.append("path")
        .attr('class', 'data-path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "var(--total)")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(function(d) { 
            return xScale(d.month) })
          .y(function(d) { return yScale(+d['total_%']) })
          .curve(d3.curveCardinal)
        );

    // add data for leisure/hospitality quits rate
    svg.append("path")
        .attr('class', 'data-path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "var(--leisure)")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.month) })
          .y(function(d) { return yScale(+d['leisure_%']) })
          .curve(d3.curveCardinal)
        );
    
    // add x axis
    const tickWidth = 100; // set tick width so ticks are responsive
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale)
            .ticks(width / tickWidth)
        );
    // add y axis
    svg.append('g')
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d3.format('.0%')(d / 100))
            .ticks(7)
        );

    // add november annotation
    svg.append('line') 
        .attr('class', 'x-annotation')
        .attr('x1', xScale((convertDate('11/1/2021'))))
        .attr('x2', xScale((convertDate('11/1/2021'))))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke-width', 2)
        .style('stroke-width', 1)
        .style('stroke-dasharray', 2)
        .style('stroke', 'black')
        .style('opacity', .5)

    // add month/year label
    svg.append('text')
        .attr('class', 'x-annotation')
        .text('November 2021')
        .attr('text-anchor', 'end')
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 4}px, 14px)`)

    // label the number of quits
    let bbox;
    svg.append('text')
        .attr('class', 'temp x-annotation tooltip1')
        .attr('text-anchor', 'end')
        .text(d3.format(',.4r')(data[data.length-2]['leisure']) + ' quits')
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['leisure_%']) + 5}px)`)
        .each(function() { 
            bbox = this.getBBox(); 
        });
    svg.selectAll('.temp').remove();
    svg.append('rect')
        .attr('class', `x-annotation`)
        .attr('width', bbox.width + 30)
        .attr('height', bbox.height + 4)
        .style('fill', 'white')
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - bbox.width - 30}px, ${yScale(data[data.length-2]['leisure_%']) - bbox.height + 7}px)`)
    
        svg.append('text')
        .attr('class', 'x-annotation tooltip1')
        .attr('text-anchor', 'end')
        .text(function() {
                return d3.format(',.4r')(data[data.length-1]['leisure']) + ' quits';
            })
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['leisure_%']) + 5}px)`)
    svg.append('text')
        .attr('class', 'x-annotation tooltip1')
        .attr('text-anchor', 'end')
        .text(function() {
                return d3.format(',.4r')(data[data.length-1]['total']) + ' quits';
            })
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['total_%']) + 5}px)`)
        .each(function() { 
            bbox = this.getBBox(); 
        });
    svg.selectAll('.temp').remove();
    svg.append('rect')
        .attr('class', `x-annotation`)
        .attr('width', bbox.width + 4)
        .attr('height', bbox.height + 4)
        .style('fill', 'white')
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - bbox.width-9}px, ${yScale(data[data.length-2]['total_%']) - bbox.height + 7}px)`)
    svg.append('text')
        .attr('class', 'x-annotation tooltip1')
        .attr('text-anchor', 'end')
        .text(function() {
                return d3.format(',.4r')(data[data.length-1]['total']) + ' quits';
            })
        .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['total_%']) + 5}px)`)

    // add circle indicators 
    svg.append('circle')
        .attr('class', 'x-annotation')
        .attr('cx', xScale(convertDate('11/1/2021')))
        .attr('cy', function() {
            return yScale(data[data.length-1]['total_%']);
        })
        .attr('r','4px')
        .style('fill', 'var(--total)')
        .attr('stroke', 'white')
        .style('stroke-width', '1px')
    svg.append('circle')
        .attr('class', 'x-annotation')
        .attr('cx', xScale(convertDate('11/1/2021')))
        .attr('cy', function() {
            return yScale(data[data.length-1]['leisure_%']);
        })
        .attr('r','4px')
        .style('fill', 'var(--leisure)')
        .attr('stroke', 'white')
        .style('stroke-width', '1px');

    // add transparent box to listen for mouseovers anywhere in the chart
    let mouse = svg.append('rect')
        .attr('class', 'mouse')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width + 5)
        .attr('height', height)
        .attr('fill', 'transparent');

    // set styles for mouse over 
    mouse.on('mouseover', function(d, i) {
        // remove existing annotations
        svg.selectAll('line.x-annotation').remove();

        // add dotted line indicator
        svg.append('line')
            .attr('class', 'x-annotation')
            .attr('x1', xScale(xScale.invert(d.layerX - margin.left)))
            .attr('x2', xScale(xScale.invert(d.layerX - margin.left)))
            .attr('y1', 0)
            .attr('y2', height)
            .style('stroke-width', 1)
            .style('stroke-dasharray', 3)
            .style('stroke', 'gray')
            .style('opacity', .5);

    });

    // add styles for mouse move
    mouse.on('mousemove', function(d) {
        // remove existing lines/text/dots
        svg.selectAll('.x-annotation')
            .attr('class', 'sr-only')
            .remove();

        let xPos = d.layerX - margin.left;
        let interval = width / data.length;
        xPos = xPos - (xPos % interval);

        // calculate the date being hovered over
        let curDate = xScale.invert(xPos);
        curDate = d3.timeParse('%m/%Y')(d3.timeFormat('%m/%Y')(curDate));

        // move the line around
        svg.append('line')
            .attr('class', 'x-annotation')
            .attr('x1', xScale(curDate))
            .attr('x2', xScale(curDate))
            .attr('y1', 0)
            .attr('y2', height)
            .style('stroke-width', 1)
            .style('stroke-dasharray', 3)
            .style('stroke', 'gray')
            .style('opacity', .5)

        // calculate time distance from start of the chart
        let index = d3.timeMonth.count(data[0].month, curDate);

        // is the cursor on the right half of the graphic?
        let halfway = false;
        if (d.layerX > xScale(convertDate('9/1/2021')) / 3 * 2) { 
            halfway = true;
        }

        // add month/year label
        svg.append('text')
            .attr('class', 'x-annotation')
            .text(d3.timeFormat('%B %Y')(curDate))
            .attr('text-anchor', function() {
                // if past halfway, orient it to the left of the line
                if (halfway) {
                    return 'end';
                }
            })
            .style('transform', function() {
                if (halfway) {
                    return `translate(${d.layerX - margin.left - 4}px, 14px)`
                } else {
                    return `translate(${d.layerX - margin.left + 4}px, 14px)`
                }
            })

        function tooltip(key) {
            let bbox;
            svg.append('text')
                .attr('class', 'temp tooltip1')
                .text(function() {
                        return d3.format(',.4r')(data[index][key]) + ' quits';
                    })
                .each(function() { 
                    bbox = this.getBBox(); 
                });
            svg.selectAll('.temp').remove();
            svg.append('rect')
                .attr('class', `x-annotation bkg`)
                .attr('width', bbox.width + 30)
                .attr('height', bbox.height + 4)
                .style('transform', function() {
                    if (halfway) {
                        return `translate(${d.layerX - margin.left - bbox.width - 32}px, ${yScale(data[index][key + '_%']) - bbox.height + 7}px)`
                    } else {
                        return `translate(${d.layerX - margin.left}px, ${yScale(data[index][key + '_%']) - bbox.height + 7}px)`;
                    }
                })
            svg.append('text')
                .attr('class', 'x-annotation tooltip1')
                .attr('text-anchor', function() {
                    if (halfway) {
                        return 'end';
                    }
                })
                .text(function() {
                        return d3.format(',.4r')(data[index][key]) + ' quits';
                    })
                .style('transform', function() {
                    if (halfway) {
                        return `translate(${d.layerX - margin.left  - 15}px, ${yScale(data[index][key + '_%']) + 5}px)`
                    } else {
                        return `translate(${d.layerX - margin.left + 15}px, ${yScale(data[index][key + '_%']) + 5}px)`
                    }
                } )

            svg.append('circle')
                .attr('class', 'x-annotation')
                .attr('cx', xScale(curDate))
                .attr('cy', function() {
                    return yScale(data[index][key + '_%']);
                })
                .attr('r','4px')
                .style('fill', 'var(--' + key + ')')
                .attr('stroke', 'white')
                .style('stroke-width', '1px')
        }
        tooltip('total');
        tooltip('leisure');

    });

    // clear out annotations on mouseout
    mouse.on('mouseout', function(d, i) {
        svg.selectAll('.x-annotation')
            .style('display', 'none')
            .remove();

        // add november annotation back 
        svg.append('line') 
            .attr('class', 'x-annotation')
            .attr('x1', xScale((convertDate('11/1/2021'))))
            .attr('x2', xScale((convertDate('11/1/2021'))))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke-width', 2)
            .style('stroke-width', 1)
            .style('stroke-dasharray', 2)
            .style('stroke', 'black')
            .style('opacity', .5)

        // add month/year label
        svg.append('text')
            .attr('class', 'x-annotation')
            .text('November 2021')
            .attr('text-anchor', 'end')
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 4}px, 14px)`)

        // label the number of quits
        let bbox;
        svg.append('text')
            .attr('class', 'temp x-annotation tooltip1')
            .attr('text-anchor', 'end')
            .text(d3.format(',.4r')(data[data.length-2]['leisure']) + ' quits')
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['leisure_%']) + 5}px)`)
            .each(function() { 
                bbox = this.getBBox(); 
            });
        svg.selectAll('.temp').remove();
        svg.append('rect')
            .attr('class', `x-annotation`)
            .attr('width', bbox.width + 30)
            .attr('height', bbox.height + 4)
            .style('fill', 'white')
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - bbox.width - 30}px, ${yScale(data[data.length-2]['leisure_%']) - bbox.height + 7}px)`)
        
            svg.append('text')
            .attr('class', 'x-annotation tooltip1')
            .attr('text-anchor', 'end')
            .text(function() {
                    return d3.format(',.4r')(data[data.length-1]['leisure']) + ' quits';
                })
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['leisure_%']) + 5}px)`)
        svg.append('text')
            .attr('class', 'x-annotation tooltip1')
            .attr('text-anchor', 'end')
            .text( d3.format(',.4r')(data[data.length-1]['total']) + ' quits' )
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['total_%']) + 5}px)`)
            .each(function() { 
                bbox = this.getBBox(); 
            });
        svg.selectAll('.temp').remove();
        svg.append('rect')
            .attr('class', `x-annotation`)
            .attr('width', bbox.width + 4)
            .attr('height', bbox.height + 4)
            .style('fill', 'white')
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - bbox.width-9}px, ${yScale(data[data.length-2]['total_%']) - bbox.height + 7}px)`)
        svg.append('text')
            .attr('class', 'x-annotation tooltip1')
            .attr('text-anchor', 'end')
            .text( d3.format(',.4r')(data[data.length-1]['total']) + ' quits' )
            .style('transform', `translate(${xScale(convertDate('11/1/2021')) - 7}px, ${yScale(data[data.length-2]['total_%']) + 5}px)`)

        // add circle indicators 
        svg.append('circle')
            .attr('class', 'x-annotation')
            .attr('cx', xScale(convertDate('11/1/2021')))
            .attr('cy', yScale(data[data.length-1]['total_%']))
            .attr('r','4px')
            .style('fill', 'var(--total)')
            .attr('stroke', 'white')
            .style('stroke-width', '1px')
        svg.append('circle')
            .attr('class', 'x-annotation')
            .attr('cx', xScale(convertDate('11/1/2021')))
            .attr('cy', yScale(data[data.length-1]['leisure_%']))
            .attr('r','4px')
            .style('fill', 'var(--leisure)')
            .attr('stroke', 'white')
            .style('stroke-width', '1px')
    });

}

// MAIN
// call the draw function on load
loadData();
// call the draw function again if window is resized to redraw the graphic
window.addEventListener('resize', () => {
    loadData();
});
