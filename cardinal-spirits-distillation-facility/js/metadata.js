const data = {
    "url": "cardinal-spirits-distillation-facility",
    "slug": "Cardinal Spirits",
    "title": "‘As slow as molasses’: Inside the Cardinal Spirits distillation facility",
    "description": "A photo essay from inside Cardinal Spirits' Bloomington distillery as rum moves from cane syrup and molasses to bottled spirits and cocktails.",
    "image": "https://s3.amazonaws.com/snwceomedia/ids/b8db4fef-f1b9-4033-ae9c-dc7c01f3f510.original.jpg",
    "pub_date": "April 8, 2026",
    "bylines": {
		"Story and photos by": {
            "name": "Annabel Prokopy",
            "email": "aprokopy@iu.edu",
            "pfp": "https://s3.amazonaws.com/snwceomedia/ids/1feb24e6-801e-4bca-90e3-dd42d37e6e91.original.jpg",
            "bio": "Annabel Prokopy works on the photo desk at the IDS and co-hosts the IDS Weekly News Rundown podcast."
        },
		"Design and development by": {
			"name": "Aashish Solipuram",
			"email": "",
			"pfp": "https://s3.amazonaws.com/snwceomedia/ids/4f2b358c-78a0-4033-b8ce-e792c5e9b416.original.jpg",
			"bio": "Aashish has worked at the IDS since 2026 on the digital desk."
		}
	}
};

const byline_types = ["Story and photos by", "By", "Photos by", "Design and development by", "Graphics by"];
let bylines_html = "";
let bios_html = "";

for (const type of byline_types) {
    const authors = data.bylines[type];

    if (!authors) {
        continue;
    }

    const author_list = Array.isArray(authors) ? authors : [authors];

    author_list.forEach((author) => setAuthorBio(type, author));

    bylines_html += `<p>${type}`;

    author_list.forEach((author, index) => {
        bylines_html += ` <a href="https://idsnews.com/staff/${author.name.split(" ").join("-")}">${author.name}</a>`;

        if (index < author_list.length - 2) {
            bylines_html += ",";
        } else if (index === author_list.length - 2) {
            bylines_html += " and";
        }
    });

    bylines_html += "</p>";
}

function setAuthorBio(type, author) {
    if (!author || !author.pfp || !author.bio) {
        return;
    }

    const links = [];

    if (author.email) {
        links.push(`<span style="padding-right: var(--xs); padding-left: var(--xxs);"><a href="mailto:${author.email}" target="_blank">Email <i class="fa fa-envelope"></i></a></span>`);
    }

    if (author.twitter) {
        links.push(`<span><a href="https://twitter.com/${author.twitter}" target="_blank">Twitter <i class="fab fa-twitter"></i></a></span>`);
    }

    bios_html += `
            <div class="bio">
                <div>
                    <img src="${author.pfp}" alt="${author.name}">
                    <div>
                        <p>${type} <a href="https://idsnews.com/staff/${author.name.split(" ").join("-")}" target="_blank">${author.name}</a></p>
                        <p>${author.bio} ${links.join(" ")}</p>
                    </div>
                </div>
            </div>`;
}

document.querySelector("#bylines").innerHTML = bylines_html;
document.querySelector(".author-bios").innerHTML = bios_html;
document.querySelector("#pubdate").innerHTML = `Published ${data.pub_date}`;
document.querySelector("title").innerHTML = `${data.title} | Indiana Daily Student`;
document.querySelector("#slug").innerHTML = data.slug;

const social_url = `https://specials.idsnews.com/${data.url}/`;
const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(social_url)}`;
const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(social_url)}&text=${encodeURIComponent(data.title)}`;
const reddit = `https://www.reddit.com/submit?title=${encodeURIComponent(data.title)}&url=${encodeURIComponent(social_url)}`;

document.querySelector('meta[property="og:url"]').setAttribute("content", social_url);
document.querySelector('meta[property="og:title"]').setAttribute("content", data.title);
document.querySelector('meta[property="og:description"]').setAttribute("content", data.description);
document.querySelector('meta[property="og:image"]').setAttribute("content", data.image);
document.querySelector('meta[name="twitter:title"]').setAttribute("content", data.title);
document.querySelector('meta[name="twitter:description"]').setAttribute("content", data.description);
document.querySelector('meta[name="twitter:image"]').setAttribute("content", data.image);

document.querySelector("li#socials").innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${reddit}" target="_blank"><i class="fab fa-reddit"></i></a>
        `;
