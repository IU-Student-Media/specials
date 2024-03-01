const data = {
    "url": "fractured-but-unbroken",
    "slug": "Fractured but unbroken",
    "headline": "Fractured but unbroken",
    "title": "Fractured but unbroken",
    "pub_date": "Feb. 29 ,2024",
    "bylines": {
        "By": {
            "name": "William McDermott",
            "email": "wrmcderm@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/ce5a4a7a-4df3-4deb-b587-7cc10835eab8.original.jpg",
            "bio": "William McDermott is a senior from Richmond, Virginia, studying sports media."
        },
        "Design and development by":[ 
            {
                "name": "Arvind Kumar Nalli Kuppuswami",
                "email": "arnall@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/75a3c3b1-f180-42bd-a2d1-9c20fbe98f7d.original.jpg",
                "bio": "Arvind has been at the IDS since 2023 and is currently working as a web designer.",
            },
            {
                "name": "Juhi Desai",
                "email": "juh@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/96c6e3b2-4c11-4707-a77e-c6c3d9290912.original.jpg",
                "bio": "Juhi has been working at the IDS since 2023 as a reporter and designer."
            }
        ],
            
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

// ...

for (let type of byline_types) {
    if (data.bylines[type]) {

        if (!Array.isArray(data.bylines[type])) {
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

// ...


// ...

function setAuthorBio(type, authors) {
    if (Array.isArray(authors)) {
        for (let i = 0; i < authors.length; i++) {
            setAuthorBio(type, authors[i]);
        }
    } else {
        let twitter_link = authors.twitter ? `<span><a href="https://twitter.com/${authors.twitter}" target="_blank">Twitter <i class="fab fa-twitter"></i></a></span>` : '';
        let email_link = authors.email ? `<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a href="mailto:${authors.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>` : '';
        if (authors.pfp && authors.bio) {
            bios_html +=
                `<div class="bio">
                            <div>
                                <img src="${authors.pfp}" alt="${authors.name}">
                                <div>
                                <p>${type} <a href="https://idsnews.com/staff/${authors.name.split(' ').join('-')}" target="_blank">${authors.name}</a></p>
                                <p>${authors.bio}  ${email_link} ${twitter_link}</p>
                                </div>
                            </div>
                        </div>`;
        }
    }
}

// ...



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
