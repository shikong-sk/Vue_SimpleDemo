import Vue from 'vue'
// import Vue from 'vue/dist/vue.esm.js'

/**
 * 导入 axios http 请求库
 */
import axios from 'axios'

Vue.prototype.$http = axios;

/**
 * 导入路由组件 Vue-router
 */
import VueRouter from "vue-router";

Vue.use(VueRouter)

/**
 * 导入状态管理组件 Vuex
 */
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 导入全局组件
 */
import Components from "@/components";
/**
 * 导入 组件工具类
 */
import ComponentUtilsClass from "@/utils/ComponentUtils";

/**
 * 创建 组件 工具类,注册全局组件
 * @type {ComponentUtilsClass}
 */
const ComponentUtils = new ComponentUtilsClass();

/**
 * 注册全局组件
 */
ComponentUtils.register(Components)

/**
 * // 关闭生产提示
 * @type {boolean}
 */
Vue.config.productionTip = false

/**
 * 导入全局路由
 */
import router from "@/router";

/**
 * 导入全局状态管理
 */
import globalStore from "@/store/store";

import routeStore from "@/store/routeStore";

/**
 * 引入子模块
 * @type {Store<unknown>}
 */
const store = new Vuex.Store({
    modules: {
        globalStore,
        routeStore
    },
})

/**
 * 引入 Element-UI 组件
 */
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

import App from './App.vue';

new Vue({
    /**
     *  Vue 1.x 写法
     *
     *  新版本中若无法使用
     *  可将       import Vue from 'vue'
     *  替换为     import Vue from 'vue/dist/vue.esm.js'
     */
    // el: '#app',
    // components: {App},  // 作用相同 render: h => h(App),
    // template: '<App/>',

    /**
     *  Vue 2.x 写法
     */
    render: h => h(App),
    router,  // 相当于 router:router
    store, // 相当于 store:store
    // store:globalStore,
}).$mount("#app")

