<!--
 * @Author: your name
 * @Date: 2020-04-25 14:48:14
 * @LastEditTime: 2020-04-25 16:08:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/async&&await.md
 -->

async await

浏览器遇到 await 语句后，会先去执行外部的同步代码，之后再来处理 await 后面的函数的返回值。

注意：async 函数里面是从右往左执行的，因此会先执行右边的函数，之后再遇到 await 做处理。

```javascript
async function async1() {
  console.log('async1 start')
  await async2() // 所以这里执行完async2函数之后，会再执行promise1
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')
```

先执行了 async2 函数，得到结果，遇到了 await,则先去执行外部的同步代码，因此 new Promise.then 先加入 micro task。之后，在处理 async2 得到的结果，await async2()，等同于 Promise.then，因此，再将 async2 加入 micro task.
