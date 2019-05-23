/**
 * @author: sakura_rain
 * @date: 2019-05
 * @version 2.0
 * @since: 2.0
 */
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

    /*导航点击事件 展示或者隐藏执行的代码块*/
    $('.jsonFormat li').click(function () {
        /*自己本省不做操作*/
        var nowArea = $(this).attr('area');
        var beforeArea = $('ul li.active').attr('area');
        if (nowArea !== beforeArea) {
            $('ul li').removeClass('active');
            $(this).addClass('active');
            $('div.area').hide();
            $(`#${nowArea}`).show();
        }
    });

    /*复制命令*/
    $('#copyJson').click(function () {
        copyConvertResult();
    });

    /*格式化点击事件*/
    $('#formatJson').click(function () {
        var jsonText = $('#jsonText').val();
        try {
            var  parseObj = JSON.parse(jsonText);
            $('#jsonText').val(JSON.stringify(parseObj, null , 4));
        } catch (e) {
            alert('请检查是否满足json格式');
        }
    });

    /*空格进行替换的点击事件*/
    $('#deleteSpace').click(function () {
        var jsonText = $('#jsonText').val();
        var replaceAll = jsonText.replace(/\s/g,"");
        $('#jsonText').val(replaceAll);
    });

    /*删除空格之后进行转义点击事件*/
    $('#deleteSpaceFormat').click(function () {
        var jsonText = $('#jsonText').val();
        var replaceAll = jsonText.replace(/\s/g, "");
        replaceAll = replaceAll.replace(/(\")/g, "\\$1");
        $('#jsonText').val(replaceAll);
    });

    /*去除转义点击事件*/
    $("#deleteFormat").click(function () {
        var jsonText = $('#jsonText').val();
        var replaceAll = jsonText.replace(/\\/g, "");
        $('#jsonText').val(replaceAll);
    });

    /*去除转移之后格式化*/
    $("#deleteFormatAndFormat").click(function () {
        var jsonText = $('#jsonText').val();
        var replaceAll = jsonText.replace(/\\/g, "");
        try {
            var  parseObj = JSON.parse(replaceAll);
            $('#jsonText').val(JSON.stringify(parseObj, null , 4));
        } catch (e) {
            alert('请检查是否满足json格式');
        }
    });

});


function copyConvertResult(){
    var Url2=document.getElementById("jsonText");
    var val=Url2.value;
    if(val==''){
        alert('没有要复制的内容！');
        return false;
    }
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert("已复制结果");
}

var TS = {};