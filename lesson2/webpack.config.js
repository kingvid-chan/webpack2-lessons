var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');  //这里引入webpack是为了使用webpack的热更新功能以及其他自带插件，见 module.exports.plugins

module.exports = {
    entry: [
        // 给webpack-dev-server启动一个本地服务，并连接到8080端口
        'webpack-dev-server/client?http://localhost:8080',

        // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
        'webpack/hot/only-dev-server',

        // webpack的入口文件，注意这个声明必须写在上面两个后面，webpack-dev-server才有效
        './webpack.entry.js'
    ],
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: ''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.css$/, 
            use: [
                'style-loader',
                'css-loader?sourceMap' // 这里需要配置sourceMap参数
            ]
        }, {
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: [
                'html-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // 开启webpack全局热更新
        new webpack.HotModuleReplacementPlugin(),

        // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
        new webpack.NamedModulesPlugin(),
    ],

    // 定义webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'src'), // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
        hot: true, // 模块热更新。依赖于HotModuleReplacementPlugin
        noInfo: false, // 在命令行窗口显示打包信息
    },

    // 开启devtool：开发阶段特别有用，比如说用sass开发，在浏览器查看样式时可以方便知道该样式是映射到sass具体的第几行
    devtool: 'source-map'
};