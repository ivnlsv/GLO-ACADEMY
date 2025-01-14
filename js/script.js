"use strict";
const title = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const calcButton = buttons[0];
const resetButton = buttons[1];
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type="range"]');
const spanItem = document.querySelector('.rollback span.range-value');
let screens = document.querySelectorAll('.screen');
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
  init: function () { 
    appData.addTitle();
    calcButton.addEventListener('click', appData.start);
    plusBtn.addEventListener('click', appData.addScreenBlock);
  },
  addTitle: function () { 
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    //appData.asking();
    //appData.addPrices();
    //appData.fullPrice = appData.getFullPrice();
    //appData.servicePercentPrices = appData.getServicePercentPrices();
    //appData.title = appData.getTitle();
    //appData.logger();
  },
  isString: function (str) {
    return typeof str === 'string' && isNaN(str);
   },

  addScreens: function () { 
    screens.forEach(function (screen, index) { 
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      });
    })
  },
  addScreenBlock: function () { 
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  asking: function () {
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

function getInputs() { 
  for (let i = 0; i < inputs.length; i++) { 
    const inputElem = inputs[i];
    console.log(inputElem)
  }
}
appData.init();
