"use strict";

// CANDIDATE DATA
const cardData = {
    wyatt: {
        name: "Erin Wyatt",
        website: "https://nurseerinforschoolboard.com/",
        priorities: ["Health", "Safety", "Equity", "Accessibility", "Whole Child Approach"],
        curr_position: "IU School of Nursing Ph.D. candidate",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/c9f0ddeb-4554-4424-8d22-2564c1291ba7.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "15%",
            zoom: 1
        },
        full_bio: `Erin Wyatt is one of three candidates running to represent District 1 on the MCCSC school board. Wyatt’s three children — an elementary school student, a middle school student and a high school student — all currently attend MCCSC schools.\nWyatt has experience serving as an MCCSC health services employee in 2017 and 2018. As a registered nurse of 20 years, Wyatt worked at Templeton Elementary School, where she said she witnessed the school corporation’s need for improved health services. She aims to increase the number of full-time registered nurses employed by MCCSC, as the school corporation does not meet the American Academy of Pediatrics recommendation of at least one registered nurse per 750 students.\nWyatt said Templeton, a Title 1 school, opened her eyes to the importance of the Whole Child Approach. Title 1 schools have high percentages of low-income students and receive extra government funding. While working at Templeton, Wyatt planned the first Templeton Healthapalooza to connect families with health services. She said the event helped parents find health insurance coverage for their children and taught basic community health skills such as how to treat head lice or cook affordable and healthy meals.\nNow an IU School of Nursing Ph.D. candidate researching marginalized and vulnerable populations, Wyatt said meeting students’ basic health and safety needs is the best way to achieve academic success. Her campaign platform focuses on teaching the whole child by following the Association of Supervision and Curriculum Development’s <a target="blank" href="https://www.ascd.org/whole-child">Whole Child Approach</a>. Instead of relying on test scores, Wyatt said school board members should ensure students are healthy, safe, engaged, supported and challenged. `
    },
    crouch: {
        name: "Tabetha Crouch",
        website: "https://www.facebook.com/profile.php?id=100083529374468",
        priorities: ["Safety", "Student Resource Officers", "Parent Feedback"],
        curr_position: "Communications specialist at Cook Medical ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/8345daef-34b4-4a75-8c5b-c266e8c37e30.sized-1000x1000.jpeg",
        img_spex: {
            horz: "40%",
            vert: "top",
            zoom: 1.9
        },
        full_bio: `A mother to an MCCSC elementary school student and high school student, Tabetha Crouch is running to represent District 1 on the MCCSC school board because she is concerned about school safety. If elected, Crouch said she will revamp the school corporation’s Student Resource Officer program. Instances of MCCSC students bringing guns to school, which happened as recently as last week when a <a href="https://www.idsnews.com/article/2022/09/gun-student-batchelor-middle-school-bloomington-mccsc-firearm-arrest-suspension" target="_blank">Batchelor Middle School student brought a gun on the bus</a>, have Crouch and other parents concerned about safety protocols.\nCrouch aims to arm SROs, saying armed officers are the most effective response to active shooter situations. In addition to arming officers, Crouch said her vision for the SRO program includes increased diversity amongst MCCSC officers and a stronger partnership with the Bloomington Police Department.\nBeyond school safety, Crouch said she decided to run for school board because she has spoken at MCCSC school board meetings in the past and felt her voice was not heard. Elected officials should value community feedback, Crouch said. If elected, she said she will use her experience as a communications professional working with multiple stakeholders to increase communication and transparency between the school board and parents.`
    },
    turner: {
        name: "Byron Turner",
        website: "",
        priorities: [],
        curr_position: "Director of Resident Services at LIFEDesigns Inc.",
        isIncumbent: false,
        img_url: "",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1
        },
        full_bio: `Byron Turner is one of three candidates running to represent District 1 on the MCCSC school board. Turner could not be reached for comment. He ran for the District 3 MCCSC school board seat in 2018 but lost to incumbent Martha Street.  `
    },
    hays: {
        name: "Jon Hays",
        website: "",
        priorities: ["Board Accountability", "Safety", "Parent Involvement", "Transportation"],
        curr_position: "Warehouse worker at Cook Inc. ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/c3012282-8444-43f1-a24c-f5c18e7f2a30.sized-1000x1000.jpg",
        img_spex: {
            horz: "8px",
            vert: "-10%",
            zoom: 2.5
        },
        full_bio: `From bus driver to maintenance worker to sports announcer, Jon Hays has worn many hats for MCCSC over the past 21 years. Throughout all these roles, Hays kept score for the Bloomington High School South basketball teams. He said his roles in transportation, maintenance and athletics give him insight into the daily operations of MCCSC.\nIf elected, Hays said he will focus on improving MCCSC transportation. The school corporation experienced a bus driver shortage and failing routing software at the start of this school year, resulting in <a href="https://www.idsnews.com/article/2022/08/mccsc-combats-transportation-issues-with-cash-incentives" target="_blank">major bus delays</a>. Hays said he understands the common sense and logistical issues behind transportation and maintenance problems in a way other candidates do not. As a blue-collar worker, he feels the school board only operates in the interest of certain privileged students and he wants to give students from a variety of backgrounds a voice, he said. He plans to solve this issue through increased board transparency and parent involvement.`
    },
    oneill: {
        name: "Daniel O’Neill",
        website: "https://www.oneill4ed.com/",
        priorities: ["Referendum", "Civic Participation", "Career Readiness", "Health, Remediation Programs", "High Ability Programs"],
        curr_position: "Chair of the Anatomy/Physiology and Physical Science Department at Ivy Tech-Bloomington",
        isIncumbent: false,
        img_url: "",
        full_bio: `Daniel O’Neill is one of three candidates running to represent District 3 on the MCCSC school board. According to his <a href="https://www.oneill4ed.com/" target="_blank">campaign website</a>, O’Neill is a lifelong learning enthusiast. He graduated from Bloomington High School North in 1999 and was immediately hired by Tri-North Middle School as the Science Olympiad Coach at just 17 years old. O’Neill continued to work in MCCSC at Tri-North and later Bloomington High School North while earning a degree at IU. O’Neill eventually left MCCSC to teach at IU for 10 years and now serves as the chair of the Anatomy/Physiology and Physical Science Department at the Bloomington Ivy Tech Community College campus. \nO’Neill applies his experience to his campaign platform, which focuses on the educational content being taught in MCCSC schools. O’Neill feels public schools must prepare students to be responsible citizens in our participatory democracy by teaching critical thinking, according to his platform. Additionally, O’Neill’s platform states public education must equip students with the skills to earn a dignified living while also being happy and healthy.\nO’Neill said these goals cannot be met without curricula tailored to students with a variety of learning styles and needs. O’Neill’s platform emphasizes the importance of developing remediation programs to aid students who have fallen behind while simultaneously ensuring the existence of a rigorous curriculum to challenge high-achieving students. His platform notes that programming tailored to high achieving students must be available to all students, including those from disadvantaged backgrounds who have been historically overlooked for such programs.\nO’Neill is a strong advocate for the <a href="https://www.idsnews.com/article/2022/09/monroe-county-2022-mccsc-referendum-property-tax" target="_blank">MCCSC referendum</a>. He served as the principle campaign manager for the 2016 Yes for MCCSC campaign to rally voter support for the referendum. He continues to support the 2022 referendum.`
    },
    pirani: {
        name: "Ashley Pirani",
        website: "https://www.facebook.com/Ashley-Pirani-for-MCCSC-School-Board-100530199464160/",
        priorities: ["Teacher Retention", "School Boundaries", "Equity", "Safety", "Mental Health", "IEPs"],
        curr_position: "Operations Manager at Shine Insurance ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/6a97f6b8-fe6f-450d-9a05-c699d43d5d56.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1
        },
        full_bio: `Ashley Pirani said she hears teachers’ pleas for increased funding and support as president of the Highland Park Elementary Parent Teacher Organization. If elected to represent District 3 on the MCCSC school board, Pirani said she will prioritize supporting teachers and other staff in hopes of increasing retention and combating the Indiana teacher shortage.\nAdditionally, Pirani hopes to reassess school district boundaries as she said they have not been changed in almost 30 years — in which time Monroe County’s population has increased significantly. She said people don’t realize boundaries are an equity issue because districts that fail to account for the population can cause resource strains for overpopulated schools.\nWith regards to school safety, Pirani wants to keep guns out of school — which includes not arming Student Resource Officers. Instead of arming SROs, Pirani supports addressing gun violence at the root cause by providing quality mental health services. \nPirani said she chose to run for school board after hearing some alarming ideas about book banning and white-washing history. She said she aims to stop those beliefs from gaining a foothold within MCCSC.\nAs a current <a href="https://beaconinc.org/" target="_blank">Beacon Inc.</a> board member, a previous Beacon Development Committee chair and a <a href="https://www.thepersisterhoodworkshop.org/" target="_blank">The Persisterhood Workshop</a> advisory board member, Pirani devotes much of her time to serving on boards of local nonprofits. Yet, Pirani said one of her most important qualifications is her experience as a mother to two MCCSC students, including one with an Individualized Education Program. IEPs present their own benefits and challenges to navigating the school system, something Pirani said gives her a different perspective than many MCCSC parents.`
    },
    shurr: {
        name: "Brandon Shurr",
        website: "https://www.facebook.com/profile.php?id=100057192080560",
        priorities: [],
        curr_position: "IU Senior Assistant Director of Community Engagement",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/ba04acc0-5bd1-4aed-999d-1682e76be727.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "10%",
            zoom: 1
        },
        full_bio: `Brandon Shurr is running unopposed to represent District 7 on the MCCSC school board. As the only MCCSC incumbent candidate, Shurr has been a member of the school board since 2018. Prior to his 2018 victory, Shurr lost a close race in 2014 after earning 49% of the vote. He currently serves as the MCCSC school board president.  \nShurr declined to be interviewed by the IDS and said readers should focus their attention on the races with multiple candidates.`
    },
    kerr: {
        name: "Dana Kerr",
        website: "",
        priorities: ["Ready Schools", "Career Readiness", "STEAM Learning", "Project-based Learning", "Preschool", "Facilities "],
        curr_position: "Attorney at Kerr Law",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/c249d959-6d2f-46c4-a608-4541d0f5a580.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "10%",
            zoom: 1
        },
        full_bio: `The current R-BB school board president, Dana Kerr is running for his fifth term representing the Richland District on the board. Kerr has been a school board member for four terms and currently serves as the board president. He said his experience means he understands the intricacies of the school board’s procedures. When asked why he wants to continue his work on the school board, Kerr said he sees an opportunity to expand and improve initiatives he helped begin, such as the Ready Schools program and R-BB preschools.\nReady Schools focuses on innovative learning, career preparedness and community engagement by promoting life skills and project-based learning. Kerr said R-BB needs to set students up for success after graduation, whatever that may look like. A proponent of the Ready Schools program, he wants to continue funding science, technology, engineering, art and math resources such as the robotics program or the innovation lab equipped with video audio recording areas. The Ready Schools program also offers career experiences including local internships and a student-run coffee shop. Kerr said success does not look the same for all students and he wants to continue supporting Ready Schools to help students understand their wide array of career options.\nPreschool is another program Kerr wants to develop. R-BB opened a new preschool facility designed to house 100 students in March 2022. Enrollment filled up in about 20 minutes. Kerr said the significant demand for a larger preschool system is something he noticed and aims to prioritize if reelected for school board.  `
    },
    boehm: {
        name: "Karl Boehm ",
        website: "",
        priorities: ["COVID-19 Learning Loss", "In-Person Instruction", "Parent Involvement "],
        curr_position: "Full-time dad",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/fca278aa-5684-4633-8e87-c785b6233de3.sized-1000x1000.jpg",
        full_bio: `Karl Boehm is one of two candidates running to represent the Richland District on the R-BB school board. A full-time father to four R-BB students, Boehm said he has more incentive than almost anyone to ensure students receive a quality education. The R-BB school board needs a stronger parent voice, he said.\nBoehm said he decided to run for school board after witnessing firsthand the detrimental impact of the COVID-19 pandemic and e-learning on education. Boehm volunteered as a substitute teacher when R-BB experienced a dire substitute shortage during the pandemic. During his time teaching, he said he learned children do not retain information well through e-learning. One moment that stands out to Boehm is when he taught a class basic subtraction on the white board in mere minutes after many students had spent weeks struggling to learn the concept through Chromebook activities.\nLaptops should not be used as babysitters or tools for classroom management, Boehm said. If elected, he said he plans to advocate for the students who fell behind during the pandemic. Boehm said he supports a return to traditional instruction without Chromebooks or other technology to promote classroom engagement.`
    },
    jacobs: {
        name: "Angela Jacobs",
        website: "https://www.facebook.com/groups/2090458954357691",
        priorities: [],
        curr_position: "",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/115c001a-445f-41dc-9f86-8a9b5dd3a1b8.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "25%",
            zoom: 1
        },
        full_bio: `Angela Jacobs is an incumbent running unopposed to represent the Bean Blossom District on the R-BB school board. Jacobs could not be reached for comment. `
    },
}

