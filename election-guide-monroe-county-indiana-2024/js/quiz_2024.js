'use strict';

/*
  Content for the quiz.
  TODO: Amend this as deadlines pass
*/
const registerSectionJSON = {
  "question": "Will you be 18 on or before Nov. 5?",
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
                          "question": "Log into your state's voter portal to change your registration by your state's deadline (by Oct. 7 if you live in <a href='https://indianavoters.in.gov/' target='_blank'>Indiana</a>).",
                          "directions": 1,
                          "answers": [
                            {
                              "value": "Now plan how you'll vote!",
                              "child": ">>voting"
                            }
                          ]
                        }
                      },
                      {
                        "value": "No",
                        "child": ">>voting"
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
                                "question": "Register at <a href='https://www.vote.org/register-to-vote/indiana/' target='_blank'>this link</a>) by Oct. 7, the deadline for the November election.",
                                "answers": [
                                  {
                                    "value": "Now plan how you'll vote!",
                                    "child": ">>voting"
                                  }
                                ]
                              }
                            },
                            {
                              "value": "No",
                              "child": {
                                // add input for state to give back specific state URL
                                "directions": 1,
                                "question": "Find your state's registration rules and deadlines at <a href='https://www.vote.org/voter-registration-rules/' target='_blank'>this link</a>).",
                                "answers": [
                                  {
                                    "value": "Now plan how you'll vote!",
                                    "child": ">>voting"
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
                          "question": "You can register to vote in Monroe County at <a href='https://www.vote.org/register-to-vote/indiana/' target='_blank'>this link</a>) by the Oct. 7 deadline.",
                          "answers": [
                            {
                              "value": "Now plan how you'll vote!",
                              "child": ">>voting"
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
                  "child": ">>voting"
                },
                {
                  "value": "No",
                  "child": {
                    "directions": 1,
                    "registerNote": 1,
                    "question": "Make sure to register to vote by the Oct. 7 deadline. <br><br> <b>Register online</b>: You can register online in Monroe County, here's <a href='https://indianavoters.in.gov/' target='blank'>the link</a> (it will take less than five minutes). You’ll need a valid driver’s license or Indiana state ID card to fill out the online registration form. <br/><br/> <b>Register in person</b>: If you’re a college student who registered by mail and you're a first-time voter, don't forget to bring a <a href='https://www.in.gov/sos/elections/2626.htm' target='_blank'>second document</a> when you vote in addition to a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a> to verify your address.",
                    "answers": [
                      {
                        "value": "I've registered.",
                        "child": ">>voting"
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
        "finish": "Looks like you’re too young to vote in this cycle. Want to be reminded when you become eligible to vote? You can sign up <a href='https://www.vote.org/pledge-to-register/' target='_blank'> here</a>."
      }
    }
  ]
}

const votingSectionJSON = {
  "question": "Where are you registered to vote?",
  "answers": [
    {
      "value": "Monroe County (IU)",
      "child": {
        "question": "Where will you be on Election Day?",
        "answers": [
          {
            "value": "Not in Monroe County",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 24. Don't forget to return it by 6 p.m. Nov. 5, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
            }
          },
          {
            "value": "Monroe County",
            "child": ">>indiana"
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
            "child": ">>indiana"
          },
          {
            "value": "At IU",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 27. Don't forget to return it by 6 p.m. Nov. 5, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
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
            "value": "At my out-of-state home address",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Find out how your home state is handling absentee or early voting, including requirements and deadlines, at <a href='https://www.vote.org/absentee-voting-rules/' target='_blank'>this link</a> to make sure your vote is counted this November."
            }
          },
          {
            "value": "At IU",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Request your home ballot to be sent to you to vote by mail. Refer to <a href=' <a href='https://www.vote.org/absentee-voting-rules/' target='_blank'>this link</a> to see the absentee ballot requirements of each state and to request your ballot."
            }
          },
        ]
      }
    }
  ]
}

const indianaSectionJSON = {
  "question": "How do you want to vote in the November election?",
  "answers": [
    {
      "value": "Absentee by mail",
      "html": "yes",
      "child": {
        "question": "Does one of the following apply? <ul><li>You have a specific, reasonable expectation that you will be out of the county for the entire 12 hours the polls are open, 6 a.m. to 6 p.m., on Nov. 5 </li><li>  You have a disability </li><li>  You are at least 65 years old</li><li>  You have official election duties outside your precinct</li><li>  You are scheduled to work at your regular place of employment the entire 12 hours the polls are open</li><li>  You will be confined due to illness or injury or due to caring for an individual confined due to illness or injury during the entire 12 hours the polls are open.</li><li>  You are unable to vote due to a religious discipline or religious holiday during the entire 12 hours that the polls are open</li><li>  You are a participant in your state's address confidentiality program (for victims of domestic violence and sexual assault)</li><li>  You are a member of the military or a public safety officer</li><li>  You are a 'serious sex offender' as defined in Indiana Code 35-42-4-14(a). </li><li>  You are prevented from voting because transportation is unavailable.</li></ul>",
        "answers": [
          {
            "value": "Yes",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Request an absentee ballot <a href='https://www.vote.org/absentee-ballot/indiana/' target='_blank'>here</a> by Thursday, Oct. 24. Don't forget to return it by 6 p.m. Nov. 5, Election Day. Mail-in ballots must be physically received by 6 p.m. — ballots postmarked before that time will not be counted."
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
                    "finish": "In-person early voting will open Oct. 8 and end at noon Nov. 4. Make sure to check early voting locations by logging into your <a href='https://indianavoters.in.gov/' target='_blank'>voter portal</a>. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a>!"
                  }
                },
                {
                  "value": "Election Day",
                  "child": {
                    "question": "",
                    "directions": 1,
                    "finish": "Vote in person between 6 a.m. and 6 p.m. on Nov. 5. Make sure to check your polling location by logging into your <a href='https://indianavoters.in.gov/' target='_blank'>voter portal</a>. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
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
              "finish": "In-person early voting will open Oct. 8 and end at noon Nov. 4. Make sure to check early voting locations by logging into your voter portal. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
            }
          },
          {
            "value": "Election Day",
            "child": {
              "question": "",
              "directions": 1,
              "finish": "Vote in person between 6 a.m. and 6 p.m. on Nov. 5. Make sure to check your polling location by logging into your voter portal. Don't forget to bring a <a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'><a href='https://www.in.gov/sos/elections/voter-information/photo-id-law/' target='_blank'>valid photo ID</a></a>!"
            }
          }
        ]
      }
    }
  ]
}

/*
  Elements that I care about
*/
const backBtn = document.getElementById("btn-back");
const forwardBtn = document.getElementById("btn-forward");
const restartBtn = document.getElementById("btn-restart");
const startBtn = document.getElementById("btn-start");
const contentBox1 = document.getElementById("quiz-content1")
const contentBox2 = document.getElementById("quiz-content2")
contentBox2.style.display = "none";

forwardBtn.style.display = 'none';

let contentBuffer = [contentBox1, contentBox2];

/*
  currentSection : "START" | json
*/
let currentSection = "START";
let history = [];

/*
  Moves from title to phase 1
*/
function startQuiz() {
  // forwardBtn.style.display = "";
  restartBtn.style.display = "";
  startBtn.style.display = "none";
  currentSection = registerSectionJSON;
  updateDisplay(1);
}

/*
  Moves from any quiz state to title
*/
function resetQuiz() {
  backBtn.style.display = "none";
  forwardBtn.style.display = "none";
  restartBtn.style.display = "none";
  startBtn.style.display = "";
  currentSection = "START";

  contentBuffer = [contentBox1, contentBox2];

  history = [];
  updateDisplay(0); // No transition on page load
}

async function transition(elementIn, elementOut, dir) {
  let iTrans = "";
  let oTrans = "";
  if (dir == 1) {
    iTrans = "translateX(100%)"
    oTrans = "translateX(-100%)"
  } else if (dir == -1) {
    iTrans = "translateX(-100%)"
    oTrans = "translateX(100%)"
  }
  elementOut.style.opacity = 0;
  elementOut.style.transform = oTrans
  elementIn.style.transform = iTrans

  // JS Event Loop Nonsense!
  setTimeout(() => {
    elementOut.style.display = "none";
    elementOut.innerHTML = "";
    elementIn.style.display = "";

    setTimeout(() => {
      elementIn.style.opacity = 1;
      elementIn.style.transform = "translateX(0%)"
    }, 100)
  }, 100);
}

function swapBuffers(html, dir) {
  contentBuffer[1].innerHTML = html;
  contentBuffer = [contentBuffer[1], contentBuffer[0]];
  transition(contentBuffer[0], contentBuffer[1], dir)

  let es = document.getElementsByClassName("answer")
  console.log(es);
  Array.from(es).forEach(b => {
    console.log(b);
    b.addEventListener('click', asdf)
})
}

function updateDisplay(dir) {
  let html;

  if (currentSection === "START") {
    forwardBtn.style.display = "none";
    html = `
    <h2>Voting Quiz</h2>
    <p>Answer the questions to get information and
        resources on how you can vote this November.
    </p>`
  } else if (currentSection.finish) {
    forwardBtn.style.display = "none";
    html = `
      <p>${currentSection.finish}
    </p>
    `
  } else {
  // forwardBtn.style.display = "";
    
    html = `<p>
    ${currentSection.question}
    </p>
    <div class="answers">
    `
    // Radio dials for each possible answer;
    if (currentSection.answers) {
      currentSection.answers.forEach((a, i) => {
        html += `<label class="answer">
                  <input type="radio"name="choice" id="${i}" value="${i}">
                 ${a.value}
                 </label>`
      });
    }

    html += "</div>"
  }

  swapBuffers(html, dir);


  if (history.length > 0) {
    backBtn.style.display = "";
  } else {
    backBtn.style.display = "none";
  }
}


backBtn.addEventListener('click', (e) => {
  currentSection = history.pop();
  updateDisplay(-1);
});

function asdf() {
  if (currentSection === "START") {
    currentSection = registerSectionJSON;
  } else {
    let selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) { return; }
    let answer = selected.value;

    let nextSection = currentSection.answers[answer].child;

    if (nextSection === ">>voting") {
      nextSection = votingSectionJSON;
    } else if (nextSection === ">>indiana") {
      nextSection = indianaSectionJSON;
    }

    history.push(currentSection);
    currentSection = nextSection;
  }

  updateDisplay(1);
}

forwardBtn.addEventListener('click', (e) => {
  if (currentSection === "START") {
    currentSection = registerSectionJSON;
  } else {
    let selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) { return; }
    let answer = selected.value;

    let nextSection = currentSection.answers[answer].child;

    if (nextSection === ">>voting") {
      nextSection = votingSectionJSON;
    } else if (nextSection === ">>indiana") {
      nextSection = indianaSectionJSON;
    }

    history.push(currentSection);
    currentSection = nextSection;
  }

  updateDisplay(1);
});

restartBtn.addEventListener('click', resetQuiz);
startBtn.addEventListener('click', startQuiz);

/*
  Start everything
*/
resetQuiz();
