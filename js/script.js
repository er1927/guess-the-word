const guessedLettersElements = document.querySelector(".guessed-letters");
const guessBttn = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingLetters = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const mssg = document.querySelector(".message");
const playAgainBttn = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };
  
  getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessBttn.addEventListener("click", function (e) {
    e.preventDefault();
    mssg.innerText = "";
    const guess = letterInput.value;
    const rightGuess = validator(guess);
    //console.log(rightGuess);
    if (rightGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validator = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0 ) {
        mssg.innerText = "Type in a letter, please!";
    }
    else if (input.length > 1) {
        mssg.innerText = "Type in ONE letter, please!";
    }
    else if (!input.match(acceptedLetter)) {
        mssg.innerText = "Type in a letter from A to Z, please!";
    }
    else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        mssg.innerText = "You already guessed that one, try again!"
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElements.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElements.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●")
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      mssg.innerText = `Sorry, the word doesn't have ${guess}.`;
      remainingGuesses -= 1;
    } else {
      mssg.innerText = `Yes! The word has the letter ${guess}.`;
    }
  
    if (remainingGuesses === 0) {
      mssg.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
     startOver();
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
  };

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        mssg.classList.add("win");
        mssg.innerHTML = `<p class="highlight">You guessed the right word! Good for you! </p>`;
        startOver();
    }
};

const startOver = function () {
    guessBttn.classList.add("hide");
    remainingLetters.classList.add("hide");
    guessedLettersElements.classList.add("hide");
    playAgainBttn.classList.remove("hide");
};

playAgainBttn.addEventListener("click", function () {
    mssg.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElements.innerHTML = "";
    mssg.innerText = "";
    getWord();

    guessBttn.classList.remove("hide");
    playAgainBttn.classList.add("hide");
    remainingLetters.classList.remove("hide");
    guessedLettersElements.classList.remove("hide");
})