const data = {
    "url": "nil-salary-cap-big-ten-schools",
    "slug": "Big Ten NIL",
    "headline": "Could Big Ten schools use NIL deals to circumvent salary cap?",
    "title": "Big Ten NIL",
    "pub_date": "Oct. 20, 2025",
    "bylines": {
        "By": [
			{
				"name": "Mia Hilkowitz",
			},
			{
				"name": "Nathan Shriberg",
			},
			{
				"name": "Savannah Slone",
			},
			{
				"name": "Kasey Watkins",
			},
			{
				"name": "Arnolt Center for Investigative Journalism",
			}
		],
        "Design and development by": {
            "name": "Matei Cloteaux",
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
			const name_link = data.bylines[type].name == "Arnolt Center for Investigative Journalism" ?
				  `https://arnoltcenter.org/` :
				  `https://idsnews.com/staff/${data.bylines[type].name.split(' ').join('-')}`
            bylines_html += `<p>${type} <a href="${name_link}">${data.bylines[type].name}</a></p>`;
        } else {
            bylines_html += '<p>' + type;
            for (let index in data.bylines[type]) {
				const name_link = data.bylines[type][index].name == "Arnolt Center for Investigative Journalism" ?
					  "https://arnoltcenter.org/" :
					  `https://idsnews.com/staff/${data.bylines[type][index].name.split(' ').join('-')}`
                bylines_html += ` <a href="${name_link}">${data.bylines[type][index].name}</a>`;
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
		const name_link = author.name == "Arnolt Center for Investigative Journalism" ? "https://arnoltcenter.org/" : `https://idsnews.com/staff/${author.name.split(' ').join('-')}`
        bios_html +=
            `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p>${type} <a href="${name_link}" target="_blank">${author.name}</a></p>
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
