<template>
    <div class="container">
        <BaiduMap ref="res" class="view" center="北京" :ak="ak" :zoom="zoom"></BaiduMap>
    </div>
</template>

<script>

    import BaiduMap from "vue-baidu-map/components/map/Map";

    export default {
        name: "index",
        components: {
            BaiduMap
        },
        mounted(){
            setTimeout(()=>{
                console.log(this.$refs.res.BMap)
            },100)
        },
        data() {
            return {
                ak: "您的密钥",

                /**
                 * 地图缩放 (4 ~ 19)
                 */
                zoom: 15,

                /**
                 * 地图中心位置
                 */
                center: {
                    /**
                     * 经度
                     */
                    lng: undefined,
                    /**
                     * 纬度
                     */
                    lat: undefined,
                }
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
    .container {
        height: 100%;
    }

    .view {
        width: 100%;
        height: 100%;
    }
</style>