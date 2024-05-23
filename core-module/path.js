const path=require("path");
const mypath="D:/code/git/WEB/BackEnd/Node js/core-module/path.js";
// node js not support \ back slash
// __filename="D:\code\git\WEB\BackEnd\Node js\core-module\path.js";

console.log(path.parse(mypath));
// {
//     root: 'D:/',
//     dir: 'D:/code/git/WEB/BackEnd/Node js/core-module',
//     base: 'path.js',
//     ext: '.js',
//     name: 'path'
//   }
console.log(path.basename(mypath));//path.js
console.log(path.basename(__filename));//path.js
console.log(path.extname(mypath));//.js
console.log(path.normalize(mypath));//D:\code\git\WEB\BackEnd\Node js\core-module\path.js
console.log(path.dirname(mypath));//D:/code/git/WEB/BackEnd/Node js/core-module

