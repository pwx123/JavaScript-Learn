var xmlHttpReq

function myAjax() {
  xmlHttpReq = GetXmlHttpObject();
  if (xmlHttpReq == null) {
    console.log("Browser does not support HTTP Request")
    return
  }
  xmlHttpReq.onreadystatechange = RequestCallBack;
  xmlHttpReq.open("GET", "./1.txt", true);
  xmlHttpReq.send(null);
}

function RequestCallBack() {
  if (xmlHttpReq.readyState == 4 || xmlHttpReq.readyState == "complete") {
    document.getElementById("resText").innerHTML = xmlHttpReq.responseText
  }
}

function GetXmlHttpObject() {
  var xmlHttpReq = null;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttpReq = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return xmlHttpReq;
}

function myLoad() {
  //$("#resText1").load("load.html .load2"); //选择器 只加载class为load2
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1/test.php',
    data: {
      loginuser: 'pwx',
      loginpass: '123456'
    },
    dataType: 'jsonp',
    jsonp: "jsoncallback",
    success: function (data) {
      console.log("用户名：" + data.user + " 密码：" + data.pass);
    },
    error: function () {
      alert('fail');
    }
  });
}

function myJson() {
  var str = "";
  $(".loading").show();
  $.ajax({
    type: 'get',
    url: 'https://api.douban.com/v2/book/1220562',
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function (data) {
      $.each(data.tags, function (index, value) {
        //console.log(index + ":" + value.name);
        str += index + ":" + value.name;
      });
      $(".loading").html("加载完成.")
      $("#resText2").html(str);
    }
  });
}

$(function () {
  var $form1 = $("#form1");
  $("#send").click(function () {
    console.log($form1.serialize()); //序列化元素
    console.log($form1.serializeArray()); //对象化元素
  })
  var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  console.log($.param(obj)); //将对象序列化
})