# 《webpack2 包教不包会》

### 写在前面
前期学习webpack的时候，总会看到有人把gulp和webpack拿来进行比较，其实这两者负责的工作不同，实现功能上会有些交集，gulp更是一种工具，用来优化前端工作流，比如说自动刷新页面，压缩css、js，编译sass、less这些，简单的说gulp能把以前重复性地需要手动完成的事情通过配置一系列gulp插件都自动帮你做了。  
webpack是一种模块化的解决方案，在项目开发前期预定义好构建方式，开发阶段结束后可直接打包生成最终的文件。  
gulp和webpack各有其应用场景，如果你的工程模块依赖很简单，不需要把js或各种资源打包，只需要简单额的合并、压缩，在页面中引用就好了，那就不需要用到webpack，用gulp足以。反之，如果工程较为庞大，页面中使用了很多库，这时使用webpack更为恰当。

webpack产生的背景：  
1、多js文件下全局对象冲突  
2、模块加载顺序  
3、解决模块或库的依赖  
4、大工程模块过多，难以管理  

webpack的作用：  
1、将所有的依赖拆分成块且按需加载  
2、首屏加载耗时少  
3、所有的静态文件都是一个模块（css和图片等静态文件）  
4、第三方库也可以作为一个模块被加载  
5、自定义程度高，你可以按需自定义打包的整个流程  
6、适用于大project的开发场景  


## 课程列表

* Lesson 0: [《搭建 webpack（2）》](https://github.com/kingvid-chan/webpack-lessons/tree/master/lesson0)
* Lesson 1: [《一个最简单的webpack应用》](https://github.com/kingvid-chan/webpack-lessons/tree/master/lesson1)
* Lesson 2: [《使用webpack-dev-server实现热更新》](https://github.com/kingvid-chan/webpack-lessons/tree/master/lesson2)
* Lesson 3: [《兼容开发和生产环境的配置文件》](https://github.com/kingvid-chan/webpack-lessons/tree/master/lesson3)

## 计划

* 《学习简单的webpack配置，了解各配置选项的意义》
* 《学习使用webpack-dev-server热更新》
* 《学习配置较为复杂的工程构建》
* 《学习怎么用Node API调用webpack》
* 《学习如何写loader》
* 《学习如何写plugin》

## 本课程特点

* 一步一个脚印，由浅至深，引导读者跟随课程的节凑一起深入思考
* 每一课的课程挑战如果有能力完成，则可考虑放弃阅读课程内容
* 内容讲解详细

## License

MIT