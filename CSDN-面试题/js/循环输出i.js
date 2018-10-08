for (var i = 0; i < 5; i++) { //初始
  setTimeout(() => {
    console.log('初始', new Date(), i);
  });
}
console.log('初始', new Date(), i);


for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log('闭包', new Date(), i);
    })
  })(i);
}


var outNum = function (i) {
  setTimeout(() => {
    console.log('函数', new Date(), i);
  })
}
for (var i = 0; i < 5; i++) {
  outNum(i);
}


for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('let', new Date(), i);
  })
}