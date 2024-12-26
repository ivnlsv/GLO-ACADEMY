"use strict";
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let adaptive = prompt("Нужен ли адаптив на сайте?");

let screenPrice;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrices;

let service1;
let servicePrice1;
let service2;
let servicePrice2;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getScreenPrice = function () {
  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  } while (isNaN(screenPrice) || screenPrice <= 0 || screenPrice === "" || screenPrice === null);

  return screenPrice;
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой еще дополнительный тип услуги нужен?");
    }
    let price;
    do {
      price = prompt("Сколько это будет стоить?");
      if (isNaN(price) || price === "" || price === null) {
        alert("Введите число!");
      }
    } while (isNaN(price) || price === "" || price === null);
    sum += +price;
  }
  return sum;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price > 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

function getTitle() {
  return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
}

function getServicePercentPrices() {
  return fullPrice - fullPrice * (rollback / 100);
}

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrices = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом отката: " + " " + servicePercentPrices);
