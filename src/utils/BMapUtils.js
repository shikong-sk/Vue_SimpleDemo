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

    /**
     * 初始化地图
     * @param ak appKey
     * @param version 接口版本
     * @returns {Promise<unknown>}
     */
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
                BMapUtils.initConstant()
                resolve(_this.BMap)
            }
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                `http://api.map.baidu.com/api?v=${version}&ak=${ak}&callback=onBMapCallback`
            script.onerror = reject
            document.head.appendChild(script)
        })
    },

    /*
     *  公共常量定义
     */

    /**
     * 请求结果 状态码
     */
    StatusCode: {
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
         * 状态码：非法密钥
         */
        BMAP_STATUS_INVALID_KEY: 4,

        /**
         * 状态码：非法请求
         */
        BMAP_STATUS_INVALID_REQUEST: 5,

        /**
         * 状态码：没有权限
         */
        BMAP_STATUS_PERMISSION_DENIED: 6,

        /**
         * 状态码：服务不可用
         */
        BMAP_STATUS_SERVICE_UNAVAILABLE: 7,

        /**
         * 状态码：超时
         */
        BMAP_STATUS_TIMEOUT: 8,
    },
    /**
     * 图层类型
     */
    MapType: {
        /**
         * 此地图类型展示普通街道视图
         */
        BMAP_NORMAL_MAP: undefined,

        /**
         * 此地图类型展示卫星视图
         */
        BMAP_SATELLITE_MAP: undefined,
        /**
         * 此地图类型展示卫星和路网的混合视图
         */
        BMAP_HYBRID_MAP: undefined,
    },
    /**
     * 内置的右键菜单图标
     */
    ContextMenuIcon: {
        /**
         * 放大图标
         */
        BMAP_CONTEXT_MENU_ICON_ZOOMIN: undefined,

        /**
         * 缩小图标
         */
        BMAP_CONTEXT_MENU_ICON_ZOOMOUT: undefined,
    },
    /**
     * 全景地图 场景类型
     */
    PanoramaSceneType: {
        /**
         * 全景场景点的类型为室内场景
         */
        BMAP_PANORAMA_INDOOR_SCENE: undefined,
        /**
         * 全景场景点的类型为室外场景
         */
        BMAP_PANORAMA_STREET_SCENE: undefined,
    },
    /**
     * 全景地图 要显示的 POI 类型
     */
    PanoramaPOIType: {
        /**
         *  酒店
         */
        BMAP_PANORAMA_POI_HOTEL: undefined,

        /**
         * 餐饮类
         */
        BMAP_PANORAMA_POI_CATERING: undefined,

        /**
         * 电影院
         */
        BMAP_PANORAMA_POI_MOVIE: undefined,

        /**
         * 公交站点
         */
        BMAP_PANORAMA_POI_TRANSIT: undefined,

        /**
         * 室内景
         */
        BMAP_PANORAMA_POI_INDOOR_SCENE: undefined,

        /**
         * 无，即隐藏所有的 poi 类型
         */
        BMAP_PANORAMA_POI_NONE: undefined,
    },
    /**
     * 驾车结果 高亮模式
     */
    HighlightModes: {
        /**
         * 驾车结果展现中点击列表后的展现点步骤
         */
        BMAP_HIGHLIGHT_STEP: undefined,

        /**
         * 驾车结果展现中点击列表后的展现路段
         */
        BMAP_HIGHLIGHT_ROUTE: undefined,
    },
    /**
     * 线路类型
     */
    RouteType: {
        /**
         * 驾车线路
         */
        BMAP_ROUTE_TYPE_DRIVING: undefined,

        /**
         * 步行线路
         */
        BMAP_ROUTE_TYPE_WALKING: undefined,
    },
    /**
     * 初始化常量值
     */
    initConstant() {
        // 图层
        BMapUtils.MapType.BMAP_NORMAL_MAP = global.BMAP_NORMAL_MAP;
        BMapUtils.MapType.BMAP_SATELLITE_MAP = global.BMAP_SATELLITE_MAP;
        BMapUtils.MapType.BMAP_HYBRID_MAP = global.BMAP_HYBRID_MAP;

        // 内置右键菜单图标
        BMapUtils.ContextMenuIcon.BMAP_CONTEXT_MENU_ICON_ZOOMIN = global.BMAP_CONTEXT_MENU_ICON_ZOOMIN;
        BMapUtils.ContextMenuIcon.BMAP_CONTEXT_MENU_ICON_ZOOMOUT = global.BMAP_CONTEXT_MENU_ICON_ZOOMOUT;

        // 全景地图 场景类型
        BMapUtils.PanoramaSceneType.BMAP_PANORAMA_INDOOR_SCENE = global.BMAP_PANORAMA_INDOOR_SCENE;
        BMapUtils.PanoramaSceneType.BMAP_PANORAMA_STREET_SCENE = global.BMAP_PANORAMA_STREET_SCENE;

        // 全景地图 要显示的 POI 类型
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_HOTEL = global.BMAP_PANORAMA_POI_HOTEL;
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_CATERING = global.BMAP_PANORAMA_POI_CATERING;
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_MOVIE = global.BMAP_PANORAMA_POI_MOVIE
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_TRANSIT = global.BMAP_PANORAMA_POI_TRANSIT
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_INDOOR_SCENE = global.BMAP_PANORAMA_POI_INDOOR_SCENE
        BMapUtils.PanoramaPOIType.BMAP_PANORAMA_POI_NONE = global.BMAP_PANORAMA_POI_NONE

        // 驾车结果 高亮模式
        BMapUtils.HighlightModes.BMAP_HIGHLIGHT_STEP = global.BMAP_HIGHLIGHT_STEP
        BMapUtils.HighlightModes.BMAP_HIGHLIGHT_ROUTE = global.BMAP_HIGHLIGHT_ROUTE

        // 线路类型
        BMapUtils.RouteType.BMAP_ROUTE_TYPE_DRIVING = global.BMAP_ROUTE_TYPE_DRIVING
        BMapUtils.RouteType.BMAP_ROUTE_TYPE_WALKING = global.BMAP_ROUTE_TYPE_WALKING
    },
}
export default BMapUtils