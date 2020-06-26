/**
 * 此类是地图API的核心类，用来实例化一个地图
 */
import Bounds from "@/utils/BMapUtils/Bounds";
import Point from "@/utils/BMapUtils/Point";
import MapType from "@/utils/BMapUtils/MapType";
import Size from "@/utils/BMapUtils/Size";

export default class Map {
    /**
     * 实例化地图
     * 实例化之后需调用 .centerAndZoom() 方法 初始化之后才能进行操作
     * @param container 绑定到指定的 #div 容器上
     * @param opts Map 构造函数的可选参数
     */
    constructor(container, opts) {
    }

    /**
     * 启用地图拖拽 默认
     */
    enableDragging() {
    }

    /**
     * 禁用地图拖拽
     */
    disableDragging() {
    }

    /**
     * 启用滚轮缩放
     */
    enableScrollWheelZoom() {
    }

    /**
     * 禁用滚轮缩放 默认
     */
    disableScrollWheelZoom() {
    }

    /**
     * 启用双击放大 默认
     */
    enableDoubleClickZoom() {
    }

    /**
     * 禁用双击放大 默认
     */
    disableDoubleClickZoom() {
    }

    /**
     * 启用键盘操作
     */
    enableKeyboard() {
    }

    /**
     * 禁用键盘操作 默认
     */
    disableKeyboard() {
    }

    /**
     * 启用地图惯性拖拽
     */
    enableInertialDragging() {
    }

    /**
     * 禁用地图惯性拖拽 默认
     */
    disableInertialDragging() {
    }

    /**
     * 启用连续缩放效果
     */
    enableContinuousZoom() {
    }

    /**
     * 禁用连续缩放效果 默认
     */
    disableContinuousZoom() {
    }

    /**
     * 启用双指操作缩放 默认
     */
    enablePinchToZoom() {
    }

    /**
     * 禁用双指操作缩放
     */
    disablePinchToZoom() {
    }

    /**
     * 启用自适应容器尺寸变化 默认
     */
    enableAutoResize() {
    }

    /**
     * 禁用自动适应容器尺寸变化
     */
    disableAutoResize() {
    }

    /**
     * 设置地图默认鼠标样式
     * @param cursor CSS 属性规范中的鼠标样式名
     */
    setDefaultCursor(cursor) {
    }

    /**
     * 获取地图默认鼠标样式
     * @returns {String} 返回 CSS 属性规范中的鼠标样式名
     */
    getDefaultCursor() {
        return String()
    }

    /**
     * 设置拖拽地图时的鼠标样式
     * @param cursor CSS 属性规范中的鼠标样式名
     */
    setDraggingCursor(cursor) {
    }

    /**
     * 获取拖拽地图时的鼠标样式
     * @returns {string} 返回 CSS 属性规范中的鼠标样式名
     */
    getDraggingCursor() {
        return String()
    }

    /**
     * 设置地图允许的最小缩放级别
     * @param zoom int 缩放级别
     */
    setMinZoom(zoom) {
    }

    /**
     * 设置地图允许的最大缩放级别
     * @param zoom int 缩放级别
     */
    setMaxZoom(zoom) {
    }

    /**
     * 设置地图样式，样式包括地图底图颜色和地图要素是否展示两部分
     */
    setMapStyle() {
    }

    /**
     * 将全景实例与 Map 类进行绑定
     */
    setPanorama(Panorama) {
    }

    /**
     * 获取地图可视区域，以地理坐标表示
     * @returns {Bounds} 返回地图可视区域，以地理坐标表示
     */
    getBounds() {
        return new Bounds()
    }

    /**
     * 获取地图当前中心点
     * @returns {Point} 返回地图当前中心点
     */
    getCenter() {
        return new Point()
    }

    /**
     * 获取两点之间的距离
     * @param start Point 起始位置
     * @param end Point 终点位置
     * @returns {number} 返回两点之间的距离 单位：米
     */
    getDistance(start,end){
        return Number()
    }

    /**
     * 获取地图类型
     * @returns {MapType} 返回地图类型
     */
    getMapType(){
        return new MapType()
    }

    /**
     * 返回地图视图的大小，以像素表示
     * @returns {Size}
     */
    getSize(){return new Size()}

    /**
     * 根据提供的地理区域或坐标获得最佳的地图视野，
     * 返回的对象中包含 center 和 zoom 属性，分别表示地图的中心点和级别。
     * 此方法仅返回视野信息，不会将新的中心点和级别作用到当前地图上
     * @param view Point[]
     * @param viewportOptions ViewportOptions
     * @returns {ViewportOptions}
     */
    getViewport(view,viewportOptions){
        return new ViewportOptions()
    }

    centerAndZoom() {
    }

}
