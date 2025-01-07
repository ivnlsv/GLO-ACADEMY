"use strict";

const appData = {
  title: '',
  screens: '',
  adaptive: true,
  screenPrice: 0,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  service1: '',
  servicePrice1: 0,
  service2: '',
  servicePrice2: 0,
  asking: function () { 
    appData.title = prompt("Как называется ваш проект?");
    appData.screens = prompt("Какие типы экранов нужно разработать?");
    do { 
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  }
}
const isNumber = function(num) { 
  return !isNaN(parseFloat(num)) && isFinite(num)
}

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      appData.service2 = prompt("Какой еще дополнительный тип услуги нужен?");
    }
    let price;
    do {
      price = prompt("Сколько это будет стоить?");
      if (isNaN(price) || price === "" || price === null) {
        alert("Введите число!");
      }
    } while (!isNumber(price));
    sum += +price;
  }
  return sum;
};

function getFullPrice() {
  return appData.screenPrice + appData.allServicePrices;
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
  return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
}

function getServicePercentPrices() {
  return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
}
appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice();
appData.servicePercentPrices = getServicePercentPrices();
appData.title = getTitle();
console.log(appData.fullPrice);
console.log(appData.servicePercentPrices);
//console.log("Стоимость за вычетом отката: " + " " + servicePercentPrices);


























