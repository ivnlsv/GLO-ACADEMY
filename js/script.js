"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn");
const calcButton = buttons[0];
const resetButton = buttons[1];
const plusBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector('.rollback input[type="range"]');
const spanItem = document.querySelector(".rollback span.range-value");
let screens = document.querySelectorAll(".screen");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalOther = document.getElementsByClassName("total-input")[2];
const totalFull = document.getElementsByClassName("total-input")[3];
const totalRollback = document.getElementsByClassName("total-input")[4];

const appData = {
  title: "",
  screens: [],
  count: 0,
  adaptive: true,
  screenPrice: 0,
  rollback: 0,
  rollBackTotal: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    appData.checkFields();
    appData.getRollback();
    calcButton.addEventListener("click", appData.start);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    document.querySelectorAll("#select").forEach((select) => {
      select.addEventListener("change", appData.checkFields);
    });
    document.querySelectorAll("#input").forEach((input) => {
      input.addEventListener("input", appData.checkFields);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  getRollback: function () {
    rangeInput.addEventListener("input", (event) => {
      // Обновляем значение в span
      const value = event.target.value;
      spanItem.textContent = value + "%";

      // Обновляем значение в объекте
      appData.rollback = +value;
    });
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    //appData.fullPrice = appData.getFullPrice();
    //appData.servicePercentPrices = appData.getServicePercentPrices();
    //appData.title = appData.getTitle();
    //appData.logger();
    appData.showResult();
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    totalFull.value = appData.fullPrice;
    totalRollback.value = appData.rollBackTotal;
    totalCount.value = appData.count;
  },
  addScreens: function () {
    let screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    appData.count = appData.screens.length;
  },
  checkFields: function () {
    const allSelect = document.querySelectorAll("#select");
    const allInput = document.querySelectorAll("#input");
    let allFilled = true;

    allSelect.forEach((select) => {
      if (select.value === "") allFilled = false;
    });
    allInput.forEach((input) => {
      if (input.value.trim() === "") allFilled = false;
    });
    if (allFilled) {
      calcButton.disabled = false;
      calcButton.classList.remove("disabled");
    } else {
      calcButton.disabled = true;
      calcButton.classList.add("disabled");
    }
  },
  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    numberItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    document.querySelectorAll("#select").forEach((select) => {
      select.addEventListener("change", appData.checkFields);
    });
    document.querySelectorAll("#input").forEach((input) => {
      input.addEventListener("input", appData.checkFields);
    });
    appData.checkFields();
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
    appData.rollBackTotal =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  //getServicePercentPrices: function () {
  //  appData.getRollback();
  //   appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  //},

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
};

appData.init();
