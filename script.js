'use strict'
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = prompt("Сколько будет стоить данная работа?");
let rollback = 10;
let adaptive = prompt("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?");
let service2 = prompt("Какой еще дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?");
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
dealerPercent = (fullPrice * (rollback / 100));
servicePercentPrice = fullPrice - dealerPercent;
console.log(servicePercentPrice)