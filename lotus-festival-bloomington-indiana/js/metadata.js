const data = {
    "url": "lotus-festival-bloomington-indiana",
    "slug": "Lotus Fest Photos",
    "title": "Lotus Fest Photos",
    "headline": "PHOTOS: A look at the 2026 Lotus Festival",
    "description": "The 33rd annual Lotus World Music and Arts Festival was Oct. 1-4, 2026.",
    "pub_date": "October 6, 2026",
    "bylines": {
        "Photos by": [
            {
                "name": "Jack Jernigan",
                "email": "jackjern@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/cc4943db-301b-4ee2-93fa-2ebeadd2573d.original.jpg",
                "bio": "Jack has worked at the IDS since 2025 and is a sports beat photographer."
            },
            {
                "name": "Katherine Maners",
                "email": "katmaner@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/e192d842-c762-470e-bdd4-eb963230c3ba.original.jpg",
                "bio": "Katherine has worked at the IDS since 2024 and is a visuals editor."
            },
            {
                "name": "Anya Minekus",
                "email": "aminekus@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/26c5ff2a-0126-4704-bba7-7a0abc2bce89.original.jpg",
                "bio": "Anya Minekus has worked at the IDS since 2025 as a photographer."
            },
            {
                "name": "Harshini Muthuraman",
                "email": "hmuthur@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/c2babb82-ff84-4c63-8155-753e3d599aaa.original.jpg",
                "bio": "Harshini has worked at the IDS since 2026 as a photographer."
            },
            {
                "name": "Aaron Smith",
                "email": "smithaac@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/787a15c4-8408-4837-9b05-94f13a31e7e9.original.jpg",
                "bio": "Aaron has worked at the IDS since 2025 and is a beat photographer."
            },
        ],
        "Design and development by": [
            {
                "name": "Lillie Donato",
                "email": "mdonato@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/892b8a83-4320-4435-804c-6eff0e6903eb.original.jpg",
                "bio": "Lillie has worked at the IDS since 2026 and currently serves as the managing editor of digital."
            }
        ]
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
