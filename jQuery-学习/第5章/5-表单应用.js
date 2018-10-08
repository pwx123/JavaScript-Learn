$(function () { //focus的操作
    $("#regForm :input") // input, textarea, select, button 
        .focus(function () {
            $(this).addClass("focus");
        })
        .blur(function () {
            $(this).removeClass("focus");
        })
})

$(function () {
    var $msg = $("#msg");

    $("#bigger").click(function () { //增大宽度
        var height = $msg.height();
        if (!$msg.is(":animated")) {
            if (height < 500) {
                $msg.animate({
                    height: "+=50"
                })
            }
        }
    })

    $("#smaller").click(function () { //减小宽度
        var height = $msg.height();
        if (!$msg.is(":animated")) {
            if (height > 100) {
                $msg.animate({
                    height: "-=50"
                })
            }
        }
    })

    $("#scrollTop").click(function () { //向上滑动
        if (!$msg.is(":animated")) {
            $msg.animate({
                scrollTop: "-=50"
            })
        }
    })

    $("#scrollDown").click(function () { //向下滑动
        if (!$msg.is(":animated")) {
            $msg.animate({
                scrollTop: "+=50"
            })
        }
    })
})

$(function () {
    var $checkbox = $('[name=items]:checkbox');
    console.log($checkbox);
    $checkbox.click(function () {
        var flag = true;
        $checkbox.each(function () {
            if (!$(this).is(":checked")) {
                flag = false;
            }
        })
        $("#checkedAll1").prop("checked", flag);
    })

    $("#checkedAll1").click(function () {
        $checkbox.prop("checked", $(this).prop("checked"));
    })

    $("#checkedAll").click(function () {
        $checkbox.prop("checked", true); //1.6后更新 true而不是checked
    })

    $("#checkedNo").click(function () {
        $checkbox.prop("checked", false);
    })

    $("#checkRev").click(function () {
        $checkbox.each(function () {
            this.checked = !this.checked;
        })
    })

    $("#send").click(function () {
        var str = "你选择的是: "
        $checkbox.each(function () {
            if ($(this).is(":checked")) {
                str += $(this).val() + " ";
            }
        })
        alert(str);
    })
})

$(function () {
    $("#select1 option").dblclick(function () {
        $(this).appendTo("#select2");
    })
    $("#add").click(function () {
        var $options = $("#select1 option:selected");
        $options.appendTo("#select2"); //具有破环性 将元素从原来的删除
    })

    $("#add_all").click(function () {
        var $options = $("#select1 option");
        $options.appendTo("#select2");
    })
})

$(function () {
    $("#pwdFrom :input.required").each(function () {
        var $required = $("<strong style='color:red'> *</strong>");
        $(this).after($required);
    })

    $("#pwdFrom :input").blur(function () {
        $parent = $(this).parent();

        if ($(this).is("#username1")) { //姓名大于6个字符
            if (this.value == "") {
                return -1;
            }
            if (this.value.trim().length < 6) {
                var errorMsg = '请输入至少6位的用户名!';
                $parent.find("span.msg").html(errorMsg);
                return -1;
            } else {
                var msg = "正确";
                $parent.find("span.msg").html(msg);
                return 0;
            }
        }

        if ($(this).is("#email")) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (this.value == "") {
                return -1;
            }
            if (!reg.test(this.value.trim())) {
                var errorMsg = '邮箱格式不正确!';
                $parent.find("span.msg").html(errorMsg);
                return -1;
            } else {
                var msg = "正确";
                $parent.find("span.msg").html(msg);
                return 0;
            }
        }
    })

    $("#submit").click(function () {
        if ($("#username1").triggerHandler('blur') == -1 || $("#email").triggerHandler('blur') == -1) {
            alert("信息填写错误,请更正后提交!");
        } else {
            alert($("#username1").val() + "\n" + $("#email").val());
        }
        return false
    })
})