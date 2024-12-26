"use strict";
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = prompt("Нужен ли адаптив на сайте?");

let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrices;

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой еще дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
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
    return fullPrice - (fullPrice* (rollback / 100));
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
console.log("Стоимость за вычетом отката: " +  " " + servicePercentPrices);
