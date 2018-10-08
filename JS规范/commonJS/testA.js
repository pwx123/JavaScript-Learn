// 相当于这里还有一行： var exports = module.exports;
exports.a = "Hello World"; // 相当于 module.exports.a = "Hello World"
var b = true;
if (b) {
  exports.b = 2 //可以包含在代码片段中
} else {
  exports.b = 3
}