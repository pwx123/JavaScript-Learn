var user = [{
    username: "pwx2",
    age: 30
  },
  {
    username: "pwx3",
    age: 28
  },
  {
    username: "pwx2",
    age: 20
  },
  {
    username: "pwx1",
    age: 20
  },
  {
    username: "pwx0",
    age: 21
  },
  {
    username: "pwx2",
    age: 23
  },
  {
    username: "pwx1",
    age: 23
  },
  {
    username: "pwx4",
    age: 23
  },
  {
    username: "pwx7",
    age: 23
  },
  {
    username: "pwx1",
    age: 21
  }
];
user.sort((a, b) => {
  //双重排序
  if (a.age > b.age) {
    return 1;
  } else if (a.age == b.age && a.username > b.username) {
    return 1;
  } else {
    return -1;
  }
});
console.log(user);
console.log(12e2);
console.log(0x123);
console.log("你好\n世界\t哈哈\rhello\"'");
console.log("undefined:" + Boolean(undefined));
console.log("0:" + Boolean(0));
console.log("{}:" + Boolean({}));
var str = "123sert";
console.log(parseInt(str));
console.log(Number(str));
console.log(Number(null));
console.log(Number(undefined));
var str = "123.23d4e";
console.log(parseFloat(str));
var num = 12;
var numstr = "12";
console.log(num == numstr);
console.log(num === numstr);
console.log(typeof num);
switch (num) {
  case 1:
    console.log(1);
    break;
  case 12:
    console.log(12);
    break;
  default:
    console.log("default");
    break;
}

var add = function () {
  var length = arguments.length;
  var sum = 0;
  for (var i = 0; i < length; i++) {
    sum += arguments[i];
  }
  return sum;
};
console.log(add(1, 2));