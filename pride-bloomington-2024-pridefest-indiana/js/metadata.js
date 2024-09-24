const data = {
    "url": "pride-bloomington-2024-pridefest-indiana",
    "slug": "Pridefest 2024",
    "headline": "Pridefest Bloomington 2024",
    "title": "Pridefest 2024",
    "pub_date": "Sep. 24, 2024",
    "bylines": {
        "By": {
            "name": "Lilly Luse",
            "email": "liluse@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/6c627f13-8209-48d7-8ed8-c4c11311ef71.original.jpg",
            "bio": "Lilly Luse is a senior at IU studying cinema studies and comparative literature. She has written for the arts desk as local music reporter and served as Arts editor."
        },
        "Photos by": {
            "name": "Danny William",
            "email": "dw85@iu.edu",
            "twitter": "deepwizardry_",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/ae1f99ae-600c-4223-ae7c-547be5cba4df.original.jpg",
            "bio": "Danny William is a junior studying cinematic arts. They are currently a video editor at the IDS, and worked as an opinion editor for two semesters."
        },
        "Design and development by": {
            "name": "Calvin Josenhans",
            "email": "cjosenha@iu.edu",
            "twitter": "CalvinJosenhans",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/13acda73-a88b-4fb5-bb21-8a4342e8a14c.original.jpg",
            "bio": "Calvin is a junior studying Computer Science. He has worked at the IDS since 2024 as a designer."
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
