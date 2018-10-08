$(function () {
    $li = $(".tab_menu ul li");
    $div = $(".tab_box > div")
    $li.click(function () {
        var index = $li.index(this);
        $(this).addClass("selected")
            .siblings().removeClass("selected");
        $div.eq(index).show()
            .siblings().hide();
    }).hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    })
})