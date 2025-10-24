class CrosswordGame extends HTMLElement {
	connectedCallback() {
		const title   = this.getAttribute('title')
		const author  = this.getAttribute('author')
		const link    = this.getAttribute('link')
		const date    = this.getAttribute('date')

		this.innerHTML = `
<a href="${link}" class="game">
  <figure>
    <img alt="crossword" src="https://s3.amazonaws.com/snwceomedia/ids/ba0c2c31-f348-43ef-a277-3df260e76a0c.original.png" />
  </figure>
  <figcaption>
    <h3>${title}</h3>
    <p class="pubdate">${date}</p>
    <p class="byline">By ${author}</p>
  </figcaption>
</a>
`
	}
}

customElements.define('crossword-game', CrosswordGame);

waitForValue(() => JSON.parse(getWithExpiry('crossword')), (crosswords) => {
	const container = document.querySelector('.archive .games')

	for (const cross of crosswords) {
		if ((new Date() - new Date(cross.pubdate)) > 1 * 60 * 60 * 1000){ // pubs at 1 am
			let game = document.createElement("crossword-game");

			game.setAttribute('title', cross.title)
			game.setAttribute('author', cross.byline)
			game.setAttribute('link', cross.link)
			game.setAttribute('date', cross.pubdate)

			container.append(game)
		}
	}
})
