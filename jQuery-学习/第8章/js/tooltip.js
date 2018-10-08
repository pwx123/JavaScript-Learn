// 自定义的title
$(function () {
    var x = 3;
    var y = 6;
    $("a.tooltip").mouseover(function (e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
        $("body").append(tooltip);
        $("#tooltip").css({
            "display": "block",
            "left": (e.pageX + x) + "px",
            "top": (e.pageY + y) + "px"
        }).show("fast");
    }).mouseout(function () {
        $("#tooltip").remove();
        this.title = this.myTitle;
    }).mousemove(function (e) {
        $("#tooltip").css({
            "display": "block",
            "left": (e.pageX + x) + "px",
            "top": (e.pageY + y) + "px"
        })
    })
})