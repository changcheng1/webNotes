<!--
 * @Author: your name
 * @Date: 2020-03-11 10:51:58
 * @LastEditTime: 2020-03-11 10:52:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/iterator.md
 -->
```javaScript 
  {
  let obj = 'helloworld'
  let map = obj[Symbol.iterator]();
  console.log('array:' + map.next())
  console.log('array:' + map.next())
  console.log('array:' + map.next())
} {
  var it = Iterator(['4', '5'])
  console.log(it.next())
  console.log(it.next())

  function Iterator(array) {
    var nextIndex = 0
    return {
      next: function () {
        console.log(array)
        return nextIndex < array.length ? {
          value: array[nextIndex++],
          done: false
        } : {
          value: undefined,
          done: true
        }
      }
    }
  }
}
```