# 《学习webpack之前》

在学习webpack之前，先来聊聊webpack产生背景、解决的问题以及后期学习中需要提前说好的规范  

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

webpack vs gulp：  
前期学习webpack的时候，总会看到有人把gulp和webpack拿来进行比较，其实这两者负责的工作不同，实现功能上会有些交集，gulp更是一种工具，用来优化前端工作流，比如说自动刷新页面，压缩css、js，编译sass、less这些，简单的说gulp能把以前重复性地需要手动完成的事情通过配置一系列gulp插件都自动帮你做了。  
webpack是一种模块化的解决方案，在项目开发前期预定义好构建方式，开发阶段结束后可直接打包生成最终的文件。  
gulp和webpack各有其应用场景，如果你的工程模块依赖很简单，不需要把js或各种资源打包，只需要简单额的合并、压缩，在页面中引用就好了，那就不需要用到webpack，用gulp足以。反之，如果工程较为庞大，页面中使用了很多库，这时使用webpack更为恰当。    

webpack2.0：  
webpack在2016年年底升级了版本，升到了webpack2，之前使用的都是webpack1的版本，相较之下也做了比较多的版本改变，为了方便后来者的学习，本课程将只围绕webpack2的用法来进行讲述。  

### config
webpack可以通过CLI指定配置文件,不指定配置文件的情况下，webpack会自动在当前目录寻找文件名为webpack.config.js的配置文件
```
webpack --config mywebpack.config.js
```

### loader

一个最基本的前端项目，要包含的文件类型一般有：html、css、js、图片这些，webpack不只能把js当作一个模块，它的思想是所有的文件都是模块且都可以被引用，比如说刚刚说的这些文件类型。要加载这些静态文件，需要有对应的loader。webpack社区已经有丰富的loaders供咱们选择使用，通过后面学习咱们也可以给自己量身定做一个loader，对于loader的使用在后面课程会讲到。

### 常用命令
在package.json中写入webpack和webpack-dev-server常用命令，如下，包括后期咱们还需要划分生产环境和开发环境来进行打包，这个时候npm命令能帮咱们省下不少输入的麻烦。
```
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack"
}
```
注意，如果你没有全局安装webpack或者webpack-dev-server，需要把引用的本地路径写明
```
"scripts": {
  "start": "node_modules/.bin/webpack-dev-server",
  "build": "node_modules/.bin/webpack"
}
```
 如果要给npm命令里面的webpack命令加参数，需要在参数之前添加`--`，e.g.   
 ```
 npm run build -- --colors
 ```

### 最后

学习本教程的默认前提是你已经有npm使用的经验，学习过程中会涉及到比较多的npm包安装，具体过程不做描述。  
好了，知道了上面的操作之后，咱们就可以正式进入webpack的学习了。