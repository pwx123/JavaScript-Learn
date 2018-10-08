$(function () {
    var len = $(".num li").length;
    var index = 0;
    var adTimer;
    // 数字滑块切换
    $(".num li").mouseover(function () {
        index = $(".num li").index(this);
        showImg(index);
    }).eq(0).mouseover();
    //hover停止滚动
    $(".ad").hover(function () {
        clearInterval(adTimer);
    }, function () {
        adTimer = setInterval(function () {
            showImg(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 3000)
    }).trigger('mouseleave'); //启动轮播
})
// 切换图片
function showImg(index) {
    var adHeight = $(".content_right .ad").height();
    $(".slider").stop(true, false).animate({
        top: -adHeight * index
    }, 1000);
    $(".num li").removeClass("on")
        .eq(index).addClass("on");
}