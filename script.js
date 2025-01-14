"use strict";
const titleH = document.getElementsByTagName('h1');
const calcButton = document.getElementsByClassName('handler_btn')[0];
const resetButton = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type="range"]');
const spanItem = document.querySelector('.rollback span.range-value');
let screensA = Array.from(document.querySelectorAll('.screen'));
const inputs = document.getElementsByClassName('total-input');

const appData = {
  title: "",
  screens: [],
  adaptive: true,
  screenPrice: 0,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrices = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },
  isString: function (str) {
    return typeof str === 'string' && isNaN(str);
   },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?");
    } while (!appData.isString(appData.title));  
    for (let i = 0; i < 2; i++) {
      let name = "";
      do { 
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isString(name));
      
      let price = 0;
      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      do { 
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isString(name));
       
      let price = 0;
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().slice(1).toLowerCase()
    );
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price > 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrices);
    
    
  },
};

function getTitleH() { 
  return titleH[0]

}
function getInputs() { 
  for (let i = 0; i < inputs.length; i++) { 
    const inputElem = inputs[i];
    console.log(inputElem)
  }
}
appData.start();
console.log(getTitleH().textContent);
console.log(calcButton);
console.log(resetButton);
console.log(plusBtn);
console.log(percentItems);
console.log(numberItems);
console.log(rangeInput);
console.log(spanItem);
console.log(screensA);
getInputs();