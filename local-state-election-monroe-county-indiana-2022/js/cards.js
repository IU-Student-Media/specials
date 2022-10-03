"use strict";

// CANDIDATE DATA
const cardData = {
    brooks: {
        name: "ZeNai Brooks",
        party: "democrat",
        website: "https://votezenai.com/about/",
        priorities: ["Oversight and Transparency", "Small Business", "Supporting Minority Communities", "Economic Development", "Diversity, Equity, Inclusion", "Faith-Based Advocacy"],
        curr_position: 'Chief Strategy Officer, <a href="https://www.teammyb.com/about" target="_blank">Mind Your Business Accounting and Consulting</a>',
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/dd47e56f-3783-40c1-8e66-73cb30ab06e2.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.6
        },
        full_bio: `ZeNai Brooks is a certified public accountant, author, pastor’s wife and millennial leader. She said she’s combined her passion for community advocacy and her professional career as controller of the corporate responsibility function of Cummins — a Fortune 200 company — and treasurer of the Cummins Foundation — which provides funding to grassroots initiatives and strategic programs around the world.\nBrooks also serves as a board member with the Indiana CPA Society and as the Central Region president and national director with the National Association of Black Accountants, amongst others. She said she believes by engaging in the community by giving back, empowering others and "lifting as we climb,” everyone can make a difference.`
    },
    klutz: {
        name: "Tera Klutz",
        party: "republican",
        website: "https://www.teraklutz.com/",
        priorities: ["Accuracy", "Transparency", "Customer Service", "Reducing Fraud Opportunity"],
        curr_position: "Auditor of State",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/f62ca453-9b40-4342-8de4-11ddc166bfdb.sized-1000x1000.JPG",
        img_spex: {
            horz: "center",
            vert: "30%",
            zoom: 1.05
        },
        full_bio: `Tera Klutz is the 57th Indiana Auditor of State and the first certified public accountant to serve as the state’s Chief Financial Officer. As auditor, Klutz focuses on providing accurate information, enhancing transparency and delivering great customer service to Hoosiers. She manages the Indiana Transparency Portal to provide an easily accessible look into Indiana’s finances and most recently helped deliver automatic taxpayer refund checks to over 1.5 million Hoosiers.\nShe previously served as Allen County Auditor and was named Auditor of the Year by the Indiana Auditor’s Association. Before serving in the public sector, Klutz worked as an accountant at Crowe and PwC. She holds a bachelor’s degree in accounting. `
    },
    schick: {
        name: "John Schick",
        party: "libertarian",
        website: "https://www.linkedin.com/in/johnschick/",
        priorities: [],
        curr_position: "Principal Consultant, Information Sales Group",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/eb477a58-9ace-45a0-89a2-e821178507b5.sized-1000x1000.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `John Schick is the Libertarian candidate for Auditor of State. He’s previously run for the position and lost in 2014 and 2018, according to <a href="https://ballotpedia.org/John_Schick" target="_blank">Ballotpedia</a>. Schick also ran unsuccessfully as the Libertarian candidate for Indiana House of Representatives District 3 in 2010. `
    },
    browne: {
        name: "Nicole Browne",
        party: "democrat",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=14",
        priorities: [],
        curr_position: "",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/80fbbccc-2273-470e-8726-e3e4914c40c0.sized-1000x1000.JPG",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Nicole Browne is running for re-election as Monroe County Clerk. She said her priorities are to continue fighting for “common sense” legislation for all 92 Indiana clerks, “set the table” for her successor and showcase Monroe County as Indiana’s gold standard for quality elections in the state.\nShe’s not afraid to look Monroe County commissioners and council members in the eye and fight for the needs of the office, she said. She said she’s running to make a difference. `
    },
    sharp: {
        name: "Judith Sharp",
        party: "democrat",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=14",
        priorities: [],
        curr_position: "Monroe County Commissioner ",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/3b18000d-fe60-4958-88c3-f9559fd70f97.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Judith Sharp, current Monroe County Assessor, has been the county assessor since 1991. She is responsible for placing a market value on all properties for taxation and does this each year based on property sold. She said the department has around 58,000 parcels of land that it touches each year, and its gross assessment is over $15 billion.\nThe county assessor must own property in the county and must be a State Certified Level III Assessor/Appraiser, which is a state certification that is comparable to an advanced degree in a profession. Sharp stated she is not term limited, meaning there are no limits on how long she can hold the position. `
    },
    jones: {
        name: "Elizabeth (Lee) Jones",
        party: "democrat",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=92",
        priorities: [],
        curr_position: "Monroe County Commissioner",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Elizabeth (Lee) Jones is the incumbent County Commissioner for District 1. Before becoming commissioner, she said she served on the County Council for six years. She was also on the Plan Commission for 10 years and the Board of Zoning Appeals for four years, among other positions. She said she knows about county government and how to get things done.\nJones grew up in Bloomington, attending local schools and IU. When she got married, Jones and her husband moved to the western part of the county and founded Stranger’s Hill Farm & Greenhouses, which is now the oldest certified organic business in Indiana. `
    },
    robinson: {
        name: "Perry B. Robinson",
        party: "republican",
        website: "https://www.pbr4mcc.org/about",
        priorities: [],
        curr_position: "Electrician",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Perry Robinson is running as a Republican for Monroe County Commissioner. He’s worked as a union electrician for over 20 years, according to his <a href="https://www.pbr4mcc.org/about" target="_blank">campaign website</a>. In that job, has served as general foreman, which he said would prepare him to oversee infrastructure, zoning and the county health department as commissioner.\nRobinson’s platform focuses on transparency in tax dollar spending, representation for rural Monroe County and finding long-term, cost-efficient solutions to county problems. `
    },
    allen: {
        name: "Jim Allen",
        party: "republican",
        website: "https://www.monroecogop.com/post/32/meet-our-2022-candidates.html",
        priorities: [],
        curr_position: "Retired, formerly firefighter for Bloomington Township Fire Department",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Jim Allen is running as a Republican for Monroe County Council, District 1. He worked as a Bloomington Township firefighter and retired as a lieutenant in 2017 after over 20 years of service, according to the Monroe County GOP’s <a href="https://www.monroecogop.com/post/32/meet-our-2022-candidates.html" target="_blank">website</a>. Allen ran for a County Council at-large seat in 2020 and lost.\nAs a County Council member, Allen said he would prioritize public safety and increase the sheriff’s department’s budget, according to his website. He is against forced annexation and salary increases for elected officials and supports reopening council meetings to a Zoom and in-person mix. He is also anti-abortion. `
    },
    crossley: {
        name: "Jennifer Crossley",
        party: "democrat",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=1074",
        priorities: [],
        curr_position: "Monroe County Council, District 4",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/db56ae3c-bafd-4bc3-a98f-66a5b92ca4db.sized-1000x1000.jpeg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Jennifer Crossley is running unopposed for Monroe County Council, District 4. She’s an incumbent and became the first Black woman to serve as a Monroe County Council member after being appointed to the position Dec. 19, 2021, according to a <a href="https://www.idsnews.com/article/2022/01/jennifer-crossley-monroe-county-first-black-woman-council-member" target="_blank">past IDS article</a>. She’s a Democrat and served as chair of the Monroe County Democratic Party for the two years prior to County Council.\nAccording to <a href="https://hoosierwomenforward.org/jennifer-crossley/" target="_blank">Hoosier Women Forward</a>, Crossley volunteers at the Shalom Center and is part of the Bloomington chapter of Moms Demand Action Against Gun Violence, the Monroe County Black Democratic Caucus and the Bloomington chapter of the NAACP, among others. `
    },
    hawk: {
        name: "Martha (Marty) Hawk",
        party: "republican",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=89",
        priorities: [],
        curr_position: "Monroe County Council, District 3",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Marty Hawk is running unopposed as the Republican candidate for Monroe County Council, District 3. She’s the current incumbent and works as a real estate broker. `
    },
    iversen: {
        name: "Peter Iversen",
        party: "democrat",
        website: "https://peteriversen.org/about",
        priorities: [],
        curr_position: "Monroe County Council, District 1",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/2fa4a205-e7ff-4a94-9358-afa494e63c57.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Peter Iversen is running to maintain a seat on the Monroe County Council, where he has served District 1 for the past three years. He received a master’s degree in public affairs from the IU O’Neill School, and he and his wife are raising their two daughters in Bloomington.\nThe three key challenges he said can be addressed by the Monroe County Council are lack of diversity, equity and inclusion, insufficient investment in fighting climate change and resiliency and continuing to invest in meaningful ways in public health.  `
    },
    wiltz: {
        name: "Kate Wiltz",
        party: "democrat",
        website: "https://www.linkedin.com/in/kate-wiltz-a2957671/",
        priorities: [],
        curr_position: "Monroe County Council, District 2",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Kate Wiltz is a Democrat running unopposed for Monroe County Council, District 2. She is the incumbent and works with IU’s Indiana Institute on Disability and Community as a research associate, according to the IIDC’s <a href="https://www.iidc.indiana.edu/about/personnel/WiltzKate.html" target="_blank">website</a>.\nWiltz said she's passionate about amplifying marginalized voices and that the best way to do so is to meet people where they are to provide them support, according to a personal statement on the IIDC’s website. `
    },
    swain: {
        name: "Amy Swain",
        party: "democrat",
        website: "https://amyswain-recorder.com/",
        priorities: [],
        curr_position: "Indian Creek Township Clerk",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/98d2d5e8-f9af-4c28-a0c5-46f2adb56d97.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Amy Swain is an IU graduate with a degree in business who said she chose to have a positive impact in Monroe County by running for office. She was twice elected and served eight years on the Indian Creek Township Board.\nSwain said she’s running for recorder because the accurate legal recording of property documents is important in all real estate transactions, whether residential or commercial. She said her priorities are accessibility, professionalism and a smooth transition.   `
    },
    white: {
        name: "Paul White",
        party: "republican",
        website: "https://www.facebook.com/paulewhitesr",
        priorities: [],
        curr_position: "Bus driver",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Paul White is running as a Republican for Monroe County Recorder. He currently works as a bus driver, according to his <a href="https://www.linkedin.com/in/paul-white-sr-3839a793/" target="_blank">LinkedIn</a>. `
    },
    marte: {
        name: "Ruben Marté",
        party: "democrat",
        website: "https://www.rubenforsheriff.com/about",
        priorities: ["Public Safety", "Transparency and Accountability", "Social Service Involvement", "Recidivism Reduction", "Crisis Intervention Training", "Public Outreach"],
        curr_position: "Captain, Indiana State Police ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/809fdc08-0560-4b9a-bab2-ca019f2eca7b.sized-1000x1000.png",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Ruben Marté, the Democratic candidate running for Monroe County Sheriff, is a captain with the Indiana State Police, where he has worked for 31 years, according to his <a href="https://www.rubenforsheriff.com/about" target="_blank">campaign website</a>. He has served multiple assignments and developed the ISP Security Threat Group Unit, which monitors gang activity.\nAccording to his campaign website, Marté’s <a href="https://www.rubenforsheriff.com/platform" target="_blank">platform</a> is based on four tenets: increasing public safety, reducing reoffence rates, increasing employee training surrounding cultural and mental health awareness and bias and expanding public outreach and community engagement. `
    },
    williamson: {
        name: "Nathan Williamson",
        party: "republican",
        website: "https://nathanwilliamsonforsheriff.com/meet-nathan/",
        priorities: ["Public Safety", "Mental Health Awareness", "Recidivism Reduction", "Diversity and Inclusion", "Community Engagement", "Transparency"],
        curr_position: "Patrol Sergeant, Sheriff’s Office Field Training Coordinator",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/9724489a-d1b6-4084-85cd-b47b7c122de6.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Nathan Williamson is running for Monroe County Sheriff as a Republican. He’s an 11-year veteran of the sheriff’s office and works as a coordinator for the office’s Field Training Unit, where he is involved in the hiring and training of new deputies, according to his <a href="https://nathanwilliamsonforsheriff.com/meet-nathan/" target="_blank">campaign website</a>. He is a member of the Fraternal Order of the Police.\nFor his <a href="https://nathanwilliamsonforsheriff.com/priorities/" target="_blank">priorities</a>, Williamson gives “a safe and civil Monroe County” top importance. He’s also concerned with mental health, lowering reoffence through jail release programs, diversity and inclusion, community engagement and transparency. `
    },
    diekhoff: {
        name: "Mary Ellen Diekhoff",
        party: "democrat",
        website: "https://www.co.monroe.in.us/egov/apps/staff/directory.egov?view=detail;id=126",
        priorities: [],
        curr_position: "Monroe County Circuit Court Judge, Division 5",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/b49edce1-1265-4cd2-ab30-61b843832f90.sized-1000x1000.jpg",
        img_spex: {
            horz: "-90px",
            vert: "-10px",
            zoom: 2
        },
        full_bio: `Mary Ellen Diekhoff is on the ballot for Monroe County Circuit Court Judge, No. 4. Diekhoff currently serves as a circuit court judge for District 5 and works as an adjunct instructor in criminal justice at IU, according to the department’s <a href="https://criminaljustice.indiana.edu/about/faculty/diekhoff-mary-ellen.html" target="_blank">website</a>. Diekhoff previously served as a deputy prosecutor for Monroe County. `
    },
    harvey: {
        name: "Holly Harvey",
        party: "democrat",
        website: "https://www.co.monroe.in.us/department/?structureid=104",
        priorities: [],
        curr_position: "Monroe County Circuit Court Judge, Division 6",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Holly Harvey is a Democrat running unopposed for Monroe County Circuit Court Judge, No. 1. Harvey now serves as a circuit court judge, Division 6, according to the Circuit Court’s <a href="https://www.co.monroe.in.us/department/?structureid=104" target="_blank">website</a>. `
    },
    lamb: {
        name: "Carl Lamb",
        party: "republican",
        website: "https://www.co.monroe.in.us/department/?structureid=104",
        priorities: [],
        curr_position: "Attorney, Carl Lamb and Associates",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/7b26eeec-2845-4b0c-920d-973e35659571.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Carl Lamb has been in Monroe County for the past 44 years after four years in the Marine Corps and is married to wife Angie. He’s a graduate of Indiana University, B.A., 1981, and J.D., 1984. Lamb said he has 38 years of trial law experience in criminal, civil and juvenile law. He’s worked with the IU community over the years to host multiple internship opportunities to create and promote “Drop the Puck on Cancer,”  a Greek philanthropy event at IU.\nLamb is the former Monroe County attorney, and said his family attends Westside Community Church. He said he brings a wealth of experience from all walks of life in his pursuit of Monroe County Circuit Court Judge.  `
    },
    salzmann: {
        name: "Emily Salzmann",
        party: "democrat",
        website: "https://www.emilysalzmann4judge.com/about-emily ",
        priorities: [],
        curr_position: "Attorney, Salzmann Law",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/eb6db2ec-ed52-4392-87c2-543323bd6074.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Emily Salzmann is the Democratic candidate for Monroe County Circuit Court Judge, No. 7.  Emily has recent judicial experience, having served as judge pro tempore 47 times.  She has been a part of the local court system since 2012 and is managing partner at Salzmann Law, LLC.  Emily brings not only her years of civil and criminal practice but also her fluency in Spanish to the courtroom, she said.  She has served as president of the local bar association.  `
    },
    oliphant: {
        name: "Erika Oliphant",
        party: "democrat",
        website: "http://www.erikaoliphant.com/",
        priorities: [],
        curr_position: "Monroe County Prosecuting Attorney",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Erika Oliphant is running for her second term as Prosecuting Attorney of Monroe County. According to her campaign website, she’s served for over 12 years in Monroe County and attended Maurer School of Law. She is currently running unopposed.\nAccording to her website, Oliphant supports alternatives to incarceration, such as risk-based treatment programs and alternative sentencing, when possible, and she believes incarceration should be reserved for offenders who pose security threats. She also said she intends to focus on violent crime prevention.`
    },
    maurer: {
        name: "Jeffrey Maurer",
        party: "libertarian",
        website: "https://www.maurerforindiana.com/",
        priorities: ["Voting Verification", "Election Worker Training", "Increasing Audits", "Small Business", "Supporting Entrepreneurship", "Fighting Inflation"],
        curr_position: "Development officer, Students for Liberty ",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/dc555f3c-68b2-439b-9c68-60cec4b4a1b7.sized-1000x1000.JPG",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.2
        },
        full_bio: `Jeff is an entrepreneur whose career spans technology, transportation, and budget and finance. He serves as a development officer for Students For Liberty, the largest pro-liberty student organization, which champions free markets and free speech around the world.\nIn 2013, Maurer said he chose to move to Indiana for a better quality of life, after being exhausted by the corrupt politics, big government, and high taxes of New York.\nMaurer joined his local volunteer fire department at the age of 16. He served for more than 12 years as a firefighter and officer. He currently participates on several local associations and development boards, and is currently enlisted in the Indiana Air National Guard. `
    },
    morales: {
        name: "Diego Morales",
        party: "republican",
        website: "https://diego4indiana.com/",
        priorities: ["Election Integrity", "Voter Registration", "Business Opportunity", "Strengthening Divisions"],
        curr_position: "Entrepreneur",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Diego Morales, a Republican, is running for Indiana Secretary of State. He served as a top aide to Mike Pence when Pence was governor of Indiana and as an aide in the Secretary of State and Lieutenant Governor’s offices, according to his <a href="https://diego4indiana.com/" target="_blank">campaign website</a>. Morales also served in the U.S. military.\nMorales, who immigrated from Guatemala in high school, is using his own citizenship and immigration statuses to push for requirements that voters prove citizenship, according to the News and Tribune. He’s also made claims denouncing 2020 election results and calling to halve the number of early voting days but has since retracted those statements.  `
    },
    wells: {
        name: "Destiny Wells",
        party: "democrat",
        website: "https://www.wellsforindiana.com/about-destiny",
        priorities: ["Free and Fair Elections", "National Security", "Small Business"],
        curr_position: "Deputy Chair for Coalitions and Expansion, Indiana Democratic Party",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/7f7054e1-56f3-4b16-9349-e2ad10e96f9a.sized-1000x1000.jpg",
        img_spex: {
            horz: "-63px",
            vert: "25px",
            zoom: 1.7
        },
        full_bio: `Destiny Wells is on the ballot for the Indiana Secretary of State — Hoosiers’ chief election officer. She grew up in a blue-collar family in Morgan County and came to Bloomington to attend Indiana University as a first-generation college student. In the aftermath of 9/11, Wells enlisted in the Army National Guard at the age of 19.\nToday, she continues to serve as a U.S. Army Reserve Lieutenant Colonel. Outside of the military, Wells works as an attorney and entrepreneur. She’s served as counsel for the City of Indianapolis and as Deputy Attorney General for the State of Indiana, and currently lives in Indianapolis with husband Oliver and their two sons, Owen and Harrison. Wells said she pledges to uphold democracy and defend access to the ballot box. `
    },
    granger: {
        name: "Dorothy Granger",
        party: "democrat",
        website: "https://bloomington.in.gov/council/granger",
        priorities: [],
        curr_position: "Bloomington Township Board Member",
        isIncumbent: true,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/6a0745ad-e84a-4621-aaf6-62af069961f5.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Running for reelection as a Bloomington Township Board Member, Monroe County, Dorothy Granger also currently works as the development director for Beacon, Inc., according to her <a href="https://www.linkedin.com/in/dorothy-granger-b919695/" target="_blank">LinkedIn</a>. She formerly served as city council president and representative for Bloomington City Council District 2.\nAccording to the City of Bloomington’s <a href="https://bloomington.in.gov/council/granger" target="_blank">website</a>, Granger is active around issues of citizen participation and social justice. `
    },
    mckinney: {
        name: "Barbara McKinney",
        party: "democrat",
        website: "https://bloomington.in.gov/directory/people/view?username=mckinneb",
        priorities: [],
        curr_position: "Human Rights Director/Attorney, City of Bloomington",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Barbara McKinney is running for a position as Bloomington Township Board Member, Monroe County. She ran unsuccessfully for the position in 2018 and has previously worked as assistant city attorney and director of the Bloomington Human Rights Commission, according to the Herald-Times.\nIn 2018, McKinney was recognized with the Indiana Municipal ADA/Title VI Coordinator of the Year for her work helping Bloomington’s disabled community, according to <a href="https://www.magbloom.com/2019/03/citys-barbara-mckinney-wins-statewide-ada-award/" target="_blank">Bloom Magazine</a>. The article states McKinney worked with the Greater Bloomington Chamber of Commerce to help businesses work towards accessibility and created a registry for emergency responders to provide information about disabled and special needs people. `
    },
    sensenstein: {
        name: "Elizabeth Sensenstein",
        party: "democrat",
        website: "https://www.linkedin.com/in/elizabeth-sensenstein-2ba43b119/",
        priorities: [],
        curr_position: "Chief Deputy Treasurer",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1291cf42-b7af-4e8e-8b17-1d331ab0aba3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Elizabeth Sensenstein is running to become a Bloomington Township Board Member. Sensenstein has previously served Monroe County as its chief deputy treasurer and assessor, according to <a href="https://www.linkedin.com/in/elizabeth-sensenstein-2ba43b119/" target="_blank">LinkedIn</a>. `
    },
    feferman: {
        name: "Efrat Feferman",
        party: "democrat",
        website: "https://www.facebook.com/EfratForBloomingtonTwp/",
        priorities: [],
        curr_position: "Executive Director, United Way of Monroe County",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/1543d1d4-d3df-4696-9307-055376f3772d.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Efrat is a 22-year resident of Monroe County. She completed her undergraduate studies at IU and received a master’s degree in public administration at the University of Arizona. She said her career has been centered around local government, nonprofits and giving back to the community. She spent nine years at City of Bloomington Utilities and has spent the past five years as executive director of United Way of Monroe County.\nAs Township Trustee, Feferman said she looks forward to continuing to work on our community’s safety net and will strive to be responsive, collaborative, and effective in administering assistance to Bloomington Township residents. `
    },
    elliott: {
        name: "Daniel Elliott",
        party: "republican",
        website: "https://www.danielelliott.org/about-daniel/#page-content",
        priorities: ["Economic Development", "Broadband Access", "Cybersecurity", "Transparency", "Financial Education"],
        curr_position: "Morgan County Council, At-Large",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/20ec82be-84cb-4c9f-88aa-d5560592c9f3.original.png",
        img_spex: {
            horz: "center",
            vert: "center",
            zoom: 1.05
        },
        full_bio: `Daniel Elliot is running as the Republican nominee for Indiana Treasurer of State. Elliot is chairman of the Morgan County Republican Party, president of the Morgan County Redevelopment Commission and a former Morgan County councilman, according to his <a href="https://www.danielelliott.org/about-daniel/#page-content" target="_blank">campaign website</a>. He also owns his own software company.\nElliot’s <a href="https://www.danielelliott.org/platform/" target="_blank">platform</a>, stated on his campaign website, rests on promoting economic development, defending against cyberattacks and ensuring government transparency. With this, he aims to expand broadband access, secure sensitive data, streamline service operations and raise awareness about financial services and investment strategies.  `
    },
    mcclellan: {
        name: "Jessica McClellan",
        party: "democrat",
        website: "https://www.jessicaforindiana.com/",
        priorities: ["Cybersecurity", "Liquidity", "Fund Safety", "Invest in College Savings", "Serving Unbanked", "Local Government Outreach", "Retirement Investment"],
        curr_position: "Monroe County Treasurer",
        isIncumbent: false,
        img_url: "https://s3.amazonaws.com/snwceomedia/ids/658dac34-41ca-4194-8371-22aa2467123d.sized-1000x1000.jpg",
        img_spex: {
            horz: "center",
            vert: "top",
            zoom: 1.05
        },
        full_bio: `Jessica McClellan was elected Monroe County Treasurer in 2017 and serves as the chief investment officer and tax collector for the 12th largest county in Indiana. She also sits on the Monroe County Internal Controls Committee and serves as secretary of the Monroe County Board of Finance, vice president of the Indiana County Treasurer’s Association and treasurer of the Hoosier Hills Food Bank.\nMcClellan is committed to increasing Hoosier families' access to the College Choice 529 Savings Plan, serving unbanked Hoosiers through community partnerships with local banks, increasing investment income for local governments and protecting state tax collections with prudent oversight and security. `
    }
}

