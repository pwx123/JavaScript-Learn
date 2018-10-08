import {
  firstName,
  lastName,
  year
} from './profile_export.js';
import {
  v1 as add, //别名
  Point
} from './profile_export.js';
import * as circle from './circle.js';
import defaultFunction from './export-default.js' //default不使用大括号

console.log("1+2=" + add(1, 2));
console.log(firstName, lastName, year);
console.log(Point.x = 2); //对象可以更改里面的值

console.log("圆面积:" + circle.area(4));
console.log("圆周长:" + circle.circumference(4));
defaultFunction();

// function add2(x, y) {
//   return x * y;
// }
// export {add2 as default}; === export default add2
//正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
//export default var i =1; 报错
//export default 12; 可以