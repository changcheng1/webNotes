<!--
 * @Author: your name
 * @Date: 2020-03-22 19:32:35
 * @LastEditTime: 2020-03-23 15:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/typeOf/index.md
 -->

## 隐式类型转换

1.隐式类型转换规则

> 转换成 string 类型 + ,转换成 number 类型：++/--(自增自减运算符) + - \* / %(算术运算符) > < >= <= == != === !=== (关系运算符)

> 转换成 boolean 类型 !(逻辑非运算符)

2. 字符串与算术运算符隐式转换规则混淆

- 字符串连接符:会把其他的数据类型调用 String()转成字符串然后进行拼接

- 算数运算符:会把其他的数据类型调用 Number()方法转换成数字然后做加法计算

```javaScript
    // + 是字符串连接:String(1)+'true'
    console.log(1+"true") // 1true
    // + 是算数运算符:1+Number(true) = 2
    console.log(1+true)   // 2
    // + 是算数运算符:1+Number(undefined) = NaN
    console.log(1+undefined)  //NaN
    // + 是算术运算符:1+Number(null) = 1
    console.log(1+null)      // 1
    // + 是算数运算符:1+Number([]) = 1
    console.log(1+[])   // 1
     // + 是算数运算符:1+Number({}) = NaN
    console.log(1+{})   // NaN
```

3.关系运算符：会把其他数据类型转换成 number 再进行比较

```javaScript
    // 当关系运算符两边一边是字符串，会将其他数据类型用Number转换，然后再进行比较
    console.log("2" > 10) // false
    // 两边都是数字都是字符串的时候使用unicode编码来转换成数字
    console.log("2" > "10") // true
    // 多个字符从左到右依次比较
    console.log("abc" > "b") //false
    // 比较aa然后b>a
    console.log("abd" > "aad") // true
    // 特殊情况无视规则
    console.log(undefined == undefined)  //true
    console.log(undefined == null)  //true
    console.log(null == null) //true
    console.log(NaN == NaN) // false
```

4.复杂数据类型

- 复杂数据先使用 valueOf 方法获取其原始值，如果原始值不是 number 类型，则使用 toString()类型转成 string,再将 string 转成 number

```javaScript
    // 先将左边数据转成string，然后右边也是string则转成unicode编码运算
    console.log([1,2] == '1,2')

    var a = {}
    console.log(a == '[object Object]')
    console.log(a.valueOf().toString()) //[object Object]
```

5.逻辑非隐式转换与关系运算符隐式转换搞混淆

- 关系运算符:将其他数据类型转换成数字类型

- 逻辑非：将其他数据类型转换成 Boolean 类型

- 八种数据类型转换为 Boolean 类型会得到 false [0,-0,NaN,undefined,null,"",false]

```javaScript
    //原理：[].valueOf().toString() 得到空字符串 Number("") == 0
    console.log([] == 0) // true
    //原理：！运算符优先级高于关系运算符，![] == false  (空数组布尔值得到true，然后取反得到false), false == 0
    console.log(![] == 0)  //true
    //原理：本质上是空对象{} 与 !{}这个逻辑非表达式结果做比较 {}.valeOf().toString()得到字符串"[object Object]"  !{} = false Number("[object Object]") == Number(false)
    console.log({} == !{})  //false
    // 引用类型数据存在堆中，栈中存储的是地址，所以结果是false
    console.log({}=={})      // false
    console.log([]==[])      //false
```

> 引用类型和值类型的工作原理

![avatar](../img/stack.jpg)
