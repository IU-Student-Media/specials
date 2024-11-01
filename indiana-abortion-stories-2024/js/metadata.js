const data = {
    "url": "indiana-abortion-stories-2024",
    "slug": "Abortion Stories",
    "headline": "'You just don't know': three women share their abortion stories",
    "title": "Abortion Stories",
    "pub_date": "Oct. 31, 2024",
    "bylines": {
        "By": {
            "name": "Natalie Fitzgibbons",
            "email": "natfitzg@iu.edu",
            "twitter": "NatalieFitz9",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/0d409e18-9d37-4340-899c-bcb3e4f977cb.original.png",
            "bio": "Natalie joined the IDS in 2022 and is currently the editor-in-chief of the Arbutus yearbook."
        },
        "Photos by": {
            "name": "Lydia Norton",
            "email": "llnorton@iu.edu",
            "twitter": "lydianorton9",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/1e6320f5-9bba-43b2-87b7-e04f2327777d.original.png",
            "bio": "Lydia is a senior studying journalism and photography. She is director of photography for Season Magazine and podcast manager for IUSTV."
            
        },
        "Design and development by": {
            "name": "Theo Hawkins",
            "email": "sohawkin@iu.edu",
            "twitter": "bytheohawkins",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/6c18d41f-8e62-4d84-863d-89e4ea4c5d6e.original.png",
            "bio": "Theo is a junior studying interactive and digital media. They are the design desk editor and a city news reporter for the IDS."
        }
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
