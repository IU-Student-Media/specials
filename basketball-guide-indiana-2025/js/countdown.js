setInterval(countdown_women, 1000);


const menGames = [
 { date: "Nov 5 (Wed) 2025	8:00 PM EST", type:	"Home",	opponent: "Alabama A&M" },
 { date: "Nov 9 (Sun) 2025	1:00 PM EST", type:	"Neutral",	opponent: "Marquette" },
 { date: "Nov 12 (Wed) 2025	7:00 PM EST", type:	"Home",	opponent: "Milwaukee" },
 { date: "Nov 16 (Sun) 2025	5:30 PM EST", type:	"Home",	opponent: "Incarnate Word" },
 { date: "Nov 20 (Thu) 2025	6:00 PM EST", type:	"Home",	opponent: "Lindenwood" },
 { date: "Nov 25 (Tue) 2025	8:00 PM EST", type:	"Home",	opponent: "Kansas State" },
 { date: "Nov 29 (Sat) 2025	12:00 PM EST", type:	"Home",	opponent: "Bethune-Cookman" },
 { date: "Dec 3 (Wed) 2025	7:00 PM EST", type:	"Away",	opponent: "Minnesota" },
 { date: "Dec 6 (Sat) 2025	2:00 PM EST", type:	"Neutral",	opponent: "Louisville" },
 { date: "Dec 9 (Tue) 2025	8:30 PM EST", type:	"Home",	opponent: "Penn State" },
 { date: "Dec 13 (Sat) 2025	7:30 PM EST", type:	"Away",	opponent: "Kentucky" },
 { date: "Dec 20 (Sat) 2025	1:00 PM EST", type:	"Home",	opponent: "Chicago State" },
 { date: "Dec 22 (Mon) 2025	6:00 PM EST", type:	"Home",	opponent: "Siena" },
 { date: "Jan 4 (Sun) 2026	8:00 PM EST", type:	"Home",	opponent: "Washington" },
 { date: "Jan 7 (Wed) 2026	6:30 PM EST", type:	"Away",	opponent: "Maryland" },
 { date: "Jan 10 (Sat) 2026	12:00 PM EST", type:	"Home",	opponent: "Nebraska" },
 { date: "Jan 13 (Tue) 2026	8:00 PM EST", type:	"Away",	opponent: "Michigan State" },
 { date: "Jan 17 (Sat) 2026	2:00 PM EST", type:	"Home",	opponent: "Iowa" },
 { date: "Jan 20 (Tue) 2026	7:00 PM EST", type:	"Away",	opponent: "Michigan	Ann" },
 { date: "Jan 23 (Fri) 2026	6:00 PM EST", type:	"Away",	opponent: "Rutgers" },
 { date: "Jan 27 (Tue) 2026	9:00 PM EST", type:	"Home",	opponent: "Purdue" },
 { date: "Jan 31 (Sat) 2026	5:00 PM EST", type:	"Away",	opponent: "UCLA" },
 { date: "Feb 3 (Tue) 2026	10:00 PM EST", type:	"Away",	opponent: "USC" },
 { date: "Feb 7 (Sat) 2026	12:00 PM EST", type:	"Home",	opponent: "Wisconsin" },
 { date: "Feb 9 (Mon) 2026	8:30 PM EST", type:	"Home",	opponent: "Oregon" },
 { date: "Feb 15 (Sun) 2026	1:00 PM EST", type:	"Away",	opponent: "Illinois" },
 { date: "Feb 20 (Fri) 2026	8:00 PM EST", type:	"Away",	opponent: "Purdue" },
 { date: "Feb 24 (Tue) 2026	7:00 PM EST", type:	"Home",	opponent: "Northwestern" },
 { date: "Mar 1 (Sun) 2026	3:45 PM EST", type:	"Home",	opponent: "Michigan State" },
 { date: "Mar 4 (Wed) 2026	6:30 PM EST", type:	"Home",	opponent: "Minnesota" },
 { date: "Mar 7 (Sat) 2026	5:30 PM EST", type:	"Away",	opponent: "Ohio State" }
]

