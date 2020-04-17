<!--
 * @Author: your name
 * @Date: 2020-03-11 10:54:01
 * @LastEditTime: 2020-03-11 10:54:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/promise.md
 -->
```javaScript
  import {
  setTimeout
} from "timers";

{
  // 定义函数
  var ajax = function () {
    console.log('1')
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve("")
      }, 1000);
    })
  }
  // 执行函数
  ajax().then(function () {
    return new Promise((resolve, reject) => {
      console.log("2")
      resolve("")
    })
  }).then(function () {
    // 返回一个promise实例
    return new Promise((resolve, reject) => {
      console.log("3")
      // resolve:表示允许下一步
      resolve("")
    })
  }).then(function () {
    console.log("4")
  })
} {
  let ajax = function (num) {
    return new Promise(function (resolve, reject) {
      if (num > 6) {
        resolve()
      } else {
        throw new Error("Num小于6")
      }
    })
  }
  ajax(7).then(function () {
    console.log("then", "大于6")
  }).catch(function (err) {
    console.log("catch", err)
  })
  ajax(5).then(function () {
    console.log("then", "大于6")
  }).catch(function (err) {
    // catch中err用于获取传参中的err
    console.log("catch", err)
  })
} {
  let imgLoad = function (src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.width = 300;
      img.height = 300;
      img.onload = function () {
        setTimeout(() => {
          // 传img进去
          resolve(img);
        }, 1000)
      }
      img.onerror = function (err) {
        reject(err);
      }
    })
  }
  let addImg = function (images) {
    images.forEach(img => {
      document.body.appendChild(img)
    })
  }
  Promise.all([
    imgLoad("http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png"),
    imgLoad("http://img1.imgtn.bdimg.com/it/u=3920398476,1501488149&fm=27&gp=0.jpg"),
    imgLoad("http://img01.taopic.com/160909/240378-160ZZK14275.jpg")
  ]).then(addImg)
} {
  let imgLoad = function (src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.width = 300;
      img.height = 300;
      img.onload = function () {
        setTimeout(() => {
          // 传img进去
          resolve(img);
        }, 1000)
      }
      img.onerror = function (err) {
        reject(err);
      }
    })
  }
  let addImg = function (img) {
    console.log(img)
    let p = document.createElement('p');
    p.appendChild(img)
    document.body.appendChild(p)
  }
  // 返回promise率先完成的第一个结果
  Promise.race([
    imgLoad("http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png"),
    imgLoad("http://img1.imgtn.bdimg.com/it/u=3920398476,1501488149&fm=27&gp=0.jpg"),
    imgLoad("http://img01.taopic.com/160909/240378-160ZZK14275.jpg")
  ]).then(addImg)
}
```