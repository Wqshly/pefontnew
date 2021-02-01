<template>
  <div>
    <el-upload action='string' :before-upload="beforeUpload"
               :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
      <img v-if="uploadSuccess" :src="imageFile.file" :style="{width: imgWidth, height: imgHeight}" class="avatar" alt="图片未正常显示">
      <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:120px"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body width="40%">
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vue-cropper
            ref="cropper"
            :img="option.image"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :can-scale="option.canScale"
            :autoCrop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="options.fixedNumber"
            :full="option.full"
            :fixedBox="option.fixedBox"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            :max-img-size="option.maxImgSize"
            :enlarge="option.enlarge"
            :mode="option.mode"
          >
          </vue-cropper>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click.native="uploadPicture()">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    options: {
      fixedNumber: {required: true}
    },
    imgWidth: {
      type: String,
      default: '120px'
    },
    imgHeight: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      uploadSuccess: false,
      dialogVisible: false,
      picLocation: '',
      option: {
        image: '',
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 500, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        full: true, // 是否输出原图比例的截图
        fixedBox: true, // 固定截图框大小 不允许改变
        canMove: true, // 上传图片是否可以移动
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        high: false, // 是否按照设备的dpr 输出等比例图片
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 1000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: 'contain' // 图片默认渲染方式
      },
      loading: false, // 防止重复提交
      imageFile: {
        name: '',
        type: '',
        file: ''
      }
    }
  },
  methods: {
    async beforeUpload (file) {
      const minSize = file.size / 1024 > 20
      const maxSize = file.size / 1024 / 1024 < 8
      if (!minSize) {
        this.$message.error('上传图片大小不能小于20k')
      } else if (!maxSize) {
        this.$message.error('上传图片最大不能大于8M')
      }
      this.option.image = window.URL.createObjectURL(file.raw)
    },
    async changeUpload (file) {
      this.dialogVisible = true
      this.fileinfo = file
      console.log(file)
      this.option.image = window.URL.createObjectURL(file.raw)
      this.$nextTick(() => {
        console.log(this.option.image)
      })
    },
    async uploadPicture () {
      this.$refs.cropper.getCropData((data) => {
        const splitName = this.fileinfo.name.split('.')
        const type = splitName[splitName.length - 1]
        this.imageFile.name = 'user' + this.fileinfo.uid + '.' + type
        this.imageFile.file = data
        this.$emit('upload-pic', this.imageFile)
        this.dialogVisible = false
        this.uploadSuccess = true
      })
    }
  }
}
</script>

<style lang="less">
  .cropper-content {
    .cropper {
      width: auto;
      height: 300px;
    }
  }
</style>
