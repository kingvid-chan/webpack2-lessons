# 《搭建 webpack（2）》

webpack在2016年年底升级了版本，升到了webpack2，之前使用的都是webpack1的版本，相较之下也做了比较多的版本改变，为了方便后来者的学习，本课程将只围绕webpack2的用法来进行讲述。  

下面的说明假设前提是你已经有npm使用的经验，具体安装过程不做具体描述。

### 创建一个项目并初始化
先建立一个webpack-demo项目，npm初始化下，本地安装webpack和webpack-dev-server（建议把webpack依赖保存到  *devdependency* ）
```
mkdir webpack-demo
npm init -y
npm install webpack webpack-dev-server --save-dev
```
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

 好了，知道了上面的操作之后，咱们就可以正式进入webpack的学习了。