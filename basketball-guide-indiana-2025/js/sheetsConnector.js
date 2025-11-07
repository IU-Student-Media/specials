// google sheets urls containing voting data
// Original code from : https://specials.idsnews.com/live-election-update-monroe-county-2022/

const oscars = "https://docs.google.com/spreadsheets/d/1GErJeIoWfqzDWn3qaPSEYZPRYOKgKShb-oyvwisfesY/edit?gid=0#gid=0";

const cont = document.getElementById('mens-articles')


// Stolen from elections, will need to  
class LiveUpdate extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title');
    const image = this.getAttribute('image');
    const para = this.getAttribute('para');
    const author = this.getAttribute('author');
    const time = this.getAttribute('time');
    // const caption = this.getAttribute('caption')
    // const credit = this.getAttribute('credit')
    // const link = this.getAttribute('href');
    const link = this.getAttribute('link')
    this.innerHTML = 
    // `
    //   <div>
    //   <div class="head">
    //   <p class="credit">${author} ${twitter ? '<br>' + twitter_link : ''}</p>
    //   <p class="timestamp">${new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
    //   </div> 
    //   <h3>${title}</h3>
    //     <figure>
    //     ${image ? `<img src="${image}"/>` : ``}
    //     <figcaption>
    //     ${credit ? `<p class="credit">${credit}</p>` : ``}
    //     ${caption ? `<p class="caption">${caption}</p>` : ``}
    //     </figcaption>
    //     </figure>
        
    //     <p>${para}</p>
    //   </div>`
    `  <a target="_blank"
           href="${link}">
           <div class="article-card">
               <img
                   src="${image}">
               <div class="card-text">
                   <h3>${title}</h3>
                   <p class="credit">By ${author} &bull; ${time}</p>
                   <!-- <p class="abstract"> ${para}</p> -->
               </div>
           </div>
       </a>`

      //  TODO: Calvin says no abstract for now

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

  let rows = res.rows.slice(1)

  rows.sort((a, b) => new Date(a['cellsArray'][0]) - new Date(b['cellsArray'][0]));

  // Start at one to skip the first row
  for (let i = 0; i < rows.length; ++i) {
    let liveUpdate = document.createElement("live-update");

    liveUpdate.setAttribute("time", rows[i]['cellsArray'][0])
    liveUpdate.setAttribute("title", rows[i]['cellsArray'][1])
    liveUpdate.setAttribute("author", rows[i]['cellsArray'][2])
    // liveUpdate.setAttribute("twitter", rows[i]['cellsArray'][3])
    liveUpdate.setAttribute("para", rows[i]['cellsArray'][3])
    liveUpdate.setAttribute("image", rows[i]['cellsArray'][4])
    liveUpdate.setAttribute("link", rows[i]['cellsArray'][5])
    // liveUpdate.setAttribute("credit", rows[i]['cellsArray'][7])

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