/*
 * @Author: your name
 * @Date: 2020-04-29 16:42:30
 * @LastEditTime: 2020-04-29 20:23:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/_book/server.js
 */
var https = require('https');
var fs = require('fs'); //引入文件读取模块

var documentRoot = '/Users/changcheng/Downloads/webNotes/_book'; //需要访问的本地文件的存放目录

const httpsOption = {
    key: fs.readFileSync('./https/Nginx/2_www.lovedhq.cn.key'),
    cert: fs.readFileSync('./https/Nginx/1_www.lovedhq.cn_bundle.crt')
}

var server = https.createServer(httpsOption, function(req, res) {

    var url = req.url;
    //客户端输入的url，例如如果输入
    // http://localhost:8889/index.html
    //那么这里的url == /index.html 

    //以下三行代码可已配置默认访问页面为index.html
    if (url == '/') {
        url = '/index.html';
    }
    console.log(url.split('?'));
    var file = documentRoot + url.split('?')[0];


    //参数1:要读取的文件路径;
    //参数2:回调函数,读取失败的信息在err中,err为空表示没有错误.data为读取到的文件数据
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();

        } else {
            res.writeHeader(200, {});
            res.write(data);
            res.end();
        }
    });
}).listen(80); // 此处的8889是监听的端口号,可以根据自己的需要配置,注意不要和本地的一些应用程序使用的端口号冲突

console.log('服务器开启成功');