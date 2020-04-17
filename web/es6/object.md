<!--
 * @Author: your name
 * @Date: 2020-03-11 10:53:32
 * @LastEditTime: 2020-03-11 10:53:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/object.md
 -->
```javaScript
  {
    // 属性缩写
    let o = 1;
    let k = 2;
    let es5 = {
        o: o,
        k: k
    }
    let es6 = {
        o,
        k
    }
    console.log(es5, es6)
    // 对象方法简写
    let es5_method = {
        hello: function () {
            console.log('hello')
        }
    }
    let es6_method = {
        hello() {
            console.log('hello')
        }
    }
    es5_method.hello(), es6_method.hello()
} {
    // 属性表达式
    let a = 'b'
    let es5_obj = {
        a: 'c',
        b: 'c'
    }
    let es6_obj = {
        [a]: 'c'
    }
    console.log(es5_obj, es6_obj)
} {
    // Object.is():比较两个值是否相等
    console.log('字符串', Object.is('abc', 'abc'), 'abc' === 'abc')
    console.log('数组', Object.is([], []), [] === [])
    // 对象拷贝
    console.log('拷贝', Object.assign({
        a: 'a'
    }, {
        b: 'b'
    }))
    // 对象遍历
    let test = {
        k: 123,
        0: 456
    }
    for (let [key, value] of Object.entries(test)) {
        console.log([key, value])
    }

} {
    // // 扩展运算符
    // let {a,b,...c} = {a:'test',b:'kill',c:'ddd',d:'ccc'}
    // c={
    //     c:'ddd',
    //     d:'ccc'
    // }
}
```