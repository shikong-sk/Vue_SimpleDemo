/**
 *  时间格式 工具类
 */
const DateFormatUtils = {
    dateReg:/^[0-9]{4}.(((0[13578]|(10|12)).(0[1-9]|[1-2][0-9]|3[0-1]))|(02.(0[1-9]|[1-2][0-9]))|((0[469]|11).(0[1-9]|[1-2][0-9]|30)))/,

    /**
     * 获取指定时间 的 Date 对象
     * @param S 秒 (0 ~ 59)
     * @param i 分 (0 ~ 59)
     * @param H 时 (0 ~ 23)
     * @param D 日 (1 ~ 31)
     * @param M 月 (1 ~ 12)
     * @param Y 年 (1900 ~ 9999)
     * @returns {Date} 返回 指定时间 的 Date 对象
     */
    getCustomDate(S,i,H,D,M,Y){
        let date = new Date()

        Y = Y >= 1900 && Y <= 9999 ? Y : DateFormatUtils.date2DateTime(date,'Y')
        M = M >= 1 && M <= 12 ? M : DateFormatUtils.date2DateTime(date,'M')
        D = D >= 1 && D <= 31 ? D : DateFormatUtils.date2DateTime(date,'D')
        H = H >= 0 && H <= 23 ? H : DateFormatUtils.date2DateTime(date,'H')
        i = i >= 0 && i <= 59 ? i : DateFormatUtils.date2DateTime(date,'i')
        S = S >= 0 && S <= 59 ? S : DateFormatUtils.date2DateTime(date,'S')

        return new Date(Y,M-1,D,H,i,S)
    },

    /**
     * 获取指定时间 的 日期/时间 字符串
     * @param format 日期/时间 格式
     * @param S 秒 (0 ~ 59)
     * @param i 分 (0 ~ 59)
     * @param H 时 (0 ~ 23)
     * @param D 日 (1 ~ 31)
     * @param M 月 (1 ~ 12)
     * @param Y 年 (1900 ~ 9999)
     * @returns {string} 返回 指定时间 的 日期/时间 字符串
     */
    getCustomDateTime(format,S,i,H,D,M,Y){
        return DateFormatUtils.date2DateTime(DateFormatUtils.getCustomDate(S,i,H,D,M,Y),format)
    },

    /**
     * 获取当前 时间 ± 秒 分 时 日 月(30天) 年(365天) 的 Date 对象
     * @param S  ± 秒
     * @param i  ± 分
     * @param H  ± 时
     * @param D  ± 日
     * @param M  ± 月
     * @param Y  ± 年
     * @returns {Date}  返回对应时间的 Date 对象
     */
    getDate(S,i,H,D,M,Y){
        return new Date(
            DateFormatUtils.getUnixTime(S,i,H,D,M,Y)
        )
    },

    /**
     * 获取当前 时间 ± 秒 分 时 日 月(30天) 年(365天) 的 格式化后的 日期/时间 字符串
     * @param format 日期/时间 格式
     * @param S  ± 秒
     * @param i  ± 分
     * @param H  ± 时
     * @param D  ± 日
     * @param M  ± 月
     * @param Y  ± 年
     * @returns {String}  返回对应时间格式化后的 日期/时间 字符串
     */
    getDateTime(format,S,i,H,D,M,Y){
        return DateFormatUtils.date2DateTime(DateFormatUtils.getDate(S,i,H,D,M,Y),format)
    },


    getUnixTime(S,i,H,D,M,Y){
        Y = Y || 0
        M = M || 0
        D = D || 0
        H = H || 0
        i = i || 0
        S = S || 0

        return new Date().getTime()
            + (1000 * S)
            + (1000 * 60 * i)
            + (1000 * 60 * 60 * H)
            + (1000 * 60 * 60 * 24 * D)
            + (1000 * 60 * 60 * 24 * 30 * M)
            + (1000 * 60 * 60 * 24 * 365 * Y);
    },
    getTodayDateTime(pattern) {
        return DateFormatUtils.date2DateTime(new Date(), pattern)
    },

    date2DateTime(date, format) {

        DateFormatUtils.initCheck(date)

        // 年
        let Y = date.getFullYear().toString().padStart(4, '0')

        // 月
        let M = (date.getMonth() + 1).toString().padStart(2, '0')

        // 日
        let D = date.getDate().toString().padStart(2, '0')

        // 时
        let H = date.getHours().toString().padStart(2, '0')

        // 分
        let i = date.getMinutes().toString().padStart(2, '0')

        // 秒
        let S = date.getSeconds().toString().padStart(2, '0')

        // 毫秒
        let u = date.getMilliseconds().toString().padStart(3, '0')

        // switch (pattern) {
        //     case 'Y-M-D H:i:S:u':
        //     case 'yyyy-mm-dd H:i:S:u':
        //         return `${Y}-${M}-${D} ${H}:${i}:${S}:${u}`
        //
        //     case 'Y.M.D H:i:S:u':
        //     case 'yyyy.mm.dd H:i:S:u':
        //         return `${Y}.${M}.${D} ${H}:${i}:${S}:${u}`
        //
        //     case 'Y-M-D H:i:S.u':
        //     case 'yyyy-mm-dd H:i:S.u':
        //         return `${Y}-${M}-${D} ${H}:${i}:${S}.${u}`
        //
        //     case 'Y.M.D H:i:S.u':
        //     case 'yyyy.mm.dd H:i:S.u':
        //         return `${Y}.${M}.${D} ${H}:${i}:${S}.${u}`
        //
        //     case 'Y-M-D H:i:S':
        //     case 'yyyy-mm-dd H:i:S':
        //         return `${Y}-${M}-${D} ${H}:${i}:${S}`
        //
        //     case 'Y.M.D H:i:S':
        //     case 'yyyy.mm.dd H:i:S':
        //         return `${Y}.${M}.${D} ${H}:${i}:${S}`
        //
        //     case 'Y/M/D':
        //     case 'yyyy/mm/dd':
        //         return `${Y}/${M}/${D}`
        //
        //     case 'Y-M-D':
        //     case 'yyyy-mm-dd':
        //         return `${Y}-${M}-${D}`
        //
        //     case 'Y.M.D':
        //     case 'yyyy.mm.dd':
        //         return `${Y}.${M}.${D}`
        //
        //     case 'Y-M':
        //     case 'yyyy-mm':
        //         return `${Y}-${M}`
        //
        //     case 'Y.M':
        //     case 'yyyy.mm':
        //         return `${Y}.${M}`
        //
        //     case 'H:i':
        //         return `${H}:${i}`
        //     case 'H:i:S':
        //         return `${H}:${i}:${S}`
        //     case 'H:i:S.u':
        //         return `${H}:${i}:${S}.${u}`
        //     case 'H:i:S:u':
        //         return `${H}:${i}:${S}:${u}`
        //     case 'i:S:u':
        //         return `${i}:${S}:${u}`
        //     case 'i:S.u':
        //         return `${i}:${S}.${u}`
        //     case 'S:u':
        //         return `${S}:${u}`
        //     case 'S.u':
        //         return `${S}.${u}`
        //
        //     case 'yyyy':
        //     case 'year':
        //     case 'Y':
        //         return `${Y}`
        //
        //     case 'mm':
        //     case 'month':
        //     case 'M':
        //         return `${M}`
        //
        //     case 'dd':
        //     case 'date':
        //     case 'D':
        //         return `${D}`
        //
        //     case 'hour':
        //     case 'H':
        //         return H
        //
        //     case 'minute':
        //     case 'i':
        //         return i
        //
        //     case 'second':
        //     case 'S':
        //         return S
        //
        //     case 'u':
        //         return u
        //
        //     case 'unix':
        //         return date.getTime()
        //
        //     default:
        //         throw new Error("未定义的时间格式")
        // }

        let data = {
            'yyyy':Y,
            'Y':Y,

            'mm':M,
            'M':M,

            'dd':D,
            'D':D,

            'H':H,
            "i":i,
            "S":S,
            "u":u,
        }

        format = format || 'yyyy-mm-dd H:i:S'

        let reg = /(y+|yyyy|Y)|(m+|M)|(d+|D)|H+|i+|S+|u+/g

        return format.replace(reg,(v)=>{
            return data[v]
        })

    },
    dateTime2Date(str) {
        str = str.replace(/[-/.]/g,"/")

        let date = new Date(str)

        DateFormatUtils.checkDate(date)

        return date
    },
    unix2DateTime(unix,format){
        return DateFormatUtils.date2DateTime(new Date(unix),format)
    },

    initCheck(date) {
        if (!DateFormatUtils.isDateObject(date)) {
            DateFormatUtils.notDateObjectException()
        }
        if (!DateFormatUtils.checkDate(date)) {
            DateFormatUtils.invalidDate()
        }
    },
    isDateObject(date) {
        return date instanceof Date;
    },
    checkDate(date) {
        return !isNaN(date.getTime())
    },
    notDateObjectException() {
        throw new Error("此对象不是 Date 对象")
    },
    invalidDate() {
        throw new Error("无效的 Date")
    },

}

export default DateFormatUtils