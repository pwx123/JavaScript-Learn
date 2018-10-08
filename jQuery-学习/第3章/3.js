var $ul = $('ul');
var $li_1 = $('ul li:eq(1)');
var li1_txt = $li_1.text(); //获取元素文本内容
console.log(li1_txt);

var $li = $('li');
var li_txt = $('ul li:eq(2)').attr('title'); //获取属性内容
console.log(li_txt);

var $li_2 = $('<li>樱桃(添加)</li>'); //添加
$ul.append($li_2);

var $li_3 = $('<li>橘子(添加到)</li>'); //添加到
$li_3.appendTo($ul);

var $li_4 = $('<li>橙子(前置添加)</li>'); //前置添加
$ul.prepend($li_4); //prependTo()

var $p = $('<p>after添加的(同级)</p>'); //向后添加同级元素
$ul.after($p); //insertAfter() before() insertBefore()

//$('ul li:eq(0)').remove(); //删除节点
//$('ul li').remove('li[title=西瓜]');

//$('ul li:eq(0)').empty(); //清空节点里所有的子元素

var $li_5 = $('<li>replaceWith</li>');
$('ul li:eq(0)').replaceWith($li_5); //替换节点

$title = $('ul li[title=西瓜]');
console.log($title.attr('title'));

$title.attr('ref', 'ref西瓜'); //给属性赋值
$title.attr({
  'title': '西瓜',
  'ref': 'refs西瓜'
}) //给多个属性赋值
console.log($title.attr('ref'));

$title.removeAttr('ref'); //删除属性

$("li.banana").click(function () { //toggleClass 同 toggle 来回切换
  $(this).toggleClass('long');
  if ($(this).hasClass('long')) {
    console.log('has long!');
  }
})

var $banana = $("li.banana")
var li_html = $banana.html();
console.log(li_html);
var li_text = $banana.text();
console.log(li_text);
$banana.text('大香蕉');

$("#Email").focus(function () { // focus获取焦点
  var text_value = $(this).val();
  if (text_value == "请输入邮箱地址") {
    $(this).val("");
    console.log(this.defaultValue);
  }
})
$("#Email").blur(function () { // blur失去焦点
  var text_value = $(this).val();
  if (text_value == "") {
    $(this).val("请输入邮箱地址");
  }
})

$("#multiple").val(['选择1', '选择2']); //selected 设置val
console.log($($("#multiple").children()[3]).attr("selected"));

var $li = $("ul li[title='香蕉']");
console.log($li.next().html());
console.log($li.prev().html());
console.log($li.siblings());

$(document).on('click', function (e) { //取得最近的匹配元素
  $(e.target).closest("li").css("color", "red");
})

console.log($(".banana").css("height")); //返回字符串
console.log($(".banana").height()); //返回数字

var offset = $(".relative").offset(); //视窗的偏移量
console.log(offset.left);
console.log(offset.top);

var position = $(".relative").position();
console.log(position.left);
console.log(position.top);

var num = 0;
$("div.relative").click(function () {
  num += 20;
  $(this).children().scrollLeft(80);
})

$(function () {
  var x = 5;
  var y = 10;
  $("a.tooltip")
    .mouseover(function (e) { //鼠标移入
      this.myTitle = this.title;
      this.title = ""; //去除默认title提示
      var $tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
      $("body").append($tooltip);
      $("#tooltip").css({
        "position": "absolute",
        "left": (e.pageX + x) + "px",
        "top": (e.pageY + y) + "px"
      }).show("fast");
    })
    .mouseout(function () { //鼠标移出
      $("#tooltip").remove();
      this.title = this.myTitle;
    })
    .mousemove(function (e) { //跟随鼠标移动
      $("#tooltip").css({
        "left": (e.pageX + x) + "px",
        "top": (e.pageY + y) + "px"
      })
    });
})
$(function () {
  var x = 35;
  var y = 35;
  $("div.pictip")
    .mousemove(function (e) {
      var offset = $("div.pictip a img").offset();
      var left = offset.left - $(window).scrollLeft();
      var top = offset.top - $(window).scrollTop();
      var maxLeft = left + $("div.pictip a img").width();
      var maxTop = top + $("div.pictip a img").height();
      if (e.clientX >= left && e.clientX <= maxLeft && e.clientY >= top && e.clientY <= maxTop) {
        $("#bigger").css({
          display: "block",
          left: (e.pageX - x) + "px",
          top: (e.pageY - y) + "px"
        })
        $(".piclay").css({
          display: "block",
          left: maxLeft + "px",
          top: -300 + $("div.pictip a img").height() + "px",
          backgroundPosition: -(e.clientX - left - 35) * 3 + "px " + -(e.clientY - top - 35) * 3 + "px"
        })
      } else {
        $("#bigger").css("display", "none");
        $(".piclay").css("display", "none")
      }
    })
})