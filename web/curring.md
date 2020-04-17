<!--
 * @Author: your name
 * @Date: 2020-04-08 11:11:50
 * @LastEditTime: 2020-04-12 19:00:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/curring.md
 -->

## 函数柯里化

### 柯里化的常用场景

```javaScript

    // 正常验证字符串
    function check(reg,txt){
        return reg.text(txt)
    }
    check(/\d+/g,'text')
    check(/[a-z]+/g,'text')

    // 柯里化
    function curringCheck(reg){
        return function(txt){
            return reg.test(txt)
        }
    }

    let hasNumber = curringCheck(/d+/g)
    let hasNumber = curringCheck(/[a-z]+/g)
    hasNumber('test1')
    hasLetter('test1')
```

### bind

```javaScript

   // 分析：这里的bind方法会把第一个实参绑定给f函数内的this，所以这里的this指向{x:1}对象
   // 从第二个参数起，会依次传递给原始函数，这里的第二个参数2即是f函数的y参数
   // 最后调用m(3)的时候，这里的3便是最后一个参数z了，所以执行1+2+3 = 6
   // 分步处理参数的过程就是一个典型的函数柯里化的过程
function f(y, z) {
  return this.x + y + z
}
let result = f.bind({ x: 1 }, 2)(3)
 console.log(result) // 3


const curring = (fn,arr = [])=>{
  let len = fn.length;
  return (...args)=>{
  arr =  arr.concat(args)
  if(arr.length < len){
      return curring(fn,arr)
  }else{
      return fn(...arr)
    }
  }

}
function checkTpye(isString){
  return (content)=>{
    return Object.prototype.toString.call(content) === `[object ${isString}]`
  }
}

let  arr = ["String","Number","Boolean"]
let utils ={}
arr.forEach((type)=>{
    utils[`is${type}`] = curring(checkTpye)(type)
})
console.log(utils.isString('123'))

function checkTpye(isString){
    return (content)=>{
      return Object.prototype.toString.call(content) === `[object ${isString}]`
    }
}

let  arr = ["String","Number","Boolean"]
let utils ={}
arr.forEach((type)=>{
    utils[`is${type}`] = checkTpye(type)
})
console.log(utils.isString("123"))
}
```

### bind 的实现原理

```javaScript
Function.prototype.my_bind = function() {
    const self = this
    const context = [].shift.call(arguments)
    const args = [].slice.call(arguments)
    return function() {
        self.apply(context, Array.prototype.concat.call(args, [...arguments]))
    }
}

function demo(y, p) {
    console.log(this.x, y, p)
}
console.log(demo.my_bind({ x: 1 }, 2)(3))
```

### 经典 add 函数

```javaScript
function add() {
    let args = Array.prototype.slice.call(arguments)
    let _add = function() {
            args.push(...arguments)
            return _add
        }
        // 利用隐式类型转换，最后一次执行的时候返回值
    _add.toString = function() {
        let result = args.reduce((prev, current) => {
            return prev + current
        })
        return result
    }
    return _add
}
console.log(add(1)(2)(3) == 6)
console.log(add(1, 2, 3) == 6)
console.log(add(1, 2)(3) == 6)



const add = (a,b,c,d,e)=>{
   return a+b+c+d+e
}

     // 经典的函数柯里化
const curring = (fn,arr = [])=>{
let len = fn.length;
 return (...args)=>{
            arr =  arr.concat(args)
  if(arr.length < len){
         return curring(fn,arr)
    }else{
          return fn(...arr)
  }
}
}
let total = curring(add)(1)(2)(3)(4)(5)
console.log("total:",total)
```
