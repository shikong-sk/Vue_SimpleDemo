<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h5>方法二：全局共享的 count 值为：{{count}}</h5>
        <h5>全局共享的 count 值为：{{count}}</h5>
        <h5>{{dateTime}}</h5>

        <h5> 全局过滤器：{{date | dateTimeFormat}} </h5>
        <h5> 全局过滤器 yyyy-mm-dd ：{{date | dateTimeFormat("yyyy-mm-dd")}} </h5>
        <el-button @click="visible = !visible">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import TimeUtils from "@/utils/TimeUtils";

    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: "Hello World!",
                visible: false,
                date: new Date(),
                dateInterval:undefined,
            }
        },
        methods: {},
        mounted(){
            this.dateInterval = setInterval(() => {
                this.date = new Date()
            }, 1000)
        },
        beforeDestroy(){
            clearInterval(this.dateInterval)
        },
        computed: {
            dateTime() {
                return TimeUtils.getDateTime(this.date)
            },

            ...mapState({
                count: state => state.globalStore.count
            }), // 作用等同于 count(){return this.$store.state.globalStore.count},
        },
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
