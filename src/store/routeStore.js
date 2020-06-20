/**
 * 全局路由状态管理
 */
export default {
    state:{
        route:""
    },
    mutations:{
        changeRoute(state,target){
            console.log(target)
            state.route = target
        },
    },
}