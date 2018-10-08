$(function () {
  $(".m-treeview > li > span").click(function () {
    $ul = $(this).siblings("ul");
    if ($ul.is(":visible")) {
      $ul.slideUp(300);
      $(this).parent().attr("class", "m_collapsed");
    } else {
      $ul.slideDown(300);
      $(this).parent().attr("class", "m_expanded");
    }
    return false;
  })
})