const womenGames = [
  { date: "Nov 4 (Tue) 2025 7:00 PM EST", type: "Home", opponent: "Lipscomb" }, 
  { date: "Nov 7 (Fri) 2025 7:00 PM EST", type: "Home", opponent: "UIC" }, 	
  { date: "Nov 11 (Tue) 2025 7:00 PM EST", type: "Home", opponent: "Marshall" },  	
  { date: "Nov 16 (Sun) 2025 5:00 PM EST", type:	"Away", opponent:	"Florida State" },
  { date: "Nov 19 (Wed) 2025 7:00 PM EST", type: "Home", opponent: "Butler" }, 
  { date: "Nov 25 (Tue) 2025 1:00 PM EST", type: "Away", opponent: "FGCU" }, 	
  // TODO: Coconut hoops
  // { date: "Nov 28 (Fri) 2025 1:30 P.M. EST", type: "Neutral", opponent: "Gonzaga" },
  // Warning - next game @ undetermined time
  // { date: "Nov 30 (Sun) 2025 11:30 A.M. EST", type:	"Neutral",	opponent: "Iowa State/Marquette"},
  { date: "Dec 3 (Wed) 2025 6:00 PM EST", type: "Home", opponent: "Western Michigan" },
  { date: "Dec 6 (Sat) 2025 12:00 PM EST", type: "Away", opponent: "Illinois" }, 
  { date: "Dec 11 (Thu) 2025 7:00 PM EST", type: "Home", opponent: "ULM" }, 	
  { date: "Dec 14 (Sun) 2025 1:00 PM EST", type: "Home", opponent: "Eastern Michigan" },
  { date: "Dec 21 (Sun) 2025 1:00 PM EST", type: "Home", opponent: "Western Carolina" },  	
  { date: "Dec 29 (Mon) 2025 6:00 PM EST", type: "Home", opponent: "Minnesota" }, 	
  { date: "Jan 1 (Thu) 2026 12:00 PM EST", type: "Home", opponent: "Michigan State" },  	
  { date: "Jan 4 (Sun) 2026 6:00 PM EST", type: "Away", opponent: "Maryland" }, 	
  { date: "Jan 8 (Thu) 2026 8:00 PM EST", type: "Away", opponent: "Nebraska" }, 	
  { date: "Jan 11 (Sun) 2026 5:00 PM EST", type: "Home", opponent: "Iowa" }, 	
  { date: "Jan 14 (Wed) 2026 7:00 PM EST", type: "Home", opponent: "Washington" }, 	
  { date: "Jan 22 (Thu) 2026 8:00 PM EST", type: "Away", opponent: "Ohio State" },  
  // TODO: Don't know start for sure
  { date: "Jan 25 (Sun) 2026 2:00 PM EST", type: "Away", opponent: "Purdue" },
  { date: "Jan 29 (Thu) 2026 7:00 PM EST", type: "Home", opponent: "Michigan" }, 	
  { date: "Feb 1 (Sun) 2026 2:00 PM EST", type: "Home", opponent: "Northwestern" },  	
  { date: "Feb 4 (Wed) 2026 7:00 PM EST", type: "Away", opponent: "Wisconsin" }, 
  { date: "Feb 8 (Sun) 2026 2:00 PM EST", type: "Home", opponent: "Purdue" },  	
  { date: "Feb 12 (Thu) 2026 10:00 PM EST", type: "Away", opponent: "USC" }, 	
  { date: "Feb 15 (Sun) 2026 3:00 PM EST", type: "Away", opponent: "UCLA" }, 	
  { date: "Feb 22 (Sun) 2026 1:00 PM EST", type: "Home", opponent: "Oregon" }, 	
  { date: "Feb 25 (Wed) 2026 7:00 PM EST", type: "Away", opponent: "Rutgers" },
  { date: "Feb 28 (Sat) 2026 2:00 PM EST", type: "Home", opponent: "Penn State" }
]


function nextGame(list) {
  let today = new Date();

  for (let i = 0; i != list.length; ++i) {
    if (today < new Date(list[i].date)) { return list[i] }
  }

  return list[0]
}


function countdown_men() {
  let today = new Date();
  // Unix timestamp (ms) for 6 AM EST November 5.
  let wholeGame = nextGame(menGames) // changed to fix daylights savings issue

  let game = new Date(wholeGame.date);
  let diff = game - today;
  let days = Math.floor(diff / (1000 * 3600 * 24));
  let hours = Math.floor(((diff / (1000 * 3600 * 24)) - days) * 24);
  let minutes = Math.floor(((((diff / (1000 * 3600 * 24)) - days) * 24) - hours) * 60);
  let minute = ((((diff / (1000 * 3600 * 24)) - days) * 24) - hours) * 60;
  let seconds = Math.floor((minute - minutes) * 60);
  if (diff > 0) {
    document.getElementById("men-countdown-days").textContent = String(days).padStart(2, '0');
    document.getElementById("men-countdown-hrs").textContent = String(hours).padStart(2, '0');
    document.getElementById("men-countdown-mins").textContent = String(minutes).padStart(2, '0');
    document.getElementById("men-countdown-secs").textContent = String(seconds).padStart(2, '0');
    document.getElementById("men-st").textContent = `${wholeGame.type} against ${wholeGame.opponent}`
  } else {
    document.getElementById("men-countdown-days").textContent = '00';
    document.getElementById("men-countdown-hrs").textContent = '00';
    document.getElementById("men-countdown-mins").textContent = '00';
    document.getElementById("men-countdown-secs").textContent = '00';
  }
}
setInterval(countdown_men, 1000);


function countdown_women() {
  let today = new Date();
  // Unix timestamp (ms) for 6 AM EST November 5.
  let wholeGame = nextGame(womenGames) // changed to fix daylights savings issue

  let game = new Date(wholeGame.date);
  let diff = game - today;
  let days = Math.floor(diff / (1000 * 3600 * 24));
  let hours = Math.floor(((diff / (1000 * 3600 * 24)) - days) * 24) ;
  let minutes = Math.floor(((((diff / (1000 * 3600 * 24)) - days) * 24) - hours) * 60);
  let minute = ((((diff / (1000 * 3600 * 24)) - days) * 24) - hours) * 60;
  let seconds = Math.floor((minute - minutes) * 60);
  if (diff > 0) {
    document.getElementById("women-st").textContent = `${wholeGame.type} against ${wholeGame.opponent}`
    document.getElementById("countdown-days").textContent = String(days).padStart(2, '0');
    document.getElementById("countdown-hrs").textContent = String(hours).padStart(2, '0');
    document.getElementById("countdown-mins").textContent = String(minutes).padStart(2, '0');
    document.getElementById("countdown-secs").textContent = String(seconds).padStart(2, '0');
  } else {
    document.getElementById("countdown-days").textContent = '00';
    document.getElementById("countdown-hrs").textContent = '00';
    document.getElementById("countdown-mins").textContent = '00';
    document.getElementById("countdown-secs").textContent = '00';
  }
}