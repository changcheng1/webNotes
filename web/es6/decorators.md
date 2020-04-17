<!--
 * @Author: your name
 * @Date: 2020-03-11 10:49:50
 * @LastEditTime: 2020-03-11 10:49:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/decorators.md
 -->
```javaScript 
  {
  // 设置类的属性不能够修改
  function get(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor
  }
  class test {
    @get
    time() {
      return '2018-07-08'
    }
  }
  let Test = new test()
  // Test.time = function () {
  //   return '设置修改属性不能修改'
  // }
  console.log(Test.time())
} {
  let name = function (target) {
    target.myName = '常成'
  }
  @name
  class getName {}
  console.log(getName.myName)
} {
  let log = (type) => {
    return function (target, name, descriptor) {
      let src_method = descriptor.value;
      console.log('target:', target)
      console.log('name:', name)
      console.log('descriptor:', descriptor)
      descriptor.value = (...arg) => {
        src_method.apply(target, arg)
        console.log(`log{$type}`)
      }
    }
  }
  class AD {
    @log('show')
    show() {
      console.log('ad is show')
    }
    @log('click')
    click() {
      console.info('ad is click')
    }
  }

  let ad = new AD()
  ad.show()
  ad.click()
}
```