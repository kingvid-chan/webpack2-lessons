// 这里不再需要再import或require jquery，在webpack.config.js中新增了externals属性，让jquery可以在webpack整个运行环境中被调用
var element = $("#body-input"),
	str = element.html(),
	progress = 0,
	timer = setInterval(() => {
	    let current = str.substr(progress, 1);
	    if (current == '<') {
	        progress = str.indexOf('>', progress) + 1;
	    } else {
	        progress++;
	    }
	    element.html(str.substring(0, progress) + (progress && 1 ? '_' : ''));
	    if (progress >= str.length) {
	        clearInterval(timer);
	        element.html(str.substring(0, progress));
	    }
	}, 150);

require('../../public/a.js'); // 这里会立即执行，会被打包到bundle.js文件中
$("#body-btn").click(() => {
	// require.ensure(dependencies: String[], callback: function(require), chunkName: String)
	// dependencies：在执行之前加载完模块依赖
	// callback：模块依赖加载完全之后执行该回调函数，require函数传入该回调函数中，供函数内部调用
	// chunkName：webpack打包该模块时的生成的文件命名，当有多个require.ensure()使用相同的chunkname时，webpack会把它们统一打包到一个文件中，如果chunkName为空，传回模块id
	require.ensure(['../../public/b.js'], function(require){
		require('../../public/c.js');
		// 注意b.js在这里是不会被执行的，它只是被加载了，如果要调用的话，需要执行`require('../../public/b.js')`
	}, 'bc');
});