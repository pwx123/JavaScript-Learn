$(function () { //jQuery 动画
    $("#panel button.button1").click(function () {
        //$(this).next().toggle(100,'linear');//循环切换
        $content1 = $(this).nextAll("div:eq(0)"); //改变透明和大小显示隐藏
        if ($content1.is(":visible")) {
            $content1.hide(1000);
        } else {
            $content1.show(1000);
        }
    })

    $("#panel button.button2").click(function () { //只改变透明的显示隐藏
        $content2 = $(this).nextAll("div:eq(1)");
        if ($content2.is(":visible")) {
            $content2.fadeOut(1000); //消失
        } else {
            $content2.fadeIn(1000); //出现
        }
    })
    $('#panel button.button3').click(function () { //只改变大小的显示隐藏
        $content3 = $(this).nextAll("div:eq(2)");
        if ($content3.is(":visible")) {
            $content3.slideUp(1000); //消失
        } else {
            $content3.slideDown(1000); //出现
        }
    })
})

//animate(params,[speed],[easing],[fn])
$(function () { //自定义动画
    $("button.button4").click(function () {
        $(this).next()
            .animate({ //同时进行
                left: "+=10px", //累加动画
                height: "+=10px"
            }, 1000, "linear")
            .animate({ //分成两步进行
                top: "+=10px"
            }, 500, function () {
                $(this).css("backgroundColor", "#234"); //如果直接用css() 放在第二个animate里也会先执行 需要放在回调函数中
            });
    })
})

$(function () { //stop停止当前动画
    $("#hover").hover(
        function () {
            $(this).stop(true) //清空队列 不完成当前动画 不然只停止当前动画 还会执行下一个队列
                .animate({
                    width: "100px"
                }, 1000)
                .animate({
                    height: "100px"
                }, 1000)
        },
        function () {
            $(this).stop(true,true) //清空队列 立刻完成当前动画
                .animate({
                    width: "20px"
                }, 1000)
                .animate({
                    height: "20px"
                }, 1000)
        })
})