<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <div>
            <router-link to="/">首页</router-link>
            |
            <router-link to="/helloWorld">HelloWorld</router-link>
        </div>
        <div>
            <button @click="addCount">+1</button>
            <button @click="subCount(1)">-1</button>
        </div>
        <div>
            <button @click="addCountAsync">延时 +1</button>
            <button @click="subCountAsync()">延时 -1</button>
        </div>
        <div>
            <button @click="testAxios">测试 Axios</button>
        </div>

        <div>{{this.$store.getters.showCount}}</div>

        <router-view></router-view>
    </div>
</template>

<script>

    import {mapMutations, mapActions} from "vuex";

    export default {
        name: 'App',
        watch:{
            $route(to)
            {
                this.$store.commit("changeRoute",to)
            },
        },
        methods: {
            testAxios(){
              this.$http.get("https://jsonplaceholder.typicode.com/posts/1/comments").then((res)=>{
                  console.log(res)
              })
            },
            addCount() {
                // this.$store.state.count ++; // 不合法

                /**
                 * 调用指定的 mutations 方法
                 */
                // this.$store.commit("addCount", 1) 普通写法
                this.$store.commit("addCount", 1) // 子模块 写法
            },
            /**
             * 将需要的 mutations 方法 映射为 methods 方法
             */
            ...mapMutations(['subCount']),

            addCountAsync() {
                /**
                 * 调用指定的 actions 方法
                 */
                this.$store.dispatch('addCountAsync', 1)
            },
            /**
             * 将需要的 actions 方法 映射为 methods 方法
             */
            ...mapActions(['subCountAsync']),

        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
