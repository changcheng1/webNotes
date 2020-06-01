## 常见的 dom 操作

### 操作 dom 的属性和方法

> getElementById

- 上下文只能是 document(只有 document 这个实例的原型链上才能找到，其他实例找不到)

- ID 重复获取第一个

> getElementsByTagName

- 获取上下文当中，所有子子孙孙的中标签叫 xx 的元素

> getElementsByClassName

- 上下文只能是 document

> querySelector

- 返回匹配的一个元素，没有返回 Null

> querySelectorAll

- 返回符合条件的 nodeList 集合

> document.documentElement

- 获取整个页面 html 结构

> document.body

> document.heady

### 描述节点和节点之间关系的属性

> &emsp;&emsp;&emsp;&emsp;&emsp;nodeType&emsp;&emsp;&emsp;&emsp;nodeName&emsp;&emsp;&emsp;&emsp;&emsp;nodeValue

> 元素节点 &emsp;&emsp;&emsp;1&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;大写标签名&emsp;&emsp;&emsp;&emsp;&emsp;null

> 文本节点&emsp;&emsp;&emsp;3&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#text&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;文本内容

> 注释节点&emsp;&emsp;&emsp;8&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#comment&emsp;&emsp;&emsp;&emsp;&emsp;注释内容

> 文档节点&emsp;&emsp;&emsp;9&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#document&emsp;&emsp;&emsp;&emsp;&emsp;null

- childNodes:所有子节点

- children:所有元素节点

- parentNode:父节点

- previousSibling/previousElementSibling:前一个节点/前一个元素节点

- nextSibling/nextElementSibling:下一个节点/下一个元素节点

- firstChild/firstElementChild:第一个节点/第一个元素接地那

- lastChild/lastElementChild:最后一个节点/最后一个元素节点

### 动态操作 Dom

> document.createElement:创建一个 dom 节点

```javaScript
    document.createElement('button')
```

> createDocumentFragment:创建一个虚拟节点对象

```javaScript
    var d=document.createDocumentFragment();
    d.appendChild(document.getElementsByTagName("LI")[0]);
    d.childNodes[0].childNodes[0].nodeValue="Milk";
    document.getElementsByTagName("UL")[0].appendChild(d);
```

#### appendChild 和 append 的区别

- appendChild 不仅可以传节点也可以传入字符串，append 只能传入节点

  </br>
  </br>
  </br>

> appendChild:添加一个子元素

```javaScript
    var node=document.getElementById("myList2").lastChild;
    document.getElementById("myList1").appendChild(node);
```

> insertBefore:在...之前插入一个元素

```javaScript
   document.getElementById("myList").insertBefore(newItem,existingItem);
```

> cloneNode(true/false)

- true:复制当前所有的子孙节点

- false:只复制当前的节点

```javaScript
    var node=document.getElementById("myList2").lastChild.cloneNode(true);
    document.getElementById("myList1").appendChild(node);
```

> removeChild:移除一个节点

```javaScript
    var list=document.getElementById("myList");
    list.removeChild(list.childNodes[0]);
```

> set/get/removeAttribute

- setAttribute:设置属性

```javaScript
    document.getElementsByTagName("INPUT")[0].setAttribute("type","button");
```

- getAttribute:获取属性

```javaScript
   document.getElementsByTagName("a")[0].getAttribute("target");
```

- removeAttribute:移除属性

```javaScript
    document.getElementsByTagName("H1")[0].removeAttribute("style");
```

> dom.style.xxx = xxx

> xxx.stye.xxx :获取行内样式

> xxx.className = '' :设置 className 的名称

> xxx.onClick = function(){}:设置点击事件

### JS 盒子模型属性

> 在 js 中通过相关的属性可以获取(设置)元素的样式信息，这些属性就是盒子模型的属性

> client(left/width/height)

- 1.clientWidth && clientHeight:获取可视区域的宽高(内容的宽高+padding 的宽高)，不算内容溢出。

- 2.clientleft && clientTop:获取(左/上)边框的宽度

- 3.document.documentElement.clientWidth/clientHeight:获取当前屏幕的可视宽度/高度,随着拉伸而改变

- 4.document.body.clientWidth/clientHeight:不会随拉伸而改变

> offset(top/left/width/height/parent)

- 1.offsetWidth && offsetHeight:在 client 的基础上加上 border，不算内容溢出。

- 2.offsetTop:获取当前盒子元素外边框距离其父级参照参照物内边框的上偏移(不包含定位的情况是 body)

- 3.offsetLeft:获取当前盒子元素外边框距离其父级参照参照物内边框的左偏移(不包含定位的情况是 body)

- 4.offsetParent:同一个平面默认都是 body

- 同一个平面默认参照物是 body,body 的父级参照物是 Null,构建不同的平面用 z-index，但是这个属性只对定位有作用，所以改变元素的定位可以改变父级参照物

> scroll(top/left/width/height)

- 1.scrollWidth/Height:真实内容的宽高(可能溢出的值+padding)

- 2.scrollTop:静止状态或者没有滚动条值是 0，垂直滚动条滚动的高度

- 3.scrollLeft:静止状态或者没有滚动条值是 0，横向滚动条滚动的高度

- 4.document.documentElement.scrollHeight/document.documentElement.scrollWidth:获取当前页面真实的宽高

- 5.document.documentElement.scrollHeight/document.documentElement.scrollWidth:获取当前 body 真实的宽高

### JS 盒子模型属性

> 通过 js 盒模型属性获取值的特点

- 1.都是数字，不带单位

- 2.获取的都是整数，不会出现小数

- 3.获取的结果都是符合样式值，如果想获取单一样式(例如:只想获取 padding 样式)，我们的盒子模型属性就操作不了了

### 获取元素的单一样式值

1.dom.style.xxx 只能获取元素的行内样式

```javaScript
    var dom = document.getElementById('outer');
     dom.style.color  //red
```

2.getComputedStyle(dom).height 只能获取元素的非行内样式

```javaScript
    var dom = document.getElementById('outer');
    getComputedStyle(dom).width  //300px
```

## 获取元素的样式值

```javaScript
    let getClass = function(curEl,attr){
        if(window.getComputedStyle == undefined){
            return
        }
        let val = window.getComputedStyle(curEl)[attr];
        // 去除单位
        reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i
        reg.test(val) ? val = parseFloat(val) : null
        return val
    }
```

## 设置元素的样式值

```javaScript
    //单独设置元素样式
    let setClass = function(curEl,attr,val){
        if(attr == 'opacity'){
            curEl.style.opacity = val
            return
        }
      let reg = /^(width|height|fontSize|((margin|left)(top|left|right|bottom)?))$/i;
      reg.test(val) ? val +'px' :null
      curEl['style'][attr] = val
    }
    // 批量设置元素样式
    let setGroupCss = function(curEl,options = {}){
        // for in 循环只遍历当前对象可枚举的属性
        for(let attr in options){
            // 不获取在原型链上拓展的属性
           if(options.hasOwnProperty(attr)){
               setClass(curEl,attr,options[attr])
           }
        }
    }
    setClass(dom,{
        width:'200',
        height:'200',
    })
```

<font color=red>面向对象的事件委托</font>

优点:减少 dom 循环遍历，优化性能，采用绑定在父元素的方法，子元素点击冒泡

```javaScript
    <ul class="ul">
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>

    var ul = document.getElementsByClassName('ul')[0]
    ul.addEventListener('click', function(e) {
        console.log(e.target)
    })

```
