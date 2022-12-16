const data = {
    "url": "afghanistan-taliban-visa-asylum-immigration-bloomington",
    "slug": "Dreaming of Afghanistan",
    "headline": "She dreams of Afghanistan",
    "title": "Dreaming of Afghanistan",
    "pub_date": "Dec. 15",
    "bylines": {
        "By": {
            "name": "Lauren Ulrich",
            "email": "laaulric@iu.edu",
            "twitter": "LaurenUlrich5",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/0190bdc1-0c2f-4792-a1c1-70e744ad20b0.sized-1000x1000.png",
            "bio": " Lauren Ulrich is a third year student at IU studying journalism and environmental studies. Lauren is a reporter at the Arnolt Center for Investigative Journalism. "
        },
        "Photos by": {
            "name": "Avery Antill",
            "email": "aantill@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/d7916c5b-cf20-404e-bd7b-c4b035078bd8.sized-1000x1000.jpg",
            "bio": " Avery Antill is a sophomore at IU majoring in Arabic and obtaining a certificate in journalism. She has worked as a photographer for the IDS and is a member of the Arabic Flagship Program. "

        },
        
        "Design, development, graphics and audio by": {
            "name": "Michael Long",
            "email": "mijlong@iu.edu",
            "twitter": "mlong39196",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/852530fa-e168-42e9-a047-c7ce597e7080.sized-1000x1000.jpg",
            "bio": "Michael Long is a senior at IU majoring in sports media. He currently works in television production with IU’s Radio and Television Services.",
        }
    }
}

// bylines
const byline_types = ["By", "Story, design and development by", "Photos by", "Design, development, graphics and audio by"]
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
            bylines_html += `<p>${type} <a target="_blank" href="https://idsnews.com/staff/${data.bylines[type].name.split(' ').join('-')}">${data.bylines[type].name}</a></p>`;
        } else {
            bylines_html += '<p>' + type;
            for (let index in data.bylines[type]) {
                bylines_html += ` <a target="_blank" href="https://idsnews.com/staff/${data.bylines[type][index].name.split(' ').join('-')}">${data.bylines[type][index].name}</a>`;
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
