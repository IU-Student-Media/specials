'use strict'
import { dailyWords } from "./daily-words.js";
import { fullList } from "./full-list.js";
import { winMessages } from "./win-messages.js";

const startDay = new Date("2025-10-21T00:00:00-04:00");

let wordleWord = []
let currentGuess = []
let pastGuesses = []
let numGuesses = 0

const pressedKeys = new Set()

let shaking = false
let canType = true
let win     = false

let hardMode = false
let hardModeGreens = []

const wordLength = 5
const maxGuesses = 6

const delay = ms => new Promise(res => setTimeout(res, ms));

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  CREATE INTERFACE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/**
 * Creates six rows of file tiles each for the interface
 */
function createTiles(rows = maxGuesses, cols = wordLength) {
    const tiles = document.querySelector('#tiles')
    tiles.innerHTML = ''

    for (let r = 0; r != rows; ++r) {
        const row = document.createElement('div');
        row.classList.add(`row-${r + 1}`)
        row.classList.add('hvr-wobble-horizontal')

        for (let c = 0; c != cols; ++c) {
            const col = document.createElement('div');
            col.classList.add('tile')
            col.setAttribute('data-tile', c + 1)
            row.appendChild(col)
        }

        tiles.appendChild(row)
    }
}
/**
 * Creates three rows of keyboard keys as interface elements
 */
function createKeys() {
    const qwerty = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        [
            'ENTER',
            'Z',
            'X',
            'C',
            'V',
            'B',
            'N',
            'M',
            `<span class="material-symbols-outlined">backspace</span>`,
        ],
    ];

    const keys = document.querySelector('#keys')
    keys.innerHTML = ''

    for (let r = 0; r != qwerty.length; ++r) {
        const row = document.createElement('div')
        row.classList.add(`row-${r}`)
        row.id = `row-${r}`

        for (let c = 0; c != qwerty[r].length; ++c) {
            const col = document.createElement('div')
            const key = qwerty[r][c].includes('backspace') ? 'backspace' : qwerty[r][c].toLowerCase()

            col.classList.add('key')
            if (key === 'enter') col.classList.add('enter')
            col.id = key
            col.onclick = keyClicked

            col.innerHTML = qwerty[r][c]

            row.appendChild(col)
        }

        keys.appendChild(row)
    }
}

function randomInt(end, start = 0) {
    return Math.floor(Math.random() * (end - start)) + start
}

function arraysEqual(arr1, arr2) {
    for (let i=0; i!=arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false
    }
    return arr1.length == arr2.length
}

function getDay() {
	const now = new Date()
	const day = Math.floor((now.valueOf() - startDay.valueOf()) / (1000 * 60 * 60 * 24))
	return day
}

async function chooseWord() {
	wordleWord = dailyWords[getDay()]
	return wordleWord
}

function updateTileLetters(deleting) {
    const row = document.querySelector('#tiles').childNodes[maxGuesses - 1 - numGuesses]
    for (let i = 0; i < wordLength; ++i) {
        if (currentGuess[i] === undefined) {
            row.childNodes[i].innerText =''
            row.childNodes[i].classList.remove('active');
        } else {
            if (i == currentGuess.length - 1 && !deleting) {
                row.childNodes[i].classList.add('new-letter');
                setTimeout(() => row.childNodes[i].classList.remove('new-letter'), 50)
            }

            row.childNodes[i].innerText = currentGuess[i];
            row.childNodes[i].classList.add('active');
        }
    
    }
}

function isLetter(str) {
    return str.length == 1 && ((str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90) || (str.charCodeAt(0) >= 97 && str.charCodeAt(0) <= 122))
}

function keyClicked(e) {
    if (!canType) return
    const key = e.key !== undefined ? e.key.toUpperCase() : e.target.id.toUpperCase()
    if (key != 'ENTER' && key != 'BACKSPACE' && !isLetter(key)) return

    if (key == 'BACKSPACE') {
        currentGuess.pop()
    }
    else if (key == 'ENTER') {
        submitWord()
        return
    }
    else {
        if (currentGuess.length == wordLength) return
        currentGuess.push(key)
    }

    updateTileLetters(key == 'BACKSPACE')
}

