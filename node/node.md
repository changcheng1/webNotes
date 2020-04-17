<!--
 * @Author: your name
 * @Date: 2020-02-24 21:22:58
 * @LastEditTime: 2020-04-08 11:05:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/node/node.md
 -->

# node 基础语法

## 常用：中间层 服务端渲染 脚本

## 特点

- 单线程非阻塞 IO，这是由 javaScript 这门脚本语言的用途决定的

- 浏览器的 ui 线程和 js 的线程共用一个线程

- webWorker 并没有改变单线程的特点 1.完成受主线程的控制(附庸关系) 2.不能操作 Dom

## 除了 JS 线程和 UI 线程之外的其他线程

- 浏览器事件触发线程

- 定时触发器线程

- 异步 HTTP 请求线程

## 进程和线程的区别

## 同步和异步关注的是消息的通知方式

- 同步异步是由调用方决定，他来决定是马上给你答案，还是回头再给

- 阻塞非阻塞是由调用方来决定，在等待答案的过程，调用方可以干别的事

## repl 就是 Node 的窗口容器

- .break 退出当前的代码编写块

- .clear 清楚当前上下文

- .save (.save num.log) 保存当前的代码生成文件

## console

- console.time() console.timeEnd():用来计算代码的执行时间

```javaScript
    console.time("time")
    var i=0;
    while(i++<1000000000){}
    console.timeEnd("time")   // 723.504ms
```

- console.assert() 断言 TDD 测试驱动开发 BDD 行为驱动开发

```javaScript
    // 断言
    function sum(a,b){return a+b}
    console.assert(sum(1,2) == 4,'报错')
```

- console.dir():可以列出对象的解构

```javaScript
    let a = {a:123,home:{name:'beijing'}}
    console.dir(a)
```

- console.trace():可以列出对象的解构

```javaScript
    console.trace()
```

## global

- process

```javaScript
    console.log(process)
```

## fs 模块

```javaScript
    const fs = require('fs')
    // 判断文件是否存在，不存在则抛出异常
    fs.accessSync('./1.js')
```

## path 模块

```javaScript
    const path = require('path');
    // __dirname：获取当前的路径
    // /Users/changcheng/Downloads/test
    console.log(__dirname)
    // path.resolve()：获取当前文件的绝对路径
    // /Users/changcheng/Downloads/test/1.js
    console.log(path.resolve(__dirname, '1.js'))
    // path.join():拼接路径
    // /Users/changcheng/Downloads/test/bar/1.js
    console.log(path.join(__dirname, '/bar/1.js'))
    // path.extname():获取文件后缀
    // .js
    console.log(path.extname('1.js'))
    // path.basename():路径过滤
    // 1.
    console.log(path.basename('1.js', 'js'))
    // path.dirname():取当前路径的父路径
    // /Users/changcheng/Downloads
    console.log(path.dirname(__dirname))
```

## vm 虚拟机模块

```javaScript
    // error b is not defined
    const vm = require('vm')
    let b = 1;
    vm.runInThisContext(`console.log(b)`)
```

## require 原理

```javaScript
    // 路径模块
    const path = require('path');
    // 文件模块
    const fs = require('fs');
    // 沙箱
    const vm = require('vm');
    function Module(absPath){
        this.id = absPath;
        this.exports = {};
    }
    const wrapper = [ // module 和 exports 是什么关系?
        '(function(exports,module,require){',
        '})'
    ]
    Module.prototype.load = function(){
        let script = fs.readFileSync(this.id,'utf8');
        let fnStr = wrapper[0] + script + wrapper[1];
        let fn = vm.runInThisContext(fnStr);
        fn(this.exports,this,req); // 让拼出的函数执行
    }
    function req(file){ // ./a
        // 1) 把当前这个文件读取出来  把相对路径转化成绝对路径
        let absPath = path.resolve(__dirname,file);
        // 加载一个模块 模块就是要有一个exports属性
        // 2) 创建一个模块
        let module = new Module(absPath); // 创建了一个模块
        // 3) 加载模块
        module.load();
        return module.exports
    }

    let a = req('./a.js');
    console.log(a);
```
