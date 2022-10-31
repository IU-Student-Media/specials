function generateTerms(termJSON) {
  const termContainer = document.getElementById("termCards");

  termJSON.forEach((term) => {
    // --+ Term Card - <div> --+
    const termCard = document.createElement("div");
    termCard.classList = "card";

    // --+ Term Word --+
    //  <div> Term Card
    // +  <button> Word </button>
    //  </div>
    const termWord = document.createElement("button");
    termWord.classList = "word";
    termWord.innerHTML = term.word;

    // --+ Card Chevron --+
    //  <div> Term Card
    //    <button>
    //      Word
    // +     <i> Chevron </i>
    //    </button>
    //  </div>
    const chevron = document.createElement("i");
    chevron.classList = "fas fa-chevron-right";

    termWord.appendChild(chevron);
    termCard.appendChild(termWord);

    // --+ Term Definition --+
    //  <div> Term Card
    //    <button>
    //      Word
    //      <i> Chevron </i>
    //    </button>
    // +  <div> Definition </div>
    //  </div>
    const termDefinition = document.createElement("div");
    termDefinition.classList = "definition";
    termDefinition.style.display = "none";
    termDefinition.innerHTML = term.definition;

    termCard.appendChild(termDefinition);

    // Add new term card to container
    termContainer.appendChild(termCard);
  });
}

// ! --- Term Data ---
const termData = [
  {
    word: "Indiana Graduate Workers Coalition - United Electrical Workers (IGWC-UE)",
    definition: `The Graduate Workers Coalition - United Electrical Workers is a group of graduate students working to gain recognition as a union
            by the IU administration. The IGWC-UE unites graduate students across departments to demand better working
            conditions for graduate student workers, according to the <a href="https://www.indianagradworkers.org/union-faq-1" target="_blank">IGWC-UE website</a>.
            The IGWC-UE formed in summer 2021 when the Indiana Graduate Workers Coalition partnered with the United
            Electrical, Radio &amp; Machine Workers of America Union, an independent union representing workers in a variety
            of industries.`,
  },
  {
    word: "Strike",
    definition: `A strike is an organized refusal to work by employees
          as a form of protest, often to force an employer to comply with
          demands, according to the Oxford English Dictionary. In the case of
          the IGWC-UE, graduate student workers will refuse to teach courses,
          grade assignments and complete other tasks to show the IU
          administration the value of their work and demand better working
          conditions. On Sunday, 97.8% of graduate workers voted to strike. As
          of 2:25 p.m. Tuesday, 1,136 graduate student workers pledged to strike
          starting Wednesday, according to the IGWC-UE website. The
          <a
            href="https://www.gofundme.com/f/igwcue-strike-fund-spring-2022?member=5764894&utm_campaign=p_cp+share-sheet&utm_medium=copy_link_all&utm_source=customer"
            target="_blank"
            >IGWC-UE strike fund</a
          >
          has raised over $35,000 as of Tuesday night.`,
  },
  {
    word: "Unionization",
    definition: `According to
          <a
            href="https://www.unionplus.org/page/what-union"
            target="_blank"
            >Union Plus</a
          >, a labor union is “an organized group of workers who unite to make
          decisions about conditions affecting their work.” Forming a union
          begins with employees collaborating and united to hold collective
          bargaining power against their employer. Workers often unionize to
          advocate for higher pay, better benefits and increased representation,
          according to Union Plus.`,
  },
  {
    word: "Picket line",
    definition: `A picket line is a boundary set by workers on
          strike that they ask others not to cross to show solidarity with their
          strike, according to the Oxford English Dictionary. Crossing a picket
          line could be seen as undermining a strike.`,
  },
  {
    word: "Student Academic Appointees",
    definition: `Student Academic Appointees, often
          referred to as graduate student workers, are a group of students who
          fulfill duties such as teaching, grading and conducting research,
          according to a
          <a
            href="https://news.iu.edu/stories/2022/04/iub/05-graduate-faq.html"
            target="_blank"
            >News at IU Bloomington article</a
          >. IU SAAs receive compensation and some employee benefits for this
          work, but their hours are limited to 20 hours per week to preserve
          time for their studies. IU does not consider SAAs staff, but they do
          consider SAAs part-time employees, according to the article. SAAs
          receive compensation through stipends, grants and tuition waivers, as
          well as health and dental insurance. SAA compensation varies from
          department to department.`,
  },
];

function init() {
  generateTerms(termData);

  // Event Listeners
  document.querySelectorAll("#termCards .card").forEach((card) => {
    card.addEventListener("click", () => {
      const cardDefinition = card.querySelector(".definition");
      const cardChevron = card.querySelector(".word i");

      // Show/hide definition
      if (cardDefinition.style.display == "none") {
        // Show definition
        cardDefinition.style.display = "block";
        cardDefinition.classList.add("fadeIn");

        // Rotate chevron
        cardChevron.style.transform = "rotate(90deg)";
      } else {
        // Hide definition
        cardDefinition.style.display = "none";

        // Reset chevron rotation
        cardChevron.style.transform = "rotate(0deg)";
      }
    });
  });
}

init();
