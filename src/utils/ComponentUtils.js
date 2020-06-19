import Vue from 'vue'

/**
 * 组件 工具类
 */
class ComponentUtilsClass{
    /**
     * 注册组件
     * @param components 组件列表 [{name:"",component:()=>import("")}]
     */
     register(components) {
        components.forEach((v)=>{
            Vue.component(v.name,v.component)
        })
    }
}

export default ComponentUtilsClass