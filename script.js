const title = "Lesson 2";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 200;
const rollback = 10;
const fullPrice = 500;
const adaptive = true;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость  верстки экранов" + " " + screenPrice + " " + "рублей/ долларов/ гривен/ юани");
console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "рублей/ долларов/ гривен/ юани");
screenLower = screens.toLowerCase()
console.log(screenLower.split(", "));
dealerPercent = (fullPrice * (rollback / 100));
console.log("Процент отката посреднику:" + " " + dealerPercent)
