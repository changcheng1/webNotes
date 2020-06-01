<!--
 * @Author: your name
 * @Date: 2020-04-30 10:31:46
 * @LastEditTime: 2020-04-30 14:01:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/ajax.md
 -->

**ajax**

```javaScript
  function ajax(obj) {
        let promise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest()
            xhr.open(obj.method, obj.url)
            xhr.setRequestHeader('Content-Type', obj.header || "application/x-www-form-urlencoded")
            xhr.onreadystatechange = () => {
                //Http完全被接收
                if (xhr.readyState == 4) {
                    // 状态码为4
                    if (xhr.status == 200) {
                        resolve(xhr.response)
                    } else {
                        reject(new Error(xhr.statusText))
                    }
                }
            }
            xhr.send(obj.data || {})
        })
        return promise
    }
    ajax({
        method: 'GET',
        url: 'data.json'
    }).then((data) => {
        console.log('data1', data)
    }, (err) => {
        console.log('errr', err)
    })
```
