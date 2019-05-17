$(function () {
    /*页面的初始化操作*/
    let itemIndex = localStorage.getItem(LOCATION_INDEX) || 1;
    $(`.left ul li[index=${itemIndex}]`).find('a').addClass('active');
    const path = $(`.left ul li[index=${itemIndex}]`).attr('urlPath');
    templateUtils.templateLocationHtml($('#rightContent'), path);

    // 动态加载js
    var id = 'readyTemplateJs';
    $(`script[id=${id}]`).remove();
    var body= document.getElementsByTagName('BODY')[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    console.log(path.replace(/html/g, 'js'));
    script.src = path.replace(/html/g, 'js');
    script.id = "readyTemplateJs";
    body.appendChild(script);

    $('.left ul li').click(function () {
        localStorage.setItem(LOCATION_INDEX, $(this).attr('index'));
        $('.left ul li a').removeClass('active');
        $(this).find('a').addClass('active');
        var path = $(this).attr('urlPath');
        console.info(path);
        templateUtils.templateLocationHtml($('#rightContent'), path);

        // 对于旧页面一些操作的清除
        extralInitBeforeReloadNewPage();

        // 动态加载的js生效
        window.location.reload();
    });
});


function extralInitBeforeReloadNewPage() {
    /*页面定时器*/
    clearInterval();
    /*清除上一次优化缓存*/
    localStorage.removeItem('TS');
    localStorage.removeItem('SAKURA');
}