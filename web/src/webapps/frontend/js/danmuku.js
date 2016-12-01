jQuery(function ($) {
    $(document).ready(function () {
        var ws = new WebSocket("ws://127.0.0.1/signUpChannel");
        ws.onopen = function(){
        };
        var fontFamily = ['STHeiti Light', 'STHeiti', 'STKaiti','STSong','STFangsong','LiHei Pro Medium','LiSong Pro Light','BiauKai','Apple LiGothic Medium','Apple LiSung Light','LiSu','YouYuan','STXinwei','Microsoft YaHei'];
        var animation = ['bounceInRight','rotateInUpRight','slideInRight'];
        ws.onmessage = function(message){
            var num = Math.random() * 10000;
            num = parseInt(num, 10);
            var myDate = new Date();
            var danmukuWall = $(".box-body");
            danmukuWall.append($("<div class='direct-chat-msg animated "+animation[num%animation.length]+"'>" +
                "<div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'>862911</span><span class='direct-chat-timestamp pull-right'>"+myDate.Format("hh:mm:ss")+"</span></div>" +
                "<img class='direct-chat-img' src='lib/AdminLTE/dist/img/user1-128x128.jpg' alt='message user image'>" +
                " <div style='position: relative;margin: 5px 0 0 50px;padding: 5px 10px 5px 10px;font-size: medium;font-family: "+fontFamily[num%fontFamily.length]+";font-weight: "+(num%10+1)*100+"'>"+message.data+"</div>"
                +"</div>"));
            document.getElementsByTagName('BODY')[0].scrollTop
                =document.getElementsByTagName('BODY')[0].scrollHeight;
        };
        function postToServer(){
            ws.send(document.getElementById("msg").value);
            document.getElementById("msg").value = "";
        }
        function closeConnect(){
            ws.close();
        }
    });
});