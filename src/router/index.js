import VueRouter from "vue-router";

import config from "../../vue.config.js";

/**
 *  公共路由定义
 */
const routes = [
    {
        path: "/",
        name: "/",
        redirect: "/index",
        component:()=>import("@/components/index/index"),
        children:[
            {
                path: "/index",
                name: "index",
                component: () => import("@/components/home"),
            },
            {
                path: "/helloWorld",
                name: "HelloWorld",
                component: () => import("@/components/helloWorld"),
            },
            {
                path: "/baiduMap",
                name: "BaiduMap",
                component: () => import("@/components/BaiduMap"),
            },
            {
                path: "/map",
                name: "BMap",
                component: () => import("@/components/BMap"),
            },
            {
                path: "/uploadImg",
                name: "uploadImg",
                component: () => import("@/components/uploadImage"),
            },
        ]
    },
]


const router = new VueRouter({
    base:config.publicPath,
    mode: "history",
    routes,
})

export default router;