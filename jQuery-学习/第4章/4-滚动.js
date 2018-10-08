$(function () {
    var currentPage = 1;
    var onePage = 4;
    var $highlight = $("div.highlight_tip");
    var $content = $("div.v_content");
    var $ul = $content.find("ul");
    var $showlist = $content.find("div.v_content_list");
    var allPage = $content.find("li").length;
    var pageNum = Math.ceil(allPage / onePage); //向上取整
    var width = ($showlist.find("li:eq(0)").width() + 10) * allPage;
    var v_width = $showlist.width();
    $ul.width(width);
    for (var i = 0; i < pageNum; i++) {
        $span = $("<span>" + (i + 1) + "</span>")
        $highlight.append($span);
    }
    $highlight.children().eq(0).addClass("current");

    $("button.next").on("click", function () {
        if (currentPage == pageNum) {
            $ul.stop(true, true).animate({
                left: ("0px")
            })
            currentPage = 1;
        } else {
            $ul.stop(true, true).animate({
                left: ("-=" + v_width + "px")
            })
            currentPage += 1;
        }
        $highlight.children().removeClass();
        $highlight.children().eq(currentPage - 1).addClass("current");
    })
    $("button.prev").on("click", function () {
        if (currentPage == 1) {
            $ul.stop(true, true).animate({ //应该用currentPage来计算更简单
                left: (-(Math.ceil(width / 1000) - 1) * 1000 + "px") //移动到最后的位置
            })
            currentPage = pageNum;
        } else {
            $ul.stop(true, true).animate({
                left: ("+=" + v_width + "px")
            })
            currentPage -= 1;
        }
        $highlight.children().removeClass();
        $highlight.children().eq(currentPage - 1).addClass("current");
    })
})