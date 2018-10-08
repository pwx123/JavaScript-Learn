/**
 * 实现一个PromiseA+
 * @description 实现一个简要的promise
 * @param {Function} executor 执行器
 */
function Promise(executor) {
  let self = this;
  self.status = 'pending'; //存储promise状态 pending fulfilled rejected
  self.value = undefined; //存储成功后的值
  self.reason = undefined; //存储失败后的原因
  self.onfulfilledCallbacks = []; // 异步时候收集成功回调
  self.onrejectedCallbacks = []; //异步时候收集失败回调
  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'; //resolve的时候改变promise的状态
      self.value = value; //修改成功的值
      // 异步执行后 调用revolve 再把存储的then中的成功回调函数执行一遍
      self.onfulfilledCallbacks.forEach(element => {
        element();
      })
    }
  };

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'; //reject的时候改变promise的状态
      self.reason = reason; //修改失败的值
      // 异步执行后 调用reject 再把存储的then中的失败回调函数执行一遍
      self.onrejectedCallbacks.forEach(element => {
        element();
      })
    }
  }

  // 如果执行器抛出异常 那么就把promise的状态用这个异常reject掉
  try {
    //执行 执行器
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
Promise.prototype.then = function (onfulfilled, onrejected) {
  // onfulfilled then方法中的成功回调
  // onrejected then方法中的失败回调
  let self = this;
  // 如果onfulfilled不是函数 那么就用默认的函数替代 以便达到值穿透
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
  // 如果onrejected不是函数 那么就用默认的函数替代 以便达到值穿透
  onrejected = typeof onrejected === 'function' ? onrejected : err => {
    throw err
  }
  let promise2 = new Promise((resolve, reject) => {
    console.log(self.status);
    if (self.status === 'fulfilled') {
      // 加入setTimeout 模拟异步
      // 如果调用then的时候promise 的状态已经变成了fulfilled 那么就调用成功回调 并且传递参数为 成功的value
      setTimeout(function () {
        // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
        try {
          // x 是执行成功回调的结果
          let x = onfulfilled(self.value);
          // 调用resolvePromise函数 根据x的值 来决定promise2的状态
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }
      }, 0)

    }

    if (self.status === 'rejected') {
      // 加入setTimeout 模拟异步
      // 如果调用then的时候promise 的状态已经变成了rejected 那么就调用失败回调 并且传递参数为 失败的reason
      setTimeout(function () {
        // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
        try {
          // x 是执行失败回调的结果
          let x = onrejected(self.reason);
          // 调用resolvePromise函数 根据x的值 来决定promise2的状态
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }

      }, 0)
    }

    if (self.status === 'pending') {
      //如果调用then的时候promise的状态还是pending，说明promsie执行器内部的resolve或者reject是异步执行的，
      //那么就需要先把then方法中的成功回调和失败回调存储起来，等待promise的状态改成fulfilled或者rejected时候再按顺序执行相关回调
      self.onfulfilledCallbacks.push(() => {
        //setTimeout模拟异步
        setTimeout(function () {
          // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
          try {
            // x 是执行成功回调的结果
            let x = onfulfilled(self.value)
            // 调用resolvePromise函数 根据x的值 来决定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
      self.onrejectedCallbacks.push(() => {
        //setTimeout模拟异步
        setTimeout(function () {
          // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
          try {
            // x 是执行失败回调的结果
            let x = onrejected(self.reason)
            // 调用resolvePromise函数 根据x的值 来决定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
    }
  })
  return promise2;
}
/**
 * 用来处理then方法返回结果包装成promise 方便链式调用
 * @param {*} promise2 then方法执行产生的promise 方便链式调用
 * @param {*} x then方法执行完成功回调或者失败回调后的result
 * @param {*} resolve 返回的promise的resolve方法 用来更改promise最后的状态
 * @param {*} reject 返回的promise的reject方法 用来更改promise最后的状态
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 首先判断x和promise2是否是同一引用 如果是 那么就用一个类型错误作为Promise2的失败原因reject
  if (promise2 === x) return reject(new TypeError('typeError:大佬，你循环引用了!'));
  // called 用来记录promise2的状态改变，一旦发生改变了 就不允许 再改成其他状态
  let called;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 如果x是一个对象或者函数 那么他就有可能是promise 需要注意 null typeof也是 object 所以需要排除掉
    //先获得x中的then 如果这一步发生异常了，那么就直接把异常原因reject掉
    try {
      let then = x.then; //防止别人瞎写报错
      if (typeof then === 'function') {
        //如果then是个函数 那么就调用then 并且把成功回调和失败回调传进去，如果x是一个promise 并且最终状态时成功，那么就会执行成功的回调，如果失败就会执行失败的回调如果失败了，就把失败的原因reject出去，做为promise2的失败原因，如果成功了那么成功的value时y，这个y有可能仍然是promise，所以需要递归调用resolvePromise这个方法 直达返回值不是一个promise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, error => {
          if (called) return
          called = true;
          reject(error)
        })
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return
      called = true;
      reject(error);
    }
  } else {
    // 如果是一个普通值 那么就直接把x作为promise2的成功value resolve掉
    resolve(x)
  }
}
// Promise的一些方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let i = 0;

    function getResult(index, value) {
      arr[index] = value;
      if (++i == promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        getResult(i, data)
      }, reject)
    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

function asyncload() {
  return new Promise((resolve, reject) => {
    // setTimeout(function () {
    //   console.log('settimeout');
    //   resolve('over');
    // }, 1000);
    resolve('over');
  })
}
asyncload()
  .then((val) => {
    console.log(val);
  }, (err) => {
    console.log(err);
  })