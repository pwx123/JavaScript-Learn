// 导航列表的显示隐藏
$(function () {
    $("#navigation ul li:has(ul)").hover(function () {
        $(this).children("ul")
            .stop(true, true).slideDown(400);
    }, function () {
        $(this).children("ul")
            .stop(true, true).slideUp('fast');
    });
})