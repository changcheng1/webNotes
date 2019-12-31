# 正则详解

## 每一个正则都是由"元字符","修饰符",两部分组成

+ 正则两个斜杠之间包起来的都是"元字符"

+ 斜杠后面出现的都是"修饰符"

## 创建正则的两种方式

```javaScript
   let reg1 = /^\d+$/g;   //字面量
   let reg2 = new RegExp("^\\d+$","g")  //构造函数方式
```

## 常用的修饰符

```javaScript
  i:ignoreCase 忽略大小写匹配
  m:multiline 多行匹配
  g:global 全局匹配
```

## 常用的元字符

```javaScript
// [特殊元字符]
    \D 非0-9之间的任意字符
    \d 0-9之间的一个数字
    \n 匹配一个换行符
    \b 匹配边界符 'zhu' (z左边u右边就是边界)
    \s 匹配任意一个空白字符(包括制表符table键四个空格)
    \w "数字、字母、下划线"中的任意一个  == ([0-9a-zA-Z])
    \  转义字符(例如:\d，把有特殊含义的字符转换为普通意思)
    .  代表是除了\n以外任意字符
    ^  以某个元字符开头
    $  以某个元字符结尾
    x|y x或者y中的任意一个
    [xyz] x或者y或者z中的任意一个
    [^xyz] 除了x/y/z以外任何一个字符
    [a-z] 获取a-z中的任意字符 ([0-9] 等价于 \d)
    [^a-z] 除了a-z之外的任意字符
    ()  正则分组
    (?:) 当前分组只匹配不捕获
    (?=) 正向预查
    (?!) 反向预查
    ......
```

```javaScript
// [量词元字符:让其左边的元字符出现多少次]
    * 出现零到多次
    ？ 出现零到一次
    + 出现一到多次
    {n} 出现n次
    {n,} 出现n到多次
    {n,m} 出现n到m次
```

```javaScript
// [普通元字符]
    只要在正则中出现的元字符，(在基于字面方式创建)，除了特殊和有量词意义的以外，其余的都是普通元字符
```

## 元字符 [ ] 详解

+ 在[ ]中出现的元字符一般都是代表本身含义
+ [ ] 中出现的两位数，不是两位数，而是两个数字中的任意一个

```javaScript
    // \n 匹配换行符
    let reg = /^\n$/
    console.log(reg.test('\n')) //=>true
    console.log(reg.test('3')) //=>false
    console.log(reg.test('n')) //=>false

    //^开头 $结尾，那么代表的含义是只能是xx
    let reg = /^.$/
    console.log(reg.test('n')) //=>true
    console.log(reg.test('1')) //=>true
    console.log(reg.test('\n')) //=>false
    console.log(reg.test('nn')) //=>false

    // []中的字符有消除特殊含义的功能
    let reg = /^[.]+$/
    console.log(reg.test('..')) //=>true
    console.log(reg.test('n')) //=>false
    console.log(reg.test('1')) //=>false
    console.log(reg.test('\n')) //=>false
    console.log(reg.test('nn')) //=>false

    // [\d]依然是0-9中的一个数字
    let reg = /^[\d]$/
    console.log(reg.test(0)) //=>true

    // [17] 匹配 1或者 7 
    let reg = /^[17]$/
    console.log(reg.test('8')) //=>false
    console.log(reg.test('1')) //=>true
    console.log(reg.test('7')) //=>true

    // [12-93] 其实匹配的是 1或者3 2-9
    let reg = /^[12-93]$/
    console.log(reg.test('7')) //=>true

    // 匹配18-65岁之间
    // 18~19
    // 20~59
    // 60~65
    let reg = /^(1[89])|([2-5][0-9])|(6[0-5])$/
    console.log(reg.test("55"))


    // 匹配[Object AAAA] 必须使用\转义
    let reg = /^\[object [A]{4}\]$/
    console.log(reg.test('[object AAAA]'))
```

## 常用正则

