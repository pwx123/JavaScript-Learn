$(function () {
  $("#table1 tbody>tr:odd").addClass("odd");
  $("#table1 tbody>tr.even").addClass("even")
})

$(function () {
  $("#table1 tr").click(function () {
    $(this)
      .addClass("selected")
      .siblings().removeClass("selected")
      .end() //因为执行了siblings 对象改变了 需要有end 回到原来的this对象
      .find(':radio').prop('checked', true)
  })
})

$(function () {
  $("tr.parent").click(function () {
    $(this)
      .toggleClass("selected")
      .siblings(".child_" + this.id).toggle();
  })
})

$(function () {
  $(".mag_caption span").click(function () {
    var fontSize = $("#para").css("font-size");
    var fontSizeNum = parseFloat(fontSize, 10); //解析一个字符串，并返回一个浮点数。
    var fontSizeUnit = fontSize.slice(-2); //切片 倒数第二个元素
    if ($(this).hasClass("bigger")) {
      fontSizeNum += 2;
    }
    if ($(this).hasClass("smaller")) {
      fontSizeNum -= 2;
    }
    $("#para").css("font-size", fontSizeNum + fontSizeUnit)
    console.log(fontSizeUnit);
  })
})

$(function () {
  $(".tab li").hover(function () {
    $(this)
      .addClass("selected")
      .siblings().removeClass("selected");
    var index = $(".tab li").index(this);
    $(".tab_box>div").eq(index).show()
      .siblings().hide();
  })
})