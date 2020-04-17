<!--
 * @Author: your name
 * @Date: 2020-03-25 15:00:19
 * @LastEditTime: 2020-03-25 15:01:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/reflect.md
 -->

```javaScript
// 未来object的方法部分会迁移到Reflect
// 反射 Object.defineProperty
// 里面有部分的对象的方法 放到 Reflect 功能基本一致
// Proxy 中能代理的方法 Reflect 都可以实现
// 1) get /set
const obj = {};

Reflect.set(obj,'name','zf'); // obj.name = zf;

console.log(Reflect.get(obj,'name'));

// 2) has
// 老的写法
console.log('a' in {a:1});
// 新的写法
console.log(Reflect.has({a:1},'a'));
// 3)defineProperty
// 把对象上的属性get set 都给重写了
const obj = {a:1}
Object.freeze(obj); // 这个属性就能不能配置了   冻结freeze
let flag = Reflect.defineProperty(obj,'a',{
    value:100
})
console.log(flag);

// 4)getOwnPropertyDescriptor
const obj = {a:1};
console.log(Reflect.getOwnPropertyDescriptor(obj,'a'));

// 5)ownKeys
let obj = {
    a:1,
    [Symbol()]:1
};
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj))

// 6)
Reflect.setPrototypeOf
Reflect.getPrototypeOf

// 7) 函数的apply方法 bind call apply的区别 改变this指向
const fn = function(a,b){ // apply 支持多个参数传参
    console.log(this,a,b);
}
fn.apply = function(){
    console.log('apply')
}
// 函数原型上的apply方法 让他执行
// call 的特点 1） 是改this指向 让函数执行
// Function.prototype.apply.call(fn,1,[2,3]);
Reflect.apply(fn,1,[2,3]); // 用原型上的apply方法

class XXX{
    constructor(name){
        this.name = name
    }
}
let xxx =  Reflect.construct(XXX,['zf']);
console.log(xxx); // new

Reflect.deleteProperty // delete obj.a 返回是否删除成功


let obj = {}; // 扩展不能添加属性
Reflect.preventExtensions(obj)
obj.a = 1;
console.log(Reflect.isExtensible(obj));

```
