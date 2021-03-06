jQuery(function ($) {
    $(document).ready(function () {
        // time();

        getSignedUser();

        var ws = new WebSocket(signWallChannelAddress);
        ws.onopen = function(){
        };
        ws.onmessage = function(message){
            var user = JSON.parse(message.data);
            // var user = {
            //     wxHeadimgurl:"http://wx.qlogo.cn/mmopen/78VYmCTbSZl6qfAsVe9SAkgJBeSlo1BHXdzicvNCKZcemKialG5f99SibPzj3lzHJA0ByDIxgW40Y4ZUR8Plbe9vJrwfWcugJZ2/0",
            //     sfName:"haha"
            // };
            var signUserHtml = "<li class='animated rollIn' style='width: 10%;height:25%'><div style='text-align: center;'><img src='"+ user.wxHeadimgurl +"' style='border-radius: 50%;max-width: 90%;height: 100px;width: 100px;' alt='User Image'><a href='#' style='font-size: 20px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + user.sfName + "</a><a href='#' style='font-size: 20px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + user.sfNum + "</a></div></li>";
            $("#users").prepend(signUserHtml);
        };
        function postToServer(){
            ws.send(document.getElementById("msg").value);
            document.getElementById("msg").value = "";
        }
        function closeConnect(){
            ws.close();
        }

    });

    function getSignedUser(){
        $.ajax({
            type: "post",
            url : getContextPath() + "/user/getSignedUser",
            dataType:'json',
            data: {
            },
            success: function(data){
                var signedusers = data.data;
                var userHtml = "";
                var iLen = signedusers.length;
                for(var i = iLen - 1 ; i >=0  ; i--){
                    userHtml += "<li style='width: 10%;height:25%'><div style='text-align: center;'><img style='border-radius: 50%;max-width: 90%;height: 100px;width: 100px;' src='"+ signedusers[i].wxHeadimgurl +"'alt='User Image'><a href='#' style='text-align: center;font-size: 20px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + signedusers[i].sfName + "</a><a href='#' style='font-size: 20px;font-family: 微软雅黑, Microsoft YaHei;color: #fff;' class='users-list-name'>" + signedusers[i].sfNum + "</a></div></li>";
                    // if((iLen - i)%10 == 0){
                    //     userHtml += "</tr><tr>";
                    // }
                }
                // userHtml += "</tr>";
                $("#users").html(userHtml);
            }
        });
    }

    function time()
    {
        getSignedUser();
        setTimeout(time,1000);
    }

});