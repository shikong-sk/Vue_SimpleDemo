<template>
    <div id="Map">
    </div>
</template>

<script>
    import BMapUtils from "@/utils/BMapUtils";

    export default {
        async mounted() {
            let _this = this

            console.log(this)

            await BMapUtils.init(_this.ak).then((BMap) => {
                this.$set(this, "BMap", BMap)
            })

            this.Map = new this.BMap.Map("Map")

            this.Map.centerAndZoom(new this.BMap.Point(116.404, 39.915), 11)

            let geolocation = new this.BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                console.log(this,r);
                if(this.getStatus() === BMapUtils.BMAP_STATUS_SUCCESS)
                {
                    _this.Map.addOverlay(new _this.BMap.Marker(r.point))
                    _this.Map.panTo(r.point)
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