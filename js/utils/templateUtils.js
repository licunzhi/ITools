/**
 * @AUTHOR: licunzhi
 * @DATE: 2019-5-13
 * @DESC: 自定义模板渲染工具
 * @METHOD: template 单条数据渲染方法
 * @METHOD: templateIterator 多条数据渲染方法
 * @METHOD: templatePageHtml 页面整块替换
 */
const templateUtils = {

    /**
     * 单条模板渲染工具
     *
     * @param id 原生模板id take an example
     * @param data 数据源
     * @param regex 自定义匹配正则(多数不用)
     * @returns {void | string | *}
     *
     * First： 当前js可选中范围内定义html代码脚本片段
     *  <jsCode>
     *      <script id='idTag' type='text/html'>
     *          <div>{AUTHOR}</div>
     *          <div>{LOCATION}</div>
     *          <div>{INFORMATION}</div>
     *      </script>
     *  </jsCode>
     *
     *  Second: 传入id和执行对象参数将返回包装好的html代码段（不破坏原有的代码段结构）
     *  <jsCode>
     *      const data = {}
     *      const resultHtml = templateUtils.template('idTag', data);
     *  </jsCode>
     *
     *  ALSO: templateIterator
     */
    template(id, data, regex) {
        const template = $(`script[id=${id}]`).html();
        return template.replace(regex || /\\?\{([^{}]+)\}/g, function (match, name) {
            return (data[name] === undefined) ? '' : data[name];

        });
    },

    /**
     * 多条模板渲染工具
     *
     * @param id 原生模板id
     * @param data 数据源
     * @param regex 匹配正则(多数不用)
     * @returns {void | string | *}
     * @notice 多条渲染工具以来单条工具渲染方法
     */
    templateIterator(id, data, regex) {
        let result = '';
        for (let value of data) {
            result = result + this.template(id, value, regex);
        }
        return result;
    },

    /**
     * 视图跳转替换页面指定位置方法
     *
     * @notice 该方式适合页面局部html的替换，避免引用
     * @param matchPattern 匹配选择器，推荐使用id的方式选择
     * @param url 视图解析目标地址
     * @params url 跳转需要的参数
     */
    templatePageHtml(matchPattern, url, params) {
        $.ajax({
            url: url,
            global: false,
            type: "POST",
            dataType: "html",
            data: JSON.stringify(params),
            async: true,
            success: function (html) {
                matchPattern.html(html);
            },
            error: function (msg) {
                console.error('*************templatePageHtml**************');
                console.error(' replace html info error ..', msg);
                console.error('*************templatePageHtml**************');
            }
        })
    },

    /**
     * 路径形式的静态页面加载
     *
     * @param matchPattern 匹配选择器，推荐使用id的方式选择
     * @param srcUrl 视图解析目标地址
     */
    templateLocationHtml(matchPattern, srcUrl) {
        $.get(srcUrl, function (data) {
            matchPattern.html("").html(data);
        })
    }

};