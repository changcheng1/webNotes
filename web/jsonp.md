## 多种跨域方案详解

### 同源策略

> 协议 域名 端口 一致

---

### 为什么浏览器不支持跨域

> cookie LocalStorage 都具有同源限制，防止 cookie 共享带来的安全性

```javaScript
    // 跨域强制携带cookie
    xhr.withCredentials = true
```

---

### 实现跨域的几种方式

##1. jsonp

- 缺点：1.只能发送 get 请求 2.容易遭受 xss 攻击

- [JSONP 实现](jsonp.html)

```javascript
// jsonp的实现
function jsonp({ url, params, cb }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    // 获取函数中的参数
    window[cb] = function (data) {
      console.log('data', data)
      resolve(data)
      document.removeChild(script)
    }
    params = { ...params, cb }
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'https://www.baidu.com/sugrec',
  params: { wd: 'b' },
  cb: 'jQuery11020574908',
}).then((data) => {
  console.log(data)
})
```

##2. cors

- 最常用的方式，后端设置 Access-Control-Allow-Origin

```javaScript
        // 伪代码
        let express = require('express');
        let app = express()
        let whitList = ['http://www.baidu.com']
        app.use((req,res,next)=>{
            let origin = req.headers.origin;
            if(whitList.includes(origin)){
                res.setHeader('Access-Control-Allow-Origin',origin)
                // 设置允许跨域携带cookit
                res.setHeader('Access-Control-Allow-Credentials',true)
                // 设置6秒之内不会发送options请求
                res.setHeader('Access-Control-Max-age',6)
                // 支持headers中的name属性
                res.setHeader('Access-Control-Expose-Headers','name')
                // 三种情况会出现预请求
                // 1.请求的方式不是GET/POST/HEAD
                // 2.POST的请求的Content-Type并非application/x-www-form-urlencoded, multipart/form-data, 或text/plain
                // 3.请求设置了自定义header
                if(req.method == 'options'){
                    res.send()
                }
            }
        })
```

##3. postMessage

```javaScript
        // A页面
        <iframe src="http://localhost:4000/b.html" id="frame" onload="load()"></iframe>
        <script>
            function load(){
                let frame = document.getElementById('frame');
                frame.contentWindow.postMessage('传递给B页面的内容','http://localhost:4000');
            }
            //监听B页面传递过来的消息
            window.onmessage = function(e){
                console.log(e.data);
                e.source.postMessage('我拒收了b页面的消息'，e.origin)
            }
        </script>
        // B页面
        window.onmessage = function(e){
            console.log(e.data);
            e.source.postMessage('我拒收了A页面的消息'，e.origin)
        }
```

##4. document.domain

- document.domain：返回当前文档的服务器域名

- 前提条件:这两个域名必须属于同一个基础域名，而且所用协议，端口都必须一致，否则无法使用 documeng.domain 进行跨域

- 前提条件满足之后利用 document.domain 设置为同一个一级域名就可以实现跨域

```javaScript

    // 一级域名    http://www.baidu.com
    // 二级域名    http://movie.baidu.com
    // A页面
    <iframe src= 'http://a.zf1.cn:3000/b.html' onload="load()" id="frame">
    document.domain = 'zf1.cn'
    function load(){
        var iframe = document.getElementById('frame');
        console.log(iframe.contentWindow.a)
    }

    // B页面
    document.domain = 'zf1.cn'
    var a = '123'
```

##5. window.name

```javaScript
      // A和B是同域的
      // C是不同域的
      // a先获取C的数据 c把值放在window上面，然后把a的引用地址改到B,这样的话name不会消失
        <iframe src="http://localhost:4000/c.html" id="frame" onload="load()"></iframe>
        let first = true
        function load(){
            if(first){
                let iframe = document.getElementById('frame');
                iframe.src = 'http://localhost:3000/b.html'
                first = false
            }else{
                console.log(iframe.contentWindow.name)
            }
        }
```

##6. locaiton.hash

```javaScript
        // 路径后面的hash值可以用来通信
        // 目的是a想访问C,a和b页面是同源的
        // a给c传一个hash值，c收到hash值后，C把Hash值传递给B，b将结果放到a到hash值中

        // A页面
        <iframe src="http://localhost:4000/c.html#iloveyou"></iframe>
        window.onhashchange = function(){
            console.log(locaiton.hash)
        }

        // B页面
        // 设置a页面的hash值，触发a页面的onhashchange方法拿到hash值
        window.parent.parent.location.hash = location.hash

        // C页面
        console.log(location.hash) // 这里可以获取A页面传递过来的hash值
        let iframe = document.createElement('iframe');
        iframe.src = 'http://localhost:3000/b.html#idontloveyou';
        document.body.appendChild(iframe)
```

##7. http-proxy

- 常见项目当中的解决跨域问题就是配置 proxy 使用的就是 http-proxy-middleware 插件

##8. nginx

- 高性能的 HTTP 和反向代理的服务器

##9. websocket

- websocket 和 Http 协议的区别
- websocket 是双向连接，Http 是单向连接

![avatar](./img/ws.png)

```javaScript
    // web
    var ws = new WebSocket("wss://echo.websocket.org");
    // 建立连接，发送消息
    ws.open = function(evt){
        console.log("Connection open ...");
        ws.sned("This is message");
    }
    // 监听收到的消息
    ws.onmessage = function(evt){
        console.log("Recived  Message:"+evt.data)
        ws.close()
    }
    // 监听关闭
    ws.onclose = function(evt){
        console.log("connection closed")
    }

    // node
    let express = require('express');
    let app = express();
    let webSocket = require('ws');
    let wss = new webSocket.Server({prt:3000});
    wss.on('connection',function(ws){
        wss.on('message',function(data){
           console.log("data",data)
           ws.end('发送给客户端的消息')
        })
    })
```

---
