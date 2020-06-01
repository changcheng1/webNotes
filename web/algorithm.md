<!--
 * @Author: your name
 * @Date: 2020-04-17 17:32:40
 * @LastEditTime: 2020-04-23 15:36:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/algorithm.md
 -->

### 函数的柯里化

```javaScript
function add() {
    let args = Array.prototype.slice.call(arguments)
    let _add = function() {
            args.push(...arguments)
            return _add
        }
        // 利用隐式类型转换，最后一次执行的时候返回值
    _add.toString = function() {
        let result = args.reduce((prev, current) => {
            return prev + current
        })
        return result
    }
    return _add
}
console.log(add(1)(2)(3) == 6)
console.log(add(1, 2, 3) == 6)
console.log(add(1, 2)(3) == 6)
```

### 冒泡排序:后一个和前一个比较，后一个小于前一个，就交换位置

```javaScript
var arr = [5, 2, 33, 12, 9, 1]

function sort(arr) {
    for (var i = 0; i < arr.length; i++) {
        let flag = true
        for (var j = i + 1; j < arr.length; j++) {
            let temp = arr[i]
            if (arr[j] < arr[i]) {
                arr[i] = arr[j]
                arr[j] = temp
                flag = false
            }
        }
        if (flag) {
            break
        }
    }
    return arr
}
console.log(sort(arr))
```

### 选择排序:默认第一个是最小的，然后每次拿当前数组剩余的最小值，和当前的最小值进行交换

```javaScript

var arr = [5, 2, 33, 12, 9, 1]
function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 默认第一个为最小值
        let min = i
       //每次都拿当前的最小值
        for (let j = min + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }
        let temp = arr[min]
        arr[min] = arr[i]
        arr[i] = temp
        console.log(arr)
    }
    return arr
}

console.log(sort(arr))
```

### 快速排序:数组切割成三部分，取出中间的值，小于的值放在左边，大于的值放在右边，然后递归

```javaScript
function quick(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let middleIndex = Math.floor(arr.length / 2)
    let middleVal = arr.splice(middleIndex, 1)
    let leftArr = [],
        rightArr = []
    for (let i = 0; i < arr.length; i++) {
        arr[i] < middleVal ? leftArr.push(arr[i]) : rightArr.push(arr[i])
    }
    return quick(leftArr).concat(middleVal, quick(rightArr))
}

let arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0]
console.log(quick(arr))

```

### 插入排序

```javaScript
function insert(arr) {
    // 准备一个数组，用来存储手里的牌，默认抓第一张
    let currentArr = []
    currentArr[0] = arr[0]
    for (let i = 1; i < arr.length; i++) {
        //从第二张开始摸排
        let newCurrent = arr[i]
        for (let j = currentArr.length - 1; j >= 0; j--) {
            // 每次拿新抓的牌和放在数组中的牌进行比较，如果大，就放在后面
            console.log(newCurrent, currentArr[j])
            if (newCurrent > currentArr[j]) {
                currentArr.splice(j + 1, 0, newCurrent)
                break;
            }
            // 如果都比之前的牌小，那就放在最前面
            if (j == 0) {
                currentArr.unshift(newCurrent)
            }
        }
    }
}
var arr = [5, 7, 33, 12, 9, 1]
insert(arr)
```

### 希尔排序

```javaScript
    Array.prototype.shell = function() {
    let gap = Math.floor(this.length / 2)
    while (gap >= 1) {
        for (let i = gap; i < this.length; i++) {
            while (i - gap >= 0 && this[i] < this[i - gap]) {
                console.log(this[i], this[i - gap])
                let temp = this[i]
                this[i] = this[i - gap]
                this[i - gap] = temp
                i = i - gap
            }
        }
        gap = Math.floor(gap / 2)
    }
}
let arr = [8, 9, 1, 7, 2, 3, 5, 4, 6, 0]
arr.shell()
console.log(arr)
```

### 数组扁平化

```javaScript

var a = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]

console.log(a.flat(Infinity))
```

```javaScript
var a = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]
arr.toString().split(',')
```

```javaScript

var arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]]

function demo(arr) {
    let result = []
    let fn = (arr) => {
        arr.forEach((item) => {
            if (Object.prototype.toString.call(item) == '[object Array]') {
                fn(item)
            } else {
                result.push(item)
            }
        })
    }
    fn(arr)
    return result
}
console.log(demo(arr))
```

### 输入一个 N，输出所有和为 N 的连续正数序列

```javaScript
    function createArr(i, j) {
    let arr = new Array(j)
    arr.fill(null)
    arr = arr.map((item, index) => {
        return i++
    })
    return arr
}
// 中间一份为二。中间的数加后面任意的数都大于目标数
function fn(count) {
    let result = []
    let middle = Math.ceil(count / 2)
        // 从1开始累加
    for (let i = 1; i <= middle; i++) {
        //控制累加多少次
        for (let j = 2;; j++) {
            // 求出累加多少次的和
            let total = (i + (i + j - 1)) * (j / 2)
            if (total > count) {
                break
            } else if (total == count) {
                result.push(createArr(i, j))
                break
            }
        }
    }
    return result
}
console.log(fn(15))
```

### 找出数组中和为 N 的两个正数，并返回他们的数组下标

```javaScript

var arr = [1, 6, 4, 8, 7]

function func(nums, target) {
    for (var i = 0; i < nums.length; i++) {
        let diff = target - nums[i]
        for (var k = i + 1; k < nums.length; k++) {
            console.log(diff == arr[k])
            if (diff == arr[k]) {
                return [i, k]
            }
        }
    }
}
console.log(func(arr, 9))
```

```javaScript

var arr = [1, 0, 3, 8, 7]

function fn(nums, target) {
    let obj = {}
    for (var i = 0; i < arr.length; i++) {
        if (obj[target - arr[i]] != undefined) {
            return [obj[target - arr[i]], i]
        }
        obj[arr[i]] = i
    }
}
console.log(fn(arr, 4))
```

### 具有最大和的连续子数组

```javaScript
    let arr = [-2, 2, -1, 3, -3]

function maxSubArray(arr) {
    // 假设第一项是最大值
    let ans = arr[0]
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        if (sum > 0) {
            sum = sum + arr[i]
        } else {
            sum = arr[i]
        }
        ans = Math.max(ans, sum)
    }
    return ans
}
console.log(maxSubArray(arr))

```

### 合并两个有序数组

```javaScript
var a = [1, 321, 421, 5215]
var c = [41, 432, 532, 5]

var d = a.concat(c).sort((a, b) => a - b)
console.log(d)
```

```javaScript

let arr1 = [1, 5, 8, 16, 26]
let arr2 = [4, 7, 9, 17]

function sort(arr1, arr2) {
    // 总索引
    let len = arr1.length + arr2.length - 1
    let len1 = arr1.length - 1
    let len2 = arr2.length - 1
    while (len1 >= 0 && len2 >= 0) {
        if (arr1[len1] > arr2[len2]) {
            arr1[len] = arr1[len1]
            len1--
        } else if (arr1[len1] < arr2[len2]) {
            arr1[len] = arr2[len2]
            len2--
        }
        len--
    }
    return arr1
}
console.log(sort(arr1, arr2))

```

// 斐波那契数列

> [1,1,2,3,5,8,13,21...]

```javaScript
function fibonacci(count) {
    if (count <= 1) return1
    let arr = [1, 1]
     // 要创建的数量
    let n = count + 1 - 2
    while (n > 0) {
        let current = arr[arr.length - 1]
        let next = arr[arr.length - 2]
        arr.push(current + next)
        n--
    }
    return arr
}
console.log(fibonacci(4))

```
