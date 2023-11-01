let fruits = [
  "cumquat",
  "pineapple",
  "cherimoya",
  "passionfruit",
  "starfruit",
  "mandarin",
  "coconut",
  "persimmon",
  "cherimoya",
  "lychee",
  "pitaya"
]
let rightAnswer = '';
let chances = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let wins = 0;
let kills = 0;
let points = 0;

// Väljer slumpvis fram en frukt
function chosenFruit() {
  rightAnswer = fruits[Math.floor(Math.random() * fruits.length)];
};

// Alfabetet som knappar och lägga till onClick funktionen "handleGuess"
function createAlphabet() {
  let alphabetBtn = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `<button
        class="letter-btn" id='` + letter + `'
        onClick="handleGuess('` + letter + `')">
        ` + letter + `
    </button>`
  ).join('');
  document.getElementById('keyboard').innerHTML = alphabetBtn;
};

// Rätt gissad bokstav läggs till i ordet
function guessedWord() {
  wordStatus = rightAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('magicWord').innerHTML = wordStatus;
};

// Vid fel bokstav, lägg till en del av bilden
function updateHangman() {
  if (mistakes == 1) {
    document.querySelector('figure').classList.add('scaffold1')
    document.querySelector('figure').classList.add('scaffold2')
    document.querySelector('figure').classList.add('scaffold3')
    document.querySelector('figure').classList.add('rope')
  } else if (mistakes == 2) {
    document.querySelector('figure').classList.add('head')
  } else if (mistakes == 3) {
    document.querySelector('figure').classList.add('body')
  } else if (mistakes == 4) {
    document.querySelector('figure').classList.add('arm1')
  } else if (mistakes == 5) {
    document.querySelector('figure').classList.add('arm2')
  } else if (mistakes == 6) {
    document.querySelector('figure').classList.add('leg1')
  } else if (mistakes == 7) {
    document.querySelector('figure').classList.add('leg2')
  }
};

// Uppdaterar fel-bokstav-räknaren
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

// Om rätt ord gissas
function checkIfGameWon() {
  if (wordStatus === rightAnswer) {
    document.getElementById('keyboard').innerHTML = 'Yay! You saved him!';
    document.getElementById('wins').innerHTML = wins += 1;
    document.getElementById('sumPoints').innerHTML = points += 150;
  }
};

// Om max antal mistakes blir nådd
function checkIfGameLost() {
  if (mistakes === chances) {
    document.getElementById('keyboard').innerHTML = 'The fruit was ' + rightAnswer;
    document.getElementById('magicWord').innerHTML = 'Oh no!';
    document.getElementById('kills').innerHTML = kills += 1;
    document.getElementById('sumPoints').innerHTML = points -= 100;
  }
};

// Lägga ihop alla funktioner som behövs för att göra spelet användbart
// gissad bokstav blir grå
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  if (rightAnswer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (rightAnswer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangman();
 }
};

// Funktion för nollställning och nytt ord
function startOver() {
  mistakes = 0;
  guessed = [];
  document.querySelector('figure').className = "" // gömmer svg'n
  chosenFruit();
  guessedWord();
  updateMistakes();
  createAlphabet();
};