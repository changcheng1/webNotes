<!--
 * @Author: your name
 * @Date: 2020-05-23 13:58:06
 * @LastEditTime: 2020-05-25 15:49:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/webpack/index.md
--> 
#### webpack安装

```javaScript
    npm i webpack webpack-cli -D
```

1. npx webpack 可以直接运行webpack命令

2. webpack4.0 默认要配置mode，development不会对代码进行压缩，production会对代码进行压缩处理

```javaScript
    webpack -- mode development/production
```

3. 默认配置文件的名字，webpack.config.js，node_modules/webpack-cli/bin/config-yargs.js里面默认读取

```javaScript
    let path = require('path')
    module.exports = {
        mode:'development',  // 不压缩代码
        entry:'./src/index.js',  // 入口
        output:{
            filename:'bundle.[hash:8].js', // 打包后的文件带hash8位
            path:path.resolve(__dirname,'dist')//路径必须是一个绝对路径
        }
    }

```

4. webpack.config.js也可以换成其他的名

```javaScript
    // package.json

    "scripts":{
        "build":"webpack --config webpack.my.js"
    }
```

5. webpack本地服务，基于express server

```javaScript
    npm i webpack-dev-server -D

    npx webpack-dev-server

     "scripts":{
        "dev":"webpack-dev-server"
    }

    module.exports = {
        devServer:{  // 开发服务器配置
            port:3000,  // 监听端口
            progress:true,  //显示进度条
            contentBase:'./build', // 打开目录的入口index.html
            compress:true  // 压缩代码
        }
    }
```

6. webpack插件 html-webpack-plguin

```javaScript
     npm i --save-dev html-webpack-plugin
    
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        plugins:[
            new HtmlWebpackPlugin({
                template:'./src/index.html', //模板文件
                filename:'index.html',   // 输出后的文件名称
                minify:{
                    removeAttributeQuotes:true,  // 去除html文件里面的双引号
                    collapseWhitespace:true  //压缩成一行
                }
                hash:true  // 增加引入文件的hash戳
            })
        ]
    }
```

7. 样式文件loader

```javaScript

    let MiniCssExtractPlugin = require('mini-css-extract-plugin')
     module.exports = {
         plugins:[
             new MiniCssExtractPlugin({
                 fileName:'main.css',
             })
         ],
        module:{  //模块
            rules:[
                 {
                    test: /\.scss$/,
                    use:[
                        // {
                        //     loader:'style-loader',
                        //     options:{
                        //         insertAt:'top'   // 将自己写的style插到最上面
                        //     }
                        // }
                        MiniCssExtractPlugin.loader,
                    ]
                    "css-loader", "postcss-loader",
                    // 需要postcss.config.js
                    "sass-loader"
                },
            ]
        }
    }
```
8. 样式文件自动添加前缀

```javaScript
    // postcss.config.js
    module.exports = {
        plugins:[require('autoprefixer')]
    }
```

9. js/css代码压缩：webpack4配置与之前有差异

```javaScript
   let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   let OptimizeCss = require('optimize-css-assets-webpack-plugin')
    module.exports = {
        optimization:{
            minimizer:{  // 优化项，用来压缩css和js代码体积
                new UglifyJsPlugin({
                    cache:true,  // 是否用缓存
                    parallel:true,  // 并发打包
                    sourceMap:true  // 保留源码映射
                }),
                new OptimizeCss()
            }
        }
    }
```
10. Es6语法处理

```javaScript
    npm i babel-loader @babel/core @babel/preset-env

    module.exports = {
        module:{
             rules:[{
                  test: /\.(js|vue)$/,
                    // 需要有个配置文件.eslint
                    loader: 'eslint-loader',
                    enforce: 'pre',    // 强制在js loader之前执行
                    include: [resolve('src'), resolve('test')],
                    options: {
                        formatter: require('eslint-friendly-formatter'),
                        emitWarning: !config.dev.showEslintErrorsInOverlay
                    },
                }
                {
                    test:/\.js$/,
                    use:[
                        loader:'babel-loader',
                        include: [
                            resolve('src'),
                            resolve('test'),
                        ] 
                    ]
                }
            ]
        }
    }
```
11. 全局变量引入

+ expose-loader 行内loader引入

+ ProvidePlugin 给每个人提供一个$

+ 引入不打包 externals

```javaScript
    let webpack = require('webpack')
    module.exports = {
         externals: { // <-添加
           jquery:'$'    // 用$来引入，避免模块引入打包
        },
        // plugin:[
        //     new webpack.ProvidePlugin{  // 在每个模块中都注入这个$符,但是会打包
        //         '$':'jquery'
        //     }
        // ]
    }
```

12. webpack打包图片(file-loader/image-webpack-loader)

```javaScript
    module.exports = {
        rule:[
              test: /\.(jpg|png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')  // 设置打包输出路径
                }
        ]
    }
```