const webpack = require('webpack');
const webpack_config = require('./webpack.config');
const webpackDevServer = require('webpack-dev-server');

//webpack dev server
const compiler = webpack(webpack_config('development'));
new webpackDevServer(compiler, {
    stats: {
        colors: true,
        chunks: false
    },
    noInfo: false,
    proxy: {
        '*': {
            target: 'http://localhost:3000',
        }
    }
}).listen(8080, function(){console.log('App (dev) is now running on port 8080!');});