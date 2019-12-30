## 常用数组方法
+ **Array.of()**
+ Array.prototype.concat()
+ **Array.prototype.copyWithin()**
+ **Array.prototype.entries()**
+ Array.prototype.every()
+ **Array.prototype.fill()**
+ Array.prototype.filter()
+ **Array.prototype.find()**
+ **Array.prototype.findIndex()**
+ **Array.prototype.flat()**
+ **Array.prototype.flatMap()**
+ Array.prototype.forEach()
+ **Array.prototype.includes()**
+ Array.prototype.indexOf()
+ Array.prototype.join()
+ **Array.prototype.keys()**
+ Array.prototype.lastIndexOf()
+ **Array.prototype.map()**
+ Array.prototype.pop()
+ Array.prototype.push()
+ **Array.prototype.reduce()**
+ Array.prototype.reduceRight():区别于reduce是从右往左进行操作
+ Array.prototype.reverse()
+ Array.prototype.shift()
+ **Array.prototype.slice()**
+ Array.prototype.some()
+ Array.prototype.sort()
+ **Array.prototype.splice()**
+ Array.prototype.toLocaleString()
+ Array.prototype.toString()
+ Array.prototype.unshift()
+ **Array.prototype.values()**
+ **Array.from()**
+ Array.isArray():结果返回true/false

## Array.reduce((prev,next,currentIndex,arr)={},initalValue)

+ prev:初始值**<font color=red size=80>(必须)**
+ next:当前元素**<font color=red size=80>(必须)**
+ currentIndex:当前元素的索引**<font color=red size=80>(可选)**
+ arr:当前元素对象**<font color=red size=80>(可选)**
+ initalValue:当前元素对象**<font color=red size=80>(可选)**

```javaScript
    // 数组求和
    const arr = [1,2,3,4,5]
    const total = arr.reduce((prev,next)=>{
        console.log(prev,next)
        return prev + next                         // return之后会改变下次的total
    },0)                                           //  0 1
                                                   //  1 2
                                                   //  3 3
                                                   //  6 4
                                                   //  10 5   
    // 数组合并
     const arr = [[1,2],[3,4],[5,6]];
     const total = arr.reduce(function(newArr,itemArr){
        return newArr.concat(itemArr)
     }, []);
    console.log('======total',total);       //[1, 2, 3, 4, 5, 6]
   
     const arr = ["aaa", "bbb", "ccc"];
     arr.reduce(function(prev,next){
         console.log("prev:",prev);
         console.log("next:",next);
         return prev;                              // prev: 111
     },'111');                                     // next: aaa
                                                   // prev: 111
                                                   // next: bbb
                                                   // prev: 111
                                                   // next: ccc  
        
```

## Array.join()

+ 将数组转化为字符串

```javaScript
    var arr = [1,2,3,4]
    arr.join()   // 1,2,3,4
    arr.join('')   // 1234
```
## Array.slice(start,end)

+ start:开始下标 end:结束下标
+ 截取数组，**<font color=red size=80>不会改变改变原数组</font>**

```javaScript
    var arr = [1,2,3,4]
    arr.slice(0,1)  // 返回:[0,1]

    var arr1 = [1,2,3,4]
    arr1.slice()   // 返回：[1,2,3,4]

    var arr2 = [1,2,3,4,5,6]
    arr2.slice(2,4)    // 返回    [3,4]
```

## Array.splice(index,deleteMany,item1,...itemX)

+ 截取数组，向数组添加元素，**<font color=red size=80>该方法会改变原数组</font>**
+ index:开始位置
+ deleteMany:删除的数量
+ item1,...itemX: 添加的项

```javaScript
    var arr = [1,2,3,4]
    arr.splice(0,1,9) // 原数组：[9,2,3,4] 返回[1]

    var arr1 = [1,2,3,4]
    arr1.splice(0,1)   // 原数组：[2,3,4] 返回:[1]

    var arr2 = [1,2,3,4,5,6]
    arr2.splice(2,4)   // 返回：[3,4,5,6]
```
## Array.from()

