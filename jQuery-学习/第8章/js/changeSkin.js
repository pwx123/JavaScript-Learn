// 换肤
$(function () {
    var $li = $("#skin li");
    var cookieSkin = Cookies.get('MyCssSkin');
    if (cookieSkin) {
        switchSkin(cookieSkin);
    }
    $li.click(function () {
        switchSkin(this.id);
    });
});
function switchSkin(skinName) {
    $("#" + skinName).addClass('selected')
        .siblings().removeClass('selected');
    $("#cssfile").attr("href", "./css/skin/" + skinName + ".css");
    Cookies.set("MyCssSkin", skinName, {
        path: '/',
        expires: 10
    })
}