<!--
 * @Author: your name
 * @Date: 2020-03-11 10:52:26
 * @LastEditTime: 2020-05-15 15:01:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/module.md
 -->

- import 语法只能放在最外层
- 导入的变量不能更改赋值

```javaScript

// Common.js模块输入的的是值的缓存，不存在动态更新
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);


// 模块重命名 将lastName改成surname
import { lastName as surname } from './profile.js';

// 引入的变量只能是只读，不能进行修改，如果是对象可以改写(不建议操作)
import {a} from './1.js'
a = 3 // 'a' is read-only


// import具有变量提升的作用
foo()
import {foo} from '1.js'

// 整体加载
import * as cycle from '1.js'
console.log(cycle.a)

// export default 本身就是输出一个叫default的变量或者方法，可以自己改名
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

### Es6模块化与commonJs的差异

commonJs模块输出的是一个值得拷贝，Es6模块输出的是值得引用
commonJs模块是运行时加载，Es6模块是编译时输出接口
commonJs可以给模块中的值重新复制，Es6模块不能重新赋值
commonJs可以在js的任何位置中引入，import只能在js的顶部
commonJs模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载就返回第一次的运行结果
1. commonJs

+ commonJs输出的是值的拷贝，模块内部的变化影响不到这个值，因为commonJs内部会缓存值

```javaScript
  // 1.js
  var count = 3;
  function incCounter(){
    count++
  }
  module.exports = {
    count,
    incCounter
  }

  // main.js
  var mod = require('./1.js')
  console.log(mod.counter)  // 3
  mod.incCounter()
  console.log(mod.counter)  // 3

```

2. Es6模块化（import）

+ 遇到模块加载命令import，就会生成一个只读引用，等到脚本就真正执行的时候，再根据这个引用到模块当中去取值，原始的值改变了，import的值也会改变，因此Es6的值是动态引用，并且不会缓存值，模块内部的变量绑定所在模块

```javaScript
  export var conut = 3;
  export function incCounter(){
    conut ++
  }
```