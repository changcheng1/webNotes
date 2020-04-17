<!--
 * @Author: your name
 * @Date: 2020-03-11 10:41:26
 * @LastEditTime: 2020-03-11 10:41:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/array.md
 -->
```javaScript
  {
    // 把一组数字转化为数组的方法
    let arr = Array.of(3, 4, 7, 9, 11)
    console.log('arr=', arr)
    let empty = Array.of()
    console.log('empty', empty)
} {
    // Array.from():可以将伪数组转化为真正的数组。
    let p = document.querySelectorAll('p')
    let pArr = Array.from(p)
    pArr.forEach(function (item) {
        console.log(item.textContent)
    })
    // Array.from():还有类似于map的作用
    console.log(Array.from([1, 2, 3, 4, 5], (item) => {
        return item * 2
    }))
} {
    //Array.fill():对数组进行填充(填充内容,开始位置，结束位置-1)
    console.log('fill-7', [1, 'a', undefined].fill(7))
    console.log('fill-7', [1, 2, 3, 4, 5, 6, 7].fill(7, 1, 3)) // [1, 7, 7, 4, 5, 6, 7]
} {
    // Array.keys():数组进行遍历Index
    for (let index of [1, 2, 3, 4].keys()) {
        console.log('index', index)
    }
    // Array.values():数组进行遍历value
    for (let value of [1, 2, 3, 4].values()) {
        console.log('value', value)
    }
    // Array.entries():数组进行遍历value和Index
    for (let [index, value] of [1, 2, 3, 4, 5].entries()) {
        console.log('index', index, 'value', value)
    }
} {
    // Array.copyWithin(替换的位置，从开始的位置读取的数)
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)) // [4,2,3,4,5]   
    console.log([1, 2, 3, 4, 5].copyWithin(2, 1, 2)) // [1,2,3,4,5]
} {
    //Array.find():返回符合条件的数组成员
    console.log([1, 2, 3, 4, 5, 6].find((item) => {
        return item > 2
    })) // 3
    // Array.findIndex():返回符合条件的数组成员所在的key
    console.log([1, 2, 3, 4, 5, 6].findIndex((item) => {
        return item > 0
    })) //3
} {
    //Array.includes():检测数组里面是否包含某个元素
    console.log('number', [1, 2, NaN].includes(NaN)) // number true
}
```