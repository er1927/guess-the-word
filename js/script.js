const guessedLetters = document.querySelector("guessed-letters");
const guessBttn = document.querySelector("guess");
const letterInput = document.querySelector("letter");
const wordInProgress = document.querySelector("word-in-progress");
const remainingLetters = document.querySelector("remaining");
const mssg = document.querySelector("message");
const playAgainBttn = document.querySelector("play-again");

const word = "Magnolia";

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
    const inputValue = input.value;
    console.log(inputValue);
    input.value = "";
})