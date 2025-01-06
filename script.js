"use strict";

function guessNumberBot() {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  function guessNumber() {
    const userInput = prompt("Угадай число от 1 до 100");
    if (userInput === null) {
      alert("Игра окончена");
      return;
    }
    const userGuess = Number(userInput);
    if (isNaN(userGuess)) {
      alert("Введи число!");
      guessNumber();
    } else if (userGuess > randomNum) {
      alert("Загаданное число меньше");
      guessNumber();
    } else if (userGuess < randomNum) {
      alert("Загаданное число больше");
      guessNumber();
    } else {
      alert("Поздравляю, Вы угадали!!!");
    }
  }

  guessNumber();
}

guessNumberBot();
