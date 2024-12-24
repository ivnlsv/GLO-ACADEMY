const num = 266219;
result = 1;
let strNum = num.toString;
console.log(typeof strNum)
for (let i = 0; i < strNum.length; i++) {
    result *= +strNum[i];
}
console.log(result);







