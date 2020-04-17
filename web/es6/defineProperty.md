<!--
 * @Author: your name
 * @Date: 2020-03-25 11:13:14
 * @LastEditTime: 2020-03-25 11:21:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/object.defineProperty.md
 -->

```javaScript
// Object.defineProperty getter setter

let obj = {
    _a:'',
    get a(){
        // todo ...
        return this._a
    },
    set a(value){
        this._a = value
    }
}
obj.a = 100;
console.log(obj.a); // 需要借用一个第三方变量来中转

// vue中数据劫持 给每个对象都添加一个 getter和setter 当值变化可以 可以实现更新视图的功能

let obj = {}
let val = '';
Object.defineProperty(obj,'a',{
    configurable:true, // 是否可删除
    // writable:true, // 是否可写,
    enumerable:true, // for in 原型上的方法
    get(){
        return val
    },
    set(value){
        val = value;
    }
    // 默认设置的值是不可枚举的
})
delete obj.a
console.log(obj);
let obj = {
  a: 1,
  b: 2,
};

// value 源码
function observer(obj) {
  // 缺陷就是无法监控数组的变化
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  for (let key in obj) {
    // 因为defineProperty 需要一个公共的值去修改
    defineReactive(obj, key, obj[key]);
  }
}
let updateView = () => {
  // 更新方法
  console.log("更新");
};
// obj  => {a:1,b:2}  key=> a / b  value = 1/2
function defineReactive(obj, key, value) {
  // Object.defineProperty
  observer(value); // 递归增加getter和setter
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(val) {
      updateView();
      value = val;
    }
  });
}
observer(obj);
obj.a.a = 100;
console.log(obj.a);

```
