/**
 * 全局状态管理
 */
const globalStore = {
    /**
     * 公共数据源 存放数据
     */
    state: {
        count: 0,
    },
    /**
     * 用于变更 store 中的数据
     * 可以集中监控所有数据的变化
     *
     * 只允执行同步代码
     * 不能在 mutations 中 执行异步操作
     */
    mutations: {
        addCount(state, ...args) {
            /**
             * 根据 args 参数判断 实现重载
             */
            if (args[0] === undefined) {
                state.count++
            } else {
                if (Array.isArray(args[0]) && args.length >= 1) {
                    if (!Number.isNaN(Number.parseInt(args[0][0]))) {
                        state.count += Number.parseInt(args[0][0])
                    }
                } else {
                    if (!Number.isNaN(Number.parseInt(args[0]))) {
                        state.count += Number.parseInt(args[0])
                    }
                }
            }
        },
        subCount(state, ...args) {
            if (args[0] === undefined) {
                state.count--
            } else {
                if (Array.isArray(args[0]) && args.length >= 1) {
                    if (!Number.isNaN(Number.parseInt(args[0][0]))) {
                        state.count -= Number.parseInt(args[0][0])
                    }
                } else {
                    if (!Number.isNaN(Number.parseInt(args[0]))) {
                        state.count -= Number.parseInt(args[0])
                    }
                }
            }
        },
    },
    /**
     * 用于执行异步任务
     * 最终由 actions 触发 mutations
     *
     * 不能直接修改 state 需使用 context.commit() 触发 mutation 方法
     */
    actions: {
        addCountAsync(context, payload) {
            setTimeout(() => {
                context.commit('addCount', payload)
            }, 1000)
        },
        subCountAsync(context, payload) {
            setTimeout(() => {
                context.commit('subCount', payload)
            }, 1000)
        },
    },
    /**
     * 对 store 中已有的数据加工处理之后形成新的数据
     * 当 store 中的数据发生变化时 getter 的数据也会一起变化 类似 Vue中的 computed 属性
     * 不修改 store 的值
     */
    getters: {
        showCount: state => {
            return "count 的值为：" + state.count;
        },

    },
}

export default globalStore