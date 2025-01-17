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
    this.addTitle();
    this.checkFields();
    this.getRollback();
    calcButton.addEventListener("click", this.start);
    plusBtn.addEventListener("click", this.addScreenBlock);
    document.querySelectorAll("#select").forEach((select) => {
      select.addEventListener("change", this.checkFields);
    });
    document.querySelectorAll("#input").forEach((input) => {
      input.addEventListener("input", this.checkFields);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  getRollback: function () {
    rangeInput.addEventListener("input", (event) => {
       const value = event.target.value;
      spanItem.textContent = value + "%";
      this.rollback = +value;
    });
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    //appData.logger();
    this.showResult();
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFull.value = this.fullPrice;
    totalRollback.value = this.rollBackTotal;
    totalCount.value = this.count;
  },
  addScreens: function () {
    let screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
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
    percentItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    numberItems.forEach((item) => {
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
};

appData.init();
