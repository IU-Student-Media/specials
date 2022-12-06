const data = {
    "url": "substance-abuse-recovery-bloomington-indiana",
    "slug": "Reinventing recovery",
    "headline": "Seeking sobriety amidst a culture of parties and drugs",
    "title": "Reinventing recovery",
    "pub_date": "Dec 6. 2022",
    "bylines": {
        "By": {
            "name": "Cam Garber",
            "email": "garberc@iu.edu",
            "twitter": "garber_cameron",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/ec9c7fd4-6f8d-42d4-97f1-9a74dfaebb77.sized-1000x1000.jpg",
            "bio": "Cameron Garber is a senior at IU majoring in news reporting and editing with a minor in Spanish. He hails from the town of Hinsdale, Illinois and dreams of one day being shouted at for a groundbreaking work of investigative journalism. When he’s not delivering pizzas on the weekends, Cameron can be found holed away in his room reading or frequenting the myriad movie theaters around Bloomington."
        },
        "Photos and video by": {
            "name": "Olivia Oliver",
            "email": "ooliver@iu.edu",
            "twitter": "oliviagoliver",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/56ca67b2-19fc-4b92-9c0d-e9fb23e53d58.sized-1000x1000.jpg",
            "bio": "Olivia Oliver is a Broadcast Journalism and Public Relations student at Indiana University with a minor in International Studies. She is also an Ernie Pyle Scholar and is pursuing a career in broadcast and television producing, as well as investigative reporting. She is originally from Greenwood, Indiana."
        },
        "Graphics, design and audio by": {
            "name": "Evan Shaw",
            "email": "shaweva@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/2ee47dcf-e770-4f03-8a2d-9f2ff9da91f2.sized-1000x1000.jpeg",
            "bio": "Evan Shaw is a Media School student with minors in Arabic and Spanish. Evan is a volunteer DJ at WFHB for a variety of shows."



        },

    }
}


// bylines
const byline_types = ["By", "Photos and video by", "Graphics, design and audio by",]
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
