import {moneyConverter} from '../scripts/utils/money.js';


console.log('test suite: moneyConverter()'); //Separar os testes por grupos

console.log("convert cents into dollars");
if (moneyConverter(2095) === '20.95'){
  console.log('passed');
} else {
  console.log('fail');
}

console.log('works with 0');
if (moneyConverter(0) === '0.00'){
  console.log('passed');
} else {
  console.log('fail');
}

console.log('rounds up to the nearest cent');
if (moneyConverter(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('fail');
}

console.log('rounds down to the nearest cent');
if (moneyConverter(2000.4) === '20.01'){
  console.log('passed');
} else {
  console.log('fail');
}