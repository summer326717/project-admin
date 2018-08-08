import NP from 'number-precision'

/**
 * 除一百后保留两位小数
 */
let div100 = (number) => {
  return secnum(NP.divide(number, 100))
}

/**
 * 乘一百
 */
let mul100 = (number) => {
  return NP.times(number, 100)
}

/**
 * 保留两位小数
 */
let secnum = (number) => {
  let nnum = number + ''
  if (nnum.split('.').length === 1 || nnum.split('.')[1].length < 2) {
    return number.toFixed(2)
  } else {
    return NP.round(number, 2)
  }
}

/**
 * 相乘后保留两位小数
 */
let mulsec = (number1, number2) => {
  return secnum(NP.times(number1, number2))
}

let divide = NP.divide
let round = NP.round
export default {
  secnum,
  div100,
  mulsec,
  mul100,
  divide,
  round
}
