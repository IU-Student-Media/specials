// generate modal pop up on click for each "More..." anchor tag
'use strict';

const modalData = {
    young: {
        name: "Todd Young",
        party: "Republican",
        website: "https://toddyoung.org/issues/",
        priorities: ["Inflation", "Border Control", "Holding China Accountable", "Constitutional Judges", "Pro-police", "Anti-abortion", "Gun rights", "Veteran support"],
        curr_position: "U.S. Senator (R-Ind.)",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/c9794f7c-1f77-44b0-9aaf-7f2957a9d221.sized-1000x1000.jpg",
        full_bio: `Todd Young, a Republican, is currently one of two U.S. senators from Indiana and is running for reelection. He won his first election in 2010, when he won the congressional seat for Indiana’s 9th District, and was reelected in 2012 and 2014. When former Republican Senator Dan Coats retired, Young announced his candidacy for Coats’ Senate seat and was elected in 2016. \nAccording to his <a target="_blank" href="https://toddyoung.org/issues/">campaign website</a>, Young’s key issues include combatting inflation, confirming constitutionalist judges such as Amy Coney Barrett, supporting law enforcement and promoting Second Amendment rights and the pro-life movement. Young’s website states he is also concerned with supporting veterans and small businesses along with opposing China internationally. \nDuring his time in the Senate, Young is best known for his support of the Endless Frontier Act, which invested in science and technology education, and for writing the Law Enforcement Mental Health and Wellness Act, which led to increased police mental health funding. Young also has an A+ rating from both the National Right to Life and Susan B. Anthony List and the National Rifle Association, according to his website.`
    },
    mcdermott: {
        name: "Thomas McDermott, Jr.",
        party: "Democrat",
        website: "https://www.gomcdermott.com/about/",
        priorities: ["Small Businesses", "Healthcare", "Pro-choice", "Gun Control/Safety", "Education", "Environment", "Veteran Support", "Marijuana Legalization", "Rural Development", "Voting Rights"],
        curr_position: "Mayor of Hammond, Indiana",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/e0e7409e-f47b-443a-a12e-da813d45f84f.sized-1000x1000.jpg",
        full_bio: `Thomas McDermott, Jr. is the Democratic nominee for U.S. senator and the current mayor of Hammond, Indiana. He’s the longest-serving mayor in Hammond history, first taking office in 2004, and he is currently serving his fifth term, according to his <a target="_blank" href="https://www.gomcdermott.com/about/">campaign website</a>. \nAs listed on his website, McDermott's key issues include protecting voting and reproductive rights, supporting education and promoting clean energy use. These issues align with the Democratic party’s <a target="_blank" href="https://democrats.org/where-we-stand/party-platform/">official platform</a>. He also supports legalizing cannabis and opposes ownership of military-style assault rifles, though he said he owns a gun. \nMcDermott stressed the importance of supporting small businesses, which he <a target="_blank" href="https://www.gomcdermott.com/issues/">said</a> he accomplished as mayor of Hammond, and improving rural development. Given his history as a U.S. Navy veteran, he supports reforming veterans’ services and opposes assault rifles. `
    },
    sceniak: {
        name: "James Sceniak",
        party: "Libertarian",
        website: "https://www.sceniakforsenate.com/priorities/",
        priorities: ["Healthcare", "Anti-Vaccine Mandates", "Marijuana Legalization", "Veteran Support", "Inflation", "Lower Gov. Spending", "Criminal Justice Reform", "Gun Rights", "Pro-choice"],
        curr_position: "Behavior therapist for children with autism",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/bab51df9-8b7c-47e2-bb80-f90934591d94.sized-1000x1000.jpg",
        full_bio: `James Sceniak is an Indiana Libertarian running for U.S. Senate. He works as a behavior therapist for children with autism and is from Northern Indiana, according to his <a href="https://www.sceniakforsenate.com/priorities/" target="_blank">website</a>. \nSceniak’s priorities, listed on his website, include veteran care, criminal justice reform, right to abortion and protection of Second Amendment rights. His website also states he wants to end deficit spending, reduce inflation and government spending, increase medical freedom by legalizing medical marijuana on a federal level, and eliminate vaccine mandates. `
    },
    fyfe: {
        name: "Matthew Fyfe",
        party: "Democrat",
        website: "https://mattfyfe.com/why/",
        priorities: ["Education", "Healthcare", "Environment", "Worker Rights", "Broadband Access", "Criminal Justice Reform", "Veteran Support", "Marijuana Legalization", "Rural Development", "Small Businesses"],
        curr_position: "Math teacher",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/adfc2f68-17a6-4839-83bd-785edb03ecf8.sized-1000x1000.jpg",
        full_bio: `Matthew Fyfe, a math teacher at Bloomington High School North, is the Democratic nominee for Indiana’s 9th Congressional District for the U.S. House of Representatives. The position was formerly held by Republican Trey Hollingsworth, who is not seeking reelection. \nA union leader and lifelong Hoosier, Fyfe told <a href="https://ballotpedia.org/Matthew_Fyfe#Campaign_themes" target="_blank">Ballotpedia</a> as a representative, he would prioritize local issues. He stated that he’s passionate about education, healthcare and environmental policies. On his <a href="https://mattfyfe.com/why/" target="_blank">website</a>, he adds providing support for veterans, creating jobs, cutting wasteful spending and ending corruption to his list of key issues. \nFyfe supports legalizing cannabis federally and said tax revenue from legalization could support substance abuse and addiction resources, another issue facing southern Indiana. Nationally, he stated that he supports a woman’s right to choose and he supports safe and legal immigration with secure borders. He <a href="https://mattfyfe.com/why/#1657310200283-8bc08383-609f" target="_blank">said</a> he supports the Second Amendment and responsible gun ownership but wants to work to make communities safer. `
    },
    houchin: {
        name: "Erin Houchin",
        party: "Republican",
        website: "https://www.erinhouchin.com/about/",
        priorities: ["Anti-abortion", "Gun Rights", "Pro-police", "Lower Gov. Spending", "Border Control", "Broadband Access", "Lower Taxes", "Inflation", "Small Businesses", "Education"],
        curr_position: "Indiana State Senate (until early 2022)",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/9bc1aedd-d3f6-44a4-a60f-798df1a56ef7.sized-1000x1000.jpg",
        full_bio: `Erin Houchin is the Republican nominee to represent Indiana’s 9th Congressional District. Houchin has previously served in the Indiana State Senate, representing District 47 from 2014 to early 2022, when she stepped down to focus on her campaign, according to <a href="https://www.whas11.com/article/news/politics/erin-houchin-9th-district-race-gop-candidate-indiana/417-1a59dd38-303f-4d10-9e79-a92436a101aa" target="_blank">WHAS</a>. She ran for the 9th District’s seat in Congress in 2016 but finished second to Hollingsworth, according to <a href="https://www.wfyi.org/news/articles/gop-indiana-state-senator-eyes-replacing-hollingsworth" target="_blank">NPR</a>. \nHouchin has not released an official list of key issues on her campaign website. Her Twitter <a href="https://twitter.com/Erin_Houchin/status/1481698857717317632?s=20&t=tBO8GHY2dFQStEB5rgE3tA" target="_blank">campaign announcement</a> highlights her record in the Indiana Senate, where the actions she’s taken align with Republican and conservative talking points. On her website, Houchin states she’s pro-life and supports Second Amendment rights. If elected, she said in the announcement, she would focus on opposing immigration, reducing inflation and combatting federal spending. \nIn 2021-2022, Houchin served on the Indiana Senate Committees on Commerce & Technology, Elections, Family & Children Services, Homeland Security & Transportation, Utilities, and Veterans Affairs & the Military, according to <a href="https://ballotpedia.org/Erin_Houchin#Biography" target="_blank">Ballotpedia</a>. Her <a href="https://www.erinhouchin.com/about/" target="_blank">campaign website</a> states she worked against tax increases and expanded rural broadband access. `
    },
    millis: {
        name: "Tonya Millis",
        party: "Libertarian",
        website: "https://tonyaforcongress.com/photo-gallery/102-2/bio-tonya-millis/",
        priorities: ["Decrease Military Presence Abroad", "Lower Taxes", "Less Gov. Restriction", "Healthcare", "Marijuana Legalization", "Environment"],
        curr_position: "Real estate broker, vice chair of the Libertarian Party of Lawrence County",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/544dccc6-26ca-4767-90e4-a804c46a47ea.sized-1000x1000.jpg",
        full_bio: `Tonya Millis is a Libertarian candidate running for U.S. House of Representatives District 9. An Indiana native, Millis is a real estate broker and vice chair of the Libertarian Party of Lawrence County, according to her <a href="https://tonyaforcongress.com/photo-gallery/102-2/bio-tonya-millis/" target="_blank">campaign website</a>. \nOn her website, Millis said she supports less U.S. military involvement abroad, gun ownership, marijuana legalization and reduced federal taxation. As a representative, she said she would endorse pro-climate bills to keep air, water and other resources clean. She also said she would eliminate the Internal Revenue Service. \nOn her campaign website, Millis states the federal bureaucracy is “bloated” due to the number of laws and amendments passed. As a representative, she said she would roll back laws restricting freedoms, though it was unclear which freedoms would be affected. `
    },
    mayfield: {
        name: "Peggy Mayfield",
        party: "Republican",
        website: "https://www.indianahouserepublicans.com/members/leadership/peggy-mayfield",
        priorities: ["Education", "Small Businesses", "Veteran Support", "Pro-police", "Anti-abortion", "Gun Rights"],
        curr_position: "Indiana House Representative, District 60",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/16441dd6-870a-4379-8fb1-3062222f661f.sized-1000x1000.jpg",
        full_bio: `Peggy Mayfield, a Republican from Martinsville, is running for reelection to serve as the representative for Indiana House District 60. Mayfield has held the position since 2012.  \nMayfield, a lifetime NRA member, was described by the Indiana House Republicans <a href="https://www.indianahouserepublicans.com/members/leadership/peggy-mayfield" target="_blank">website</a> as a “strong voice” for Second Amendment rights. The website highlights Mayfield’s work on education, veteran’s issues and law enforcement, among others. \nMayfield recently co-sponsored House Bill 1001, which allocated $58.5 million in funding to support families and mothers after Senate Bill 1, banning abortion, was passed, according to the <a href="https://www.indystar.com/story/news/2022/07/29/senate-bill-2-hb-1001-indiana-abortion-laws-stimulus-check/65386764007/" target="_blank">IndyStar</a>. Mayfield <a href="http://iga.in.gov/documents/2fd46d05" target="_blank">voted yes</a> to SB 1. In 2021-22, she served as vice chair of the House Public Policy Committee and served on the Financial Institutions and Insurance Committee and Ways and Means Committee. `
    },
    thorpe: {
        name: "Kathy Thorpe",
        party: "Democrat",
        website: "https://www.facebook.com/profile.php?id=100084158161306",
        priorities: ["Pro-choice", "Education", "Pro-police", "Voting Rights"],
        curr_position: "Retired OB/GYN nurse",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        full_bio: `Kathy Thorpe is the Democratic candidate for Indiana House District 60 Representative. While she was not in the primary elections, the Indiana Democratic Party added her to reduce uncontested Republican seats, according to the <a href="https://indianacitizen.org/update-democrats-republicans-add-18-legislative-candidates-to-nov-8-ballot-reducing-the-number-of-uncontested-seats/?utm_source=rss&utm_medium=rss&utm_campaign=update-democrats-republicans-add-18-legislative-candidates-to-nov-8-ballot-reducing-the-number-of-uncontested-seats" target="_blank">Indiana Citizen</a>. Thorpe’s <a href="https://www.facebook.com/profile.php?id=100084158161306" target="_blank">campaign Facebook page</a> said she is a retired OB/GYN nurse. \nWhile Thorpe does not have a campaign website, her candidate Facebook shows her support for abortion access, LGBTQ rights and education. She has not previously run for or held state office, according to <a href="https://ballotpedia.org/Kathy_Thorpe" target="_blank">Ballotpedia</a>, but <a href="https://www.facebook.com/profile.php?id=100084158161306" target="_blank">she ran for Morgan County Coroner</a>. `
    },
    pierce: {
        name: "Matt Pierce",
        party: "Democrat",
        website: "https://indianahousedemocrats.org/members/matt-pierce/full",
        priorities: [],
        curr_position: "Indiana House Representative, District 61",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/ed4e323c-7622-44b4-9713-0cf6bf98c366.sized-1000x1000.jpg",
        full_bio: `Matt Pierce, a Democrat, currently represents District 61 in the Indiana House of Representatives and is running for reelection. He is unopposed. He’s held the position since 2002 and serves as the Assistant Democratic Floor Leader, according to the <a href="https://indianahousedemocrats.org/members/matt-pierce/full" target="_blank">Indiana House Democratic Caucus</a>. Pierce is also a senior lecturer at IU’s Media School. \nPierce has not authored bills relating to either the Democratic or Republican party platforms but has sponsored several bills. Alongside the Indiana Democratic party, he voted no to Senate Bill 1, which banned abortion in Indiana except in the case of rape, incest or risk to the pregnant person's life. \nPierce is the ranking minority member on the Indiana House Utilities, Energy and Telecommunications Committee and serves on the Courts and Criminal Code Committee, the Elections and Apportionment Committee, the Rules and Legislative Procedures Committee, and the Statutory Committee on Ethics, according to the <a href="https://indianahousedemocrats.org/members/matt-pierce" target="_blank">Indiana House Democratic Caucus</a>. `
    },
    githens: {
        name: "Penny Githens",
        party: "Democrat",
        website: "https://pennyforindiana.com/about",
        priorities: ["Education", "Substance Abuse", "Minimum Wage", "Pro-choice", "Gun Control/Safety", "Healthcare", "Healthcare", "Worker Rights"],
        curr_position: "Monroe County Commissioner ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/7e914f99-e4d0-4288-8f7e-a420313a98ef.sized-1000x1000.jpg",
        full_bio: `Penny Githens, a Democrat, is running for Indiana House of Representatives District 62’s seat. Githens is currently Monroe County Commissioner for District 3 on the Board of Commissioners. She ran for District 60 Representative in 2016 and 2018 but lost both times to current incumbent Peggy Mayfield. \nGithens told <a href="https://ballotpedia.org/Penny_Githens" target="_blank">Ballotpedia</a> her three main campaign issues were improving public education, increasing substance use treatment options and raising minimum wage. She said she wants to improve infrastructure and broadband access to bring new businesses to Indiana.  \nAs county commissioner, Githens’ work has focused on homelessness, healthcare, mental illness and substance use issues, according to her <a href="https://pennyforindiana.com/about" target="_blank">website</a>. Her <a href="https://pennyforindiana.com/platform" target="_blank">platform</a> aligns with key Democratic party ideas, including reproductive health, gun safety, public education and the environment, among others. `
    },
    hall: {
        name: "Dave Hall",
        party: "Republican",
        website: "https://www.votedavehall.com/?fbclid=IwAR3eLCVSOdtTPEDNOGOvZIiaT0be9n-lKmant04lDF18G2Vmdb61awo8LYU",
        priorities: ["Anti-abortion", "Election Security", "Substance Abuse", "Broadband Access", "Pro-police"],
        curr_position: "Jackson County Council President",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/79538ff9-04a5-40b9-883d-2f77cfcac202.sized-1000x1000.jpeg",
        full_bio: `Dave Hall is the Republican nominee for Indiana House District 62’s representative. Hall is in his second term as Jackson County Council President and has experience with the Jackson County Redevelopment Commission, Industrial Development Corporation and Sheriff’s Department, according to his <a href="https://www.votedavehall.com/?fbclid=IwAR3eLCVSOdtTPEDNOGOvZIiaT0be9n-lKmant04lDF18G2Vmdb61awo8LYU" target="_blank">website</a>. \nHall lists stopping involuntary annexation, fighting drug abuse and improving infrastructure and broadband access as key issues on his <a href="https://www.votedavehall.com/?fbclid=IwAR3eLCVSOdtTPEDNOGOvZIiaT0be9n-lKmant04lDF18G2Vmdb61awo8LYU" target="_blank">website</a>. He also told Ballotpedia as a representative, he would require paper ballots at future elections. \nAs county council president, Hall told Ballotpedia one of his biggest accomplishments was creating a work-release center for inmates. The center allows inmates who have committed low-level felonies to go to work and come home to the prison facility, paying rent but leaving with money in their checking accounts, according to <a href="https://indianaeconomicdigest.net/MobileContent/Most-Recent/Cutbacks-Closings/Article/Jackson-County-looks-a-work-release-center-to-relieve-increasingly-crowded-jail/31/62/78534" target="_blank">Indiana Economic Digest</a>. `
    }
}

