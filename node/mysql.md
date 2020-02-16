# mySql

## mySql常用命令
```javaScript
    // 查看所有的数据库 
    show databases;
    // 查看某个数据库
    use databaseName;
    // 查询某个表
    select * from tableName;
    // 查看users表的某几个字段
    select username,nickname from users;
    // 往user表中添加数据(password是关键词)
    insert into users(username,`password`,nickname)values('zhangsan','123','张三');
```

