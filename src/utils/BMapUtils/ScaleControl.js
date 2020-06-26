/**
 * 比例尺控件类
 */
import BMapUtils from "@/utils/BMapUtils";

export default class ScaleControl{

    /**
     * 创建一个比例尺控件
     * @param opts
     */
    constructor(opts) {
    }

    /**
     * 返回比例尺单位制
      * @returns {{BMAP_UNIT_METRIC: undefined, BMAP_UNIT_IMPERIAL: undefined}}
     */
    getUnit(){
        return BMapUtils.LengthUnit;
    }

    /**
     * 设置比例尺单位制
     * @param unit LengthUnit
     */
    setUnit(unit) {}
}