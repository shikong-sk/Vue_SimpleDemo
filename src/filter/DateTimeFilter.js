/**
 * 全局 时间过滤器
 */
export default {
    dateTimeFormat: (data, param) => {
        if (data instanceof Date) {
            let Y = data.getFullYear()
            // let M = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)
            // let D = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
            // let H = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
            // let i = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
            // let S = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()

            /**
             *  ES6 语法
             */
            let M = (data.getMonth() + 1).toString().padStart(2,"0")
            let D = (data.getDate()).toString().padStart(2,"0")
            let H = (data.getHours()).toString().padStart(2,"0")
            let i = (data.getMinutes()).toString().padStart(2,"0")
            let S = (data.getSeconds()).toString().padStart(2,"0")

            if (param == null) param = 'yyyy-mm-dd H:i:S'
            else param = param.toLowerCase()

            switch (param) {
                case 'yyyy-mm-dd H:i:S':
                    // return Y + '-' + M + '-' + D + ' ' + H + ':' + i + ':' + S
                    return `${Y}-${M}-${D} ${H}:${i}:${S}`
                case 'yyyy-mm-dd':
                    return `${Y}-${M}-${D}`
                default :
                    return ""
            }
        }
    },
}