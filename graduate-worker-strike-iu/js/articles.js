const idsSVG =
  '<svg viewBox="0 0 163.17 68.85"> <path style="fill: white" d="M0,67.77V1.08H19.89V67.77Z"></path> <path style="fill: white" d="M32.85,67.77V1.08H58.32c19.44,0,38.34,6.21,38.34,33.3,0,26.64-20.07,33.39-39.6,33.39ZM52.74,50.4h5.85c12.06,0,17.91-4.41,17.91-16s-5.67-15.3-18.81-15.3H52.74Z"></path> <path style="fill: white" d="M98.82,59l9.54-13.59c6.66,4.59,15.93,7,23.31,7,9.45,0,11.7-2.16,11.7-4.86s-2.7-3.78-12.51-4.59c-14.31-1.17-28.26-4.86-28.26-21.15C102.6,5.67,115.83,0,131,0c15.84,0,24.48,4.05,29.16,7.83l-9.9,14.31c-3.78-2.52-12.33-4.77-19-4.77s-8.73,1.08-8.73,3.69c0,3.24,2.79,4.05,12.69,4.86,14.94,1.26,28,4.14,28,20.7,0,13.5-11.52,22.23-30.87,22.23C114.66,68.85,105.84,64.53,98.82,59Z"></path> </svg>';

// Format article.publishDate according to AP style guide
function apShortDate(date) {
  const apMonthFormat = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  return `${apMonthFormat[date.month - 1]} ${date.day}, ${date.year}`;
}

// * ---| Latest Articles |---
function setReadStatus(articleURL) {
  let readArticles = window.localStorage.getItem("readArticles").split(",");

  if (!readArticles.includes(articleURL)) {
    readArticles.push(articleURL);
    window.localStorage.setItem("readArticles", readArticles);
  }
}

function getReadStatus(article) {
  let readArticles = window.localStorage.getItem("readArticles").split(",");

  if (readArticles.includes(article.url)) {
    return true;
  } else {
    return false;
  }
}

function getDatelineTag(article, index, isNewestSection) {
  const publishDate = new Date(
    article.publishDate.year,
    article.publishDate.month - 1,
    article.publishDate.day,
    article.publishDate.hour,
    article.publishDate.minute
  );

  // Check if article published within the last 14 days
  const isNew =
    new Date().getTime() - publishDate.getTime() < 14 * 24 * 60 * 60 * 1000;
  // Check if article published within the last 21 days
  const isRecent =
    new Date().getTime() - publishDate.getTime() < 21 * 24 * 60 * 60 * 1000;

  if (isNew) {
    return { text: "New", color: "white", backgroundColor: "#a22522" };
  } else if (isRecent) {
    return { text: "Recent", color: "white", backgroundColor: "#6D84B3" };
  } else if (index == 0 && isNewestSection) {
    // If page hasn't been updated in > 21 days, mark most recent article
    return { text: "Most Recent", color: "white", backgroundColor: "#a22522" };
  } else {
    return undefined;
  }
}

// Returns 3 latest articles
function getLatest(articleJSON) {
  // Get every article
  let allArticles = { articles: [] };

  articleJSON.sections.forEach((section) => {
    section.articles.forEach((article) => {
      allArticles.articles.push(article);
    });
  });

  // Sort articles & return first 3
  const sortedArticles = sortArticles(allArticles);

  return sortedArticles.slice(0, 3);
}

// Generates 'Latest Updates' section
function generateLatest(articleJSON) {
  const latestJSON = getLatest(articleJSON);

  latestJSON.forEach((article, index) => {
    const container = document.querySelector(`[data-section-id="latest"]`);
    const articleCard = createArticleCard(article, index, true);

    container.appendChild(articleCard);
  });
}

// Sorts articles in descending order (most recent first)
function sortArticles(sectionJSON) {
  return sectionJSON.articles.sort((a, b) => {
    const publishDateA = a.publishDate;
    const publishDateB = b.publishDate;

    return (
      new Date(
        publishDateB.year,
        publishDateB.month - 1,
        publishDateB.day,
        publishDateB.hour,
        publishDateB.minute
      ).getTime() -
      new Date(
        publishDateA.year,
        publishDateA.month - 1,
        publishDateA.day,
        publishDateA.hour,
        publishDateA.minute
      ).getTime()
    );
  });
}

