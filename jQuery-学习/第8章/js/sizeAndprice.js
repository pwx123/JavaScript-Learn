$(function () {
    $(".pro_size ul li span").click(function () {
        $(this).parents("ul").siblings("strong").text($(this).text());
    });
    var $span = $(".pro_price span");
    var price = $("#nowPrice").text();
    $("#num_sort").change(function () {
        var num = $(this).val();
        var amount = num * price;
        $span.text(amount);
    }).change();
})