```javaScript

    // 有效数字的正则
    // 1.正数 负数 零
    // 2.小数 整数
    // 规则:1.可以出现+/-号，可以没有，也可以有一个
    // 2.整数0 12 9：一位或者多位数字，一位0-9，多位数字不能以0开头
    // 3.小数部分：可能有可能没有，有小数点后面至少要跟一位数字
    
    let reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/
    console.log(reg.test('0.3'))


    // 手机号码的正则
    // 1.11位数字
    // 2.必须以1开头
    
    let reg = /^1\d{10}$/;
    console.log(reg.test(18554209912))

    // 中文姓名的正则
    // 1. [\u4E00-\U9FA5] 代表的是涵盖所有的中文
    // 2.尼古拉斯·赵四 中间可能会有·
    let reg = /^[\u4E00-\u9FA5]{2,5}(·)?[\u4E00-\u9FA5]{2,}$/;
    console.log(reg.test('尼古拉斯·赵四'))
    console.log(reg.test('尼古拉斯'))

```
## exec()

+ RegExp类的方法,传入要匹配的字符串

+ 正则的捕获有懒惰性:执行一次exec()只能捕获第一个和正则匹配的内容，多次执行还是捕获第一个

+ 不加g多次调用exec()方法也无法匹配到全部符合的字符串，加g可以多次执行exec()方法进行匹配符合的全部字符串，需要手动多次调用，

```javaScript
    // [
    //     '20190818',
    //     index: 0,
    //     input: '20190818changcheng2017',
    //     groups: undefined
    // ]
    let reg = /\d+/
    let str = '20190818changcheng2017'
    // lastIndex导致了懒惰性只能捕获匹配的第一个
    console.log(reg.exec(str))  
```
## 正则捕获的懒惰性

```javaScript
 // exec():字符串捕获
    let reg = /\d+/
    let str = '20190818changcheng2017'
    // lastIndex导致了懒惰性只能捕获匹配的第一个
    console.log(reg.exec(str)[0])  //20190818
    // 无法手动更改lastIndex实现全部捕获
    reg.lastIndex = 17
    console.log(reg.exec(str)[0])  // 20190818

    // 解决惰性捕获添加g修饰符(唯一的方案，不加g不管用什么方法都没有办法全部匹配到)
    let reg = /\d+/g;
    let str = '20190918chang20190817'
    console.log(reg.exec(str))
    console.log(reg.exec(str))

    let reg = /\d+/g;
    let str = '20190918chang20190817cheng1807'
    // 完整的捕获方法实现
    RegExp.prototype.myExecAll = function(str){
          let result = []
          valArray = this.exec(str)
          while(valArray){
              result.push(valArray[0])
              valArray = this.exec(str)
          }
          return result
    }
   console.log(reg.myExecAll(str))
```

## 正则捕获的贪婪性

+ 正则捕获还具有贪婪性，每一次匹配的时候，总是捕获到和正则匹配中最长的内容，例如:'2'符合/d+，'2019'也符合/d+，但是捕获的是最长的内容'2019'

+ 把问号放到量词元字符后面，代表的不是出现0次或者1次了，而是取消捕获的贪婪性

```javaScript
    // 可以匹配出全部的项
    //[ '2019', index: 5, input: 'chang2019cheng', groups: undefined ]
    let str = 'chang2019cheng'
    let reg = /\d+/g
    console.log(reg.exec(str))

    // 加?可以取消正则匹配的贪婪性
    //[ '2', index: 5, input: 'chang2019cheng', groups: undefined ]
    let str = 'chang2019cheng'
    let reg = /\d+?/g
    console.log(reg.exec(str))
```

## 分组捕获

```javaScript
   //在正则捕获的时候，如果正则中存在分组，捕获的时候不仅仅把大正则匹配到的字符捕获到(数组的第一项)，
   // 而且把小分组匹配到的内容也单独抽出来(数组中的第二项开始就是小分组)
   let str = '2018{123}{456}'
   let reg = /\{(\d+)\}/g
   console.log(reg.exec(str))
    //    [
    //     '{123}',
    //     '123',
    //     index: 4,
    //     input: '2018{123}{456}',
    //     groups: undefined
    //    ]
```

## match()

+ String类的方法,参数是正则

+ 不加g只能匹配到第一个符合的项，加g可以匹配出所有符合的项

+ match方法也有自己的局限性，在正则设置了g的情况下，基于match捕获的内容只有大正则匹配的的，小分组的没有单独抽离出来，
（不设置g的情况下和执行exec()是一样的）

