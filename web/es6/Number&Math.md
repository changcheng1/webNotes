<!--
 * @Author: your name
 * @Date: 2020-03-11 10:53:06
 * @LastEditTime: 2020-03-11 10:53:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/Number&Math.md
 -->
```javaScript
  {
    //  Number.isFinite:检测一个数值是否是有限的
    //  Number.isNaN:检测一个数值是否是NaN
    console.log('15', Number.isFinite(15)) //  true
    console.log('NaN', Number.isFinite(NaN)) //  false
    console.log('1/0', Number.isFinite('true' / 0)) //  false
    console.log('NaN', Number.isNaN(NaN)) // true
    console.log('0', Number.isNaN(0)) // false
} {
    // Number.isInteger:判断一个数值是否为整数
    console.log('25', Number.isInteger(25)) //  true
    console.log('25.0', Number.isInteger(25.0)) // true
    console.log('25.1', Number.isInteger(25.1)) // false
    console.log('25', Number.isInteger('25')) // false
}

{
    // Math.trunc:去除一个数的小数部分，返回整数部分
    console.log(4, 1, Math.trunc(4.1)) // 4
    console.log(4.9, Math.trunc(4.9)) // 4
} {
    // Math.sign:判断一个数是正数，负数还是0，非数值会转换为数值
    // 参数为正数，返回+1
    // 参数为负数，返回-1
    // 参数为0,返回0
    // 参数为-0,返回-0
    // 其他值返回NaN
    console.log('-5', Math.sign(-5)) // -1
    console.log('0', Math.sign(0)) //0
    console.log('5', Math.sign(5)) // 1
    console.log('50', Math.sign('50')) // 1
    console.log('foo', Math.sign('foo')) // NaN
}
```