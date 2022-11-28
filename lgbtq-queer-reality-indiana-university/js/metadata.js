const data = {
    "url": "lgbtq-queer-reality-indiana-university",
    "slug": "The facade of inclusion",
    "headline": "‘It’s the little things’: The reality of being queer at IU",
    "title": "The reality of being queer at IU",
    "pub_date": "Nov. 28, 2022",
    "bylines": {
        "By": {
            "name": "Emma Herwehe",
            "email": "eherwehe@iu.edu",
            "twitter": "EmmaHerwehe",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/eb1db1e4-0313-4200-9956-5cff3d12e91a.sized-1000x1000.jpg",
            "bio": "Emma is a news editor at the IDS. She has worked at the IDS since 2021 and has previously been a State Government reporter on the news desk. She is a sophomore majoring in journalism and minoring in political science."
        },
        "Photos by": {
            "name": "Cora Shaw",
            "email": "shawcora@iu.edu",
            "twitter": "corashaww",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/8c6b67b9-1b85-4ecb-b037-a8283a7652de.sized-1000x1000.jpg",
            "bio": "Cora is a freshman studying Media Advertising. She works for the IDS as a photographer."
        },
        "Design and development by": {
            "name": "Emily Williams",
            "email": "enwillia@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/a49c92b8-4959-474b-8e36-4f004f3db718.sized-1000x1000.png",
            "bio": "Emily has worked at the IDS since 2020 as a illustrator and graphic and digital designer. She is currently a graduate student at the Luddy School of Informatics, Computing, and Engineering."
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
            if (data.bylines[type].name != 'Emily Williams') {
                bylines_html += `<p>${type} <a href="https://idsnews.com/staff/${data.bylines[type].name.split(' ').join('-')}">${data.bylines[type].name}</a></p>`;
            } else {
                bylines_html += `<p>${type} ${data.bylines[type].name}</p>`;
            }
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
                            <p>${type} ${author.name != 'Emily Williams' ? `<a href="https://idsnews.com/staff/${author.name.split(' ').join('-')}" target="_blank">` : ''}${author.name}${author.name != 'Emily Williams' ? '</a>' : ''}</p>
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
