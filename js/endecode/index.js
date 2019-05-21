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

    /*导航点击事件 展示或者隐藏执行的代码块*/
    $('#encodeMenu a').click(function () {
        /*自己本省不做操作*/
        var nowArea = $(this).attr('area');
        var beforeArea = $('p a.active').attr('area');
        if (nowArea !== beforeArea) {
            $('p a').removeClass('active');
            $(this).addClass('active');
            $('div.area').hide();
            $(`#${nowArea}`).show();
        }
    });

    $('select#md5Type').click(function () {
        if ($(this).val().length > 10) {
            $('#md5Key').show();
        } else {
            $('#md5Key').hide();

        }
    });

    /*加密的点击事件*/
    $('#md5Convert').click(function () {
        var md5Type = $('#md5Type option:selected').val();
        var convertResult = $('#md5Ready').val();
        switch (md5Type) {
            case 'hex_md5' :
                convertResult = hex_md5(convertResult);
                break;
            case 'b64_md5' :
                convertResult = b64_md5(convertResult);
                break;
            case 'str_md5' :
                convertResult = str_md5(convertResult);
                break;
            case 'hex_hmac_md5' :
                convertResult = hex_hmac_md5($('#md5Key').val(), convertResult);
                break;
            case 'b64_hmac_md5' :
                convertResult = b64_hmac_md5($('#md5Key').val(),　convertResult);
                break;
            case 'str_hmac_md5' :
                convertResult = str_hmac_md5($('#md5Key').val(),　convertResult);
                break;
            default:
                break;
        }
        $('#md5Result').val(convertResult);
    });


    /*使用缓存做更好的体验
    *
    * 后续需要找到其他的代码方式
    * 加载页面的时候缓存上次的数据
    * */
    $('[id]').change(function () {
        $('textarea[id]').each(function (index, value) {
            TS[$(value).attr('id')] = $(value).val();
        });
        localStorage.setItem('SAKURA', JSON.stringify(TS));
    });


    /*Base64位加密代码位置-----start*/
    $('#base64Convert').click(function () {
        var base64Type = $('#base64Type option:selected').val();
        var convertResult = $('#base64Ready').val();
        switch (base64Type) {
            case 'encode' :
                convertResult = Base64.encode(convertResult);
                break;
            case 'encodeURI' :
                convertResult = Base64.encodeURI(convertResult);
                break;
            case 'decode' :
                convertResult = Base64.decode(convertResult);
                break;
            default:
                break;
        }
        $('#base64Result').val(convertResult);
    });
});

var TS = {};