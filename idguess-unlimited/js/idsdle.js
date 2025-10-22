'use strict'
import { wordleWords } from "./idsdle-list.js";
import { fullList } from "./full-list.js";
import { winMessages } from "./win-messages.js";

let wordleWord = []
let currentGuess = []
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

function chooseWord() {
    wordleWord = wordleWords[randomInt(wordleWords.length)]
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

async function handleResult(res, activeRow) {

    numGuesses++
    win = arraysEqual(res, new Array(wordLength).fill('correct'))

    if (win){
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
        await delay(200 * wordLength + 1000)
        playAgainModal(win)
    } else {
        canType = true
        currentGuess = []
    }

}

async function updateDisplay(res, guess, activeRow) {
    for (let i=0; i<wordLength; ++i) {
        // set tile colors
        setTimeout(() => {
            activeRow.childNodes[i].classList.add('active-effect')
            setTimeout(() => {
                activeRow.childNodes[i].classList.add(`color-${res[i]}`)
            }, 250)
        }, 200 * i)

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
        const res = evaluateGuess(guess, wordleWord)
        await updateDisplay(res, guess, activeRow)
        await handleResult(res, activeRow)
    }
}

function playAgainModal(win) {
    const modal = new bootstrap.Modal(document.getElementById('play-again'))
    modal.show()

    document.getElementById('modal-end-message').innerText = win ? 'Congratulations!' : 'Better luck next time...'
    document.getElementById('modal-end-word').innerText = wordleWord.toUpperCase()
    document.getElementById('play-again-btn').onclick = () => {
        modal.hide()
        start()
    }
    document.getElementById('play-again-btn').focus()
}

function howToPlayModal() {
	const modal = new bootstrap.Modal(document.getElementById('how-to-play'))
	modal.show()
	return modal
}

function start() {
	currentGuess = []
    hardModeGreens = []
    numGuesses = 0
    shaking = false
    canType = true
	win     = false
	
    const hardModeCheck = document.getElementById('hardmode-check')
    hardModeCheck.checked = false
    hardMode = false
    hardModeCheck.oninput = () => {hardMode = !hardMode; console.log(hardMode);}

    createTiles()
    createKeys()
    chooseWord()
    clearNotify()
}

(function () {
	const howToPlay = howToPlayModal()
	document.querySelector('#start-game-btn').onclick = () => howToPlay.hide();
	
    // bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(e => new bootstrap.Tooltip(e));

    document.getElementById('new-game-btn').onclick = async () => {
        document.getElementById('new-game-btn').blur()
		if (!win) {
			notify(wordleWord.toUpperCase(), 0)
			canType = false
			await delay(2000)
		}
        start()
    }

    window.onkeydown = (e) => {
        pressedKeys.add(e.key.toUpperCase())
        if (!pressedKeys.has('CONTROL')) keyClicked(e);
    }
    window.onkeyup = (e) => pressedKeys.delete(e.key.toUpperCase())
    document.onvisibilitychange = document.onblur = () => pressedKeys.clear()

	start()
})()


window.onload = () => {
	requestAnimationFrame(() => {
		document.querySelector('.fade-in').classList.add('show')
	})
}
