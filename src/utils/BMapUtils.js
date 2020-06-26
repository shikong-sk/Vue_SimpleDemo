/**
 * 百度地图 工具类
 *
 * @author Shikong
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

import Map from '@/utils/BMapUtils/Map'
import Point from "@/utils/BMapUtils/Point";
import Bounds from "@/utils/BMapUtils/Bounds";
import Marker from "@/utils/BMapUtils/Marker";
import MarkerOptions from "@/utils/BMapUtils/MarkerOptions";

const BMapUtils = {
    /**
     * 接口定义
     */
    BMap: {
        Map,
        Point,
        Bounds,
        Marker,
        MarkerOptions,
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