<!--
 * @Author: your name
 * @Date: 2020-03-11 10:48:46
 * @LastEditTime: 2020-05-18 16:01:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/class.md
 -->

```javaScript
// 类
// __proto__ 指向所属类的原型
// prototype 所有类都有一个prototype属性
// constructor prototype.constructor 每个类的原型上都有这个属性

// 继承公共属性prototype 继承实例上

class Animal {
    type = '哺乳类'; // 声明到实例上的
    constructor(){
        this.type = '哺乳类'
    }
    get a(){ // Object.defineProperty(Animal.protoype,a)
        return 1; // Animal.prototype.a = 1;
    }
    say(){ // 放到了原型上 // Animal.prototype.say
        console.log(this);
    }
    // 静态属性就是定义到类上的属性 es6中只有静态方法
    static get flag(){ // es6的静态属性
        return  '动物'
    }
}
let animal = new Animal(); // 如果将类中的方法拿出来用必须绑定this 否则默认指向undefind
Animal.flag  // 动物
let say = animal.say.bind(animal)
say();

// 静态方法在es6中也会被子类继承
class Animal{
    static flag = 1;
    constructor(name){
        this.name = name;
        this.type = '哺乳类'
    }
    say(){
        console.log('say')
    }
}
// Tiger.__proto__ = Animal
// call + Object.create() + Object.setPrototypeOf
// 通过Object.defineProperty实现了 原型 + 静态方法属性的定义
class Tiger extends Animal{
    constructor(name){
       super(name); // 调用super Animal.call(tiger,name);
        // super 指代的是父类
        // constructor中的super指代的问题
        console.log(this)
    }
    static getAnimal(){
        console.log(super.flag,'---'); // 这个super指代的是父类
    }
    say(){
        super.say(); // super 指向的是 父类的原型
    }
}
let tiger = new Tiger('老虎');
tiger.say()
// console.log(Tiger.getAnimal());
// static get / set  super  extends

// new 的原理

function A(){
    this.name = 1;
    this.age = 2;
    return {c:1} // 如果一个类返回了一个引用空间 那么实例将这个空间
}
console.log(new A())
A.prototype.say = function(){
    console.log('say')
}
function mockNew(A){
    let obj = {}
    let returnVal = A.call(obj);
    if((typeof returnVal === 'object' && returnVal !== null) || typeof returnVal === 'function'){
        return returnVal;
    }
    obj.__proto__ = A.prototype
    return obj;
}
let o  = mockNew(A) // 1) 创建了一个一个对象,并且将对象传入到到函数中作为this
// o.say();
console.log(o);
```

+ Es5的类和Es6的区别

1. Es5的类函数可以直接调用，Es6的函数调用会报错，必须new

2. Es5的类的方法是可以枚举的，Es6的方法不可枚举

```javaScript
    class Pointer{
        constructor(){

        }
        say(){
            console.log('say')
        }
    }
    console.log(Object.keys(Pointer.prototype))  // []

    function Animal(){
    }
    Animal.prototype.say = function(){
        console.log('say')
    }
    let animal = new Animal()
    console.log(Object.keys(Animal.prototype)) // ['say']
```

3. Es5的类存在变量提升，ES6的类没有

```javaScript

    new Foo()  //Cannot access 'Foo' before initialization
    class Foo{}  

    new Foo()
    function Foo(){}
```
4. Es6类的静态方法，只能被定义的类调用，可以被继承

5. new.target可以返回new的那个构造函数，可以这个属性确定谁来调用，更重要的是子类继承父类，new.target会返回子类

```javaScript
    function Foo(){
        console.log(new.target == Foo)  //true
    }
    let foo = new Foo()


    class Animal{
        constructor(){
            console.log(new.target == Dog)  //true
        }
    }

    class Dog extends Animal{
        
    }
    let dog = new Dog()
```

6. Object.getPropertyOf():用来从子类上获取父类

```javaScript
    Object.getPropertyOf(Dog) === Animal  //true
```

7.父类的constructor中的this属性，子类是没有办法继承的，原型链可以

```javaScript
    class Animal{
        constructor(){
           this.x = 3
        },
        print() {
            console.log(this.x);
        }
    }
    Animal.prototype.c = 1
    class Dog extends Animal{
        constructor(){
            super()
            this.x = 9
            console.log(super.a)  //undefined
            console.log(super.c)  // 1
        },
        m(){
            super.print()
        }
    }

    let dog = new Dog()
    dog.m()   // 9
```

8.super.print()虽然调用的是Animal.prototype.print，但是实际上执行的是super.print.call(this)

9.类的prototype和__proto__

+ 子类的__proto__，指向父类

+ 子类prototype的属性的__proto__属性，表示方法的继承，指向父类的prototype

```javaScript
    class A{}
    class B extends A{}
    B.__proto__  == A    //true
    B.prototype.__proto__ == A.prototype //true
```
10.子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性

```javaScript
    var p1 = new Point(2, 3);
    var p2 = new ColorPoint(2, 3, 'red');

    p2.__proto__.__proto__ === p1.__proto__ // true

    // 修改父类原型的方法
    p2.__proto__.__proto__.printName = function () {
        console.log('Ha');
    };

    p1.printName() // "Ha"
```

11.extends可以继承原生构造函数

```javaScript
    
    class myArray extends Array{ 
        constructor(...args){
            super(...args)
        }
    }
    let arr = new myArray('1')
    console.log(arr)   //['1']
    console.log(arr.length)  // 1
```
