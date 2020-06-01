<!--
 * @Author: your name
 * @Date: 2020-03-11 10:25:51
 * @LastEditTime: 2020-05-19 11:13:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/解构赋值.md
 -->

```javaScript
// 解构赋值 
// 解构的方式都是根据key来实现
let [,age] = ['姓名','年龄'];
console.log(age);   // 年龄

// 用：号来重新命名  = 可以用来赋值默认值
let {name,age:age1,address="回龙观"} = {name:'珠峰',age:10};
console.log(name,age1,address);  // '珠峰',10,'回龙观'


// 剩余运算符  只能用在最后一项
let [,...args] = ['珠峰',10,'回龙观']; // slice
console.log(args);  //[10,'回龙观']


// 对象的剩余运算符
let {name,...args} = {name:'珠峰',age:10};
console.log(args);  // {age:10}

// 可以使用圆括号的只有一种情况,赋值语句而不是声明语句

[(b)] = [3]   
({p:(d)} = {})
[(parseInt.pop)] = [3]

//变量名和属性名不一致的情况
const {foo:baz} = {foo:'aaa',bar:'ccc'}
console.log(baz)   // aaa
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
let arr = [1,2,3,[4,5,6]]
let newArr = deepClone(arr)
newArr[3][2] = 100;
console.log(arr);

// set  / map 也是不能放重复的项
```