// Returns article card element
function createArticleCard(article, index, isVertical) {
  // --+ Article Card - <div> +--
  const articleCard = document.createElement("div");
  articleCard.classList = "card";

  // --+ Top Container - <div> +--
  const topContainer = document.createElement("div");

  // --+ Article Image Anchor - <a> +--
  const imageLink = document.createElement("a");
  imageLink.classList = "image";
  imageLink.href = article.url;
  imageLink.target = "_blank";

  // --+ Article Image +--
  //    <a>
  // +     <img />
  //    </a >
  const articleImage = document.createElement("img");
  articleImage.src = article.featuredImage;

  imageLink.appendChild(articleImage);

  // --+ Article Headline Container - <div> +--
  const headlineContainer = document.createElement("div");
  headlineContainer.classList = "headline";

  // --+ Article Headline Anchor +--
  //  <div>
  // +  <a> Headline </a>
  //  </div >
  const headlineLink = document.createElement("a");
  headlineLink.href = article.url;
  headlineLink.target = "_blank";
  headlineLink.innerHTML = article.headline;

  headlineContainer.appendChild(headlineLink);

  // Article Content Container - <div> +--
  const contentContainer = document.createElement("div");
  contentContainer.classList = "content";

  if (isVertical) {
    //  --+ Vertical Structure +--
    //  <div> Article Card
    // +  <div> Top Container
    // +    <a> Image Link </a>
    // +    <div> Headline </div>
    // +  </div>
    //    ...
    //  </div>
    topContainer.appendChild(imageLink);
    topContainer.appendChild(headlineContainer);
  } else {
    //  --+ Horizontal Structure +--
    //  <div> Article Card
    // +  <a> Image Link </a>
    // +  <div> Content Container
    // +    <div> Headline </div>
    // +  </div>
    //    ...
    //  </div>
    articleCard.appendChild(imageLink);
    contentContainer.appendChild(headlineContainer);
  }

  // --+ Dateline Container - <div> +--
  const datelineContainer = document.createElement("div");
  datelineContainer.classList = "datelineContainer";

  // --+ Article Publish Date +--
  //  <div> Dateline Container
  // +  <div> Publish Date </div>
  //  </div >
  const publishDate = document.createElement("div");
  publishDate.classList = "dateline";
  publishDate.innerHTML = `Published ${apShortDate(article.publishDate)}`;

  datelineContainer.appendChild(publishDate);

  // --+ Dateline Tag +--
  //  <div> Dateline Container
  //    <div> Publish Date </div>
  // +  <div> Dateline Tag </div>
  //  </div >
  const dateTag = getDatelineTag(article, index);

  let tagData = {
    dateTag: dateTag ? dateTag : false,
    specialTag: article.url.includes("specials.idsnews.com")
      ? { text: `${idsSVG} Special`, color: "white", backgroundColor: "black" }
      : false,
  };

  Object.values(tagData).forEach((tag) => {
    if (tag) {
      const datelineTag = document.createElement("div");

      datelineTag.classList = "tag";
      datelineTag.innerHTML = tag.text;
      datelineTag.style.color = tag.color;
      datelineTag.style.backgroundColor = tag.backgroundColor;

      datelineContainer.appendChild(datelineTag);
    }
  });

  // --+ Article Byline +--
  //  <div> Meta Container
  //    <div> Dateline Container </div>
  // +  <div> Byline </div>
  //  </div >
  const byline = document.createElement("div");
  byline.classList = "byline";
  byline.innerHTML = "By ";

  // --+ Article Byline Anchor +--
  //  <div> Meta Container
  //    <div> Dateline Container </div>
  //    <div> Byline
  // +    By <a> Author </a>
  //    </div >
  //  </div >
  article.bylines.by.forEach((author, index, byArray) => {
    const bylineLink = document.createElement("a");
    bylineLink.href = `https://www.idsnews.com/staff/${author.name
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    bylineLink.target = "_blank";
    bylineLink.classList = "story-link";
    bylineLink.innerHTML = author.name;

    byline.appendChild(bylineLink);

    // Separate multiple authors
    if (byArray.length - 1 > 0) {
      if (byArray.length - 1 - index > 1) {
        byline.innerHTML += ", ";
      } else if (index != byArray.length - 1) {
        byline.innerHTML += " and ";
      }
    }
  });

  // --+ Meta Container +--
  // + <div> Meta Container
  //    <div> Dateline Container </div>
  //    <div> Byline
  //      By <a> Author </a>
  //    </div >
  // + </div >
  const metaContainer = document.createElement("div");
  metaContainer.classList = "metaContainer";

  metaContainer.appendChild(datelineContainer);
  metaContainer.appendChild(byline);

  contentContainer.appendChild(metaContainer);

  // Append article excerpt to horizontal cards
  if (!isVertical) {
    // --+ Article Excerpt +--
    //  <div> Content Container
    //    <div> Headline </div>
    //    <div> Meta Container </div>
    // +  <div> Excerpt </div>
    //  </div >
    const excerpt = document.createElement("div");
    excerpt.classList = "excerpt";
    excerpt.innerHTML = article.excerpt;

    contentContainer.appendChild(excerpt);
  }

  // --+ Button Container - <div> +--
  const buttonContainer = document.createElement("div");
  buttonContainer.classList = "buttonContainer";

  // --+ Read Button - <a> +--
  const readButton = document.createElement("a");
  readButton.classList = "readButton";
  readButton.innerHTML = "Read";
  readButton.href = article.url;
  readButton.target = "_blank";

  // --+ Read Button Indicator +--
  //  <a>
  // +  <div> Read Indicator </a>
  //  </a>
  const readIndicator = document.createElement("div");
  // readIndicator.classList = getIndicatorClass(article);
  readIndicator.dataset.url = article.url;

  // Read/unread styling
  if (getReadStatus(article)) {
    readButton.title = "Read";
    readIndicator.title = "Read";
    readIndicator.classList = "indicator read";
  } else {
    readButton.title = "Unread";
    readIndicator.title = "Unread";
    readIndicator.classList = "indicator unread";
  }

  if (isVertical) {
    // Append read indicator to 'Read' button for vertical cards
    readButton.appendChild(readIndicator);
  } else {
    // Append read indicator to card element for horizontal cards
    articleCard.appendChild(readIndicator);
    articleCard.className += " fadeIn";
  }
  buttonContainer.appendChild(readButton);
  metaContainer.appendChild(buttonContainer);

  //  --+ Vertical Article Card +--       |   --+ Horizontal Article Card +--
  //  <div> Article Card                  |   <div> Article Card
  // +  <div> Top Container </div>        |  +  <a>  Article Image </a>
  // +  <div> Content Container </div>    |  +  <div> Read Indicator </div>
  //  </div>                              |  +  <div> Content Container </div>
  //                                      |   </div>
  articleCard.appendChild(topContainer);
  articleCard.appendChild(contentContainer);

  return articleCard;
}

// ! --- Article Data ---
const articleData = {
  sections: [
    {
      sectionID: "historic-turmoil",
      header: "Historic Turmoil",
      subheader: "2019 - 2021",
      description:
        "This has been an ongoing battle between IU administration and the graduate workers for years. Our previous coverage documents each step taken throughout the way.",
      articles: [
        {
          url: "https://www.idsnews.com/article/2021/09/iu-graduate-workers-push-for-unionization",
          featuredImage:
            "https://snworksceo.imgix.net/ids/7a95b4ac-4885-4204-9235-c2593382fb21.sized-1000x1000.jpeg?w=1000",
          headline: "IU Graduate Workers push for unionization",
          excerpt:
            "Graduate workers at IU are demanding a response to what they call a lack of dignified working conditions such as unlivable pay and sizable fees to the university, IGWC spokesperson Cole Nelson said.",
          bylines: {
            by: [
              {
                name: "Ryan Costello",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 13,
            year: 2021,
            hour: 16,
            minute: 8,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/05/international-graduate-workers-file-discrimination-complaint-against-iu",
          featuredImage:
            "https://snworksceo.imgix.net/ids/a8238860-d67e-4729-b529-ec70c6e9a20a.sized-1000x1000.jpeg?w=1000",
          headline:
            "International graduate workers file discrimination complaint against IU",
          excerpt:
            "Eight graduate workers filed a discrimination complaint May 17 against IU through the Equal Employment Opportunity Commission, according to a press release from the Indiana Graduate Workers Coalition.",
          bylines: {
            by: [
              {
                name: "Phyllis Cha",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 31,
            year: 2021,
            hour: 15,
            minute: 41,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/03/iu-accuses-indiana-graduate-workers-coalition-of-trademark-violation",
          featuredImage:
            "https://snworksceo.imgix.net/ids/e83ef044-779a-4450-9e6c-70fa976edd09.sized-1000x1000.jpg?w=1000",
          headline:
            "IU accuses Indiana Graduate Workers Coalition of trademark violation",
          excerpt:
            "This comes after weeks of an ongoing fee strike by the organization meant to call attention to the cost of graduate worker fees, which range from $700 to $1,500 each semester.",
          bylines: {
            by: [
              {
                name: "Raul Moreno",
              },
            ],
          },
          publishDate: {
            month: 3,
            day: 23,
            year: 2021,
            hour: 15,
            minute: 35,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/03/graduate-workers-coalition-protest-thursday-for-no-additional-fees",
          featuredImage:
            "https://snworksceo.imgix.net/ids/411ca70f-9c06-40e4-91f0-3a3e599f3b62.sized-1000x1000.jpg?w=1000",
          headline:
            "Graduate Workers Coalition protests Thursday for no additional fees, stipends increase",
          excerpt:
            "The Graduate Workers Coalition organized a picket line Thursday in front of Bryan Hall, where Provost Lauren Robel’s office is located, as part of a fee strike asking for IU’s administration to better compensate graduate workers for their labor.",
          bylines: {
            by: [
              {
                name: "Cate Charron",
              },
              {
                name: "Swarna Gowtham",
              },
            ],
          },
          publishDate: {
            month: 3,
            day: 11,
            year: 2021,
            hour: 20,
            minute: 9,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/03/provost-robel-graduate-student-fees-tuition-paying-bills",
          featuredImage:
            "https://snworksceo.imgix.net/ids/a8238860-d67e-4729-b529-ec70c6e9a20a.sized-1000x1000.jpeg?w=1000",
          headline: "GUEST COLUMN: I can’t pay my bills with tuition remission",
          excerpt: "From Josh Davis, IU PhD candidate",
          bylines: {
            by: [
              {
                name: "Guest writer",
              },
            ],
          },
          publishDate: {
            month: 3,
            day: 10,
            year: 2021,
            hour: 14,
            minute: 18,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/02/iu-grad-students-high-fees",
          featuredImage:
            "https://snworksceo.imgix.net/ids/87008b82-de2e-4403-ad15-a8fb897128d2.sized-1000x1000.jpg?w=1000",
          headline:
            "Grad student workers disagree with IU on a big issue: How much is their work worth?",
          excerpt:
            "IU's graduate stipends are some of the lowest in the Big Ten.",
          bylines: {
            by: [
              {
                name: "Phyllis Cha",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 11,
            year: 2021,
            hour: 17,
            minute: 41,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/02/iu-graduate-student-mandatory-fees-coalition-advisory-committee",
          featuredImage:
            "https://snworksceo.imgix.net/ids/24969acc-a16e-45f7-9e28-4a05d9ef769b.sized-1000x1000.JPG?w=1000",
          headline:
            "Graduate student says he was forced to choose between IU advisory committee, workers coalition",
          excerpt:
            "Alipour said he wanted to discuss how fees were allocated with other graduate students, since they were the ones who had to pay them.",
          bylines: {
            by: [
              {
                name: "Phyllis Cha",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 10,
            year: 2021,
            hour: 10,
            minute: 58,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/01/end-iu-graduate-fees",
          featuredImage:
            "https://snworksceo.imgix.net/ids/3605e215-fca8-4d54-b1cb-b0ac5d4de0f8.sized-1000x1000.jpeg?w=1000",
          headline: "GUEST COLUMN: Ending IU graduate fees is a modest demand",
          excerpt:
            "I’m a graduate worker. The stipend I earn from IU, which is $15,750 before taxes for the 2020-21 academic year, covers all of my living expenses from rent and utilities to those obnoxiously priced textbooks (when they aren’t to be found online) to sustaining a pitiable diet.",
          bylines: {
            by: [
              {
                name: "Guest writer",
              },
            ],
          },
          publishDate: {
            month: 1,
            day: 28,
            year: 2021,
            hour: 12,
            minute: 25,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/01/indiana-graduate-workers-coalition-boycott-iu-mandatory-fees",
          featuredImage:
            "https://snworksceo.imgix.net/ids/8acd2c46-48b5-437e-bce2-983547d7041a.sized-1000x1000.JPG?w=1000",
          headline:
            "Indiana Graduate Workers Coalition calls for boycott of IU’s mandatory fees",
          excerpt:
            "The Indiana Graduate Workers Coalition announced a “fee strike” Monday in which its members will refuse to pay mandatory student fees. The group is encouraging other graduate students to join the boycott.",
          bylines: {
            by: [
              {
                name: "Emma Uber",
              },
            ],
          },
          publishDate: {
            month: 1,
            day: 11,
            year: 2021,
            hour: 22,
            minute: 38,
          },
        },
        {
          url: "https://www.idsnews.com/article/2020/01/indiana-graduate-workers-coalition-protests-mandatory-fees",
          featuredImage:
            "https://snworksceo.imgix.net/ids/fa96420c-0cb6-4b82-92c2-b6a9dac2a3e7.sized-1000x1000.jpg?w=1000",
          headline:
            "Indiana Graduate Workers Coalition protests mandatory fees",
          excerpt:
            "About 450 people gathered at the clock by Woodburn Hall Tuesday, carrying signs, blowing whistles and chanting, “Hey hey, ho ho! All these fees have got to go.”",
          bylines: {
            by: [
              {
                name: "Lily Wray",
              },
            ],
          },
          publishDate: {
            month: 1,
            day: 28,
            year: 2020,
            hour: 21,
            minute: 40,
          },
        },
        {
          url: "https://www.idsnews.com/article/2019/11/over-1400-iu-graduate-students-demand-action",
          featuredImage:
            "https://snworksceo.imgix.net/ids/0d113949-9872-454d-a580-de2f674afb6d.sized-1000x1000.jpg?w=1000",
          headline: "Over 1,400 IU graduate students demand action",
          excerpt:
            "“For all.” It’s the slogan for the IU Bicentennial campaign. It’s also a promise Denisa Jashari, an IU history Ph.D. student, said she has trouble accepting. ",
          bylines: {
            by: [
              {
                name: "Joy Burton",
              },
            ],
          },
          publishDate: {
            month: 11,
            day: 15,
            year: 2019,
            hour: 9,
            minute: 11,
          },
        },
        {
          url: "https://www.idsnews.com/article/2019/09/graduate-workers-stand-up-against-unfair-conditions",
          featuredImage:
            "https://snworksceo.imgix.net/ids/95c84eed-cf8f-4bfa-94a0-9ad78f9449ab.sized-1000x1000.jpg?w=1000",
          headline: "Graduate workers stand up against unfair conditions",
          excerpt:
            "“I lost a tooth because I couldn’t afford to go to the dentist,” read a statement from an anonymous graduate student at the town hall organized by the Indiana Graduate Workers Coalition on Thursday.",
          bylines: {
            by: [
              {
                name: "Kyra Miller",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 13,
            year: 2019,
            hour: 12,
            minute: 40,
          },
        },
      ],
    },
    {
      sectionID: "tipping-point",
      header: "Tipping Point",
      subheader: "Winter 2022",
      description:
        "Starting in the beginning of the spring 2022 semester, tensions rose significantly.",
      articles: [
        {
          url: "https://www.idsnews.com/article/2022/04/as-graduate-workers-prepare-for-strike-provost-lays-out-consequences",
          featuredImage:
            "https://snworksceo.imgix.net/ids/d4b88430-4392-4cb7-aa4d-2a46073e9327.sized-1000x1000.jpg?w=1000",
          headline:
            "As graduate workers prepare for strike, provost lays out potential consequences",
          excerpt:
            "Graduate workers will vote Sunday on whether to begin a strike next week.",
          bylines: {
            by: [
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 6,
            year: 2022,
            hour: 21,
            minute: 6,
          },
        },
        {
          url: "https://www.idsnews.com/article/2022/04/graduate-workers-contemplate-strike-bloomington-campus-officials-announce-raises",
          featuredImage:
            "https://snworksceo.imgix.net/ids/593fd583-b02f-4c29-ae85-f50dac4ce465.sized-1000x1000.jpg?w=1000",
          headline:
            "As graduate workers contemplate strike, Bloomington campus officials announce raises",
          excerpt: "The university denied the initial request in October 2021.",
          bylines: {
            by: [
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 5,
            year: 2022,
            hour: 19,
            minute: 30,
          },
        },
        {
          url: "https://www.idsnews.com/article/2022/02/iu-graduate-workers-continue-fighting-for-unionization-despite-tough-legal-environment-strike",
          featuredImage:
            "https://snworksceo.imgix.net/ids/1a5083a3-8a15-440f-bc2c-ea8107661d43.sized-1000x1000.jpg?w=1000",
          headline:
            "IU graduate workers continue fighting for unionization despite tough legal environment",
          excerpt:
            "Indiana Graduate Workers’ Coalition organizers plan to continue pressuring IU to recognize their union.",
          bylines: {
            by: [
              {
                name: "Wei Wang",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 23,
            year: 2022,
            hour: 14,
            minute: 25,
          },
        },
        {
          url: "https://www.idsnews.com/article/2022/02/graduate-workers-hold-work-in-demonstration-for-unionization",
          featuredImage:
            "https://snworksceo.imgix.net/ids/593fd583-b02f-4c29-ae85-f50dac4ce465.sized-1000x1000.jpg?w=1000",
          headline:
            "Graduate workers hold Work-In demonstration for unionization",
          excerpt:
            "The demonstration aimed to highlight the labor graduate students perform for the university.",
          bylines: {
            by: [
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 15,
            year: 2022,
            hour: 22,
            minute: 33,
          },
        },
        {
          url: "https://www.idsnews.com/article/2022/02/graduate-student-government-asks-university-administration-to-meet-and-discuss-unionization",
          featuredImage:
            "https://snworksceo.imgix.net/ids/3dbc1bf7-aca7-4394-a2c4-818853ce7f55.sized-1000x1000.jpg?w=1000",
          headline:
            "Graduate student government asks university administration to meet and discuss unionization",
          excerpt:
            "The student government’s general assembly passed a resolution on Friday supporting graduate workers’ unionization.",
          bylines: {
            by: [
              {
                name: "Wei Wang",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 8,
            year: 2022,
            hour: 22,
            minute: 12,
          },
        },
        {
          url: "https://www.idsnews.com/article/2022/02/graduate-workers-denied-union-election-say-fight-for-collective-bargaining-continues",
          featuredImage:
            "https://snworksceo.imgix.net/ids/92012edb-b2c6-4518-bed8-39ef53367c51.sized-1000x1000.jpg?w=1000",
          headline:
            "Graduate workers denied union election, say fight for collective bargaining continues",
          excerpt:
            "Graduate workers submitted 1,584 union cards to the Board of Trustees in December.",
          bylines: {
            by: [
              {
                name: "Wei Wang",
              },
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 2,
            day: 7,
            year: 2022,
            hour: 17,
            minute: 51,
          },
        },
        {
          url: "https://www.idsnews.com/article/2021/12/iu-graduate-workers-submit-union-cards-to-board-of-trustees-call-for-union-election",
          featuredImage:
            "https://snworksceo.imgix.net/ids/bdf75b8f-d01d-4e94-b24c-1d2d06ed2d3c.sized-1000x1000.jpg?w=1000",
          headline:
            "IU graduate workers submit union cards to Board of Trustees, call for union election",
          excerpt:
            "A majority of IU’s graduate workers submitted union cards petitioning for a union vote.",
          bylines: {
            by: [
              {
                name: "Wei Wang",
              },
            ],
          },
          publishDate: {
            month: 12,
            day: 10,
            year: 2021,
            hour: 18,
            minute: 24,
          },
        },
      ],
    },
    {
      sectionID: "first-strike",
      header: "First Strike",
      subheader: "Spring 2022",
      description:
        "Starting April 13, 2022, graduate workers began a strike that lasted the rest of the spring semester.",
      articles: [
        {
          url: "https://www.idsnews.com/article/2022/04/opinion-letter-going-on-strike-not-way-to-go",
          headline: "LETTER: Going on strike is not the way to go",
          excerpt:
            "The graduate workers started their strike April 13 to look for union recognition.",
          bylines: {
            by: [
              {
                name: "Letter to the Editor",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 17,
            year: 2022,
            hour: 13,
            minute: 57,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/285637f0-9a95-4ebc-961f-f423b5755b57.sized-1000x1000.png?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/iu-graduate-workers-begin-picketing-for-union-recognition",
          headline:
            "‘They don’t want to not work’: IU graduate workers begin picketing for union recognition",
          excerpt:
            "Hundreds of students picketed in support of higher pay and benefits for graduate workers.",
          bylines: {
            by: [
              {
                name: "Helen Rummel",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 15,
            year: 2022,
            hour: 9,
            minute: 0,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/eb5e1d2d-c570-4d2a-913a-63d335f7f1aa.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://specials.idsnews.com/gallery-students-graduate-strike-picketing/",
          headline: "GALLERY: Students share why they are picketing",
          excerpt:
            "After 97.8% voted in favor of authorizing a strike, IU graduate and undergraduate students began picketing Wednesday.",
          bylines: {
            by: [
              {
                name: "Emma Uber",
              },
              {
                name: "Ethan Moore",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 14,
            year: 2022,
            hour: null,
            minute: null,
          },
          featuredImage:
            "https://s3.amazonaws.com/snwceomedia/ids/09705b2c-e574-456f-823c-27d0ddf7a9fe.original.jpg",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/undergraduates-show-solidarity-with-graduate-students-through-walkout",
          headline:
            "Undergraduates show solidarity with graduate students through walkout",
          excerpt:
            "About 200 people attended, according to a speaker at the event.",
          bylines: {
            by: [
              {
                name: "Kaitlyn Radde",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 14,
            year: 2022,
            hour: 15,
            minute: 52,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/a40f9701-b31f-45eb-a673-0b7e14ddc25e.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/grad-student-strike-union-faculty-alumni-student-opinion-iu-igwc-ue",
          headline:
            "LETTERS TO THE EDITOR: Faculty, students and alumni express support for IGWC-UE strike, unionization",
          excerpt:
            "The graduate workers’ strike for union recognition began Wednesday.",
          bylines: {
            by: [
              {
                name: "Letter to the Editor",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 14,
            year: 2022,
            hour: 16,
            minute: 41,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/285637f0-9a95-4ebc-961f-f423b5755b57.sized-1000x1000.png?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/on-strike-iu-graduate-workers-strike-protest-for-union-recognition",
          headline: "On strike: scenes from the picket lines",
          excerpt:
            "IU students and faculty picket to demand union recognition for graduate student workers.",
          bylines: {
            by: [
              {
                name: "Kaitlyn Radde",
              },
              {
                name: "Helen Rummel",
              },
              {
                name: "Evan Gerike",
              },
              {
                name: "Nadia Scharf",
              },
              {
                name: "Emma Uber",
              },
              {
                name: "Nic Napier",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 14,
            year: 2022,
            hour: 12,
            minute: 59,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/6a594d70-7ffd-44ab-bf78-1e36ce34650f.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/community-members-support-graduate-workers-at-canterbury-house-with-soup",
          headline:
            "Community members support graduate workers at Canterbury House with soup",
          excerpt:
            "Volunteer cook Jessie Wang said graduate workers in their life can’t afford enough healthy food.",
          bylines: {
            by: [
              {
                name: "Kaitlyn Radde",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 13,
            year: 2022,
            hour: 14,
            minute: 33,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/d3a1731a-77e0-4009-b8f9-685dc8016864.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/graduate-workers-strike-picketing-igwc-iu",
          headline:
            "Graduate workers promoted Thursday picket lines, community solidarity at virtual meeting",
          excerpt:
            "700 IU students have already signed up to picket. The movement’s goal is 1,000.",
          bylines: {
            by: [
              {
                name: "Nadia Scharf",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 13,
            year: 2022,
            hour: 14,
            minute: 34,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/194ca88e-c85a-4dce-9d14-c667830f0171.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/graduate-workers-postpone-first-day-of-picketing-due-to-severe-weather",
          headline:
            "Graduate Workers postpone first day of picketing due to severe weather",
          excerpt: "The weather has not affected their plans to strike.",
          bylines: {
            by: [
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 13,
            year: 2022,
            hour: 9,
            minute: 29,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/2e8d6023-01b4-4d34-b289-d4966c332fa8.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/bloomington-faculty-council-votes-in-favor-of-graduate-workers",
          headline:
            "Bloomington Faculty Council votes in favor of graduate workers",
          excerpt:
            "The council voted for a resolution that supports IU graduate workers' right to strike.",
          bylines: {
            by: [
              {
                name: "Carter DeJong",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 12,
            year: 2022,
            hour: 19,
            minute: 47,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/39d8be7b-2a5f-4e1c-9213-97c0e9c83cdf.sized-1000x1000.jpeg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/graduate-workers-plan-to-strike-starting-wednesday-after-97-8-of-voters-said-yes",
          headline:
            "Graduate workers plan to strike starting Wednesday after 97.8% of voters said yes",
          excerpt:
            "They are seeking union recognition to improve graduate student working conditions.",
          bylines: {
            by: [
              {
                name: "Nic Napier",
              },
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 11,
            year: 2022,
            hour: 16,
            minute: 28,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/2e8d6023-01b4-4d34-b289-d4966c332fa8.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/graduate-workers-opened-virtual-poll-sunday-for-vote-to-authorize-strike",
          headline:
            "Graduate workers opened virtual poll Sunday for vote to authorize strike",
          excerpt:
            "The poll will close 3 p.m. Monday, and results are expected later in the day.",
          bylines: {
            by: [
              {
                name: "Hali Tauxe",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 10,
            year: 2022,
            hour: 19,
            minute: 30,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/34c5b8b6-74ba-42d5-b69e-ae24e37fa4ef.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/04/iu-graduate-workers-vote-to-continue-strike-into-third-week",
          headline:
            "IU graduate workers vote to continue strike into third week",
          excerpt:
            "The IGWC-UE has been on strike since April 13 and the extension of the strike will now take them into the third week of picketing.",
          bylines: {
            by: [
              {
                name: "Helen Rummel",
              },
            ],
          },
          publishDate: {
            month: 4,
            day: 26,
            year: 2022,
            hour: null,
            minute: null,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/2e8d6023-01b4-4d34-b289-d4966c332fa8.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/some-things-to-know-about-the-strike",
          headline:
            "Ideas and terms to know about the IU graduate worker strike",
          excerpt:
            "What is the Indiana Graduate Workers Coalition-United Electrical Workers (IGWC-UE)?",
          bylines: {
            by: [
              {
                name: "Nic Napier",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 3,
            year: 2022,
            hour: 15,
            minute: 21,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/301acadb-5e23-48a7-8cce-bb0f53f48a2b.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/iu-graduate-workers-strike-will-not-affect-graduate-student-commencement-ceremony-may-6",
          headline:
            "IU graduate workers strike will not affect graduate student commencement ceremony May 6",
          excerpt:
            "The ongoing strike should have no effect on Indiana University’s spring graduate commencement ceremony May 6, according to multiple graduate workers. ",
          bylines: {
            by: [
              {
                name: "Natalie Fitzgibbons",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 2,
            year: 2022,
            hour: 13,
            minute: 8,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/5191e29f-8b06-4d42-be42-5f80dd0bb3c2.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/theyre-asking-us-to-compromise-our-ethics-faculty-to-consider-no-confidence-vote-for-provost",
          headline:
            "‘They’re asking us to compromise our ethics’: Faculty to consider no confidence vote for provost",
          excerpt:
            "IU faculty gathered April 26 to consider a potential vote of no confidence for Provost Rahul Shrivastav.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 4,
            year: 2022,
            hour: 18,
            minute: 24,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/644b2db5-fdfe-4884-b9be-bbe7f93f1a65.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/faculty-vote-to-prevent-firing-of-graduate-workers",
          headline: "Faculty vote to prevent firing of graduate workers",
          excerpt:
            "Faculty members voted to assert that no student would be fired for striking or failing to submit grades in a special meeting of the Bloomington Faculty Council May 9.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 9,
            year: 2022,
            hour: 22,
            minute: 3,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/4b3b87ce-52a5-426b-a7dc-d57db90611f3.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/graduate-workers-vote-to-suspend-strike",
          headline: "Graduate workers vote to suspend strike",
          excerpt:
            "The IGWC-UE said they are preparing for a more disruptive strike in the fall.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 10,
            year: 2022,
            hour: 12,
            minute: 17,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/2e8d6023-01b4-4d34-b289-d4966c332fa8.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/05/graduate-students-celebrate-achievement-as-strike-continues",
          headline:
            "Graduate students celebrate achievement as strike continues ",
          excerpt:
            "IU graduate students are facing a variety of emotions heading into the commencement ceremony on May 6.",
          bylines: {
            by: [
              {
                name: "Natalie Fitzgibbons",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 12,
            year: 2022,
            hour: 12,
            minute: 0,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/6aba7014-c63e-4934-b669-bc564e6e4785.sized-1000x1000.jpg?w=1000",
        },
      ],
    },
    {
      sectionID: "recent-coverage",
      header: "Recent Coverage",
      subheader: "",
      description:
        "The IDS has been covering the IU graduate workers continued efforts to unionize over the past several months.",
      articles: [
        {
          url: "https://www.idsnews.com/article/2022/05/faculty-call-on-the-administration-to-recognize-the-graduate-worker-union",
          headline:
            "Faculty call on the administration to recognize the graduate worker union",
          excerpt:
            "1,912 of 2,900 voting-eligible faculty members filled out ballots. The resolutions will be sent to the Provost and Vice Provost for Faculty and Academic Affairs over the next few days. ",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 5,
            day: 25,
            year: 2022,
            hour: 18,
            minute: 47,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/9d23268d-6181-4121-8389-738db601ea24.sized-1000x1000.jpeg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/06/board-of-trustees-will-not-recognize-graduate-worker-union",
          headline:
            "Board of Trustees will not recognize graduate worker union",
          excerpt:
            "The IU Board of Trustees said they will not recognize the graduate worker union, despite the faculty vote calling for them to do so.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 6,
            day: 2,
            year: 2022,
            hour: 20,
            minute: 7,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/f83e89bb-eab9-4465-a63c-a15a7e20c52b.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/06/faculty-urge-board-to-reconsider-decision-on-graduate-worker-union-recognition",
          headline:
            "Faculty urge trustees to reconsider decision on graduate worker union recognition",
          excerpt:
            "More than 280 IU Bloomington faculty said they were dismayed by the board’s choice to not recognize the graduate worker union despite an overwhelming vote by faculty calling for union recognition.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 6,
            day: 16,
            year: 2022,
            hour: 20,
            minute: 22,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/5c4381e6-13f3-4b79-ae2e-46fd43f8fc8e.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/07/vivian-winston-wins-board-of-trustee-election",
          headline: "Vivian Winston wins Board of Trustee election",
          excerpt:
            "Winston told the Herald-Times the graduate worker strike should be a top priority. She said in the article she is neither pro-union nor opposed to graduate worker unionization.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 7,
            day: 3,
            year: 2022,
            hour: 13,
            minute: 36,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/ba70e4d5-08ed-4768-8326-4ac3165403a3.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/07/graduate-school-dean-steps-down-to-focus-on-diversity-at-iu",
          headline:
            "Graduate school dean steps down to focus on diversity at IU",
          excerpt:
            "The announcement comes just after Wimbush’s meeting with the Indiana Graduate Worker Coalition on July 20, where IU’s graduate task force discussed their recommendations.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 7,
            day: 27,
            year: 2022,
            hour: 15,
            minute: 15,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/6a31d2ad-5709-4402-9d51-eacc9a872b3f.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/07/indiana-graduate-workers-coalition-united-electrical-workers-condemn-new-contract-for-student-academic-appointees",
          headline:
            "Indiana Graduate Workers Coalition-United Electrical Workers condemn new contract for student academic appointees",
          excerpt:
            "The new contract involves requirements that advisors “surveil and manage” graduate workers rather than mentor them, according to the IGWC-UE website.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 7,
            day: 31,
            year: 2022,
            hour: 16,
            minute: 27,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/c063439c-ce2f-40b6-b064-8b7be4d4d996.sized-1000x1000.jpeg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/08/iu-increases-graduate-worker-stipend-waives-mandatory-fees",
          headline:
            "IU increases graduate worker stipend, waives mandatory fees",
          excerpt:
            "The new stipend is a 46% increase from last academic year. Shrivastav said the changes moved IU from the bottom of Big Ten university stipends to the top half.",
          bylines: {
            by: [
              {
                name: "Marissa Meador",
              },
            ],
          },
          publishDate: {
            month: 8,
            day: 2,
            year: 2022,
            hour: 20,
            minute: 4,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/4cbb8e37-fbe0-4ee5-8bba-20cb2259df2b.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/08/demonstrators-gather-at-joint-rally",
          headline:
            "'We’re demanding IU follows through on their promises': Demonstrators gather at joint rally",
          excerpt:
            "The event was a joint rally between the Indiana Graduate Workers Coalition-United Electric Workers, Students for a New Green World and Sunrise Bloomington.",
          bylines: {
            by: [
              {
                name: "Carter DeJong",
              },
            ],
          },
          publishDate: {
            month: 8,
            day: 28,
            year: 2022,
            hour: 18,
            minute: 35,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/5cd33cc8-be1a-4ec6-b411-2f6b46b76f37.sized-1000x1000.jpeg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/09/iu-task-force-graduate-education-waive-international-graduate-student-fees",
          headline:
            "IU Task Force on Graduate Education will waive international graduate student fees",
          excerpt:
            "Ending the international student fee was a major demand of the Indiana Graduate Workers Coalition-United Electrical Workers. The international student fee at IU was $357 per semester, or $714 per year.",
          bylines: {
            by: [
              {
                name: "Carter DeJong",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 14,
            year: 2022,
            hour: 17,
            minute: 53,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/ca3b9e86-7e62-4dd3-bb6b-72b4d7105cbe.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/09/iu-graduate-workers-vote-continue-strike-union-administration",
          headline: "IGWC-UE will vote to continue strike Sept. 25",
          excerpt:
            "The vote will decide whether to continue last semester’s strike which was suspended over the summer.",
          bylines: {
            by: [
              {
                name: "Natalie Fitzgibbons",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 16,
            year: 2022,
            hour: 8,
            minute: 0,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/a3b7a814-dedb-455f-93ed-6ec0f2e79058.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/09/graduate-worker-strike-vote-indiana",
          headline:
            "Catch up on the IU graduate workers coalition before the strike vote",
          excerpt:
            "Since the last strike ended in May, IU has announced policy changes that address the IGWC-UE’s five main demands, but has withheld union recognition.",
          bylines: {
            by: [
              {
                name: "Haley Ryan",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 25,
            year: 2022,
            hour: 17,
            minute: 57,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/d0939825-24ff-43b9-b873-dc754570f458.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/09/graduate-workers-vote-against-new-strike",
          headline: "Graduate workers vote against a new strike",
          excerpt:
            "The graduate workers voted in favor of granting the Coordination Committee the authority to set a new strike date.",
          bylines: {
            by: [
              {
                name: "Carter DeJong",
              },
            ],
          },
          publishDate: {
            month: 9,
            day: 26,
            year: 2022,
            hour: 18,
            minute: 27,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/f42bdb15-ac2b-429b-acde-f83421cdb306.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/10/iu-administration-oppose-igwc-ue-union-recognition-faculty-graduate-workers",
          headline:
            "IU administration is opposed to IGWC-UE union’s recognition. Faculty, graduate workers speculate why.",
          excerpt:
            "Anne Kavalerchik, a Ph.D. student in sociology and informatics and member of the IGWC-UE workers coordinating committee, said IU administration has not clearly stated why they are opposed to recognizing IGWC-UE as a union.",
          bylines: {
            by: [
              {
                name: "Natalie Fitzgibbons",
              },
            ],
          },
          publishDate: {
            month: 10,
            day: 4,
            year: 2022,
            hour: 17,
            minute: 48,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/d099e7a6-726c-4e17-918a-a9bbb6ac8648.sized-1000x1000.jpg?w=1000",
        },
        {
          url: "https://www.idsnews.com/article/2022/10/graduate-workers-using-canvas-support-unionization-efforts-strike-grades",
          headline:
            "How graduate workers are using Canvas, or not, to support their unionization efforts",
          excerpt:
            "Due to concerns about administrative surveillance and academic freedom, IU graduate instructors told the Indiana Daily Student the IGWC-UE has had discussions about using Canvas in a way that gives graduate workers more control over how they teach courses.",
          bylines: {
            by: [
              {
                name: "Christina Avery",
              },
            ],
          },
          publishDate: {
            month: 10,
            day: 11,
            year: 2022,
            hour: 17,
            minute: 41,
          },
          featuredImage:
            "https://snworksceo.imgix.net/ids/09579921-9c7e-4c4b-837b-20088e261774.sized-1000x1000.jpg?w=1000",
        },
      ],
    },
  ],
};

function init() {
  if (!window.localStorage.getItem("readArticles")) {
    window.localStorage.setItem("readArticles", []);
  }

  generateLatest(articleData);
}

init();
