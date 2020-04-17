<!--
 * @Author: your name
 * @Date: 2020-03-11 10:54:57
 * @LastEditTime: 2020-03-11 10:55:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/set&map.md
 -->
```javaScript
  import { log } from "util";

{
    // new Set():声明set数据结构
    let list = new Set();
    list.add(5)
    list.add(7)
    console.log('size',list.size) // size 2
}
{
    // set中放入数组
    let arr = [1,2,3,4,5]
    let list = new Set(arr)
    console.log('szie',list.size) // size 5
}
{
    // set中数据的唯一性
    let list = new Set()
    list.add(1)
    list.add(2)
    list.add(1)
    console.log('list',list)  //{1, 2}
    let arr = [1,2,3,4,'2'];
    let list2 = new Set(arr)
    console.log('unique',list2); // {1, 2, 3, 4, "2"}
}
{
    //list.has():判断set结构中是否包含
    let arr = ['add','delete','clear','has'];
    let list = new Set(arr)
    console.log('has',list.has('add'));  // has true
    console.log('delete',list.delete('add'),list); // delete  true {"delete", "clear", "has"}
    list.clear(); // 清空set数据结构
    console.log('list',list);  // list {}
}
{
    // set数据遍历的方法
    let arr = ['add','delete','clear','has'];
    let list = new Set(arr)
    for(let key of list.keys()){
        console.log('keys','key') // keys key
    }
    for(let value of list.values()){
        console.log('value',value) // value add value delete value clear value has
    }
    for(let [key,value] of list.entries()){
        console.log('entries',key,value); // entries add add entries delete delete entries clear claer entries has has
        
    }
    list.forEach(function(item){console.log(item); // add delete clear has
    })
}
{
    // 声明weakSeet数据结构
    // weakSet的成员只能是对象
    // weakSet不能被遍历
    // weakSet的对象是弱引用，如果其他对象都不再引用该对象
    // 那垃圾回收机制会自动回收该对象所占的内存
    let weakList = new WeakSet();
    let arg = {}
    weakList.add(arg)
    console.log(weakList);
}
{
   // map.get():获取map数据结构的值
   let map = new Map()
   let arr = ['123']
   map.set(arr,456) 
   console.log('map',map,map.get(arr))
}
{
    // 声明map的key和value的
    let map = new Map([['a',123],['b',456]])
    console.log('map args',map);
    console.log('size',map.size);
    console.log('delete',map.delete('a'),map);
    console.log('clear',map.clear(),map);
}
{
    // 声明weakMap的数据结构
    let weakmap = new WeakMap()
    let o = {}
    weakmap.set(o,123)
    console.log(weakmap.get(o));
}
{
    let map = new Map()
    // map.set()
    map.set('t','1')
    console.info('map.set()',map)
    // map的获取
    console.log('map.get()',map.get('t'));
    // 遍历map的数据结构
    for(let [key,value] of map.entries()){
        console.log('map.entries()',value)
    }
    // map.has()
    console.log('map.has()',map.has('t'))
    // 获取map的长度
    console.log('map.size',map.size);
    // map.delete()
    map.delete('t')
    // map.clear()
    map.clear()
}
// 优先使用map这种数据结构，考虑数据的唯一性，考虑set
{
    //map,set,Object对比
    let item = {t:1}
    let map = new Map()
    let set = new Set()
    let obj = {}

    // 增
    map.set('t',1)
    set.add(item)
    obj['t'] = 1;
    console.log('map-set-obj',map,set,obj);
    // 查
    console.log('map_exist',map.has('t'));
    console.log('set_exist',set.has(item));
    console.log('map_exist','t' in obj);
    // 改
    map.set('t',2)
    item.t = 2
    obj['t'] = 2
    console.log('map-set-obj-modify',map,set,obj);
    // 删
    map.delete('t')
    set.delete(item)
    delete obj['t']
    console.log('map-set-obj-delete',map,set,obj);
    
}
```