const modalButtons = document.querySelectorAll('button.modal-btn');
const modal = document.querySelector('#modal');
const bkg = document.querySelector('.bkg-cover');
const card = document.querySelector('#modal .candidate');

window.onclick = function (event) {
    // console.log('window onclick event running');
    if (event.target === modal) {
        hideModal();
    }
}

function showModal() {
    // console.log('showModal function called');
    // reveal the modal
    modal.style.opacity = 1;
    bkg.style.opacity = 1;
    bkg.style.pointerEvents = 'auto';
    modal.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';

    // insert candidate's content
    if (modalData[this.id.toString()]) {
        let html = `<div class="candidate ${modalData[this.id]["isIncumbent"] ? 'incumbent' : ''} ${modalData[this.id]["party"] === "Republican" ? 'rep' : ''} ${modalData[this.id]["party"] === "Democrat" ? 'dem' : ''} ${modalData[this.id]["party"] === "Libertarian" ? 'lib' : ''}">
                        <div class="square-frame">
                            <img src="${modalData[this.id]["img_url"]}" alt="">
                        </div>
                        <p><strong><a id="candidate-name" href="${modalData[this.id]["website"]}" target="_blank"
                                    rel="noopener noreferrer">${modalData[this.id]["name"]}</a></strong></p>
                        <p id="party">${modalData[this.id]["party"]}</p>
                        <ul style="height: auto;">`;
        // priorities
        if (this.id === 'pierce') {
            html += '<p><em>Pierce, who is running unopposed, does not have a campaign website to state his priorities.</em ></p > '
        } else {
            html += `<li>
                <p><strong>Priorities:</strong> </p>
            </li>`
            modalData[this.id]["priorities"].forEach((priority) => {
                html += `<li><p>${priority}</p></li>`;
            })
        }

        html += `</ul>
        <p><strong>Current position: </strong>${modalData[this.id]["curr_position"]}</p>`;

        modalData[this.id]["full_bio"].split("\n").forEach((graf, i) => {
            if (i === 0) {
                html += `<p><strong>Full bio:</strong> ${graf}</p>`;
            } else {
                html += `<p style="margin-top: 0.75em;">${graf}</p>`;
            }
        })

        html += `<div id="closer" onClick="hideModal()"><i class="fa fa-times"></i></div></div>`;

        modal.innerHTML = html;
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

