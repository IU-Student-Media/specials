const data = {
    "url": "school-shootings",
    "slug": "Changes in School Policing",
    "headline": "How one school resource officer’s job has changed",
    "title": "Changes in School Policing",
    "pub_date": "July 18 ,2023",
    "bylines": {
        "By": {
            "name": "Mia Hilkowitz",
            "email": "mhilkowi@iu.edu",
            "linkedin": "mia-hilkowitz-531499250",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/70ee4ef0-5e7d-41aa-a9a5-532661615505.original.jpg",
            "bio": "Mia has worked at IDS since 2022 as a Reporter and News editor."
        },
        "Photos by": {
            "name": "Olivia Bianco",
            "email": "obianco@iu.edu",
            
        },
        "Design and development by": {
            "name": "Rahul Suresh Ubale",
            "email": "raubale@iu.edu",
            "linkedin": "rahul-ubale",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/3c5ec873-82c3-4a00-9d7c-ba27e91b1820.original.png",
            "bio": "Managing Editor of Digital Desk"
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
    let linkedin_link = `<span><a href="https://www.linkedin.com/in/${author.linkedin}" target="_blank">LinkedIn <i class="fab fa-linkedin"></i></a></span>`;
    let email_link = `<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a
        href="mailto:${author.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>`;
    if (author.pfp && author.bio) {
        bios_html +=
            `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p> ${type} <a href="https://idsnews.com/staff/${author.name.split(' ').join('-')}" target="_blank">${author.name}</a></p>
                            <p>${author.bio}  ${author.email ? email_link : ''}   ${author.twitter ? twitter_link : ''} ${author.linkedin ? linkedin_link : ''}</p>
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
let fb = `https://www.facebook.com/idsnews`;
let twitter = `https://twitter.com/idsnews`;
let linkedin = `https://www.linkedin.com/company/indiana-daily-student/`;




document.querySelector('li#socials').innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
        `;
