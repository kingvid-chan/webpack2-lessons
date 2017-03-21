let context = require.context('./src', true, /\.(js|scss)$/i);

console.log(context.keys());
// 结果是：["./base.scss","./components/body/body.js","./components/body/body.scss","./components/footer/footer.js","./components/footer/footer.scss","./components/header/header.js","./components/header/header.scss"]
// context('./base.scss') 相当于 require("./src/base.scss");
context.keys().forEach(function(key){
    context(key);
});