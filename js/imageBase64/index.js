var TS = {};
$(function () {

    /*缓存数据捞取*/
    if (localStorage.getItem("SAKURA")) {
        var sakura = JSON.parse(localStorage.getItem("SAKURA"));
        for (k in sakura) {
            $(`#${k}`).text(sakura[k]);
        }
    }

    /*刷新缓存中数据*/
    $('[id]').blur(function () {
        $('textarea[id]').each(function (index, value) {
            TS[$(value).attr('id')] = $(value).val();
        });
        localStorage.setItem('SAKURA', JSON.stringify(TS));
    });

    /*图片转成base64*/
    $('#imageConvertBase64').click(function () {
        var fileObj = $('#imageBase64')[0];
        /*上传文件的类型判断*/
        if(!/image\/\w+/.test(fileObj.files[0].type)){
            alert("请确保文件为图像类型");
            return false;
        }
        r = new FileReader();

        r = new FileReader();  //本地预览
        r.onload = function () {
            $('#base64Result')[0].value = r.result;
            $('#imageSize')[0].innerHTML = "图片大小：" + Math.round(r.result.length / 1024 * 1000) / 1000 + " KB";
        };
        r.readAsDataURL(fileObj.files[0]);    //Base64
    });

    /*复制命令*/
    $('#base64ResultCopy').click(function () {
        copyConvertResult();
    });

    /*清空操作*/
    $('#base64ResultEmpty').click(function () {
        $('#base64Result')[0].value = '';
    });

    /*code值到图片展示*/
    $('#base64BackImage').click(function () {
            $('#backImageShow')[0].src = '';
            $('#backImageShow')[0].src = $('#base64Result')[0].value;
    });

});

function copyConvertResult(){
    var Url2=document.getElementById("base64Result");
    var val=Url2.value;
    if(val==''){
        alert('没有要复制的内容！');
        return false;
    }
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert("已复制结果");
}



