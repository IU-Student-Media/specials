const data = {
    "url": "because-everybody-deserves-to-get-clean",
    "slug": "Everyone deserves to get clean",
    "headline": "Because Everybody Deserves to Get Clean",
    "title": "Woman’s Journey To Recovery",
    "pub_date": "Nov. 15 ,2023",
    "bylines": {
        "By": {
            "name": "Natalie Fitzgibbons",
            "email": "natfitzg@iu.edu",
            "twitter": "NatalieFitz9",
            "pfp": "https://ca.slack-edge.com/T0G159G5S-U03DH49DP44-b6ed860e01dc-512",
            "bio": "Natalie joined IDS in 2022 and currently holds the positions of opinion columnist and editor-in-chief of the Arbutus."
        },
        "Photos by": {
            "name": "Mira Athmarao",
            "email": "pathmar@iu.edu",
            
        },
        "Design and development by":[ 
            {
                "name": "Rahul Suresh Ubale",
                "email": "raubale@iu.edu",
                "pfp": "https://s3.amazonaws.com/snwceomedia/ids/3c5ec873-82c3-4a00-9d7c-ba27e91b1820.original.png",
                "bio": "Rahul currently holds the position of Developer Lead at IDS.",
               
            },
            {
            "name": "Juhi Desai",
            "email": "juh@iu.edu",
            
            "pfp": "https://media.licdn.com/dms/image/D5603AQElZGgMvdk5SA/profile-displayphoto-shrink_400_400/0/1698765872483?e=1704931200&v=beta&t=k1uWH6Zt8YeMIyGunxamimXA56iSJ6N_Rsm2S2U22YQ",
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
