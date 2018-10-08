$(function () {
    var page = 1;
    var i = 4;
    var len = $(".prolist_content ul li").length;
    var page_count = Math.ceil(len / i);
    var none_unit_width = $(".prolist").width();
    var $parent = $(".prolist_content");
    $(".goRight").click(function () {
        if (!$parent.is(":animated")) {
            if (page == page_count) {
                $parent.animate({
                    left: 0
                }, 800);
                page = 1;
            }
            else {
                $parent.animate({
                    left: "-=" + none_unit_width
                }, 800);
                page++;
            }
        }
    });
    $(".goLeft").click(function () {
        if (!$parent.is(":animated")) {
            if (page == 1) {
                $parent.animate({
                    left: -none_unit_width * (page_count - 1)
                }, 800);
                page = page_count;
            }
            else {
                $parent.animate({
                    left: "+=" + none_unit_width
                }, 800);
                page--;
            }
        }
    })
})