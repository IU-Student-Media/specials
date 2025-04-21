const data = {
    "url": "little-500-guide-2025",
    "slug": "Little 500 Guide",
    "headline": "Little 500 Guide 2025",
    "title": "Little 500 Guide",
}

// bylines
const byline_types = ["By", "Photos by", "Design and development by", "Graphics by"]
let bylines_html = '';
let bios_html = '';

// title & slug
document.querySelector('title').innerHTML = data.title + ' | Indiana Daily Student';
document.querySelector('#slug').innerText = data.slug;
