#!/usr/bin/env node --harmony

const fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpack_config = require('./webpack.config'),
    Mock = require('mockjs'),
    Random = Mock.Random,
    express = require('express'),
    app = express();

// 用子进程开启webpack-dev-server，可按需对子进程关闭和重启
/* 可运行以下语句关闭该子进程
 * devServer.stdin.pause();
 * devServer.kill();
 */
// 如果要重启子进程，运行`devServer = startServer();`
var devServer = startServer();
function startServer() {
    let spawn = require('child_process').spawn,
        devServer = spawn('node', ['webpackDevServer.js']);

    devServer.stdin.setEncoding('utf-8');
    devServer.stdout.pipe(process.stdout);
    devServer.stdin.end();
    devServer.on("error", function(err) {
        console.log("Server error:", err);
    });
    devServer.on("close", function(code) {
        console.log('webpack-dev-server has shutted down!', code);
    });
    return devServer;
}

// 生成随机数据，测试时非常方便
app.get('/mockData', function(req, res, next) {
    let template = {
        "string|1-10": "★",
        "number|123.10": 1.123,
        'regexp': /[a-z][A-Z][0-9]/,
        'date': Random.date('yyyy-MM-dd'),
        'image': Random.image(),
        'paragraph': Random.cparagraph()
    };
    let generateData = Mock.mock(template);
    res.send(generateData);
    next();
});

// webpack打包
app.get('/build', function(req, res, next) {
    webpack(webpack_config('production'), function(err, stats) {
        gutil.log('[webpack:build]', stats.toString({
            chunks: false,
            colors: true
        }));
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        res.send({ success: true });
        next();
    });
});
// 监听3000端口
app.listen(3000, function() { console.log('Proxy Server is running on port 3000!'); });
