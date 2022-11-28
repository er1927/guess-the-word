const guessedLettersElements = document.querySelector(".guessed-letters");
const guessBttn = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingLetters = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span")
const mssg = document.querySelector(".message");
const playAgainBttn = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const updateWordInProgress = function (word) {
    const updateWordInProgressLetters = [];
    for (const letter of word) {
        console.log(letter);
        updateWordInProgressLetters.push("●");
    }
    wordInProgress.innerText = updateWordInProgressLetters.join("");
};

updateWordInProgress(word);

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
    }
};
