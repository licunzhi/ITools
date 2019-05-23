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

});

var TS = {};