"use strict";
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 10;
let adaptive = prompt("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой еще дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

let fullPrice = getFullPrice(screenPrice, allServicePrices);

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

function getTitle(input) {
  if (!input || input.trim() === "") {
    return "Название проекта отсутствует";
  }
  input = input.toLowerCase().trim();
  return input[0].toUpperCase() + input.slice(1);
}

function getServicePercentPrices(rollBack, totalPrice) {
  let dealerPercent = totalPrice * (rollBack / 100);
  return totalPrice - dealerPercent;
}

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(
  "Стоимость за вычетом отката: " +
    " " +
    getServicePercentPrices(rollback, fullPrice)
);
