const data = {
    "url": "perfect-season-photos-iu-football-championship",
    "slug": "Perfect Season",
    "headline": "Perfect season: Indiana football’s historic championship run",
    "title": "Perfect Season",
    "pub_date": "{insert your date in metadata.json}",
    "bylines": {
        "Photos by": [
			{
				"name": "Briana Pace",
				"email": "bpace7530@gmail.com",
				"pfp": "https://s3.amazonaws.com/snwceomedia/ids/182ec7c5-7022-44d0-876e-66ca651887b7.original.jpg",
				"bio": "Briana Pace is a senior studying journalism and political science. She currently serves as a co-visuals editor."
			},
			{
				"name": "Jimmy Rush",
				"email": "jamprush@iu.edu",
				"pfp": "https://s3.amazonaws.com/snwceomedia/ids/196dac73-e845-4a8f-8d87-584d717c263b.original.jpg",
				"bio": "Jimmy is a senior and co-visuals editor for the IDS."
			},
			{
				"name": "Lauren McKinney",
				"email": "ldmckinn@iu.edu",
				"pfp": "https://s3.amazonaws.com/snwceomedia/ids/04c1f9a8-6623-414f-91c0-783acf530624.original.jpg",
				"bio": "Lauren has worked at the IDS since 2024 as a sports photographer"
			},
			{
				"name": "Sophia Kaplan",
				"email": "sokaplan@iu.edu",
				"pfp": "https://s3.amazonaws.com/snwceomedia/ids/d4924f7b-3ec0-4471-8f19-358c6f42dcfb.original.jpg",
				"bio": "Sophia has worked at the IDS since 2024 as a sports photographer"
			},
		],
        "Design and development by": {
            "name": "Matei Cloteaux",
            "email": "mcloteau@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/582468e2-d203-46f6-bbf2-3a83a4f981ec.original.jpg",
            "bio": "Matei has worked at the IDS since 2023 for the digital desk."
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

// document.querySelector('#bylines').innerHTML = bylines_html;
document.querySelector('.author-bios').innerHTML = bios_html;

// pubdate
// document.querySelector('#pubdate').innerHTML = "Published " + data.pub_date;

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
