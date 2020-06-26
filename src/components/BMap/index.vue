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
                offset: new BMap.Size(10, 40)
            });

            this.Map.addControl(scaleCtrl)

            let geolocation = new this.BMap.Geolocation();

            // 启用 SDK 辅助定位
            geolocation.enableSDKLocation();

            // 获取当前位置
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() === StatusCode.BMAP_STATUS_SUCCESS) {
                    // 标记点
                    let marker = new _this.BMap.Marker(r.point, {
                        title: "当前位置"
                    })
                    _this.Map.addOverlay(marker)

                    // 移动至目标坐标点
                    _this.Map.panTo(r.point)

                    // 设置地图缩放倍数
                    _this.Map.setZoom(18)

                }
            })

            // 启用拖拽
            this.Map.enableDragging()
            // 启用滚轮缩放
            this.Map.enableScrollWheelZoom()

            // 监听 缩放动作 结束事件 实时获取并更改 zoom 的值
            this.Map.addEventListener('zoomend',(e)=>{
                _this.zoom = this.Map.getZoom()
            })

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