// 这里不再需要再import或require jquery，在webpack.config.js中新增了externals属性，让jquery可以在webpack整个运行环境中被调用
let element = $("#body-input"),
	str = element.html(),
	progress = 0,
	timer = setInterval(function() {
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