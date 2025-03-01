// google sheets urls containing voting data
// Original code from : https://specials.idsnews.com/live-election-update-monroe-county-2022/

const oscars = "https://docs.google.com/spreadsheets/d/13v0ZjxjFFBemw2JCY6e31QQEiSbhGGJ3kaxilU4C2gU/edit?gid=0#gid=0";

const cont = document.getElementById('live')


// Stolen from elections, will need to  
class LiveUpdate extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title');
    const image = this.getAttribute('image');
    const para = this.getAttribute('para');
    const author = this.getAttribute('author');
    const time = this.getAttribute('time');
    const caption = this.getAttribute('caption')
    const credit = this.getAttribute('credit')
    // const link = this.getAttribute('href');
    const twitter = this.getAttribute('twitter')
    let twitter_link = `<span><a href="https://twitter.com/${twitter}" target="_blank">@${twitter}</a></span>`
    this.innerHTML = `
      <div>
      <div class="head">
      <p class="credit">${author} ${twitter ? '<br>' + twitter_link : ''}</p>
      <p class="timestamp">${new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
      </div> 
      <h3>${title}</h3>
        <figure>
        ${image ? `<img src="${image}"/>` : ``}
        <figcaption>
        ${credit ? `<p class="credit">${credit}</p>` : ``}
        ${caption ? `<p class="caption">${caption}</p>` : ``}
        </figcaption>
        </figure>
        
        <p>${para}</p>
      </div>`

  }
}

customElements.define("live-update", LiveUpdate);


// TODO: Do this responsibly with a component!
function handle(err, opt, res) {
  if (err) {
    console.error(err);
    return;
  }
  let blah = res.rows;
  console.log(blah)
  cont.innerHTML = '';

  let rows = res.rows;//.slice(1)

  rows.sort((a, b) => new Date(a['cellsArray'][0]) - new Date(b['cellsArray'][0]));

  // Start at one to skip the first row
  for (let i = 0; i < rows.length; ++i) {
    let liveUpdate = document.createElement("live-update");

    liveUpdate.setAttribute("time", rows[i]['cellsArray'][0])
    liveUpdate.setAttribute("title", rows[i]['cellsArray'][1])
    liveUpdate.setAttribute("author", rows[i]['cellsArray'][2])
    liveUpdate.setAttribute("twitter", rows[i]['cellsArray'][3])
    liveUpdate.setAttribute("para", rows[i]['cellsArray'][4])
    liveUpdate.setAttribute("image", rows[i]['cellsArray'][5])
    liveUpdate.setAttribute("caption", rows[i]['cellsArray'][6])
    liveUpdate.setAttribute("credit", rows[i]['cellsArray'][7])

    cont.prepend(liveUpdate)
  }
}


// TODO: Auto reload every minute
let autoUpdate = null;
function updateFeed() {
  if (!autoUpdate) {
    console.log("Starting auto update...")
    $('#statistics').
    sheetrock({
      url: oscars,
      callback: handle,
      reset: true
    });
    autoUpdate = setInterval(() => {
      $('#statistics').
      sheetrock({
        url: oscars,
        callback: handle,
        reset: true
      });
    }, 30000)
  }
}


window.addEventListener("load", (event) => {
  updateFeed();
});