function notify(e, timeout=1500) {
    const notifyContainer = document.querySelector('.notify-container')
    const notification = document.createElement('div');
   
    notification.classList.add('notification')
    notification.classList.add('open')
    notification.innerText = e
    notifyContainer.insertBefore(notification, notifyContainer.firstChild);

    if (timeout != 0) {
        setTimeout(() => notification.classList.remove('open'), timeout)
        setTimeout(() => notification.remove(), timeout + 250)
    }
}

function clearNotify() {
    const notifyCont = document.querySelector('.notify-container')
    notifyCont.style.opacity = '0'
    setTimeout(() => {
        notifyCont.innerHTML = ''
        notifyCont.style.opacity = '1'
    }, 250)
}

function errorGuess(e, activeRow) {
    notify(e)

    if (!shaking) {
        shaking = true
        activeRow.classList.add('active-effect')
        setTimeout(() => { activeRow.classList.remove('active-effect'); shaking = false }, 500)
    }
}

function evaluateGuess(guess, answer) {
   
    const res = []
    const answerLetters = {}
    
    for (let i=0; i<wordLength; ++i) {
        if(guess[i] == answer[i]){
            res[i] = 'correct'
            hardModeGreens[i] = guess[i]
        } else {
            answerLetters[answer[i]] = answerLetters[answer[i]] !== undefined ? answerLetters[answer[i]] + 1 : 1
        }
    }

    for (let i=0; i<wordLength; ++i) {
        if (guess[i] == answer[i]) continue; // we already covered this above
        if (answerLetters[guess[i]] === undefined || answerLetters[guess[i]] <= 0) {
            res[i] = 'absent'
        } else {
            res[i] = 'present'
            answerLetters[guess[i]]--
        }
    }

    return res
}

async function handleResult(res, activeRow, fanfare = true) {
	
    numGuesses++
    win = arraysEqual(res, new Array(wordLength).fill('correct'))

    if (win && fanfare){
        notify(winMessages[randomInt(winMessages.length)])
        // dance
        for (let i=0; i<wordLength; ++i) {
            setTimeout(() => {
                activeRow.childNodes[i].classList.remove('active-effect')
                activeRow.childNodes[i].classList.add('active-dancing')
            }, 200 * i)
        }  
    }
    else if (numGuesses == maxGuesses) notify(wordleWord.toUpperCase(), 0)
    
    if (win || numGuesses == maxGuesses) {
        if (fanfare) await delay(200 * wordLength + 1000)
        playAgainModal(win)
    } else {
        canType = true
        currentGuess = []
    }

}

async function updateDisplay(res, guess, activeRow, delayDuration=200) {
    for (let i=0; i<wordLength; ++i) {
        // set tile colors
        setTimeout(() => {
            activeRow.childNodes[i].classList.add('active-effect')

            setTimeout(() => {
                activeRow.childNodes[i].classList.add(`color-${res[i]}`)
				activeRow.childNodes[i].innerText = guess[i].toUpperCase()
            }, 250)
        }, delayDuration * i)

        // set key colors
        document.getElementById(guess[i]).classList.add(`key-${res[i]}`)
    } 

    canType = false
    await delay(200 * wordLength + 500)
}

function checkHardMode(guess) {
    for (let i=0; i!=wordLength; ++i) {
        if (hardModeGreens[i] !== undefined && hardModeGreens[i] != guess[i]) {
            return false
        }
    }
    return true
}

async function submitWord() {

    const activeRow = document.querySelector('#tiles').childNodes[maxGuesses - 1 - numGuesses]
    const guess = currentGuess.toString().replaceAll(',', '').toLowerCase()
	
    if (currentGuess.length < 5) {
        errorGuess("Not enough letters", activeRow)
    } else if (!fullList.includes(guess)) {
        errorGuess("Invalid word", activeRow)
    } else if (hardMode && !checkHardMode(guess)){
        errorGuess("Invalid hard mode guess", activeRow)
    } else {
		pastGuesses.push(guess)

		localStorage.setItem('idguess-data', JSON.stringify({
			pastGuesses : pastGuesses,
			day : getDay()
		}))

		const res = evaluateGuess(guess, wordleWord)
        await updateDisplay(res, guess, activeRow)
        await handleResult(res, activeRow)
    }
}

