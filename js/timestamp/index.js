/**
 * @author: sakura_rain
 * @date: 2019-05
 * @version 1.0
 * @since: 1.0
 */
$(function () {
    /*缓存数据捞取*/
    if (localStorage.getItem("SAKURA")) {
        var sakura = JSON.parse(localStorage.getItem("SAKURA"));
        for (k in sakura) {
            $(`#${k}`).val(sakura[k]);
        }
    }

    /*初始化数据操作*/
    $("#currentMillions").val(new Date().getTime());
    $("#readyConvert").val(new Date().getTime());
    $("#readyConvertDate").val(timeUtils('{Y}-{M}-{D} {hh}:{mm}:{ss}', new Date().getTime()));


    /*定时刷新时间戳数据*/
    var intervalId = setInterval(function () {
        $("#currentMillions").val(new Date().getTime());
    }, 1000);

    $(".timestamp button.button").click(function () {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            $(this).removeClass('stop').addClass('start');
        } else {
            intervalId = setInterval(function () {
                $("#currentMillions").val(new Date().getTime());
            }, 1000);
            $(this).removeClass('start').addClass('stop');
        }
    });

    /*时间戳转换成时间*/
    $('#convertAction').click(function () {
        var result = timeUtils($('#timeType option:selected').val(), $('#readyConvert').val());
        $('#convertResult').val(result);
    });

    /*时间转换成时间戳*/
    $('#convertActionDate').click(function () {
        var dateType = $('#dateType option:selected').val();
        var time = new Date($("#readyConvertDate").val());
        if (dateType === 's') {
            $('#convertResultDate').val(time.getTime()/1000);
        } else if (dateType === 'ms') {
            $('#convertResultDate').val(time.getTime());
        }
    });

    /*使用缓存做更好的体验
    *
    * 后续需要找到其他的代码方式
    * 加载页面的时候缓存上次的数据
    * */
    $('div.timestamp').click(function () {
        $('input[id]').each(function (index, value) {
            TS[$(value).attr('id')] = $(value).val();
        });
        localStorage.setItem('SAKURA', JSON.stringify(TS));
    })
});

/**
 * 时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
function timeUtils(format, timestamp) {
    var timer = ("" + timestamp).length === 10 ? timestamp + '000' : timestamp;
    var time = new Date(parseInt(timer));
    var Y = time.getFullYear();
    var M = time.getMonth() + 1;
    var D = time.getDate();
    var data = {
        Y: Y,
        M: M < 10 ? '0' + M : M,
        D:  D < 10 ? '0' +  D :  D,
        hh: time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
        mm: time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
        ss: time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds(),
    };
    return format.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
        return (data[name] === undefined) ? '' : data[name];

    });
}

var TS = {};