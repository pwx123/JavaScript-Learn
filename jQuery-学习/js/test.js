$(function () {
    var g_table = $(".data");

    function delHandler() {
        var meButton = $(this);
        meButton.parent().parent().remove();
    }

    function editHandler() {
        var meButton = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");
        for (var i = 0; i < 5; i++) {
            var editTd = $("<td><input class='txtField' type='text'/></td>");
            var v = meRow.find('td:eq(' + i + ')').html();
            editTd.find('input').val(v);
            editRow.append(editTd);
        }
        var opt_td = $('<td></td>');
        var savaBtn = $("<a href='javascript:;' class='optLink'>保存&nbsp;</a>");
        savaBtn.click(function () {
            var currentRow = $(this).parent().parent();
            var input_data = currentRow.find("input");
            var post_data = {};
            for (var i = 0; i < input_data.length; i++) {
                post_data['col' + i] = input_data[i].value;
            }
            var newRow = create_row(post_data);
            currentRow.replaceWith(newRow);
        })
        var cancelBtn = $("<a href='javascript:;' class='optLink'>取消&nbsp;</a>");
        cancelBtn.click(function () {
            var currentRow = $(this).parent().parent();
            meRow.find("a:eq(0)").click(delHandler);
            meRow.find("a:eq(1)").click(editHandler);
            currentRow.replaceWith(meRow);
        })
        opt_td.append(cancelBtn);
        opt_td.append(savaBtn);
        editRow.append(opt_td);
        meRow.replaceWith(editRow);
    }

    function create_row(data_item) {
        var row_obj = $("<tr></tr>");
        for (var k in data_item) {
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var obj_td = $('<td></td>');
        var delButton = $('<a class="optLink" href="javascript:;">删除&nbsp;</a>');
        delButton.click(delHandler);
        obj_td.append(delButton);
        var editButton = $('<a class="optLink" href="javascript:;">编辑&nbsp;</a>');
        editButton.click(editHandler);
        obj_td.append(editButton);
        row_obj.append(obj_td);
        return row_obj;
    }

    $("#addBtn").click(function () {
        var addRow = $("<tr></tr>");
        for (var i = 0; i < 5; i++) {
            var addTd = $("<td><input type='text' class='txtField'/></td>");
            addRow.append(addTd);
        }
        var cancelBtn = $("<a href='javascript:;' class='optLink'>取消</a>");
        var saveBtn = $("<a href='javascript:;' class='optLink'>保存</a>");
        cancelBtn.click(delHandler);
        saveBtn.click(function () {
            var currentRow = $(this).parent().parent();
            var input_data = currentRow.find("input");
            var post_data = {};
            for (var i = 0; i < 5; i++) {
                post_data['col' + i] = input_data[i].value;
            }
            var newRow = create_row(post_data);
            currentRow.replaceWith(newRow);
        });
        var col_opt = $("<td></td>");
        col_opt.append(cancelBtn);
        col_opt.append(saveBtn);
        addRow.append(col_opt);
        g_table.append(addRow);
    });
});