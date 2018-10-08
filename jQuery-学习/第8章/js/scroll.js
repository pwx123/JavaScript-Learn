// 消息的自动滚动
$(function () {
    var $this = $(".scrollNews");
    var scrollTimer;
    $this.hover(function () {
        clearInterval(scrollTimer); //hover停止滚动
    }, function () { //mouseleave开始滚动
        scrollTimer = setInterval(function () {
            scrollNews($this);
        }, 3000)
    }).trigger('mouseleave'); //触发mouseleave从而自动开始执行
});
function scrollNews(obj) {
    var $self = obj.find("ul:first");
    var lineHeight = $self.find("li:first").height();
    $self.animate({
        "marginTop": -lineHeight + "px" //向上移动一个li的高度
    }, 600, function () {
        $self.css({ marginTop: 0 }).find("li:first").appendTo($self); //将第一个添加到最后 恢复原来的margin-top 破坏性
    })
}