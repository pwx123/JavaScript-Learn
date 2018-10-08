$(function () { //on
  $("#panel h5.head").on("click", function () {
    var $content = $(this).next("div.content");
    if ($content.is(":visible")) {
      $content.hide();
    } else {
      $content.show();
    }
  })
})

$(function () { //hover
  $("#panel h5.head").hover(
    function () {
      $(this).nextAll().eq(1).show();
    },
    function () {
      $(this).nextAll().eq(1).hide();
    })
})

$(function () { //toggle显示隐藏
  $("#panel h5.head").nextAll("div:eq(2)").toggle(true);
})

$(function () { //冒泡事件
  $("#content").on("click", function (event) {
    var text = $("#msg").html() + "<p>外层div被点击</p>";
    $("#msg").html(text);
    event.stopPropagation(); //停止冒泡事件
  })
  $("#content span").on("click", function (event) {
    var text = $("#msg").html() + "<p>内层span被点击</p>";
    $("#msg").html(text);
    return false; //同样可以停止冒泡事件
    //event.stopPropagation();
  })
  $("body").on("click", function () {
    var text = $("#msg").html() + "<p>body被点击</p>";
    //$("#msg").html(text);
  })
})

$(function () {
  $('#go').click(function (event) {
    console.log(event.target.href);
    console.log(event.type);
    console.log(event.pageX, event.pageY);
    console.log(event.which); //鼠标点击的类型（左键or右键...）
    event.preventDefault(); //阻止默认事件 （跳转）
    // return false;
  })
  $('#go').on('contextmenu', function () { //阻止浏览器右键菜单
    $(this).append($("<div>hello</div>"));
    return false;
  })
  $('#button').one('click', function () { //one 指出发一次
    $('#go').off('contextmenu');
    console.log("one click");
  })
  //$('#button').trigger("click"); //模拟点击
  // $('#button').click(); //模拟点击

  $('#eventButton').on('myClick', function (event, msg1, msg2) {
    console.log(event.type, msg1, msg2);
  })
  $('#eventButton').trigger("myClick", ["message1", "message2"]);

  $('#inputText').on('focus', function () {
    console.log("input focus");
  })
  $('#inputText').triggerHandler('focus'); //只触发方法 不执行事件
})