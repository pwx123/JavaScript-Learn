console.log('golb1')
setImmediate(function () {
  console.log('immediate1')
  process.nextTick(function () {
    console.log('immediate1_nextTick')
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise')
    resolve()
  }).then(function () {
    console.log('immediate1_then')
  })
})
setTimeout(function () {
  console.log('timeout1')
  process.nextTick(function () {
    console.log('timeout1_nextTick')
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise')
    resolve()
  }).then(function () {
    console.log('timeout1_then')
  })
  setTimeout(function () {
    console.log('timeout1_timeout1')
    setImmediate(function () {
      console.log('timeout1_setImmediate1')
    })
    process.nextTick(function () {
      console.log('timeout1_timeout1_nextTick')
    })
  })
})
setTimeout(function () {
  console.log('timeout2')
  process.nextTick(function () {
    console.log('timeout2_nextTick')
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise')
    resolve()
  }).then(function () {
    console.log('timeout2_then')
  })
  setTimeout(function () {
    console.log('timeout2_timeout2')
    setImmediate(function () {
      console.log('timeout2_setImmediate1')
    })
    process.nextTick(function () {
      console.log('timeout2_timeout2_nextTick')
    })
  })
})
new Promise(function (resolve) {
  console.log('glob2_promise')
  resolve()
}).then(function () {
  console.log('glob2_then')
})
new Promise(function (resolve) {
  console.log('glob1_promise')
  resolve()
}).then(function () {
  console.log('glob1_then')
})

process.nextTick(function () {
  console.log('glob1_nextTick')
})