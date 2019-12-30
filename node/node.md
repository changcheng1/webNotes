# node基础语法

## 特点

+ 单线程非阻塞IO，这是由javaScript这门脚本语言的用途决定的

+ 浏览器的ui线程和js的线程共用一个线程

+ webWorker并没有改变单线程的特点 1.完成受主线程的控制(附庸关系)  2.不能操作Dom

## 除了JS线程和UI线程之外的其他线程

+ 浏览器事件触发线程

+ 定时触发器线程

+ 异步HTTP请求线程

## 同步和异步关注的是消息的通知方式

+ 同步异步是由调用方决定，他来决定是马上给你答案，还是回头再给

+ 阻塞非阻塞是由调用方来决定，在等待答案的过程，调用方可以干别的事

## repl就是Node的窗口容器

+ .break 退出当前的代码编写块

+ .clear 清楚当前上下文

+ .save  (.save num.log) 保存当前的代码生成文件

## console

+ console.time() console.timeEnd():用来计算代码的执行时间

```javaScript
    console.time("time")
    var i=0;
    while(i++<1000000000){}
    console.timeEnd("time")   // 723.504ms
```

+ console.assert() 断言 TDD 测试驱动开发 BDD 行为驱动开发

```javaScript
    // 断言 
    function sum(a,b){return a+b}
    console.assert(sum(1,2) == 4,'报错')
```

+ console.dir():可以列出对象的解构

```javaScript
    let a = {a:123,home:{name:'beijing'}}
    console.dir(a)
```
+ console.trace():可以列出对象的解构

```javaScript
    console.trace()
```
## global

+ process 

```javaScript
    console.log(process)
```
