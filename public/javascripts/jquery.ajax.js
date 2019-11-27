$(document).ready(function () {
    var data = {};
    // data.title = "title";
    // data.message = "message";
    var nowUser = $('.btxNowUser');
    var nowUserx = $('.btxNowUserx');
    var blockImages = $('.blockx-images');
    var blockImagesx = $('.blockx-imagesx');
    var delBlock = $('.delBlock');
    var userlv_pos = $('.userlv-pos');
    // var userPosNow = $('.userposnow');
    var ManageUser = $('div#system-admin');
    var ManageUserId = $('div#system-admin').attr('id');

    var x = {};
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/backendx/api/user/nowUser',
        success: function (data) {
            console.log('success');
            // console.log(JSON.stringify(data));

            // var cloneData = Object.assign({}, data);


        }
    })
    .done(function (data) {
        x = Object.assign({}, data);
        $(blockImages).html('<img src="data:image/png;base64,' + data.image.data + '">');
        $(blockImagesx).html('<img src="data:image/png;base64,' + data.image.data + '">');
        $(nowUser).html(data.firstname + ' ' + data.userlevel.userlevel);
        $(nowUserx).html('<div>' + data.firstname + ' ' + data.userlevel.userlevel + '</div><div class="blockx-status">\n<span class="status-online"></span><span class="statusx">' + data.status + '</span></div>');



        console.log(x)
        if(x.userlevel.userlevel != ManageUserId){
            $(ManageUser).hide();
        }
        if (delBlock.length > 0) {
            $.each(delBlock, (key, val) => {
                if(val.id == 'Online'){
                    val.hidden = true
                }
                if (val.id == x.userlevel.userlevel || val.id == x.userposition.position) {
                    val.hidden = true;
                    console.log($(val));
                    return false;
                }
            })
            $.each(userlv_pos, (key, val) => {
                if (val.text == x.userlevel.userlevel || val.text == x.userposition.position) {
                    console.log(val);
                    $(val).removeAttr('href');
                    return false;
                }
            })
        
        }
    });

})

