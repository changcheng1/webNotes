<!--
 * @Author: your name
 * @Date: 2020-03-16 11:37:26
 * @LastEditTime: 2020-04-09 15:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/funciton/index.md
 -->

## 高阶函数

### 发布订阅

```javaScript

let fs = require('fs')
let school ={}
let e = {
    //订阅
    arr:[],
    on(fn){
        this.arr.push(fn)
    },
    // 发布事件
    emit(){
        this.arr.forEach((item)=>{
            item()
        })
    },
}
// 订阅事件
e.on(()=>{
    console.log("ok")
})
e.on(()=>{
    if(Object.keys(school).length === 2){
        console.log(school)
    }
})
fs.readFile('./data/name.txt','utf8',(err,data)=>{
    school["name"] = data;
    e.emit();
})

fs.readFile('./data/age.txt','utf8',(err,data)=>{
    school["age"] = data;
    e.emit();
})
```

### 观察者

```javaScript
  class Subject{
    constructor(){
        // 存放观察者
        this.arr = []
        this.state = '开心'
    }
    chageState(newState){
        this.state = newState
        this.arr.forEach(item=>{
            item.update(this.state)
        })
    }
    attach(o){
        this.arr.push(o)
    }
}

class Parent{
    constructor(name){
        this.name = name
    }
    update(state){
        console.log(this.name+'的小宝宝:'+state)
    }
}

let child = new Subject()

let observer = new Parent("父亲")

let observer1 = new Parent("母亲")

child.attach(observer)
child.attach(observer1)
child.chageState('不开心了')
```

### 函数的 bfore

- AOP 切片 装饰，希望将核心逻辑拆分出来吗，在外面增加功能

```javaScript
  Function.prototype.before = function(bfroreFn){
    return (...arg)=>{        // 箭头函数没有this指向，所以会向上级作用域查找
        bfroreFn();
        this(...arg);
    }
}

function say(...arg){
    console.log("arg:",arg)
}

const newSay = say.before(()=>{
    console.log("新增加的方法")
})
newSay(1,2,3,4)


// js模拟事务
let perform = ((fn,wrappers)=>{
    wrappers.forEach(element => {
        element.initlizae();
    });
    fn();
    wrappers.forEach(element => {
        element.close();
    });
})


perform(()=>{
  console.log("say")
},[{
    initlizae(){
        console.log("hello")
    },
    close(){
        console.log("bye")
    }
}])
```

### compose:组合函数

```javaScript
    function sum(a, b) {
    return a + b
}

function len(str) {
    return str.length
}

function addCurrency(val) {
    return `$${val}`
}

function compose(...fn) {
    return function(...nums) {
        let r = fn.pop()
        return fn.reduceRight((prev, current) => {
            return current(prev)
                // return current(prev(...nums))
        }, r(...nums))
    }
}

// reduex版本的compose
function compose(...args) {
    return args.reduce((prev, current) => {
        return function(...values) {
            return prev(current(...values))
        }
    })
}

console.log(compose(addCurrency, len, sum)('abc', 'cbd'))
```
