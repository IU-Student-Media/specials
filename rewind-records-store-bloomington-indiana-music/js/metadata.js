const data = {
  url: 'your-url-here',
  slug: 'Rewind Records',
  headline: '‘Anyone can shop here’: Bloomington music lovers find vintage vinyls at Rewind Records',
  title: 'Rewind Records',
  pub_date: 'Feb. 21, 2025',
  bylines: {
    'Story and photos by': {
      name: 'Abby Whited',
      email: 'abwhited@iu.edu',
      //   twitter: 'catcharron',
      pfp: 'https://s3.amazonaws.com/snwceomedia/ids/74d0b04f-a5ef-46f2-b1a3-e7fe7aa70dcd.original.jpg',
      bio: 'Abby has written for the IDS since 2024.',
    },
    'Design and development by': [
      {
        name: 'Sky Angeles',
        email: 'skyangel@iu.edu',
        pfp: 'https://s3.amazonaws.com/snwceomedia/ids/54ab6e00-9a7a-4ae9-9843-cf1be78ab4eb.original.jpg',
        bio: 'Sky has worked at the IDS since 2024 as a web developer.',
      },
      {
        name: 'Matei Cloteaux',
        email: 'mcloteau@iu.edu',
        // pfp: 'https://s3.amazonaws.com/snwceomedia/ids/582468e2-d203-46f6-bbf2-3a83a4f981ec.original.jpg',
        // bio: 'Matei has worked at the IDS since 2023 and currently serves as a web developer. ',
      },
      {
      name: 'Madhumitha Manimaran',
      email: 'mamanim@iu.edu',
      //   twitter: 'carsonology',
      // pfp: 'https://s3.amazonaws.com/snwceomedia/ids/862800f7-b6fd-46d4-a747-0ec4d09ecb4a.original.jpg',
      // bio: 'Madhumitha has worked at the IDS since 2024 as a designer.',
    },
    
  ],
  'Illustrations by': {
    name: 'Alayna Wilkening',
    email: 'awilkeni@iu.edu'
  }
  },
};

// bylines
const byline_types = ['By', 'Story and photos by', 'Design and development by', 'Design by', 'Illustrations by'];
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
      bylines_html += `<p>${type} <a href="https://idsnews.com/staff/${data.bylines[
        type
      ].name
        .split(' ')
        .join('-')}">${data.bylines[type].name}</a></p>`;
    } else {
      bylines_html += '<p>' + type;
      for (let index in data.bylines[type]) {
        bylines_html += ` <a href="https://idsnews.com/staff/${data.bylines[
          type
        ][index].name
          .split(' ')
          .join('-')}">${data.bylines[type][index].name}</a>`;
        if (
          index != data.bylines[type].length - 2 &&
          index != data.bylines[type].length - 1
        ) {
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
    bios_html += `<div class="bio">
                        <div>
                            <img src="${author.pfp}" alt="${author.name}">
                            <div>
                            <p>${type == 'Design and development by' ? 'Web development by' : type} 
                              <a href="https://idsnews.com/staff/${author.name
      .split(' ')
      .join('-')}" target="_blank">${author.name}</a></p>
                            <p>${author.bio}  ${
      author.email ? email_link : ''
    }   ${author.twitter ? twitter_link : ''}</p>
                            </div>
                        </div>
                    </div>`;
  }
}

document.querySelector('#bylines').innerHTML = bylines_html;
document.querySelector('.author-bios').innerHTML = bios_html;

// pubdate
document.querySelector('#pubdate').innerHTML = 'Published ' + data.pub_date;

// title & slug
document.querySelector('title').innerHTML =
  data.title + ' | Indiana Daily Student';
document.querySelector('#slug').innerHTML = data.slug;

// socials
let meta_twitter = document.querySelectorAll('meta[name*="twitter"]');
let meta_og = document.querySelectorAll('meta[property*="og"]');
let fb = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;
let twitter = `https://twitter.com/intent/tweet?url=https%3A%2F%2Fspecials.idsnews.com%2F${
  data.url
}%2F&text=${data.headline.split(' ').join('%20')}`;
let reddit = `https://www.reddit.com/submit?title=${data.headline
  .split(' ')
  .join('%20')}&url=http%3A%2F%2Fspecials.idsnews.com%2F${data.url}`;

document.querySelector('li#socials').innerHTML = `
        <a href="${fb}" target="_blank"><i class="fab fa-facebook"></i></a>
        <a href="${twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="${reddit}" target="_blank"><i class="fab fa-reddit"></i></a>
        `;
