// export var firstName = 'pwx';
// export var lastName = 'zz';
// export var year = 1998; //一种export方式
var firstName = 'pwx';
var lastName = 'zz';
var year = 1998;

function v1(x, y) {
  return x + y;
};

function v2(x, y) {
  return x + y;
}
export { //统一最后export
  firstName,
  lastName,
  year,
  v1, //export函数
  v2 as OutV2 //别名
};
export function multiply(x, y) { //export函数
  return x * y;
}
//变量export遵循的规则
export var m = 1;
var n = 1;
export { //必须加大括号
  n,
  n as n2
};
//函数和class export遵循的规则
export function v3() {}

function v4() {}
export {
  v4
}
export class Point {
  constructor() {
    this.x = 1;
    this.y = 2;
  }
}
export var foo = 'bar'; //export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
setTimeout(() => foo = 'pwx', 300); //上面代码输出变量foo，值为bar，500 毫秒之后变成baz。