document.getElementById("nav-toggle").onclick = () => document.getElementById("link-list").classList.toggle("hide");

// google sheets urls containing voting data
// Original code from : https://github.com/ids-digi/live-oscars-test/blob/main/js/sheetsConnector.js

const sheet = 'https://docs.google.com/spreadsheets/d/1uVGirkigz3u3eyWtFwDP_77YAI4cn7GN6Qw6TcAxYL8/edit?gid=0#gid=0'
const container = document.querySelector('.stories-container')


// Stolen from elections, will need to  
class LiveUpdate extends HTMLElement {
	connectedCallback() {
		const title   = this.getAttribute('title')
		const image   = this.getAttribute('image')
		const author  = this.getAttribute('author')
		const caption = this.getAttribute('caption')
		const link    = this.getAttribute('link')

		const date  = new Date(this.getAttribute('time'));
		const time1 = date.toLocaleDateString('en-US', {'weekday' : 'long'})
		const time2 = date.toLocaleDateString('en-US', {'day' : 'numeric', 'hour' : 'numeric', 'minute' : 'numeric', 'hour12' : true})
		const month = apMonthStr(date.getMonth())

		let time = `${time1}, ${month} ${time2}`
		time = time.replace("PM", "p.m.").replace("AM", "a.m.")

		// Wednesday, April 2 6:58 p.m.
		
		console.log(time)
		console.log(month)
		
		this.innerHTML = `
<a class="story" href="${link}">
    <img alt="${caption}" src="${image}"/>
    <div class="story-meta">
        <h4>${title}</h4>
        <p class="pubdate">${time}</p>
        <p class="byline">${author}</p>
    </div>
</a>`
	}
}

function apMonthStr(month) {
	const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.' ]
	return months[month]
}

function validData(data, len) {
	for (let j=0; j<len; ++j) {
		if (data[j].length == 0) return false;
	}
	return true;
}

function handle(err, opt, res) {
	if (err) {
		console.error(err);
		return;
	}
	let blah = res.rows;
	container.innerHTML = '';

	let rows = res.rows;//.slice(1)

	rows.sort((a, b) => new Date(a['cellsArray'][0]) - new Date(b['cellsArray'][0]));

	// Start at one to skip the first row
	for (let i = 0; i < rows.length; ++i) {
		let liveUpdate = document.createElement("live-update");

		if (!validData(rows[i]['cellsArray'], 6)) continue;
		
		liveUpdate.setAttribute("time", rows[i]['cellsArray'][0])
		liveUpdate.setAttribute("title", rows[i]['cellsArray'][1])
		liveUpdate.setAttribute("author", rows[i]['cellsArray'][2])
		liveUpdate.setAttribute("image", rows[i]['cellsArray'][3])
		liveUpdate.setAttribute("caption", rows[i]['cellsArray'][4])
		liveUpdate.setAttribute("link", rows[i]['cellsArray'][5])
		
		container.prepend(liveUpdate)
	}
}

customElements.define("live-update", LiveUpdate);

let autoUpdate = null;
function updateFeed() {
	if (!autoUpdate) {
		console.log("Starting auto update...")
		$('#statistics').
			sheetrock({
				url: sheet,
				callback: handle,
				reset: true
			});
		autoUpdate = setInterval(() => {
			$('#statistics').
				sheetrock({
					url: sheet,
					callback: handle,
					reset: true
				});
		}, 30000)
	}
}


window.addEventListener("load", () => {
	updateFeed();
});

