// TODO: replace bylines based on metadata
'use strict';

const byline_types = ["By", "Photos by", "Design and development by", "Graphics by"]
let bylines_html = '';
let bios_html = '';
fetch("../metadata.json")
    .then(response => response.json())
    .then(data => {
        bylines_html += '<p>By IDS Staff</p>';

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
            if (author.twitter && author.pfp && author.bio) {
                bios_html += `<div class="bio">
                                <div>
                                    <img src="${author.pfp}"
                                        alt="${author.name}">
                                    <div>
                                        <p>${type} <a href="https://idsnews.com/staff/${author.name.split(' ').join('-')}" target="_blank">${author.name}</a></p>
                                        <p>${author.bio}  <span style="padding-right: var(--xs); padding-left: var(--xxs);"><a
                                        href="mailto:${author.email}" target="_blank">Email <i
                                            class="fa fa-envelope"></i></a></span>   <span><a
                                                    href="https://twitter.com/${author.twitter}" target="_blank">Twitter <i
                                                        class="fab fa-twitter"></i></a></span></p>
                                    </div>
                                </div>
                            </div>`
            }
        }

        document.querySelector('#bylines').innerHTML = bylines_html;
        document.querySelector('.author-bios').innerHTML = bios_html;
    })
    .catch(err => console.log(err))
