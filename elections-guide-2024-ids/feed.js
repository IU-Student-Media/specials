/* Doing a json feed I guess */

// TODO: Change this when we figure out how to actually test
// And I guess use the topic you want for election night specific updates
// const req_url = "https://www.idsnews.com/section/election.json"
const req_url = "./data.json"

// Tags for each category:
// Local : city, bloomington
// State : indiana
// National: national

// TODO: Responsive css

// TODO: Add time
function makeTag(head, auth, link) {
  return `<a class="card-link" href="${link}" target="_blank">
             <div class="card update-card">
              <h2>${head}</h2>
              <div class="card-credit">
                <p>${auth}</p>
              </div>
            </div>
            </a>`
}


function loadLive() {
  // Get html refs for everything we care about
  fetch(req_url, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "User-Agent": navigator.userAgent,
    },
    method: "GET"
  })
    // .then(response => console.log(response.status) || response) 
    .then(res => res.json()) // send response body to next then chain
    .then(data => {
      const element = document.getElementById("feed-container")
      element.innerHTML = ""
      // let htmlStr = '';
      // However recent it is

      let articles = data.articles.slice(0, 5);

      articles.forEach(a => {
        let authors = a.authors.map(auth => auth.name).toString();
        let d = new Date(a.published_at);
        // let link = `https://idsnews.com/article/${d.getFullYear()}/${d.getMonth() + 1}/${a.slug}`

        // htmlStr += makeTag(a.headline, authors, link)
        var liveupdate = document.createElement("live-update");
        liveupdate.setAttribute("time",d.toLocaleTimeString('en-US',{hour: 'numeric', minute: '2-digit', hour12: true}));
        liveupdate.setAttribute("author",authors);
        liveupdate.setAttribute("title",a.headline);
        element.prepend(liveupdate)
      });

      // element.innerHTML = htmlStr;

    });
}

loadLive();

// Once a minute?
setInterval(loadLive, 60 * 1000);
