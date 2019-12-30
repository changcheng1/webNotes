## 常用字符串方法

+ String.concat():字符串拼接
+ String.substr()

## String.substr(indexStart,indexEnd)**<font color=red size=80>不建议使用**

+ indexStart:开始位置
+ indexEnd:截取的数量

```javaScript
    var str = '123456'
    console.log(str.substr(2,3))  //  345
```
## String.substring(indexStart,number)

+ indexStart:开始下标
+ number:截取数量

```javaScript
    var str = '123456789'
    console.log(str.substring(3,4)) //  4567
```
## String.slice()

```javaScript
    var str = 'ThisisString'
    console.log(str.slice(3,5))  // si
```
## String.includes() String.startsWith()  String.endsWith()

+ includes():返回布尔值,是否找到了参数字符串
+ startsWith():返回布尔值,是否在头部找到了参数字符串
+ endsWith():返回布尔值,是否在尾部找到了参数字符串

```javaScript
    var str ='Hello world!'
    // includes()
    console.log(str.includes(' wor')) //true
     // startsWith()
    console.log(str.startsWith('Hello')) //true
     // endsWith()
    console.log(str.endsWith('!')) //true
```

## String.repeat()

+ 该方法返回一个新的字符串,表示将字符串重复N次

+ **<font color=red size=80>如果repeat的参数是负数或者Infinity，会报错**

```javaScript
    var str = '123'
    console.log(str.repeat(3)) // '123123123'
```

## trim String.trimStart() String.trimEnd()

+ trim():从两端消除空格

+ trimStart():消除头部空格

+ trimEnd():消除尾部空格

+ **<font color=red size=80>都不会修改原字符串**

```javaScript
    const str = '  abc  ';
    // trim()
    console.log(str.trim()) // 'abc'
    // trimStart()
    console.log(str.trimStart()) // 'abc  '
    // trimEnd
    console.log(str.trimEnd()) // '  abc'
```
## String.charAt()

+ 从一个字符串中返回指定的字符

```javaScript
    var anyString = "Brave new world";
    console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");   // The character at index 0   is 'B'
    console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");   // The character at index 0   is 'r'
    console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");   // The character at index 0   is 'a'
    console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");   // The character at index 0   is 'v'
    console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");   // The character at index 0   is 'e'
    console.log("The character at index 999 is '" + anyString.charAt(999) + "'");   // The character at index 0   is ''
```
