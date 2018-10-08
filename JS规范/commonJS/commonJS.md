> 特点

* 1.模块可以多次加载，但是只会在第一次加载时运行一次，然后执行结果就被缓存了，以后再加载，就直接读取缓存结果。想让模块再次运行，必须清楚缓存。
* 2.模块加载会阻塞接下来代码的执行，必须等到模块加载完成才能继续执行。--同步加载
> 环境

* 服务器环境
> 应用

* nodejs的模块规范是参照commonJS实现的。
> 语法
* 1.导入：`require('路径')`
* 2.导出：`module.exports` 和 `exports`
> 注意
* `module.exports` 和 `exports` 的区别是 `exports` 只是对 `module.exports` 的一个引用，相当于Node为每个模块提供一个 `exports` 变量，指向 `module.exports` 。这等同于在每个模块头部，有一行 `var exports = module.exports;`这样的命令
> demo
* `>node main.js`