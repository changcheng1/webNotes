<!--
 * @Author: your name
 * @Date: 2020-03-11 10:50:08
 * @LastEditTime: 2020-03-31 11:27:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/function.md
 -->

> 箭头函数没有 this arguments prototype

```javaScript
  {
    // 函数设置默认值
    function test(x, y = 'hello world') {
        console.log('默认值', x, y)
    }
    test('hello')
    test('hello', 'kill')
} {
    // 函数的作用域
    let x = 'test';

    function test(x, y = x) {
        console.log('作用域', x, y)
    }
    test('kill')
} {
    // rest参数
    function test3(...arg) {
        for (let v of arg) {
            console.log('rest', v)
        }
    }
    test3(1, 2, 3, 4, 'a')
} {
    // 解构
    console.log(...[1, 2, 3, 4])
    console.log('a', ...[1, 2, 3, 4])
} {
    // 箭头函数
    let arrow = v => v * 2
    let arrow2 = () => 5
    console.log('arrow', arrow(3))
    console.log(arrow2())
} {
    // 函数尾调用
    function tail(x) {
        console.log('tail', x)
    }

    function fx(x) {
        return tail(x)
    }
    fx(123)
}
```
