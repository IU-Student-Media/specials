const data = {
  url: "big-ten-buyout-indiana-archie-miller",
  slug: "Big Ten Buyouts",
  headline: "Big Ten schools spend millions clearing coaching rosters",
  title: "Big Ten Buyouts",
  pub_date: "Oct. 9, 2022",
  bylines: {
    By: [
      {
        name: "Nic Napier",
        email: "npnapier@iu.edu",
        twitter: "@nicnapier1",
        pfp: "https://s3.amazonaws.com/snwceomedia/ids/5d58dc72-38e4-4932-83a5-91c75a241449.sized-1000x1000.png",
        bio: "Nic is a junior studying journalism and informatics. He has worked at the IDS for four semesters, serving as a news reporter, managing reporter, news editor and managing editor",
      },
      {
        name: "Nadia Scharf",
        email: " njscharf@iu.edu",
        twitter: "@nadiaascharf",
        pfp: "https://s3.amazonaws.com/snwceomedia/ids/32dbdd9d-461f-454b-91be-28430ee5356a.sized-1000x1000.jpg",
        bio: "Nadia has worked at the IDS since 2021 as a reporter, arts desk editor and managing editor. ",
      },
    ],
    "Design and development by": {
      name: "Ally Schmitt",
      email: "schmita@iu.edu",
      pfp: "https://s3.amazonaws.com/snwceomedia/ids/21bb33f7-6880-41cb-919d-5919aee6a444.sized-1000x1000.JPG",
      bio: "Ally is a senior studying public relations. She is a designer on the IDS digital team.",
    },
    "Graphics by": {
      name: "Haripriya Jalluri",
      email: "hjalluri@iu.edu",
    },
  },
};

// bylines
const byline_types = [
  "By",
  "Photos by",
  "Design and development by",
  "Graphics by",
];
let bylines_html = "";
let bios_html = "";

for (let type of byline_types) {
  if (data.bylines[type]) {
    if (data.bylines[type].length) {
      data.bylines[type].forEach((author) => setAuthorBio(type, author));
    } else {
      setAuthorBio(type, data.bylines[type]);
    }
  }
}

for (let type of byline_types) {
  if (data.bylines[type]) {
    if (!data.bylines[type].length) {
      bylines_html += `<p>${type} <a href="https://idsnews.com/staff/${data.bylines[
        type
      ].name
        .split(" ")
        .join("-")}">${data.bylines[type].name}</a></p>`;
    } else {
      bylines_html += "<p>" + type;
      for (let index in data.bylines[type]) {
        bylines_html += ` <a href="https://idsnews.com/staff/${data.bylines[
          type
        ][index].name
          .split(" ")
          .join("-")}">${data.bylines[type][index].name}</a>`;
        if (
          index != data.bylines[type].length - 2 &&
          index != data.bylines[type].length - 1
        ) {
          bylines_html += ",";
        } else if (index == data.bylines[type].length - 2) {
          bylines_html += " and";
        }
      }
      bylines_html += "</p>";
    }
  }
}

function setAuthorBio(type, author) {
  let twitter_link = `<span><a href="https://twitter.com/${author.twitter}" target="_blank">Twitter <i class="fab fa-twitter"></i></a></span>`;
  let email_link = `<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a
        href="mailto:${author.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>`;
  if (author.pfp && author.bio) {
    bios_html += `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p>${type} <a href="https://idsnews.com/staff/${author.name
        .split(" ")
        .join("-")}" target="_blank">${author.name}</a></p>
                            <p>${author.bio}  ${author.email ? email_link : ""
      }   ${author.twitter ? twitter_link : ""}</p>
                            </div>
                        </div>
                    </div>`;
  }
}

document.querySelector("#bylines").innerHTML = bylines_html;
document.querySelector(".author-bios").innerHTML = bios_html;

// pubdate
document.querySelector("#pubdate").innerHTML = "Published " + data.pub_date;

// title & slug
document.querySelector("title").innerHTML =
  data.title + " | Indiana Daily Student";
document.querySelector("#slug").innerHTML = data.slug;

// socials
let meta_twitter = document.querySelectorAll('meta[name*="twitter"]');
let meta_og = document.querySelectorAll('meta[property*="og"]');
let fb = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;
let twitter = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fspecials.idsnews.com%2F${data.url
  }%2F&text=${data.headline.split(" ").join("%20")}`;
let reddit = `https://www.reddit.com/submit?title=${data.headline
  .split(" ")
  .join("%20")}&url=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;

document.querySelector("li#socials").innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${reddit}" target="_blank"><i class="fab fa-reddit"></i></a>
        `;