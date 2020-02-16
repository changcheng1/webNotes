# tooken/session/cookie的却别

### jwt vs session

```javaScript
// 引入koa-jwt插件
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const verify = util.promisify(jwt.verify)
// 设置加密算法的秘钥以及不校验的登录接口
app.use(jwtKoa({
    secret:'secret'
}).unless({
    path: [/^\/users\/login/]
}))
// 登录接口返回token，有效时间一小时，由客户端进行存储
router.post('/login', async (ctx, next)=> {
    let SECRET = 'secret'
    let token = jwt.sign('result',SECRET,     {expiresIn:'1h'})
    }
    ctx.body = {
            errCode:0,
            data:token
     }
    }
})
// 获取请求头中的token解密就是用户的信息
router.get('/getUserInfo', async (ctx, next)=> {
    const token = ctx.header.authorization
    try{
        const payload = await verify(token.split(' ')[1],SECRET)
        ctx.body = {
            errno:0,
            userInfo:payload
        }
    }catch(err){
        console.log('err',err)
        ctx.body = {
            errno:1,
            masg : 'verify token failed'
        }
    }
})
```
+ 为了解决：登录&存储登录用户的信息

+ jwt用户信息加密存储在客户端，不依赖cookie，可跨域

+ session用户信息存储在服务端，依赖cookie，默认不可跨域

+ 一般情况下，两者都能满足，大型系统中两者可共用

+ jwt更适合服务多的节点，跨域多的系统

+ session更适合统一的web服务，server要严格管理用户信息

