# nginx详解

## nginx是一个开源而且高性能的、可靠的HTTP中间件和代理服务器

## 关闭iptables
 
+ iptables命令是Linux上最常用的防火墙软件
  
+ 停止防火墙: systemctl stop firewalled.service

+ 永久关闭防火墙: systemctl disable firewalled.service

## 确认停用selinux 

+ 安全增强型的linux，是一个linux的内核模块，也是linux的一个安全子系统

+ 停止:setenforce 0

## 安装linux所需模块

+ yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake

+ yum -y install wget httpd-tools vim

## nginx的优势

- IO多路复用 多个描述符的IO操作都能在一个线程里并发交替顺序完成，复用多线程

+ select线程(类似于轮询是否完成):线性遍历文件描述符列表1.效率低下2.最多只有1024

+ epoll(nginx模型):每当fd就绪，采用系统回调函数将fd放下1.效率高2.没有1024限制

## 编写linux配置

+ vi /etc/yum.repos.d/nginx.repo

```
[nginx]
name=nginx repo
baseurl = http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

```
## 安装nginx

+ yum install nginx




