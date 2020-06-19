import VueRouter from "vue-router";

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
        ]
    },
]


const router = new VueRouter({
    mode: "history",
    routes,
})

export default router;