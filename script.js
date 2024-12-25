'use strict'
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 10;
let adaptive = prompt("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой еще дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
//let fullPriceMain = screenPrice + servicePrice1 + servicePrice2;
//let dealerPercent = (fullPriceMain * (rollback / 100));
//let servicePercentPrice = fullPriceMain - dealerPercent;
//console.log(Math.ceil(servicePercentPrice));
/* switch (true) {  */
/*     case fullPriceMain >= 30000: */
/*         console.log("Даем скидку в 10%"); */
/*         break; */
/*     case fullPriceMain >= 15000 && fullPriceMain < 30000: */
/*         console.log("Даем скидку в 5%"); */
/*         break; */
/*     case fullPriceMain > 0 && fullPriceMain < 15000: */
/*             console.log("Скидка не предусмотрена"); */
/*         break; */
/*     case fullPriceMain <= 0: */
/*             console.log("Что то пошло не так"); */
/*         break; */
/* } */
const getAllServicePrices = function (servicePrice1, servicePrice2) { 
  return servicePrice1 + servicePrice2;
}
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(screenPrice, allServicePrices) { 
  return screenPrice + allServicePrices;
} 

let fullPrice = getFullPrice(screenPrice, allServicePrices);

console.log("Стоимость доп. услуг:" + " " + allServicePrices);
console.log("Полная стоимость:" +  " " + fullPrice);