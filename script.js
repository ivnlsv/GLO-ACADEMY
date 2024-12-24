let num = 266219;
let strNum = String(num);
result = 1;
console.log(strNum)
for (let i = 0; i < strNum.length; i++) {
    result *= Number(strNum[i]);
    
}
console.log(result);
let degree = result ** 3;
let strDegree = String(degree);
console.log(strDegree.slice(0, 2));






