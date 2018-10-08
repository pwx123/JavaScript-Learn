$(function () {
    timestamp = 0;
    updateMsg();
    $("#charform").submit(function () {
        $.ajax({
            type: 'get',
            url: 'http://192.168.8.104/JqueryChatRoom.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                msg: $('#msg').val(),
                name: $('#author').val(),
                action: "postmsg",
                time: timestamp
            },
            success: function (data) {
                console.log(data);
                addMsg(data);
            }
        });
        return false;
    });
});
function updateMsg() {
    $('#loading').show();
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1/JqueryChatRoom.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
            time: timestamp
        },
        success: function (data) {
            addMsg(data);
            $('#loading').hide();
        }
    });
    setTimeout('updateMsg()', 5000);
}
function addMsg(data) {
    var name = data.name;
    var msg = data.msg;
    var htmlcode = "<strong>" + name + "</strong>:" + msg + "<br/>"
    $("#messagewindow").prepend(htmlcode);
    // $.each(data, function (index, value) {
    //     var name = value.name;
    //     var msg = value.msg;
    //     console.log(value)
    //     var htmlcode = "<strong>" + name + "</strong>:" + msg + "<br/>"
    //     $("#messagewindow").prepend(htmlcode);
    // })
}
