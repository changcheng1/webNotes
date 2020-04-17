<!--
 * @Author: your name
 * @Date: 2020-03-11 10:54:36
 * @LastEditTime: 2020-03-25 11:12:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/proxy&reflect.md
 -->

```javaScript
 // proxy 兼容性差
// 代理 我们可以创造一个代理 帮我们干某些事
let obj = {
    a:{a:2}
}
let handler = { // 只能代理当前这个对象 1层
    get(target,key){ // 有13中属性 symbol 11种
        // return target[key]
        if(typeof target[key] === 'object'){
            return new Proxy(target[key],handler); // 如果是对象 就返回这个对象的代理
        }
       return Reflect.get(target,key);
    },
    set(target,key,value){ // 反射属性
        // target[key] = value;
        if(key === 'length') return true;
        console.log('update');
        return  Reflect.set(target,key,value);
    }
}
let proxy = new Proxy(obj,handler)
proxy.a.a = 100
console.log(obj.a.a);
// 支持数组 可以直接更改数组 达到拦截的目的

// symbol 11 reflect 13种
// es6module的应用
// class
// reduce
// nodeh核心

}
```
