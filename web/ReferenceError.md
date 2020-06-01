<!--
 * @Author: your name
 * @Date: 2020-05-07 10:51:09
 * @LastEditTime: 2020-05-07 10:51:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webNotes/web/ReferenceError.md
 -->

### ReferenceError 和 TypeError 区别

ReferenceError 和 TypeError 区别在于，ReferenceError 是和作用域查找相关，TypeError 是查找作用域成功，但是对变量的操作非法或者错误所生成。

假如查找不到变量。LHS 在非严格模式下找不到变量会自动生成全局变量，但是在严格模式会和 RHS 一样 ReferenceError 的错误。

假如能查找到变量，对其进行非法或者不正确的操作都会报 TypeError 的错误。
