const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    extractVendor = new ExtractTextPlugin('vendor.css'),
    extractStyle = new ExtractTextPlugin('style.css');

module.exports = (NODE_ENV) => {
    let config = {
        entry: NODE_ENV === 'production' ? {
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
            chunkFilename: "chunk.[name].[chunkhash].js"
        },
        context: __dirname,
        module: {
            rules: [{
                test: /\.css/,
                use: NODE_ENV === 'production' ? extractVendor.extract({ fallback: "style-loader", use: "css-loader?minimize=true" }) : ['style-loader', 'css-loader?sourceMap']
            },{
                test: /\.scss$/,
                use: NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] }) : ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
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
        plugins: NODE_ENV === 'production' ? [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }),
            extractVendor,
            extractStyle,
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: true
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: Infinity,
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
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
                'NODE_ENV': JSON.stringify(NODE_ENV)
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

    return config;
};