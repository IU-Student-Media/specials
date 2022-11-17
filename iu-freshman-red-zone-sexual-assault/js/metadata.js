const data = {
    "url": "iu-freshman-red-zone-sexual-assault",
    "slug": "Red Zone",
    "headline": "The education of a freshman",
    "title": "Red Zone",
    "pub_date": "Nov. 17, 2022",
    "bylines": {
        "Written by": {
            "name": "Kayla Pallotto",
            "email": "kpallott@iu.edu",
            // "twitter": "kayla",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/5317b41a-7ecb-4b63-9bc8-e4a2e972dbf9.sized-1000x1000.jpg",
            "bio": "Kayla is a third year student at IU studying media advertising with a minor in Spanish."
        },
        "Photos and videos by": {
            "name": "Cali Lichter",
            "email": "callich@iu.edu",
            "twitter": "@calilichter",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/0ca5e629-4283-4409-8e7e-a1bbe1df8b1f.sized-1000x1000.jpg",
            "bio": "Cali Lichter is a reporter for WTIU/WFIU and IUSTV News. She anchors WTIU’s daily news show and  Newsbreak while also co-hosting IUSTV News’ entertainment news show, What’s Up Weekly. She is a junior studying broadcast and photojournalism with a dual major in Spanish linguistics."
        },
        "Design, development and graphics by": {
            "name": "Audrey Vonderahe",
            "email": "abvonder@iu.edu",
            "twitter": "a_vonderahe5",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/4b17d315-7816-4795-af0f-8364d1ac93ea.sized-1000x1000.JPG",
            "bio": "Audrey has worked at the IDS since August as a reporter. She is a second year student studying journalism and criminal Justice at IU."
        },
    }
}

// bylines
const byline_types = ["Written by", "Photos and videos by", "Design, development and graphics by"]
let bylines_html = '';
let bios_html = '';

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
            bylines_html += `<p>${type} <a href="https://idsnews.com/staff/${data.bylines[type].name.split(' ').join('-')}">${data.bylines[type].name}</a></p>`;
        } else {
            bylines_html += '<p>' + type;
            for (let index in data.bylines[type]) {
                bylines_html += ` <a href="https://idsnews.com/staff/${data.bylines[type][index].name.split(' ').join('-')}">${data.bylines[type][index].name}</a>`;
                if (index != data.bylines[type].length - 2 && index != data.bylines[type].length - 1) {
                    bylines_html += ',';
                } else if (index == data.bylines[type].length - 2) {
                    bylines_html += ' and';
                }
            }
            bylines_html += '</p>';
        }
    }

}

function setAuthorBio(type, author) {
    let twitter_link = `<span><a href="https://twitter.com/${author.twitter}" target="_blank">Twitter <i class="fab fa-twitter"></i></a></span>`;
    let email_link = `<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a
        href="mailto:${author.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>`;
    if (author.pfp && author.bio) {
        bios_html +=
            `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p>${type} <a href="https://idsnews.com/staff/${author.name.split(' ').join('-')}" target="_blank">${author.name}</a></p>
                            <p>${author.bio}  ${author.email ? email_link : ''}   ${author.twitter ? twitter_link : ''}</p>
                            </div>
                        </div>
                    </div>`;
    }
}

document.querySelector('#bylines').innerHTML = bylines_html;
document.querySelector('.author-bios').innerHTML = bios_html;

// pubdate
document.querySelector('#pubdate').innerHTML = "Published " + data.pub_date;

// title & slug
document.querySelector('title').innerHTML = data.title + ' | Indiana Daily Student';
document.querySelector('#slug').innerHTML = data.slug;

// socials
let meta_twitter = document.querySelectorAll('meta[name*="twitter"]');
let meta_og = document.querySelectorAll('meta[property*="og"]');
let fb = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;
let twitter = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fspecials.idsnews.com%2F${data.url}%2F&text=${data.headline.split(' ').join('%20')}`;
let reddit = `https://www.reddit.com/submit?title=${data.headline.split(' ').join('%20')}&url=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;

document.querySelector('li#socials').innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${reddit}" target="_blank"><i class="fab fa-reddit"></i></a>
        `;
