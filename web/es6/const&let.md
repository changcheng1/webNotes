<!--
 * @Author: your name
 * @Date: 2020-03-11 10:49:18
 * @LastEditTime: 2020-05-18 16:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/const&let.md
 -->

```javaScript
// var  let & const
// es6 -> es5 babel
// 1) 声明的变量默认声明到全局上，全局作用域  函数作用域
// {} 作用域+ let  实现一个作用域
// 2) 用var 声明的变量会导致变量提升 var function import
// 用let声明的变量会绑定到当前作用域  暂存死区
// 3) var a = 1 var a = 2; 使用let 可以保证我的代码命名不重复
// 4) var 声明的变量可以更改 var a = 1 a =100
// 5) 自执行函数可以解决作用域问题
// 6) js 事件 不要用var

// eslint

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i) //0,1,2,3,4,5,6,7,8,9
    }); // 4ms
};


// 解决
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i)
        }); // 4ms
    })(i) //0,1,2,3,4,5,6,7,8,9
};

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

// let & const 尽可能使用const 如果这个值需要改变 我们在更换let

const obj = {};
obj.q = 1; // Assignment to constant variable.

let a = 2;
let a = 3; // Identifier 'a' has already been declared
{
    console.log(a);
    var a  = 1;
}
console.log(a);
```

1.let/const和{}会劫持当前的作用域

2.Es6的let和const不存在变量提升

```javaScript
    a         // Cannot access 'a' before initialization
    const a = 3
```

3.什么是暂时性死区,在let声明变量之前，该变量都是不可用的。

```javaScript
    var temp = 3;
    if(true){
        console.log(temp)  //Cannot access 'temp' before initialization
        let temp = 2;
    }

    function bar(x = y, y = 2) {
        return [x, y];
    }

    bar(); // 报错
```

4.let不允许重复声明

5.块级作用域中的函数声明

```javaScript
    (function () {
        // 相当于  vat f = undefined
        if (false) {
            // 重复声明一次函数f
            function f() { console.log('I am inside!'); }  // f is not a function
        }

        f();
    }());
```

6. const如果引用的地址是对象也可以修改

```javaScript
    const a = {c:1}
    a.c = 3
    console.log(a.c)  // 3
```


