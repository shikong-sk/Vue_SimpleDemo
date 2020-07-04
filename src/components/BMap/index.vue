<template>
    <div id="Map">
    </div>
</template>


<script>
    import BMapUtils from "@/utils/BMapUtils";
    import StatusCode from "@/utils/BMapUtils/StatusCode";

    export default {
        async mounted() {
            let _this = this

            // 初始化地图对象
            await BMapUtils.init(_this.ak).then((BMap) => {
                this.$set(this, "BMap", BMap)
            })

            console.log(BMapUtils.APIVersion.BMAP_API_VERSION)

            // 挂载地图对象
            this.Map = new this.BMap.Map("Map")

            // 初始化地图
            this.Map.centerAndZoom(new this.BMap.Point(116.404, 39.915), 11)

            // 设置地图类型
            this.Map.setMapType(BMapUtils.MapType.BMAP_HYBRID_MAP)

            // for(let x in BMapUtils)
            // {
            //     console.log(x,BMapUtils[x])
            // }

            let scaleCtrl = new this.BMap.ScaleControl({
                anchor: BMapUtils.ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT,
                offset: new _this.BMap.Size(10, 40)
            });

            this.Map.addControl(scaleCtrl)

            let geolocation = new this.BMap.Geolocation();

            // 启用 SDK 辅助定位
            // geolocation.enableSDKLocation();

            // 获取当前位置
            // geolocation.getCurrentPosition(function (r) {
            //     if (this.getStatus() === StatusCode.BMAP_STATUS_SUCCESS) {
            //
            //         // Marker构造函数的可选参数
            //         let markerOptions = _this.BMap.MarkerOptions;
            //         markerOptions.title = "当前位置"
            //
            //         // 标记点
            //         let marker = new _this.BMap.Marker(r.point, markerOptions)
            //         _this.Map.addOverlay(marker)
            //
            //         // 移动至目标坐标点
            //         _this.Map.panTo(r.point)
            //
            //         // 设置地图缩放倍数
            //         _this.Map.setZoom(18)
            //
            //     }
            // })

            // 启用拖拽
            this.Map.enableDragging()
            // 启用滚轮缩放
            this.Map.enableScrollWheelZoom()

            // 监听 缩放动作 结束事件 实时获取并更改 zoom 的值
            this.Map.addEventListener('zoomend',(e)=>{
                _this.zoom = this.Map.getZoom()
            })

            this.Map.addEventListener('addoverlay',(e)=>{
                /**
                 * 地图上最多保留 100 个 Marker 避免百度地图 卡顿
                 */
                if(this.Map.getOverlays().length >= 100)
                {
                    this.Map.removeOverlay(this.overlay.shift())
                }
            })

            this.init()
        },
        methods:{
            init(){

                let point = new BMap.Point(113.16548486469146, 23.04584878274906);

                this.Map.addOverlay(new BMap.Marker(point))
                this.Map.panTo(point)
                this.Map.setZoom(17)

                /**
                 * 引入截取的 JSON
                 */
                this.$set(this,"res",require("@/list").default.data)

                console.log(this.res,typeof this.res)

                let pointList = []

                if(this.res instanceof Array){
                    // this.res.forEach((data,index)=>{
                    //
                    //     /**
                    //      * 常规方法
                    //      */
                    //     // if(index > 100)return
                    //     // console.log(index)
                    //     //
                    //     // let point = new BMap.Point(data["baiduLongitude"], data["baiduLatitude"]);
                    //     //
                    //     // let marker = new BMap.Marker(point)
                    //     //
                    //     // this.Map.addOverlay(marker)
                    //     //
                    //     // let label = new BMap.Label(marker)
                    //     //
                    //     // label.setStyle({
                    //     //     color:"black"
                    //     // })
                    //     //
                    //     //
                    //     // let message =
                    //     //     '<div>' +
                    //     //     '	<div>设备名:' + data["name"] + '</div>' +
                    //     //     '	<div>设备地址：' + data["address"] + '</div>' +
                    //     //     '</div>'
                    //     //
                    //     // marker.addEventListener("mouseover",()=>{
                    //     //     let opts = {
                    //     //         width: 250,     // 信息窗口宽度
                    //     //         height: 80,     // 信息窗口高度
                    //     //     };
                    //     //     let infoWindow = new BMap.InfoWindow(message, opts);  // 创建信息窗口对象
                    //     //
                    //     //     this.Map.openInfoWindow(infoWindow, marker.point);      // 打开信息窗口
                    //     // })
                    //
                    //     /**
                    //      *
                    //      * 海量点
                    //      */
                    //      pointList.push(new BMap.Point(data["baiduLongitude"], data["baiduLatitude"]));
                    //
                    // })

                    for(let i = 0,length = this.res.length;i<length;i++)
                    {
                        pointList.push(new BMap.Point(this.res[i]["baiduLongitude"], this.res[i]["baiduLatitude"]));
                    }
                }


                let _this = this


                /**
                 * 海量点
                 */

                let pointCollectionOptions = BMapUtils.BMap.PointCollectionOptions

                pointCollectionOptions.shape = BMapUtils.ShapeType.BMAP_POINT_SHAPE_CIRCLE

                pointCollectionOptions.color = "rgba(220,20,60,.8)"
                let pointCollection = new BMap.PointCollection(pointList,pointCollectionOptions)

                pointCollection.addEventListener('mouseover',(e)=>{
                    // this.Map.addOverlay(marker)
                    //
                    // let label = new BMap.Label(marker)

                    console.log(_this.res)


                    /**
                     * 效率最高的循环遍历写法 遍历大量数据几乎秒出
                     */
                    for(let i = 0,len = _this.res.length;i<len;i++)
                    {
                        if(Number(_this.res[i]["baiduLongitude"]) === Number(e.point.lng) && Number(_this.res[i]["baiduLatitude"]) === Number(e.point.lat))
                        {
                            console.log( e.point.lng ,e.point.lat)
                            console.log(_this.res[i]["baiduLongitude"],_this.res[i]["baiduLatitude"])

                            let point = new BMap.Point(_this.res[i]["baiduLongitude"],_this.res[i]["baiduLatitude"]);
                            let marker = new BMap.Marker(point)

                            _this.overlay.push(marker)

                            _this.Map.addOverlay(marker)

                            let label = new BMap.Label(marker)

                            label.setStyle({
                                color:"black"
                            })

                            let message =
                                '<div>' +
                                '	<div>设备名:' + _this.res[i]["name"] + '</div>' +
                                '	<div>设备地址：' + _this.res[i]["address"] + '</div>' +
                                '</div>'

                            marker.addEventListener("mouseover",()=>{
                                let opts = {
                                    width: 250,     // 信息窗口宽度
                                    height: 80,     // 信息窗口高度
                                };
                                let infoWindow = new BMap.InfoWindow(message, opts);  // 创建信息窗口对象

                                _this.Map.openInfoWindow(infoWindow, marker.point);      // 打开信息窗口
                            })

                            return
                        }
                    }

                    /**
                     * 调用方便 但性能较弱 遍历大量数据花费很长时间
                     */
                    // _this.res.forEach((data)=>{
                    //
                    //     if(Number(data["baiduLongitude"]) === Number(e.point.lng) && Number(data["baiduLatitude"]) === Number(e.point.lat))
                    //     {
                    //         console.log( e.point.lng ,e.point.lat)
                    //         console.log(data["baiduLongitude"],data["baiduLatitude"])
                    //
                    //         let point = new BMap.Point(data["baiduLongitude"], data["baiduLatitude"]);
                    //         let marker = new BMap.Marker(point)
                    //
                    //         _this.Map.addOverlay(marker)
                    //
                    //         let label = new BMap.Label(marker)
                    //
                    //         label.setStyle({
                    //             color:"black"
                    //         })
                    //
                    //         let message =
                    //             '<div>' +
                    //             '	<div>设备名:' + data["name"] + '</div>' +
                    //             '	<div>设备地址：' + data["address"] + '</div>' +
                    //             '</div>'
                    //
                    //         marker.addEventListener("mouseover",()=>{
                    //             let opts = {
                    //                 width: 250,     // 信息窗口宽度
                    //                 height: 80,     // 信息窗口高度
                    //             };
                    //             let infoWindow = new BMap.InfoWindow(message, opts);  // 创建信息窗口对象
                    //
                    //             _this.Map.openInfoWindow(infoWindow, marker.point);      // 打开信息窗口
                    //         })
                    //
                    //         return
                    //     }
                    //
                    // })

                    console.log(e)
                })


                this.Map.addOverlay(pointCollection)
            }
        },
        computed:{
        },
        watch:{
            zoom(n,o){
                console.log(n,o)
            }
        },
        data() {
            return {
                ak: "您的密钥",
                BMap: undefined,
                Map: undefined,

                overlay:[],
                res :undefined,
                zoom:undefined,
            }
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }

    #app {
        height: 100%;
    }

    /*隐藏百度版权*/
    .BMap_cpyCtrl {
        display: none;
    }
    /*隐藏百度Logo*/
    .anchorBL{
        display:none;
    }
</style>

<style scoped>
    #Map {
        height: 100%;
    }
</style>