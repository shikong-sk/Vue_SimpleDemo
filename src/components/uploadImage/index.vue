<template>
    <div class="power">
        <ul class="imgUl">
            <li style="position:relative;overflow: hidden;">
                <div>
                    <input ref="upload" :value="value" type="file" id="upload" @change="getImg" :accept="imgData.accept" style="display: none"/>
                    <el-button style="width: 80%" @click="upload">上传图片</el-button>
                    <el-button type="danger" icon="el-icon-delete" style="min-width:30px;width: 10%" @click="emptyImage"></el-button>
                </div>
            </li>
            <li v-if="imgSrc.length > 0" style="">
                <el-image fit="contain" :src="imgSrc" :preview-src-list="[imgSrc]" lazy style="width: 120px;height: 80px;margin-top: 10px;">
                </el-image>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:null,
                imgSrc: "",
                imgBase64:"",
                imgText: "",
                //判断图片的类型
                imgData: {
                    // accept: "image/png,image/gif,image/jpeg,image/bmp",
                    accept: ".png,.jpeg,.jpg,.bmp,.gif"
                }
            }
        },
        mounted() {

        },
        methods: {
            emptyImage(){
                this.$set(this,"imgSrc","")
                this.$set(this,"imgBase64","")
                this.$set(this,"imgText","")
                this.$set(this,"value",null)

                /**
                 * 触发 input 的 change 事件 确保完全清除
                 */
                // document.getElementById("upload").dispatchEvent(new UIEvent('change'))
                this.$refs.upload.dispatchEvent(new UIEvent('change'))
            },
            upload() {
                // document.getElementById("upload").click()
                this.$refs.upload.click()
            },
            getImg(imgData) {
                let img = imgData.target.files[0];

                if(img != null) {
                    let suffix = img.name.split(".")[img.name.split(".").length - 1]

                    let type = img.type; // 文件的类型，判断是否是图片

                    console.log(imgData.target.name, type)

                    if (this.imgData.accept.indexOf(suffix) !== -1 || this.imgData.accept.indexOf(type) !== -1) {
                        this.imgText = img.name;

                        this.image2Base64(img);
                    } else {
                        alert('请选择支持的图片格式！');
                        return false;
                    }
                }
            },

            /**
             * 异步 将图片转换为 Base64
             * @param file File
             */
            async image2Base64(file) {
                let _this = this;

                /**
                 * 文件读取
                 */
                let reader = new FileReader();

                /**
                 * 文件读取完成时执行
                 */
                reader.onload = function (ev) {
                    let image = new Image();
                    image.src = String(ev.target.result);

                    /**
                     * 装载图片 完成时 执行
                     */
                    image.onload = function () {
                        let height = image.height;
                        let width = image.width;

                        console.log(height, width)
                        if (width < 80 && height < 80) {
                            _this.$message.error('请上传人脸图片规格大于80像素');
                            return false;
                        }

                        _this.imgSrc = reader.result;
                        _this.imgBase64 = (reader.result).split(',')[1];

                    }
                }

                await reader.readAsDataURL(file);
            }
        }
    }
</script>

<style scoped>

    .inputFileWrapper label {
        display: block;
        float: left;
        position: relative;
        width: 100%;
    }

    .inputFileWrapper input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        clip: rect(0, 0, 0, 0);
    }

    .inputFileWrapper .custom-style {
        display: block;
        width: 100%;
        height: 50px;
    }

    .inputFileWrapper .custom-style .left-button {
        width: 100%;
        line-height: 39px;
        background: #008ac7;
        color: #fff;
        display: block;
        text-align: center;
        float: left;
        font-size: 12px;
    }

    .inputFileWrapper .custom-style .right-text {
        width: 54%;
        height: 26px;
        line-height: 26px;
        display: block;
        float: right;
        padding: 4px;
        border: 1px solid #008ac7;
        color: #ddd;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .imgUl{
        list-style-type: none;
    }
</style>