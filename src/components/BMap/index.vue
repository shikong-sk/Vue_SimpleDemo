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

            console.log(this)

            await BMapUtils.init(_this.ak).then((BMap) => {
                this.$set(this, "BMap", BMap)
            })

            this.Map = new this.BMap.Map("Map")

            this.Map.centerAndZoom(new this.BMap.Point(116.404, 39.915), 11)

            console.log(BMapUtils.MapType.BMAP_HYBRID_MAP)
            console.log(global.BMAP_CONTEXT_MENU_ICON_ZOOMIN)

            let geolocation = new this.BMap.Geolocation();
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function(r){
                console.log(this,r);
                if(this.getStatus() === StatusCode.BMAP_STATUS_SUCCESS)
                {
                    let marker = new _this.BMap.Marker(r.point,{
                        title:"当前位置"
                    })
                    _this.Map.addOverlay(marker)

                    _this.Map.panTo(r.point)

                    _this.Map.setZoom(18)
                }
            })

            this.Map.enableDragging()
            this.Map.enableScrollWheelZoom()
        },
        data() {
            return {
                ak: "您的密钥",
                BMap: undefined,
                Map: undefined,
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
</style>

<style scoped>
    #Map {
        height: 100%;
    }
</style>