<!--
 * @Author: your name
 * @Date: 2020-03-26 15:55:00
 * @LastEditTime: 2020-04-10 14:05:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/data.md
 -->

- 前端数据结构

> 队列 栈 链表 集合 hash 表 树 图

- 队列:先进先出

```javaScript

    class Queue {
    constructor() {
        this.queue = []
    }
    enqueue(element) {
        this.queue.push(element)
    }
    dequeue() {
        this.queue.shift()
    }

}
let newQueue = new Queue();
newQueue.enqueue(1)
newQueue.enqueue(2)
newQueue.dequeue()
console.log(newQueue.queue)

```

- 栈:后进先出

```javaScript
    // 执行上下文栈:执行a执行b执行c 然后 销毁c销毁b销毁a,是从里往外的，闭包就是执行上下文没有被销毁
    function a(){
        function b(){
            function c(){

            }
            c()
        b()
    }
    a()
```

- 栈结构模拟

```javaScript
   class Stack {
    constructor() {
        this.stack = []
    }
    put(element) {
        this.stack.push(element)
    }
    pop() {
        this.stack.pop()
    }
}

let newStack = new Stack();
newStack.put(1)
newStack.put(2)
newStack.pop()
console.log(newStack.stack)
```

> 链表 单项链表 双向链表 循环链表

- 操作数据不需要破坏数据的原有结构

* 链表的性能要优于数组，因为数组是强顺序

```javaScript
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}
class LinkList {
    constructor() {
        this.head = null
        this.length = 0
    }
    insert(position, element) {
        let node = new Node(element)
        if (!this.head) {
            this.head = node
        } else {
            let index = 0
            let current = this.head
            let previous = null
            while (index++ < position) {
                // 找到要在谁之前插入那一项
                previous = current // 拿到要插入哪一项之前
                current = current.next // 插入到前一个后面
            }
            previous.next = node
            node.next = current
        }
        this.length++
    }
    append(element) {
        let node = new Node(element)
        if (!this.head) {
            // 设置链表头
            this.head = node
        } else {
            // 从0项开始查找
            let index = 0
                // 链表头部
            let current = this.head
            while (++index < this.length) {
                current = current.next // 如果当前不是最后一项就把这一个人的下一项继续查找
            }
            current.next = node
        }
        this.length++
    }
}
let list = new LinkList()
list.append(1)
list.append(2)
list.append(3)
list.insert(1, 100)
console.log(JSON.stringify(list))
```

> 集合

- set 的特点就是 key 和 value 是相同的

```javaScript


class Set {
    constructor() {
        this.set = {}
    }
    add(element) {
        if (!this.set.hasOwnProperty(element)) {
            this.set[element] = element
        }
    }
}

let a = new Set()
a.add(1)
a.add(2)
console.log(a)
```

- 集合重点：交集差集

```javaScript

// 数组的交集  和 差集 has来实现  set方法只有forEach方法
let s1 = new Set([...a1]); // [1,2,3]
let s2 = new Set([...a2]); // [1,2,3]
let a3 = [...s2].filter((item=>{ // 返回的是一个新的数组
   return  !s1.has(item); // map是映射一个新的数组 但是不会比以前的项少
}));
console.log(a3);
```

> map 原理 : 生成唯一的 key，存放对应的值

- hashTable 取值快 而且 es6 已经提供了

```javaScript
    class Map{ // 松散 重复的话可以在加上链表
        constructor(){
            this.arr = [];
        }
        calc(key){
            let total = 0;
            for(let i = 0 ; i < key.length;i++){
                total += key[i].charCodeAt()
            }
            return total % 100
        }
        set(key,value){
            key = this.calc(key);
            this.arr[key] = value
        }
        get(key){
            key = this.calc(key);
            return  this.arr[key];
        }
    }
// 模拟hash表
let map = new Map(); // hash 表
map.set({a:1},123);
map.set('bbq',456);
console.log(map)

```

> 二叉树

```javaScript
   class Node {
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null
    }
    insert(newNode, element) {
        // 如果小于
        if (element < newNode.element) {
            if (newNode.left == null) {
                newNode.left = new Node(element)
            } else {
                this.insert(newNode.left, element)
            }
        } else {
            // 如果大于
            if (newNode.right == null) {
                newNode.right = new Node(element)
            } else {
                this.insert(newNode.right, element)
            }
        }
    }
    add(element) {
        let node = new Node(element);
        // 如果没有根，就添加根
        if (!this.root) {
            this.root = node
        } else {
            this.insert(this.root, element)
        }
    }
}
let newTree = new Tree;
newTree.add(100)
newTree.add(60)
newTree.add(40)
newTree.add(80)
console.log(JSON.stringify(newTree))
```

> 十进制转二进制

```javaScript
    function binarySystem(shang, arr = []) {
        if (Math.floor(shang / 2) != 0) {
            arr.push(shang % 2)
            binarySystem(Math.floor(shang / 2), arr)
        } else {
            arr.push(shang)
        }
        return arr.join('')
    }
console.log(binarySystem(58))
```
