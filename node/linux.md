<!--
 * @Author: your name
 * @Date: 2020-05-07 14:12:11
 * @LastEditTime: 2020-05-11 15:49:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/node/linux.md
 -->

### 连接远程服务器

+ ssh -p 22 root@122.51.207.237

### 查找某个插件的位置

+ which ${nginx}

### 立刻杀死某个进程

```javaScript
    ps -ef | grep node
    
    kill -9 ${进程id}
```

### 上传文件

+ cp -p 22 /Users/changcheng/Downloads/webNotes/_book.zip root@122.51.207.237:/usr/

### linux 设置免密登录

+ 客户端生成公钥和私钥，服务器生成公钥和私钥，交换各自的公钥，私钥加密公钥解密(Https的非对称加密)

1.设置本地秘钥

```javaScript
    ssh-keygen -t rsa
```

2.开始ssh代理

```javaScript
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
```
3.把本地服务公钥上传到服务器

```javaScript
    // 复制本地公钥
    cat ~/.ssh/id_rsa.pub
    // 粘贴服务器文件夹
    vi ~/.ssh/authorized_keys
    //设置权限
    chmod 600 ~/.ssh/authorized_keys
    //重启服务器
     systemctl restart sshd
```

### 安装软件

```javaScript
    //  安装git
    yum -y install git curl wget
    // 安装cnpm，切换源
    npm i cnpm -g
```

### pm2常用命令

```javaScript
    pm2 start server.js --name "blog"

    pm2 list
```

### nginx安装

https://www.runoob.com/linux/nginx-install-setup.html

+ 常用命令

```javaScript
    // 启动nginx
    nginx
    // 关闭nginx
    nginx -s stop
    // 重读配置文件
    nginx -s load
```