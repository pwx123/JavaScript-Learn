// jQuery([selector,[context]])
let $content1 = $(".content1");
console.log($("p:even", $content1)); //限定查找的范围
// jQuery(html,[ownerDocument])
$("<input>", { //以对象的形式添加属性
    type: "text",
    val: "Test",
    focusin: function () {
        console.log('focusin');
    },
    focusout: function () {
        console.log('focusout');
    }
}).appendTo("body");
// jQuery(callback)
//$(document).ready() $(function(){})
// each(callback)
$content1.children().each(function (index, item) {
    console.log(index);
    console.log($(item).html());
    if (index == 1) {
        return false; //退出
    }
})

console.log($content1.children().get()[1]); //get多个转成数组

console.log($content1.children().index($(".con2"))); //.con2 在$content中的索引
console.log($(".con2").index()); //.con在父元素中的索引
$('.con2').data('test', {
    name: 'pwx',
    value: 18
});
console.log($('.con2').data('test'));

$("#show").click(function (e) {
    console.log(e);
    var n = $("#div1").queue("fx");
    $("span").text("Queue length is: " + n.length);
});

function runIt() {
    $("#div1").show("slow");
    $("#div1").animate({
        left: '+=200'
    }, 2000);
    $("#div1").slideToggle(1000);
    $("#div1").slideToggle("fast");
    $("#div1").animate({
        left: '-=200'
    }, 1500);
    $("#div1").hide("slow");
    $("#div1").show(1200);
    $("#div1").slideUp("normal", runIt);
}
runIt();

var $pfilter = $("p").filter(function (index) {
    return $("span", this).length > 0;
});
console.log('Filter');
console.log($pfilter);
console.log($("p").map(function () {
    return $(this).text();
}).get().join(','));
//addBack() content3加入栈中
$('.con2').nextAll().addBack().addClass('active');
