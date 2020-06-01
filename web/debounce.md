<!--
 * @Author: your name
 * @Date: 2020-05-02 21:50:09
 * @LastEditTime: 2020-05-02 21:52:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/debounce.md
 -->

### 函数的防抖

- 控制次数:输入框搜索

```javaScript
    let a = 1
    let time = null
    window.addEventListener('scroll', function() {
            if (time) clearTimeout(time)
            time = setTimeout(() => {
                console.log(a++)
            }, 2000)
        })
```

### 函数的节流

- 控制频率：拖拽等高频操作

```javaScript
    function debounce(fn, wait) {
        var timer = null;
        return function() {
            // 只有是null的时候才执行，也就是执行完setTimeout函数之后再执行
            if (!timer) {
                timer = setTimeout(() => {
                    fn()
                    timer = null;
                }, wait)
            }
        }
    }
    // 函数的柯里化，拆分成细小的函数，方便维护
    let fn = function() {
        console.log('触发')
    }
    window.onmouseover = debounce(fn, 2000)
```
