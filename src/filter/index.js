import Vue from 'vue'

export default {
    register(filterObj){
        for(let filterName in filterObj)
        {
            Vue.filter(filterName,filterObj[filterName])
        }
    },
}