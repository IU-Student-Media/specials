'use strict';

// importing jsPDF and dependencies
window.jsPDF = window.jspdf.jsPDF;
window.html2canvas = html2canvas;
window.html2pdf = html2pdf;

/*
    DEFINE CONSTANTS
*/

// quiz questions — tree json structure - defined here instead of separate JSON due to fetch glitch in production
const json =
{
    "question": "Will you be 18 on or before Nov. 8?",
    "start": true,
    "answers": [
        {
            "value": "Yes",
            "child": {
                "question": "Are you an IU student?",
                "answers": [
                    {
                        "value": "Yes",
                        "child": {
                            "question": "Are you already registered to vote? ",
                            "answers": [
                                {
                                    "value": "Yes",
                                    "child": {
                                        "question": "Student voters can choose whether to register for their campus location or home address. Do you want to change your registration?",
                                        "answers": [
                                            {
                                                "value": "Yes",
                                                "child": {
                                                    "question": "Log into your state's voter portal to change your registration by your state's deadline (by Oct. 11 if you live in <a href='https://indianavoters.in.gov/' target='_blank'>Indiana</a>).",
                                                    "directions": 1,
                                                    "answers": [
                                                        {
                                                            "value": "Now plan how you'll vote!",
                                                            "child": {
                                                                "question": ">>section 3"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "value": "No",
                                                "child": {
                                                    "question": ">>section 3"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "value": "No",
                                    "child": {
                                        "question": "Student voters can choose whether to register at their campus location or home address. Do you want to register at home or on campus?",
                                        "answers": [
                                            {
                                                "value": "Home",
                                                "child": {
                                                    "question": "Do you live in Indiana?",
                                                    "answers": [
                                                        {
                                                            "value": "Yes",
                                                            "child": {
                                                                "directions": 1,
                                                                "question": "Register at <a href='https://www.vote.org/register-to-vote/indiana/' target='_blank'>this link</a>) by Oct. 5, the deadline for the November election.",
                                                                "answers": [
                                                                    {
                                                                        "value": "Now plan how you'll vote!",
                                                                        "child": {
                                                                            "question": ">>section 3"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            "value": "No",
                                                            "child": {
                                                                // add input for state to give back specific state URL
                                                                "directions": 1,
                                                                "question": "Find your state's registration rules and deadlines at <a href='https://www.vote.org/voter-registration-rules/#arizona' target='_blank'>this link</a>).",
                                                                "answers": [
                                                                    {
                                                                        "value": "Now plan how you'll vote!",
                                                                        "child": {
                                                                            "question": ">>section 3"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "value": "Campus",
                                                "child": {
                                                    "directions": 1,
                                                    "question": "Register to vote in Monroe County at <a href='https://www.vote.org/register-to-vote/indiana/' target='_blank'>this link</a>) by the Oct. 5 deadline.",
                                                    "answers": [
                                                        {
                                                            "value": "Now plan how you'll vote!",
                                                            "child": {
                                                                "question": ">>section 3"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]

                        }
                    },
                    {
                        "value": "No",
                        "child": {
                            "question": "Are you already registered to vote? ",
                            "answers": [
                                {
                                    "value": "Yes",
                                    "child": {
                                        "question": ">>green section"
                                    }
                                },
                                {
                                    "value": "No",
                                    "child": {
                                        "directions": 1,
                                        "registerNote": 1,
                                        "question": "Make sure to register to vote by the Oct. 11 deadline. <br><br> <b>Register online</b>: You can register online in Monroe County, here's <a href='https://indianavoters.in.gov/' target='blank'>the link</a> (it will take less than five minutes). You’ll need a valid driver’s license or Indiana state ID card to fill out the online registration form. <br/><br/> <b>Register in person</b>: If you’re a college student who registered by mail and you're a first-time voter, don't forget to bring a <a href='https://www.in.gov/sos/elections/2626.htm' target='_blank'>second document</a> when you vote in addition to a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a> to verify your address.",
                                        "answers": [
                                            {
                                                "value": "I've registered.",
                                                "child": {
                                                    "question": ">>green section"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]

                        }
                    }
                ]
            }
        },

        {
            "value": "No",
            "child": {
                "question": "",
                "directions": 1,
                "noVote": 1,
                "answers": "Looks like you’re too young to vote in this midterms cycle. Want to be reminded when you become eligible to vote? You can sign up <a href='https://www.vote.org/pledge-to-register/' target='_blank'> here</a>."
            }
        }
    ]
};
const sectionThreeJSON = {

    "question": "Did you register to vote for candidates in Monroe County (IU), a different Indiana county or a different state?",
    "answers": [
        {
            "value": "Monroe County (IU)",
            "child": {
                "question": "Where will you be on Election Day?",
                "answers": [
                    {
                        "value": "Not in Monroe County",
                        "child": {
                            // testing an empty question as an alternative to direct answer to answer
                            "question": "",
                            "directions": 1,
                            "answers": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 8, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
                        }
                    },
                    {
                        "value": "Monroe County",
                        "child": {
                            "question": "Where in Monroe?",
                            "answers": [
                                {
                                    "value": "Off-campus",
                                    "child": {
                                        "question": ">>green section"
                                    }
                                },
                                {
                                    "value": "IU-affiliated or greek housing",
                                    "child": {
                                        "directions": 1,
                                        "question": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 8, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted.",
                                        "note": "<b>Note:</b> If you get sent home before you get your ballot, you still have options: <br><br>If you requested an absentee ballot and never received it, you can vote in person. You'll need to sign an affidavit at the polling location. <br><br> If you received your absentee ballot and decide you would rather vote in person, just bring your absentee ballot to the polls and exchange it. <br><br> You can also call your local elections office to see if you can request a new ballot to be sent to your home address."
                                    }
                                },
                            ]
                        }
                    }
                ]
            }
        },
        {
            "value": "Indiana (not Monroe County)",
            "child": {
                "question": "Where will you be on Election Day?",
                "answers": [
                    {
                        "value": "At my Indiana (not IU) home address",
                        "child": {
                            "question": ">>green section"
                        }
                    },
                    {
                        "value": "At IU",
                        "child": {
                            "question": "Where at IU?",
                            "answers": [
                                {
                                    "value": "Off-campus",
                                    "child": {
                                        "question": "",
                                        "directions": 1,
                                        "answers": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 8, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
                                    }
                                },
                                {
                                    "value": "IU-affiliated or greek housing",
                                    "child": {
                                        "directions": 1,
                                        "question": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 8, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted.",
                                        "note": "<b>Note:</b> If you get sent home before you get your ballot, you still have options: <br><br>If you requested an absentee ballot and never received it, you can vote in person. You'll need to sign an affidavit at the polling location. <br><br> If you received your absentee ballot and decide you would rather vote in person, just bring your absentee ballot to the polls and exchange it. <br><br> You can also call your local elections office to see if you can request a new ballot to be sent to your home address."
                                    }
                                }
                            ]
                        }

                    }
                ]
            }
        },
        {
            "value": "A different state",
            "child": {
                "question": "Where will you be on Election Day?",
                "answers": [
                    {
                        "value": "Off-campus",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "Request your home ballot to be sent to your off-campus address. Refer to <a href=' <a href='https://www.vote.org/absentee-voting-rules/' target='_blank'>this link</a> to see the absentee ballot requirements of each state and to request your ballot."

                        }
                    },
                    {
                        "value": "IU-affiliated or greek housing",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "Request an absentee ballot to be sent to your on-campus address."

                        }
                    },
                    {
                        "value": "At my out-of-state home address",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "Find out how your home state is handling absentee or early voting, including requirements and deadlines, at <a href='https://www.vote.org/absentee-voting-rules/' target='_blank'>this link</a> to make sure your vote is counted this November."
                        }
                    }
                ]
            }
        }
    ]
}
const greenSectionJSON = {
    "question": "How do you want to vote in the November election?",
    "answers": [
        {
            "value": "Absentee by mail",
            "html": "yes",
            "child": {
                "question": "Does one of these excuses apply? <h5>Note: You cannot write in COVID-19 as a valid excuse in Indiana.</h5><ul><li>You have a specific, reasonable expectation that you will be out of the county for the entire 12 hours the polls are open, 6 a.m. to 6 p.m., on Nov. 8 </li><li>  You have a disability </li><li>  You are at least 65 years old</li><li>  You have election duties outside your precinct</li><li>  You are scheduled to work at your regular place of employment the entire 12 hours the polls are open</li><li>  You will be confined due to illness or injury or due to caring for an individual confined due to illness or injury during the entire 12 hours the polls are open.</li><li>  You are unable to vote due to a religious discipline or religious holiday during the entire 12 hours that the polls are open</li><li>  You are a participant in your state's address confidentiality program (for victims of domestic violence and sexual assault)</li><li>  You are a member of the military or a public safety officer</li><li>  You are a 'serious sex offender' as defined in Indiana Code 35-42-4-14(a). </li><li>  You are prevented from voting because transportation is unavailable.</li></ul>",
                "answers": [
                    {
                        "value": "Yes",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 8, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
                        }
                    },
                    {
                        "value": "No",
                        "child": {
                            "question": "You have to vote in person. Do you want to vote early or on Election Day?",
                            "answers": [
                                {
                                    "value": "Early",
                                    "child": {
                                        "question": "",
                                        "directions": 1,
                                        "answers": "In-person early voting will open Oct. 12 and end at noon Nov. 7. Make sure to check early voting locations by logging into your <a href='https://indianavoters.in.gov/' target='_blank'>voter portal</a>. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a>!"
                                    }
                                },
                                {
                                    "value": "Election Day",
                                    "child": {
                                        "question": "",
                                        "directions": 1,
                                        "answers": "Vote in person between 6 a.m. and 6 p.m. on Nov. 8. Make sure to check your polling location by logging into your <a href='https://indianavoters.in.gov/' target='_blank'>voter portal</a>. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "value": "In person",
            "child": {
                "question": "When do you want to vote?",
                "answers": [
                    {
                        "value": "Early",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "In-person early voting will open Oct. 12 and end at noon Nov. 7. Make sure to check early voting locations by logging into your voter portal. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
                        }
                    },
                    {
                        "value": "Election Day",
                        "child": {
                            "question": "",
                            "directions": 1,
                            "answers": "Vote in person between 6 a.m. and 6 p.m. on Nov. 8. Make sure to check your polling location by logging into your voter portal. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
                        }
                    }
                ]
            }
        }
    ]
}
// grab quiz container from DOM
let quizContainer = document.querySelector('#quiz');

// quiz finished message
let finishedMsg;

// toggle email form flag
let flag = true;
/*
    UTILITY FUNCTIONS
*/
let restart = document.querySelector('.restart');
restart.addEventListener('click', callback);
function callback() {
    quizContainer.innerHTML = '';
    display(json);
}

/*
    MAIN FUNCTIONS
*/
// display the quiz questions from the json
function display(jsonData) {
    let html;
    if (jsonData.note) {
        html = `<div class="quiz answer">
            <h4 class="answer">${jsonData.question}</h4>
            <h5>${jsonData.note}</h5>
            </div>`;
        displayEnd(html);
    } else {
        // start quiz html to insert
        html = `<div class="quiz">
                <h4>${jsonData.question}</h4>
                <div class="choices">`;
        if (jsonData.registerNote) {
            html = `<div class="quiz answer"><h4>${jsonData.question}</h4>`
            console.log('hey')
        }
        // add an answer choice for each answer
        for (let i = 0; i < jsonData.answers.length; i++) {
            html += `<p class="choice">${jsonData.answers[i].value}</p>`
        }
        html += `</div></div>`;
        quizContainer.insertAdjacentHTML('beforeend', html);
        // grab elements from DOM to add event listeners
        let quizzes = document.querySelectorAll('.quiz');
        let lastQuiz = quizzes[quizzes.length - 1];
        let choices = lastQuiz.querySelectorAll('.choice');
        // for each answer choice, add functionality on click
        for (let choice of choices) {
            choice.onclick = (event) => {
                answer(event, jsonData);
                event.srcElement.classList.add('active');
            };
        }
    }

}

// What to do when quiz is finished
function displayEnd(html) {
    html += finishedMsg;
    quizContainer.insertAdjacentHTML('beforeend', html);
}

// Process transitioning to quiz section
function toSection(sectionTitle) {
    if (sectionTitle === '>>green section') {
        display(greenSectionJSON);
    } else {
        display(sectionThreeJSON);
    }
}

function toggleForm() {
    let emailForm = document.querySelector('.email-form');
    if (flag) {
        emailForm.style.display = 'block';
        flag = false;
    }
    else {
        flag = true;
        emailForm.style.display = 'none';
    }
    console.log(emailForm.style);
}

// process the user's answer choices
function answer(event, jsonData) {
    console.log(jsonData)
    // remove event listeners on previous questions, disable hover
    document.querySelectorAll('.choice').forEach((choice) => {
        choice.onclick = null;
        choice.classList.add('no-hover');
    });
    // restart json to only include unanswered questions
    let newJSON = jsonData.answers.find(a => a.value === event.srcElement.innerHTML);
    jsonData = newJSON['child'];
    if (jsonData.noVote) finishedMsg = `<br/><p class="finished">It's the thought that counts!</p>`
    else finishedMsg = `<br/><p class="finished">Now that you're finished with this quiz, don't forget to vote!</p>`
    // transition to a new section of the quiz
    if (jsonData.question.substring(0, 2) === ">>") {
        toSection(jsonData.question);
        return;
    }
    // if there are more questions and answers to use
    if (jsonData.question.length > 0) { display(jsonData); }
    else {
        console.log(jsonData.answers)
        let html = `<div class="quiz answer">
        <h4>${jsonData.answers}</h4>
        </div>`;
        displayEnd(html);
    }
}

/* 
    MAIN
*/
// call display function so quiz can initialize
display(json);
