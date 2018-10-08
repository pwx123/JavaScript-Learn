// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log('闭包', new Date(), i);
//     }, i * 1000); //i秒后输出
//   })(i);
// }

// setTimeout(() => {
//   console.log('闭包', new Date(), i);
// }, i * 1000);

// const outNum = function (i) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('Promise', new Date(), i);
//       resolve();
//     }, 1000 * i)
//   });
// }
// var outNumTask = [];
// for (var i = 0; i < 5; i++) { //将Promise放入数组中 异步 i秒后resolve
//   outNumTask.push(outNum(i));
// }

// Promise.all(outNumTask).then(() => {
//   setTimeout(() => {
//     console.log('Promise', new Date(), i);
//   }, 1000);
// })

(async () => { //一个立刻执行函数
  for (var i = 0; i < 5; i++) {
    await new Promise((resolve => { //await Promise 1秒后resolve
      setTimeout(resolve, 1000);
    }));
    console.log('async', new Date(), i); //输出 0,1,2,3,4
  }
})();