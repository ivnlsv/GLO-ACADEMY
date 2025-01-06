"use strict";
let userInput = +prompt("Угадай число от 1 до 100");
let randomNum = Math.floor(Math.random() * 100) + 1;
console.log(randomNum);
if (userInput > randomNum) {
  alert("Загаданное число меньше");
} else if (userInput < randomNum) {
  alert("Загаданное число меньше");
} else if (userInput === randomNum) { 
  alert("Поздравляю, Вы угадали!!!");
  
}