```javaScript
   // 设置g的情况下
   // [ '{123}', '{456}' ]
   let str = '2018{123}{456}'
   let reg = /\{(\d+)\}/g
   console.log(str.match(reg))

//  [
//     '{123}',
//     '123',
//     index: 4,
//     input: '2018{123}{456}',
//     groups: undefined
//  ]
   let str = '2018{123}{456}'
   let reg = /\{(\d+)\}/
   console.log(str.match(reg))
```

## ？的作用

```javaScript
    1.量词元字符:出现0次到1次
        /-?/:让减号出现一次或者不出现
    2.取消贪婪性
        /\d+?/:捕获的时候只捕获最短匹配的内容
    3.?:只匹配不捕获
    4.?=:正向预查
    5.?!:负向预查
```

## lastIndex的影响

```javaScript
     // 调用test()方法之后，lastIndex值也会改变 
     let str = 'chang2019cheng2020';
     let reg = /\d+/g;
     console.log(reg.test(str));
      // true 这里也相当于捕获修改了lastIndex的值 
     console.log(reg.lastIndex)
     // 9
     console.log(reg.exec(str));  
     // [ '2020', index: 14, input: 'chang2019cheng2020', groups: undefined ]

    // 虽然捕获的不是同一个字符串，但是正则是同一个，上一次正则处理的时候修改了它的lastIndex值，
    // 也会对下一次匹配的字符串产生影响
    let str = 'chang2019cheng2020';
    let reg = /\d+/g;
    console.log(reg.exec(str));  
    // [ '2019', index: 5, input: 'chang2019cheng2020', groups: undefined ]
    console.log(reg.exec('20180809cheng2020')) 
    // [ '2020', index: 13, input: '20180809cheng2020', groups: undefined ]

```

## RegExp.$1

+ 浏览器中RegExp.$1只有一个，其他的操作也会覆盖这个值，所以没什么用

```javaScript

    let str = 'chang2019cheng2020'
    let reg = /(\d+)/g;
    console.log(reg.test(str)) // true 
    console.log(RegExp.$1)    // 2019   获取的是一个小分组匹配的内容，大正则匹配的内容无法获取
    console.log(reg.test(str)) // true
    console.log(RegExp.$1)    // 2020
    console.log(reg.test(str)) // false
    console.log(RegExp.$1)    // 2020
    console.log(reg.test(str)) // true 
    console.log(RegExp.$1)    // 2019   遍历到最后又会从头开始遍历

```

## String.replace()

```javaScript
    // replace替换的第一种形式:传入字符串匹配
    let str = 'chang2019chang2020'
    str = str.replace(/chang/g,'aaa')
    console.log(str)   //aaa2019aaa2020

    // replace替换的第二种形式:传入正则匹配
    let str = 'chang{val:10}cheng{val:20}'
    str = str.replace(/\{val:(\d+)\}/g,'aaa')
    console.log(str)   //changaaachengaaa

    // replace替换的第三种形式:回调函数的替换
    let str = 'chang{val:10}cheng{val:20}'
    str = str.replace(/\{val:(\d+)\}/g,(...arg)=>{
       return 'aaa'   
    })
    console.log(str)   //changaaachengaaa
    
```

## 时间字符串格式化

```javaScript

    // 简单版本:根据特殊符号匹配
    function filterMonth(month){
        if(month.length<2){
            return '0'+month
        }
        return month
    }

    let str = '2018/2/30 17:50:23'
    var ary = str.split(/(?:\/| |:)/)
    let [,month,day,hours,minutes] = ary
    let result = `${filterMonth(month)}-${day} ${hours}:${minutes}`
    console.log('当前时间:',result)

    // 把所有的数字都匹配出来
    let str = '2018/2/30 17:50:23';
    var arr = str.match(/\d+/g);
    console.log(arr)
    let template = '{0}年{1}月{2}日 {3}时{4}分{5}秒'
    template = template.replace(/{(\d)}/g,(...arg)=>{
        let [,index] = arg;
        console.log(arg)
        return arr[index]
    })
    console.log(template)


    // 时间字符串格式化的终极解决方案
    String.prototype.myFormateTime = function myFormateTime(template='{0}年{1}月{2}日 {3}时{4}分{5}秒'){
        let ary = this.match(/\d+/g).map(item=>(item<10 ? '0'+item : item ));
        return template.replace(/\{(\d)\}/g,(...[,index])=>{
            return ary[index]
        })
    }
    let str = '2018/4/30 12:5:30'
    console.log(str.myFormateTime())
```