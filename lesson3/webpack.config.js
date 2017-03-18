var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
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
            use: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }) : ['style-loader', 'css-loader?sourceMap']
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)  // 直接传字符串的话webpack会把它当作代码片段来编译，这里用JSON.stringify()做字符串化处理
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false
    },
    devtool: 'source-map'
};
