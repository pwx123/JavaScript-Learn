function deviceType() {
  var ua = navigator.userAgent;
  console.log(ua);
  var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (var i = 0; i < agent.length; i++) {
    if (ua.indexOf(agent[i]) > 0) {
      console.log(agent[i]);
      break;
    }
  }
  isWeixin();
}
deviceType();
window.addEventListener('resize', function () {
  deviceType();
})


function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    console.log('weixin');
    return true;
  } else {
    return false;
  }
}

$(function () { // 复制内容追加版权信息
  $p = $('.overflowtxt');
  $p.on('copy', function (e) {
    if (!window.getSelection) {
      return;
    }
    var str = window.getSelection().toString();
    str += '\npwx版权所有';
    if ('object' === typeof e.originalEvent.clipboardData) {
      e.originalEvent.clipboardData.setData('text/html', str);
      e.originalEvent.clipboardData.setData('text/plain', str);
      e.preventDefault();
      return;
    }
  })
})