const gameStats = {
	"iu-olddominion" : [
		"193 passing yards",
		"309 rushing yards",
		"1 sack",
	],
	"iu-kennesawstate" : [
		"280 passing yards",
		"313 rushing yards",
		"2 sacks",
	],
	"iu-indianastate" : [
		"379 passing yards",
		"301 rushing yards",
		"5 sacks"
	],
	"iu-illinois" : [
		"267 passing yards",
		"312 rushing yards",
		"7 sacks",
	],
	"iu-iowaaway" : [
		"233 passing yards",
		"104 rushing yards",
		"1 sack"
	],
	"iu-oregonaway" : [
		"215 passing yards",
		"111 rushing yards",
		"6 sacks"
	],
	"iu-michiganstate" : [
		"332 passing yards",
		"132 rushing yards",
		"4 sacks"
	],
	"iu-ucla" : [
		"213 passing yards",
		"262 rushing yards",
		"3 sacks"
	],
	"iu-maryland" : [
		"221 passing yards",
		"367 rushing yards",
		"0 sacks"
	],
	"iu-pennstate" : [
		"218 passing yards",
		"108 rushing yards",
		"2 sacks",
	],
	"iu-wisconsin" : [
		"305 passing yards",
		"83 rushing yards",
		"2 sacks",
	],
	"iu-purdue" : [
		"193 passing yards",
		"355 rushing yards",
		"1 sack",
	],
	"iu-ohiostate" : [
		"222 passing yards",
		"118 rushing yards",
		"5 sacks",
	],
	"iu-alabama" : [
		"192 passing yards",
		"215 rushing yards",
		"3 sacks",
	],
	"iu-oregon" : [
		"177 passing yards",
		"185 rushing yards",
		"3 sacks",
	],
	"iu-miami" : [
		"186 passing yards",
		"131 rushing yards",
		"1 sack",
	],
}

const games = document.querySelectorAll('.game');
games.forEach(g => {
	const data = g.querySelector('.data');
	for (var i = 0; i < data.children.length; i++) {
		data.children[i].innerHTML = gameStats[g.id][i];
	}
})
