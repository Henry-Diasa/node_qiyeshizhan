#require特性
- module被加载的时候执行，加载后缓存
- 一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出

#process
- process.argv
> 输出node执行的参数  node 1.js --test a = 1
- process.env
> 可以配置一些全局的变量
- process.cwd
> 当前执行的文件的目录
- process.nextTick > setTimeout/setInterval > setImmediate (执行顺序)

#path

- join/resolve  拼接路径/返回当前路径的绝对路径
- __dirname、__filename 总是返回文件的绝对路径
- process.cwd()总是返回执行node命令所在文件夹

#buffer

#.gitignore

- pre-commit包 在提交之前先执行某些命令。

- supervisor  全局安装包  可以监视node启动
- handlebars  模板引擎

