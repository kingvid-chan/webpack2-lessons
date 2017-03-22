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
	require.ensure(['../../public/b.js'], function(require){
		require('../../public/c.js');
		// 注意b.js在这里是不会被执行的，它只是被加载了，如果要调用的话，需要执行`require('../../public/b.js')`
	});
});