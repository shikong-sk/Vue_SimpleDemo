/**
 * 百度地图 工具类
 *
 * Vue-Cli 版本 &lt; 3 配置 项目根路径下的 ./build/webpack.base.conf.js
 *   externals: {
        "BMap": "BMap",
    }
 *
 * Vue-Cli 版本 >= 3 需配置 项目根路径下的 vue.config.js
 *     configureWebpack:{
        externals:{
            'BMap':'BMap',
        }
    }
 */
const BMapUtils = {
    /**
     * 状态码：检索成功
     */
    BMAP_STATUS_SUCCESS: 0,

    /**
     * 状态码：城市列表
     */
    BMAP_STATUS_CITY_LIST: 1,

    /**
     * 状态码：位置结果未知
     */
    BMAP_STATUS_UNKNOWN_LOCATION: 2,

    /**
     * 状态码：导航结果未知
     */
    BMAP_STATUS_UNKNOWN_ROUTE: 3,

    /**
     *    非法密钥
     */
    BMAP_STATUS_INVALID_KEY: 4,

    /**
     *    非法请求
     */
    BMAP_STATUS_INVALID_REQUEST: 5,

    /**
     *    没有权限
     */
    BMAP_STATUS_PERMISSION_DENIED: 6,

    /**
     *    服务不可用
     */
    BMAP_STATUS_SERVICE_UNAVAILABLE: 7,

    /**
     *    超时
     */
    BMAP_STATUS_TIMEOUT: 8,

    /**
     * 接口定义
     */
    BMap: {
        /**
         * 实例化地图
         * 实例化之后需调用 .centerAndZoom() 方法 初始化之后才能进行操作
         * @param container 绑定到指定的 #div 上
         * @param opts Map构造函数的可选参数
         */
        Map(container, opts) {
            return {
                /**
                 * 启用地图拖拽 默认
                 */
                enableDragging() {
                },
                /**
                 * 禁用地图拖拽
                 */
                disableDragging() {
                },

                /**
                 * 启用滚轮缩放
                 */
                enableScrollWheelZoom() {
                },
                /**
                 * 禁用滚轮缩放 默认
                 */
                disableScrollWheelZoom() {
                },

                /**
                 * 启用双击放大 默认
                 */
                enableDoubleClickZoom() {
                },
                /**
                 * 禁用双击放大 默认
                 */
                disableDoubleClickZoom() {
                },
                centerAndZoom() {
                },
                Point() {
                },
            }

        }
    },

    init(ak, version) {
        let _this = BMapUtils
        version = version || "2.0"

        return new Promise(function (resolve, reject) {
            if (typeof BMap !== 'undefined') {
                resolve(BMap)
                return true
            }
            window.onBMapCallback = function () {
                // console.log(BMap)
                _this.BMap = BMap
                // console.log(_this.BMap)
                resolve(_this.BMap)
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                `http://api.map.baidu.com/api?v=${version}&ak=${ak}&callback=onBMapCallback`
            script.onerror = reject
            document.head.appendChild(script)
        })
    }
}
export default BMapUtils