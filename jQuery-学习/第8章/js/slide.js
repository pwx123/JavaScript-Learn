// 最新消息的显示隐藏及图标的变化
$(function () {
    $(".module_up_down").click(function () {
        var $this = $(this);
        var showOrHide = $this.prev().is(':visible')
        if (showOrHide) {
            $this.prev().slideUp(600, function () {
                $("img", $this).attr("src", "images/up.gif")
            })
        } else {
            $this.prev().slideDown(600, function () {
                $("img", $this).attr("src", "images/down.gif")
            })
        }
        showOrHide = !showOrHide;
    })
})