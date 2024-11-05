// /* Doing a json feed I guess */

// // const req_url = "https://www.idsnews.com/section/election.json"
// // const req_url = "https://www.idsnews.com/section/liveelections.json"
// const req_url = "http://localhost:"
// // function makeTag(head, auth, link) {
// //   return `<a class="card-link" href="${link}" target="_blank">
// //              <div class="card update-card">
// //               <h2>${head}</h2>
// //               <div class="card-credit">
// //                 <p>${auth}</p>
// //               </div>
// //             </div>
// //             </a>`
// // }


// function loadLive() {
  
//   fetch(req_url, {
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "*/*",
//       "User-Agent": navigator.userAgent,
//     },
//     method: "GET"
//   })
//     // .then(response => console.log(response.status) || response) 
//     .then(res => res.json()) // send response body to next then chain
//     .then(data => {
      
//       // element.innerHTML = htmlStr;

//     });
// }

// loadLive();

// // Once a minute?
// setInterval(loadLive, 60 * 1000);
