<!--
 * @Author: your name
 * @Date: 2020-03-11 10:55:43
 * @LastEditTime: 2020-03-25 16:42:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/symbol.md
 -->

```javaScript
  // 数据类型 string number boolean null undefined
// Symbol 独一无二
// 用作常量

const s1 = Symbol("zf"); // number or string
const s2 = Symbol("zf");
console.log(s1 === s2);

// 属性私有化
let s1 = Symbol.for("zf");
let s2 = Symbol.for("zf"); // 如果symbol已经有值了 就将这个值返回即可
console.log(s1 === s2);
console.log(Symbol.keyFor(s2));
let obj = {
  [s1]: 1 // es6写法 []含义是将s1 结果取出来作为key
};
console.log(obj[s1]); // 不能使用.运算符

// 元编程 可以改变js源代码的功能 改变js原有的功能
// instanceof // 可以判断某个人是否是谁的实例
let o = {
  name: 1
};
// Symbol.iterator 在我迭代的时候 默认就会调用此方法
let obj = {
  // Object.defineproperty
  [Symbol.hasInstance]() {
    return "name" in o;
  }
};
console.log(o instanceof obj);

let obj = {
  [Symbol.toPrimitive](value) {
    console.log(value);
    return "hello";
  },
  a: 1
}; // valueOf  toString
console.log(obj * 1);

// toString

const obj = {
  get [Symbol.toStringTag]() {
    return "123";
  }
};
// Object.prototype.toString
console.log(obj.toString()); // [object 123]

// 衍生对象
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
  static get [Symbol.species]() {
    return Array; // 控制衍生对象的类的构造函数
  }
}
let myarr = new MyArray(1, 2, 3);
let newArr = myarr.map(item => item * 2); // 衍生出来的结果是当前的实例
// instanceof 原理 .__proto__.__proto__
console.log(newArr instanceof MyArray);
// split replace match search

// with 我可以通过with 直接拿到with中的属性

// 我们可以声明一些属性 不在with中使用
console.log(Array.prototype[Symbol.unscopables])
with (Array.prototype) {
    fill(1,2,3)
}

class My{
    eat(){}
    get [Symbol.unscopables](){
        return {eat:true};
    }
}
with(My.prototype){
    console.log(eat);
}
let arr = [1,2,3];
arr[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(4,5,6));

// Symbol 11 reflect 13
}
```
