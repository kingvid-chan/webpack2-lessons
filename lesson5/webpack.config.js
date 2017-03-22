const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    extractVendor = new ExtractTextPlugin('vendor.css'), // 抽取bootstrap和font-awesome公共样式
    extractStyle = new ExtractTextPlugin('style.css'); // 抽取自定义样式

module.exports = {
    entry: process.env.NODE_ENV === 'production' ? {
        vendor: ['jquery', 'bootJs'],
        app: './webpack.entry'
    } : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './webpack.entry.js'
    ],
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, './build'),
        publicPath: '',
        chunkFilename: "chunk.[name].[chunkhash].js" // 对于按需加载的模块，都不会写在entry入口文件中，chunkFilename是给这些按需加载模块的命名规则
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.css/,
            use: process.env.NODE_ENV === 'production' ? extractVendor.extract({ fallback: "style-loader", use: "css-loader?minimize=true" }) : ['style-loader', 'css-loader?sourceMap']
        },{
            test: /\.scss$/,
            use: process.env.NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] }) : ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        }, {
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=10000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: 'html-loader?interpolate=require'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: [
                'file-loader?name=fonts/[name].[ext]'
            ]
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        extractVendor,
        extractStyle,
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        // CommonsChunkPlugin可以让我们在几个模块之间抽取出公共部分内容，并且把他们添加到公共的打包模块中
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor", // 模块名
            filename: "vendor.js",  // 文件名
            minChunks: Infinity, // 该模块至少被其他模块调用多少次时，才会被打包到公共模块中，这个数字必须大于等于2，当传入Infinity时会马上生成
        }),

        // ProvidePlugin可以全局引入某个模块，在其他模块不需要再手动引入且可以直接调用，也能解决其他第三方库(像bootstrap)对jquery的依赖
        new webpack.ProvidePlugin({
            $: 'jquery', // $ 是jquery的模块输出对象，下面的jQuery也是一样的，在其他模块中可以直接被调用
            jQuery: 'jquery'
        })
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.scss', '.html'],
        alias: {
            'jquery': 'jquery/dist/jquery.min.js',
            'bootCss': 'bootstrap/dist/css/bootstrap.css',
            'bootJs': 'bootstrap/dist/js/bootstrap.js',
            'fontAwesome': 'font-awesome/css/font-awesome.css'
        }
    }
};
