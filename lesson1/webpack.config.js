//webpack配置文件符合commonJs模块规范
var path = require('path'), //这里引入path是为了解析相对路径，配置文件某些路径要求是绝对路径
    HtmlWebpackPlugin = require('html-webpack-plugin'), //简化生成适合webpack打包的html
    ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽取css字符串并生成css文件

module.exports = {
    // 入口文件，webpack据此对项目进行打包
    // 类型： String字符串 | Array数组 | Object对象
    // lesson1很简单，只使用一个入口
    entry: './webpack.entry.js', // webpack的入口文件，后面会创建

    // 定义webpack打包时的输出文件名及路径
    output: {
        // 定义webpack打包之后的文件名
        filename: 'webpack.bundle.js',

        // 定义打包文件的存储路径：当前目录的build文件夹
        path: path.resolve(__dirname, './build'),

        // 声明资源（js、css、图片等）的引用路径
        // webpack打包时会把html页面上的相对路径根据publicPath解析成绝对路径
        // eg：当publicPath为'https://jd.com/'时，如果有html或者css含有一张图片相对路径为'./img/test.jpg',打包之后html（或css）中图片的路径就会变成'https://jd.com/img/test.jpg'
        publicPath: ''
    },

    // 用于解析entry选项的基础目录(必须是绝对路径)，该目录必须包含入口文件
    // 默认: process.cwd()
    context: __dirname,

    // 定义项目里各种类型模块的处理方式
    module: {
        rules: [{
            test: /\.css$/, // 处理.css文件
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(jpg|png)$/, // 处理.png和.jpg格式的图片文件
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]' // limit参数指图片大小的最大值，当小于这个值时图片转为base64，name参数指图片文件的命名格式，前面可以加 img/ 表示图片存储路径
            ]
        }, {
            test: /\.html$/, // 处理.html文件
            use: [
                'html-loader'
            ]
        }]
    },

    // webpack插件
    plugins: [
        // 生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),

        // 生成css文件
        new ExtractTextPlugin("style.css") 
    ]
};