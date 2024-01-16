const data = {
    "url": "your-url-here",
    "slug": "The First Season",
    "headline": "This is the headline",
    "title": "Buildout Template",
    "pub_date": "{insert your date in metadata.json}",
    "bylines": {
        "By": {
            "name": "Marissa Meador",
            "email": "marnmead@iu.edu",
            "twitter": "marissa_meador",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/e9b57707-14b5-4734-96e2-faddb7338f50.original.jpg",
            "bio": "Marissa has worked at the IDS since 2022 and currently serves as a managing editor."
        },
        "Photos by": {
            "name": "Jacob Spudich",
            "email": "jaspudi@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/ebe21b45-f67f-41a0-b57f-3d4253a80045.original.jpg",
            "bio": "Jacob has been at the IDS since 2021 and has been a reporter, photographer and editor.",
        },
        "Design and development by": {
            "name": "Rahul Suresh Ubale",
            "email": "raubale@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/3c5ec873-82c3-4a00-9d7c-ba27e91b1820.original.png",
            "bio": "Rahul has worked at the IDS since 2023 and currently holds the position of Developer Lead at IDS."
        },
    }
}

// bylines
const byline_types = ["By", "Photos by", "Design and development by"]
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

// document.querySelector('#bylines').innerHTML = bylines_html;
document.querySelector('.author-bios').innerHTML = bios_html;

// pubdate
// document.querySelector('#pubdate').innerHTML = "Published " + data.pub_date;

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


console.log("hello world");
console.log(bios_html);