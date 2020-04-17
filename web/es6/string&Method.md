<!--
 * @Author: your name
 * @Date: 2020-03-11 10:55:19
 * @LastEditTime: 2020-03-11 11:10:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/es6/stringMethod.md
 -->
```javaScript
  {
    console.log('a','\u0061')  //a ,a
    // 因为表示法仅限于码点在\u0000~\uFFFF当中，超出只能通过双字节来表示 \uD842\uDFB7
    console.log('s',`\u20BB7`) // s ₻7
    console.log('s',`\u{20BB7}`)  // s 𠮷
}

{
    // js中字符已UTF-16格式存储，每个字符固定两个字节，对于那些
    // 需要四个字符存储的字符，js会认为是两个字符
    let s = '𠮷' ;
    console.log('length',s.length)  // length 2
    console.log('0',s.charAt(0))    // 0 �
    console.log('1',s.charAt(1))    // 1 �
    console.log('at0',s.charCodeAt(0))  // at0 55362
    console.log('at1',s.charCodeAt(1))  // at1 57271

    let s1 = '𠮷a';
    console.log('length',s1.length);  //3 
    console.log('code0',s1.codePointAt(0)) //code0 134071
    console.log('code0',s1.codePointAt(0).toString(16)) //code0 20bb7
    console.log('code1',s1.codePointAt(1)) //code1 57271
    console.log('code2',s1.codePointAt(2)) //code2 97
}

{
    // 使用该方法从码点返回对应的字符串
    console.log(String.fromCharCode('0x20bb7'))  //ஷ
    // 相比上一个方法可以识别大于0xFFFF的码点
    console.log(String.fromCodePoint("0x20bb7")); //𠮷
}
{
    let str = '\u{20bb7}abc'
    for (let index = 0; index < str.length; index++) {
        console.log(str[index]);  //��abc
        
    }
    for(let code of str){
        console.log(code)  //𠮷abc
    }
}
{
    let str = 'string';
    console.log(str.includes('str')) // true
    console.log(str.startsWith('str')) // true
    console.log(str.endsWith('ing')) // true
}

{
    // 字符串重复
    let str = 'abc'
    console.log(str.repeat(2))  //abcabc
}

{
    // 字符串模板
    let name = '常成'
    let love = 'free'
    console.log(`myName is ${name},i Love ${love}`)
}
{
    // 字符串模板的补丁，可以前后添加
    console.log('1'.padStart(6,'start'))
    console.log('2'.padEnd(4,'end'))
}
{
    // 防止xss攻击
    let user = {
        name:'list',
        info:'hello world'
    }
    console.log(abc`i am ${user.name},${user.info}`);
    function abc(s,v1,v2){
        console.log(s,v1,v2)
        return s+v1+v2
    }
}

{
    // 字符串的每一个模板都被转义
    console.log(String.raw`Hi\n${1+2}`);
    console.log(`Hi\n${1+2}`);
}
```