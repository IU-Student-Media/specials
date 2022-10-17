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

// Generate articles in each section
function generateSections(dataJSON) {
  dataJSON.sections.forEach((section) => {
    generateArticles(section);
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

// Append articles into given section
function generateArticles(sectionJSON) {
  const sortedArticles = sortArticles(sectionJSON);

  // Add sorted articles to section
  sortedArticles.forEach((article, index, articleArray) => {
    // Article Image Container - <div>
    const imageContainer = document.createElement("div");
    imageContainer.classList = "col-md-4";

    // --+ Article Image Anchor +--
    //  <div>
    // +  <a> </a>
    //  </div >
    const imageLink = document.createElement("a");
    imageLink.href = article.url;
    imageLink.target = "_blank";

    // --+ Article Image +--
    //  <div>
    //    <a>
    // +     <img />
    //    </a >
    //  </div >
    const articleImage = document.createElement("img");
    articleImage.src = article.featuredImage;
    articleImage.style =
      "width:100%; object-fit: cover; height: 200px; padding-bottom:10px; text-align:center;";

    imageLink.appendChild(articleImage);
    imageContainer.appendChild(imageLink);

    // Article Description Container - <div>
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList = "col-md-8";

    // --+ Article Headline Anchor +--
    //  <div>
    // +  <a> Headline </a>
    //  </div >
    const headlineLink = document.createElement("a");
    headlineLink.classList = "hed";
    headlineLink.href = article.url;
    headlineLink.target = "_blank";
    headlineLink.innerHTML = article.headline;

    descriptionContainer.appendChild(headlineLink);

    // --+ Article Publish Date +--
    //  <div>
    //    <a> Headline </a>
    // +  <p> Publish Date </p>
    //  </div >
    const publishDate = document.createElement("p");
    publishDate.classList = "pub";
    publishDate.innerHTML = `Published ${apShortDate(article.publishDate)}`;

    descriptionContainer.appendChild(publishDate);

    // --+ Article Byline +--
    //  <div>
    //    <a> Headline </a>
    //    <p> Publish Date </p>
    // +  <p> By </p>
    //  </div >
    const byline = document.createElement("p");
    byline.classList = "byline";
    byline.innerHTML = "By ";

    // --+ Article Byline Anchor +--
    //  <div>
    //    <a> Headline </a>
    //    <p> Publish Date </p>
    //    <p>
    // +    By <a> Author </a>
    //    </p >
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

    descriptionContainer.appendChild(byline);

    // --+ Article Excerpt +--
    //  <div>
    //    <a> Headline </a>
    //    <p> Publish Date </p>
    //    <p>
    //      By <a> Author </a>
    //    </p >
    // +  <p> Excerpt </p>
    //  </div >
    const excerpt = document.createElement("p");
    excerpt.innerHTML = article.excerpt;

    descriptionContainer.appendChild(excerpt);

    // --+ Article Card +--
    //  <div>
    // +  <div> Image Container </div>
    // +  <div> Description Container </div>
    //  </div >
    const articleCard = document.createElement("div");
    articleCard.style = "margin: 10px 0";
    articleCard.classList = "row d-flex justify-content-center story-row";

    articleCard.appendChild(imageContainer);
    articleCard.appendChild(descriptionContainer);

    // --+ Section Container +--
    //  <div data-section-id = ${sectionID}>
    // +  <div> Article Card </div>
    //  </div>
    const container = document.querySelector(
      `[data-section-id=${sectionJSON.sectionID}]`
    );

    container.appendChild(articleCard);

    // --+ Article Divider +--
    //  <div data-section-id = ${sectionID}>
    //    <div> Article Card </div>
    // +  <hr />
    //  </div>
    if (index != articleArray.length - 1) {
      const divider = document.createElement("hr");
      divider.style = "width: 80%";
      container.appendChild(divider);
    }
  });
}

// !--- Article Data ---
const articleData = {
  sections: [
    {
      sectionID: "strike-coverage",
      articles: [
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
  generateSections(articleData);
}

init();