const candidateNames = ["brooks", "klutz", "schick", "browne", "sharp", "jones", "robinson", "allen", "crossley", "hawk", "iversen", "wiltz", "swain", "white", "marte", "williamson", "diekhoff", "harvey", "lamb", "salzmann", "oliphant", "maurer", "morales", "wells", "granger", "mckinney", "sensenstein", "feferman", "elliott", "mcclellan"];

function generateCard(name, modal = false) {
    let priorities = '';

    if (cardData[name].priorities) {
        cardData[name].priorities.forEach((item) => {
            priorities += `<li><p>${item}</p></li>`;
        })
    }

    let full_bio = '';
    cardData[name].full_bio.split('\n').forEach((graf, i) => {
        if (modal) {
            if (i === 0) {
                full_bio += `<p><strong>Full bio:</strong> ${graf}</p>`
            } else {
                full_bio += `<p class="full-bio">${graf}</p>`
            }
        } else {
            full_bio += `<p class="full-bio">${graf}</p>`
        }
    })

    let html = `
        <div class="candidate ${cardData[name].isIncumbent ? 'incumbent' : ''} ${cardData[name].party === 'democrat' ? 'dem' : ''} ${cardData[name].party === 'republican' ? 'rep' : ''} ${cardData[name].party === 'libertarian' ? 'lib' : ''}">
        ${modal ? `<div id="closer" onClick="hideModal()"><i class="fa fa-times" aria-hidden="true"></i></div>` : ''}
            ${cardData[name].img_url ?
            `<div class="square-frame">
                <img style="${cardData[name].img_spex ? `transform:scale(${cardData[name].img_spex.zoom});object-position:${cardData[name].img_spex.horz} ${cardData[name].img_spex.vert};` : ''}" src="${cardData[name].img_url}"
                    alt = "Portrait of ${cardData[name].name}" >
            </div > `
            : ''}
            <p class="name"><strong>${cardData[name].website ? `<a href="${cardData[name].website}" target="_blank">` : ""}${cardData[name].name}${cardData[name].website ? '</a>' : ""}</strong></p>
            <p class="party">${cardData[name].party === 'democrat' ? 'democrat' : ''}${cardData[name].party === 'republican' ? 'republican' : ''}${cardData[name].party === 'libertarian' ? 'libertarian' : ''}</p>
            ${cardData[name].priorities.length
            ? `<ul>
                    <li>
                        <p><strong>Priorities:</strong> </p>
                    </li>
                    ${priorities ? priorities : ''}
                </ul > 
                ${cardData[name].priorities.length > 5 ? `<p class="show-priorities">More &darr;</p>` : ''}`
            : ``
        }
        ${cardData[name].curr_position ? `<p><strong>Current position:</strong> ${cardData[name].curr_position}</p>` : ''}
        ${(!modal && !cardData[name].priorities.length) ? `
            <div class="short-bio">
                ${full_bio}
            </div>
        ` : ''}
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
    // console.log('window onclick event running');
    if (event.target === modal) {
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

let showMoreNodes = document.querySelectorAll('.show-priorities');

console.log(showMoreNodes);

showMoreNodes.forEach((node) => {
    node.addEventListener('click', () => {
        if (node.textContent === "More ↓") {
            node.previousElementSibling.style.overflow = 'visible';
            node.previousElementSibling.style.height = 'auto';
            node.previousElementSibling.style.maxHeight = 'none';
            node.textContent = "Less ↑";
        } else if (node.textContent === "Less ↑") {
            node.previousElementSibling.style.overflow = 'hidden';
            node.previousElementSibling.style.maxHeight = '132px';
            node.textContent = "More ↓";
        }
    })
})