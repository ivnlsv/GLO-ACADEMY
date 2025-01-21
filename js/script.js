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
const cmsCheckbox = document.getElementById("cms-open");
const hiddenCmsVariants = document.querySelector(".hidden-cms-variants");
const otherOption = document.querySelector('option[value="other"]');
const mainControlsInput = document.querySelector(
  ".hidden-cms-variants .main-controls__input"
);

const appData = {
  title: "",
  screens: [],
  count: 0,
  adaptive: true,
  multiplier: null,
  screenPrice: 0,
  rollback: 0,
  rollBackTotal: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPriceSum: 0,
  fullPrice: 0,
  servicePercentPrices: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();
    this.checkFields();
    this.getRollback();
    this.checkSelectOption();
    calcButton.addEventListener("click", this.start.bind(this));
    resetButton.addEventListener("click", this.reset.bind(this));
    plusBtn.addEventListener("click", this.addScreenBlock.bind(this));
    cmsCheckbox.addEventListener(
      "change",
      this.toggleHiddenCmsVariants.bind(this)
    );
    document.querySelectorAll("#select").forEach((select) => {
      select.addEventListener("change", this.checkFields.bind(this));
      });

    document.querySelectorAll("#input").forEach((input) => {
      input.addEventListener("input", this.checkFields.bind(this));
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
      this.addPrices();
      this.showResult();
    });
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    //appData.logger();
    this.showResult();
    this.disableInputs();
    calcButton.style.display = "none";
    resetButton.style.display = "block";
  },
  disableInputs: function () {
    const allInputs = document.querySelectorAll('input[type="text"], select');
    allInputs.forEach((input) => {
      input.disabled = true;
    });
  },
  reset: function () {
    this.screens = [];
    this.count = 0;
    this.screenPrice = 0;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;

    document.querySelectorAll("select").forEach((select) => {
      select.disabled = false;
      select.selectedIndex = 0;
    });

    document.querySelectorAll("input[type='text']").forEach((input) => {
      input.disabled = false;
      input.value = "";
    });

    total.value = "";
    totalOther.value = "";
    totalFull.value = "";
    totalRollback.value = "";
    totalCount.value = "";
    rangeInput.value = 0;
    spanItem.textContent = "0%";
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
        this.toggleHiddenCmsVariants();
        mainControlsInput.style.display = "none";
      }
    });
    resetButton.style.display = "none";
    calcButton.style.display = "block";
  },
  showResult: function () {
    this.addPrices();
    totalFull.value = this.fullPrice;
    total.value = this.screenPrice;
    totalOther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalRollback.value = Math.round(this.rollBackTotal);
    totalCount.value = this.count;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
      this.count += +input.value;
    });
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
  toggleHiddenCmsVariants: function () {
    if (cmsCheckbox.checked) {
      hiddenCmsVariants.style.display = "flex";
    } else {
      hiddenCmsVariants.style.display = "none";
    }
  },
  checkSelectOption: function () {
    let selectOther = document.getElementById("cms-select");
    selectOther.addEventListener("change", (event) => {
      const select = event.target.value;
      if (select === "other") {
        mainControlsInput.style.display = "block";
      } else {
        mainControlsInput.style.display = "none";
      }
      if (select === "50") {
        this.multiplier = 1.5;
      } else {
        this.multiplier = null;
      }
    });
  },
  addServices: function () {
    percentItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    numberItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    document.querySelectorAll("#select").forEach((select) => {
      select.addEventListener("change", this.checkFields.bind(this));
      select.addEventListener("change", this.checkOtherOption.bind(this));
    });
    document.querySelectorAll("#input").forEach((input) => {
      input.addEventListener("input", this.checkFields.bind(this));
    });
    this.checkFields();
  },

  addPrices: function () {
    this.checkSelectOption();
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    if (this.multiplier) {
      this.fullPriceSum =
        +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
      this.fullPrice = this.fullPriceSum * this.multiplier;
      this.rollBackTotal =
        this.fullPrice - this.fullPrice * (this.rollback / 100);
    } else { 
      this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.rollBackTotal =
  this.fullPrice - this.fullPrice * (this.rollback / 100);
    }
   
  
  },
};
appData.init();