+ 该方法用于将两类对象转换成真正的数组：类数组的对象和可遍历对象
+ 可以接受一个参数来对数组当中的每个元素进行单独处理

```javaScript
    
    var obj = {
        0:123,
        length:1  // length为必选项
    }
    Array.from(obj) // 返回 [123]

    // 如果是ES5的实现
    Array.prototype.slice.call(obj)  //[123]

    // 传入函数针对每个参数进行单独处理
    var arr = [1,false,false,4]
    Array.from(arr,(x)=>{
        return x ? x : true       // 返回[1,true,true,4]
    }) 
```
## Array.of()

+ 该方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

```javaScript
    Array.of(1,2)  // 返回[1,2]
    Array.of(undefined) // 返回[undefined]

    // ES5实现
    function ArrayOf(){
        return [].slice.call(arguments);
    }
```

## Array.copyWithin(target,start,end)

+ target:从该位置替换数据，负值就是倒数
+ start:从该位置开始读取数据，默认为0，负值，从末尾开始计算
+ end:到该位置停止读取数据

```javaScript
    // 将3号位复制到0号位
    [1,2,3,4,5].copyWithin(0,1,2)     //  [2,2,3,4,5]
    [1,2,3,4,5].copyWithin(0,-2,-1)   //  [4,2,3,4,5]
    [1,2,3,4,5].copyWithin(1,3,4)    //   [1,4,3,4,5]
```
## Array.find()和Array.findIndex()

+ 区别：**<font color=red size=80>Array.find()是返回符合条件的第一个成员 </font>**
+     **<font color=red size=80>Array.findIndex()是返回符合条件成员的位置</font>**

```javaScript
    // Array.find()
    [1,2,3,4,5].find((val)=>{
        val>3                     // 4
    })
    // Array.findIndex()
    [1,2,3,4,5].findIndex((val)=>{
        val>3                     // 3
    })
    // 这两个方法都可以接口第二个参数，用来绑定回调函数的this对象
    function f(v){
        return v > this.age
    }
    var obj = {
        age:20
    }
    [19,23,21].findIndex(f,obj)  // 返回：1
```

## Arryay.fill(elem,start,end)
+ elem:填充的数值**<font color=red size=80>(必填)</font>**  
+ start:开始填充的位置 
+ end:结束的位置

```javaScript
    [1,2,3].fill(4)   // [4,4,4]
    [1,2,3].fill(9,2,3)  // [1,2,9] 
```

## entries(),keys(),values()

```javaScript
    // entreis()
    for(let [index,elem] of ['a','b'].entries()){
        console.log(index,elem)      // 0 'a'
    }                               //  1 'b'
    // keys()
    for(let elem of ['a','b'].keys()){
        console.log(elem)          // 0 1
    }
    // values()
    for(let elem of ['a','b'].values()){
        console.log(elem)         // 'a' 'b'
    }
```
## Array.includes(elem,start)

+ 判断数组里是否包含某项 返回true/false
+ elem：查找的元素
+ start:起始位置

```javaScript
    [1,2,3,4].includes(3) // true
    [1,2,3,4].includes(3,3) //false
```
## flat(),flatMap()

+ flat():用来展开嵌套数组，会忽略空格会修改原数组
+ flatMap():flatMap 方法与 map 方法和深度depth为1的 flat 几乎相同.

```javaScript
    // flat():平铺数组
    [1,[2,3,[4,5,[6]]]].flat(Infinity) // [1,2,3,4,5,6]


    // flatMap():可以忽略空格，map不忽略空格
    let arr = ["今天天气不错", "", "早上好"]
    arr.map(s => s.split(""))
    // [["今", "天", "天", "气", "不", "错"],[],["早", "上", "好"]]

    arr.flatMap(s => s.split(''));
    // ["今", "天", "天", "气", "不", "错", "早", "上", "好"]
```

## Array.map()

+ 该方法创建一个新数组，结果是该数组中的每个元素调用一个函数返回的结果

```javaScript
    var arr = [1,2,3,4]
    var newArr = arr.map(x=>{
         return x * 2
    })
    console.log(newArr)  //2,4,6,8
```
