const cssAndJsContext = require.context('./src', true, /\.(js|scss)$/i);

console.log(cssAndJsContext.keys());
// 结果是：["./base.scss","./components/body/body.js","./components/body/body.scss","./components/footer/footer.js","./components/footer/footer.scss","./components/header/header.js","./components/header/header.scss"]
// cssAndJsContext('./base.scss') 相当于 require("./src/base.scss");
cssAndJsContext.keys().forEach((key) => {
    cssAndJsContext(key);
});

if (NODE_ENV === 'development') {
	const htmlContext = require.context('./src', true, /\.html$/i);
	htmlContext.keys().forEach((key) => {
	    htmlContext(key);
	});
}