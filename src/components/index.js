/**
 * 全局组件定义
 * @type {{name: string,component: (function(): *)}[]}
 */
const Components = [
    {
        name: "Index",
        component: () => import('@/components/home')
    },
    {
        name: "HelloWorld",
        component: () => import('@/components/helloWorld')
    }
]

export default Components