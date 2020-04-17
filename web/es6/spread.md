<!--
 * @Author: your name
 * @Date: 2020-03-25 11:14:18
 * @LastEditTime: 2020-03-25 11:14:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/spread.md
 -->

```javaScript
    // 展开对象
// a => 0xff => {b:2}

// ... Object.assign(es6语法)
// 浅拷贝 拷贝出来的结果 和以前没关系 叫深拷贝 ... 如果用的是多层对象 那就是浅拷贝
// let school = { name: "珠峰", age: 10 ,a:{b:2},fn:()=>{},c:undefined,reg:/\d+/};
// let my = { address: "回龙观" };

// let newObj = { ...school, ...my };
// newObj = JSON.parse(JSON.stringify(newObj)); // ？
// newObj.a.b = 100;
// console.log(newObj);
// 如何实现深拷贝

// --------
// 实现一个深拷贝 递归拷贝  lodash =》cloneDeep
let school = {
  name: "珠峰",
  age: 10,
  a: { b: 2 },
  fn: () => {},
  c: undefined,
  reg: /\d+/
};

// 1) 怎么判断数据的类型
// typeof object Array
// Object.prototype.toString.call()
// instanceof 可以判断类型 判断是谁的实例
// constructor 构造函数

const deepClone = (value ,hash = new WeakMap) => {
    if(value == null) return value; // 排除掉null 和undefine 的情况
    if(typeof value !== 'object') return value; // 这里包含了函数类型
    if(value instanceof RegExp) return new RegExp(value);
    if(value instanceof Date) return new Date(value);
    // .....
    // 拷贝的人可能是一个对象 或者是一个数组 (循环)  for in
    let instance = new value.constructor; // 根据当前属性构造一个新的实例
    if(hash.has(value)){ // 先去hash中查看一下是否存在过 ，如果存在就把以前拷贝的返回去
        return hash.get(value); // 返回已经拷贝的结果
    }
    hash.set(value,instance);// 没放过就放进去
    // 用一个对象来记忆
    for(let key in value){ // 一层
        if(value.hasOwnProperty(key)){ // 将hash 继续向下传递 保证这次拷贝能拿到以前拷贝的结果
            instance[key] = deepClone(value[key],hash); // 产生的就是一个新的拷贝后的结果
        }// 过滤掉原型链上的属性
    }
    return instance
};
let obj = {a:1};
obj.b = obj; // 如果obj 已经被拷贝了一次 那下次 在用到obj的时候 直接返回就好了 不需要再次拷贝了
console.log(deepClone(obj));
// let arr = [1,2,3,[4,5,6]]
// let newArr = deepClone(arr)
// newArr[3][2] = 100;
// console.log(arr);

// set  / map 也是不能放重复的项


```