const candidateNames = ["wyatt", "crouch", "turner", "hays", "oneill", "pirani", "shurr", "kerr", "boehm", "jacobs"];

function generateCard(name, modal = false) {
    let priorities = '';
    cardData[name].priorities.forEach((item) => {
        priorities += `<li><p>${item}</p></li>`;
    })

    let full_bio = '';
    if (modal) {
        cardData[name].full_bio.split('\n').forEach((graf, i) => {
            if (i === 0) {
                full_bio += `<p><strong>Full bio:</strong> ${graf}</p>`
            } else {
                full_bio += `<p class="full-bio">${graf}</p>`
            }
        })
    }

    let html = `
        <div class="candidate ${cardData[name].isIncumbent ? 'incumbent' : ''}">
        ${modal ? `<div id="closer"><i class="fa fa-times" aria-hidden="true"></i></div>` : ''}
            <p class="name"><strong>${cardData[name].website ? `<a href="${cardData[name].website}" target="_blank">` : ""}${cardData[name].name}${cardData[name].website ? '</a>' : ""}</strong></p>
            ${cardData[name].img_url ?
            `<div class="square-frame">
                <img style="${cardData[name].img_spex ? `transform:scale(${cardData[name].img_spex.zoom});object-position:${cardData[name].img_spex.horz} ${cardData[name].img_spex.vert};` : ''}" src="${cardData[name].img_url}"
                    alt = "Portrait of ${cardData[name].name}" >
            </div > `
            : ''}
            ${cardData[name].priorities.length
            ? `<ul>
                    <li>
                        <p><strong>Priorities:</strong> </p>
                    </li>
                    ${priorities}
                </ul>`
            : `<p><em>${cardData[name].name.split(' ')[1]} did not respond to IDS request for comment about campaign priorities.</em></p>`
        }
        ${cardData[name].curr_position ? `<p><strong>Current position:</strong> ${cardData[name].curr_position}</p>` : ''}
        ${modal ? full_bio : ''}
        ${!modal
            ? `<button class="modal-btn" id="${name}">
                    Full bio
                </button>` : ''}
                </div>`;

    return html;
}

// INSERT CANDIDATE CARDS
candidateNames.forEach((name) => {
    const baseDiv = document.querySelector(`#${name}`);
    baseDiv.outerHTML = generateCard(name);
})

// MODAL FUNCTIONALITY
const modalButtons = document.querySelectorAll('button.modal-btn');
const modal = document.querySelector('#modal');
const bkg = document.querySelector('.bkg-cover');
const card = document.querySelector('#modal .candidate');


window.onclick = function (event) {
    const closer = document.querySelector('i.fa.fa-times');
    if (event.target === modal || event.target === closer) {
        hideModal();
    }
}

function showModal() {
    // reveal the modal
    modal.style.opacity = 1;
    bkg.style.opacity = 1;
    bkg.style.pointerEvents = 'auto';
    modal.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';

    console.log(this)

    // insert candidate's content
    if (cardData[this.id.toString()]) {
        modal.innerHTML = generateCard(this.id, true);
    }
}
function hideModal() {
    // hide the modal
    modal.style.opacity = 0;
    modal.style.pointerEvents = 'none';
    bkg.style.opacity = 0;
    bkg.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto';

    // clear out modal content
    modal.innerHTML = '';
}

modalButtons.forEach((button) => {
    button.addEventListener('click', showModal)
})