function playAgainModal(win) {
	const modalHTML = document.getElementById('play-again')
	const modal = new bootstrap.Modal(modalHTML)
	modal.show()

	modalHTML.querySelector('#modal-end-message').innerText = win ? 'Congratulations!' : 'Better luck next time...'
	modalHTML.querySelector('#modal-end-word').innerText = wordleWord.toUpperCase()

	modalHTML.querySelector('#share-button').onclick = async (e) => {


		const guessEval = pastGuesses.map(g =>
			evaluateGuess(g, wordleWord).map(x =>
				x == 'correct' ? '🔴' : x == 'present' ? '🟡' : '⚫').join(''))
			  .reverse()
			  .join('\n');
		
		const shareText = `IDGuess ${getDay() + 1} ${pastGuesses.length}/${maxGuesses}\n\n${guessEval}`;
		
		try {
			if (navigator.share) {
				await navigator.share({
					title: "IDGuess",
					url: "",
					text: shareText
				});
			} else if (navigator.clipboard) {
				navigator.clipboard.writeText(shareText)
				notify('Copied results to clipboard')
			} else {
				notify('Something went wrong')
			}
		} catch (e) {
			notify('Something went wrong')
			console.error(e)
		}
	}
}


function howToPlayModal() {
	const modalHTML = document.getElementById('how-to-play')
	const modal = new bootstrap.Modal(modalHTML)
	modalHTML.querySelector('#start-game-btn').onclick = () => modal.hide();
	modal.show()
	return modal
}

function welcomeBackModal(store) {
	const modalHTML = document.getElementById('welcome-back')
	const modal = new bootstrap.Modal(modalHTML)

	modalHTML.querySelector('#continue-btn').onclick = () => modal.hide();
	modalHTML.querySelector('#modal-current-guess').innerHTML = store.pastGuesses.length
	modalHTML.querySelector('#modal-total-guess').innerHTML = maxGuesses
	
	modal.show()
	return modal
}


async function start() {
	const hardModeCheck = document.getElementById('hardmode-check')
    hardModeCheck.oninput = () => hardMode = !hardMode;

	const store = JSON.parse(localStorage.getItem('idguess-data'))

	if (store && store.pastGuesses) {
		pastGuesses = store.pastGuesses
	} else {
		pastGuesses = []
	}

	currentGuess = []
	shaking = false
	canType = true
	hardModeCheck.checked = false
	hardMode = false
	hardModeGreens = []
	numGuesses = 0
	win = false
	
    createTiles()
    createKeys()
    clearNotify()

	await delay(250)
	
	for (const past of pastGuesses) {
		const activeRow = document.querySelector('#tiles').childNodes[maxGuesses - 1 - numGuesses]
        const res = evaluateGuess(past, wordleWord)
        updateDisplay(res, past, activeRow, 100)
		await handleResult(res, activeRow, false)
	}
	
}

(async function () {
	document.querySelectorAll('.date').forEach(d => {
		const today = new Date()
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		d.innerHTML = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`
	})
	document.querySelectorAll('.idguess-number').forEach(n => {
		n.innerHTML = `No. ${getDay() + 1}`
	})

	await chooseWord()
	
	let store = JSON.parse(localStorage.getItem('idguess-data'))

	// set day / reset store based off of store
	if ((store && store.day != getDay()) || !store) {
		store = { day : getDay() } 
		localStorage.setItem('idguess-data', JSON.stringify(store))
	}


	// load modals based off of store
	if (store && store.pastGuesses) {
		if (store.pastGuesses[store.pastGuesses.length - 1] !== wordleWord) {
			welcomeBackModal(store)
		}
	} else {
		howToPlayModal()
	}
	
    // bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(e => new bootstrap.Tooltip(e));

    window.onkeydown = (e) => {
        pressedKeys.add(e.key.toUpperCase())
        if (!pressedKeys.has('CONTROL')) keyClicked(e);
    }
    window.onkeyup = (e) => pressedKeys.delete(e.key.toUpperCase())
    document.onvisibilitychange = document.onblur = () => pressedKeys.clear()

	await start()
})()

window.onload = () => {
	requestAnimationFrame(() => {
		document.querySelector('.fade-in').classList.add('show')
	})
}


