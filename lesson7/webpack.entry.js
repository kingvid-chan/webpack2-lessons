import "bootCss";
import "fontAwesome";
import "bootJs";

const cssAndJsContext = require.context('./src', true, /[^\/][^abc]\.(js|scss)$/i);
cssAndJsContext.keys().forEach((key) => {
    cssAndJsContext(key);
});

if (NODE_ENV === 'development') {
	const htmlContext = require.context('./src', true, /\.html$/i);
	htmlContext.keys().forEach((key) => {
	    htmlContext(key);
	});
}