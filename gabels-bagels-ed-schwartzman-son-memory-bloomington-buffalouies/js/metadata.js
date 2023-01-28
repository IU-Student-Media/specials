const data = {
    "url": "gabels-bagels-ed-schwartzman-son-memory-bloomington-buffalouies",
    "slug": "",
    "headline": "'His talent was just undeniable': Ed Schwartzman celebrates the memory of his son through music",
    "title": "Ed Schwartzman celebrates the memory of his son through music",
    "pub_date": "Jan 27, 2023",
    "bylines": {
        "By": {
            "name": "Ruth Cronin",
            "twitter": "RuthCronin6",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/3a452156-2c93-4d76-ac25-491f994bb120.original.jpg",
            "bio": "Ruth Cronin is a sophomore studying journalism and public relations. She has been the volleyball and the local business beat reporter for the IDS, and is an intern at the Arnolt Center for Investigative Journalism at IU."
        },
        "Photos by": {
            "name": "Goodman Murphy-Smith",
            "twitter": "weekinturkey",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/14095f35-022c-4634-a5ac-f933c2b4fca0.original.jpg",
            "bio": "Goodman Murphy-Smith is a freshman studying film production. He has worked at the IDS since 2022 as a photographer."
        },
        "Design and development by": {
            "name": "Sarah Parrish",
            "email": "snparris@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/59e6628c-44a7-43f9-8989-483d6f8ab65e.sized-1000x1000.jpg",
            "bio": "Sarah has worked at the IDS since 2022 as a photographer and designer. She is a junior studying journalism and creative writing."
        },
        }
    }


// bylines
const byline_types = ["By", "Photos by", "Design and development by", "Graphics by"]
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
