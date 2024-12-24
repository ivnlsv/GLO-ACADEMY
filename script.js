let lang = "ru";
weekDaysRu = "Пн, Вт, Ср, Чт, Пт, Сб, Вс";
weekDaysEng = "Mon, Tue, Web, Thu, Fri, Sat, Sun";

if (lang === "ru") {
  console.log(weekDaysRu);
} else {
  console.log(weekDaysEng);
}

switch (lang) { 
    case "ru":
        console.log(weekDaysRu);
        break;
    case "en":
        console.log(weekDaysEng);
        break;
}

let weekDaysArray = {
  ru: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};

let days = weekDaysArray[lang] || []; 

console.log(days);