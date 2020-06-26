/**
 * 时间工具类
 */
const TimeUtils =
{
    getDateTime(unixTime) {
        unixTime = new Date(unixTime)
        let Y = unixTime.getFullYear()
        let M = (unixTime.getMonth() + 1) < 10 ? '0' + (unixTime.getMonth() + 1) : (unixTime.getMonth() + 1)
        let D = unixTime.getDate() < 10 ? '0' + unixTime.getDate() : unixTime.getDate()
        let H = unixTime.getHours() < 10 ? '0' + unixTime.getHours() : unixTime.getHours()
        let i = unixTime.getMinutes() < 10 ? '0' + unixTime.getMinutes() : unixTime.getMinutes()
        let S = unixTime.getSeconds() < 10 ? '0' + unixTime.getSeconds() : unixTime.getSeconds()
        return Y + '-' + M + '-' + D + ' ' + H + ':' + i + ':' + S
    },
    date2DateTime(dateObj)
    {
        if(dateObj instanceof Date)
        {
            let unixTime = dateObj.getTime()
            return this.getDateTime(unixTime)
        }
        return ""
    }
}

export default TimeUtils