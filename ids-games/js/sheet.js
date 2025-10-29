function setWithExpiry(key, value, ttl) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	
	const item = JSON.parse(itemStr)

	if (!item.value) {
		return null
	}
	
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}



const gameLinks = [
	{
		name: 'crossword',
		link: 'https://docs.google.com/spreadsheets/d/1-UDcvpIp-Fm_Igm11uAGxhUsLOw6i1AV7kBk0TloSzQ/edit?gid=0',
		handler: handleCrossword,
	},
]

function handleCrossword(err, opt, res) {
	if (err) {
		console.error(err);
		return;
	}
	let rows = res.rows;//.slice(1)
	rows.sort((a, b) => new Date(b['cellsArray'][0]) - new Date(a['cellsArray'][0]));	

	let data = []
	for (let i = 1; i < rows.length; ++i) {
		const pubdate = rows[i]['cellsArray'][0]
		if ((new Date() - new Date(pubdate)) > 1 * 60 * 60 * 1000) { // pubs at 1 am
			data.push({
				pubdate: pubdate,
				byline: rows[i]['cellsArray'][1],
				link: rows[i]['cellsArray'][2],
				title: rows[i]['cellsArray'][3],
			})
		}
	}

	setWithExpiry('crossword', JSON.stringify(data), 1 * 60 * 60 * 1000) // 1 hour
}

for (const game of gameLinks) {
	if (getWithExpiry(game.name)) {
		console.log(`Game ${game.name} already stored. Skipping...`);
	} else {
		console.log(`Fetching ${game.name} sheet...`);
		$('#statistics').
			sheetrock({
				url: game.link,
				callback: game.handler,
				reset: true
			});
	}
}
