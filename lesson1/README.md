# 《一个最简单的webpack应用》

## 目标
建立一个lesson1项目，在项目中创建html、css、js、图片等静态文件，编写webpack配置文件，最后生成如下页面：  
![](https://raw.githubusercontent.com/kingvid-chan/webpack-lessons/master/lesson1/rose.jpg)  
1、输入命令`npm run build`能正确打包出静态文件，本地打开index.html时页面样式正常且无报错；  
2、输入命令`npm start`用浏览器打开`http://localhost:8080/index.html`，能正确显示页面样式且无报错，修改html、css、js代码时页面能自动刷新。

## 挑战
在原项目的基础上新建test.html、test.css、test.js及test.png文件，要求test.html中需要引入另外三个资源，访问`http://localhost:8080/test.html`时，能正确显示页面样式且无报错。

## 知识点
1、包管理器 npm 。使用 npm 安装包，并自动安装所需依赖。
2、webpack配置文件。学习config部分常用参数含义及作用。
3、webpack loader。使用loader来处理各种静态资源文件。
4、webpack plugin。使用webpack插件来协助处理和生成资源。
5、webpack-dev-server及热更新。学习开发模式，并学会使用页面热更新功能。
#### 处理html

```
npm install html-loader --save-dev
```
#### 处理css
css-loader能够处理css文件、并把css传给style-loader，style-loader在html中创建< style >标签引入css
同时支持解析css预处理语言，像sass、less
```
npm install style-loader css-loader --save-dev
```