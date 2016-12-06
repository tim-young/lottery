//Created by 01170626 on 2016/12/5.
jQuery(function ($) {
    $(document).ready(function () {
        $.ajax({
            type: "post",
            url : getContextPath() + "/award/getAllAwards",
            dataType:'json',
            data: {
            },
            success: function(data){
                var awards = data.data;
                var awardHtml = "";
                var iLen = awards.length;
                for(var i = iLen - 1 ; i >=0  ; i--){
                    awardHtml+="<tr><td><span class='label label-success'>"+"选中"+"</span></td><td>"+awards[i].awName+"</td><td>"+awards[i].awDescription+"</td><td>"+
                        awards[i].awUserCount+"</td><td>"+awards[i].awKind+"</td><td><span class='label label-info'>"+"编辑"+"</span></td><td>" +
                        "<span class='label label-danger' onclick='deleteAward("+awards[i].id+")'>"+"删除"+"</span></td></tr>";
                }
                $("#awardTable").html(awardHtml);
            }
        });
    });

    function deleteAward(awardId) {
        $.ajax({
            type: "post",
            url : getContextPath() + "/award/deleteAward?awardId="+awardId,
            dataType:'json',
            data: {
            },
            success: function(data){
                var deleteSuccess = data.data;
            }
        });
    }
});