<template>
  <div class="activity-promotional">
    <div class="activity-promotional-container">
      <p style="text-align: center;font-size: 30px; padding: 20px;">发起活动</p>
      <el-form style="padding-bottom: 20px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="活动名称：" prop="activityName">
          <el-input v-model="ruleForm.activityName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动简介：" prop="activityContent">
          <el-input v-model="ruleForm.activityContent" placeholder="请输入活动简介(简介字数不要超过规定字数)"
                    type="textarea" maxlength="250" :autosize="{ minRows: 3, maxRows: 5}" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="活动地点：" prop="activityArea">
          <el-input v-model="ruleForm.activityArea" placeholder="活动地点" clearable></el-input>
        </el-form-item>
        <el-form-item label="报名起止：" prop="signUpTime">
          <el-date-picker v-model="ruleForm.signUpTime" type="datetimerange"
                          start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动起止：" prop="activityTime">
          <el-date-picker v-model="ruleForm.activityTime" type="datetimerange"
                          start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动缴费：" prop="costDescription">
          <el-input v-model="ruleForm.costDescription" placeholder="补充说明(缴费用途等说明性文字)">
            <el-select v-model="ruleForm.cost" slot="prepend">
              <el-option v-for="(item, index) in options.fee"
                         :key="index"
                         :label="item.value"
                         :value="item.value"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="人数限制：">
          <el-input-number v-model="ruleForm.peopleNum" :min="1"/>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="ruleForm.contactPhone" placeholder="输入联系人电话号码">
          </el-input>
        </el-form-item>
        <el-form-item label="活动海报：">
          <img-upload ref="imgUpload" v-on:upload-pic="uploadPic" :options="picOptions"
                      img-width="240px" img-height="120px"></img-upload>
        </el-form-item>
        <el-form-item>
          <el-button style="float: left;" @click.native="cancel">取消创建</el-button>
          <el-button style="float: right;" type="primary" @click.native="submitThisForm('ruleForm')">创建活动</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgUpload from '@/components/ImgUpload'

export default {
  name: 'promotional',
  components: {
    imgUpload
  },
  data () {
    return {
      notifyPromise: Promise.resolve(),
      ruleForm: {
        activityName: '', // 活动名称
        activityContent: '', // 活动简介
        activityArea: '', // 活动地点
        signUpTime: '', // 报名起讫时间
        registrationStartTime: '', // 报名开始时间
        registrationClosingTime: '', // 报名结束时间
        activityTime: '', // 活动起讫时间
        startTime: '', // 活动开始时间
        endTime: '', // 活动结束时间
        cost: '', // 活动花费
        costDescription: '', // 花费说明
        peopleNum: 1, // 人数限制
        contactPhone: '', // 联系方式
        pictureFile: {}, // 上传的图片
        imageUrl: ''
      },
      options: {
        fee: [
          { value: '免费' },
          { value: '50元以下' },
          { value: '20-200元' },
          { value: '200-500元' },
          { value: '500-1000元' },
          { value: '1000元以上' }
        ]
      },
      picOptions: {
        fixedNumber: [5, 3]
      },
      rules: {
        activityName: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        activityContent: [
          {required: true, message: '请输入活动简介', trigger: 'blur'}
        ],
        activityArea: [
          {required: true, message: '请指定活动地点', trigger: 'blur'}
        ],
        signUpTime: [
          {required: true, message: '请选择起止日期', trigger: 'blur'}
        ],
        activityTime: [
          {required: true, message: '请选择起止日期', trigger: 'blur'}
        ],
        costDescription: [
          {required: true, message: '请输入费用说明', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 放弃创建，返回上一页面
    cancel () {
      this.$confirm('确认取消发起活动？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {})
    },
    // 将图片赋到表单中
    async uploadPic (data) {
      let arr = data.file.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      let ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      this.ruleForm.pictureFile = new File([ia], data.name, {type: mime})
      // this.ruleForm.pictureFile = data.file
    },
    // 提交表单
    submitThisForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/activity/addActivity/'
          // this.ruleForm.publisherId = this.$store.state.user.id
          this.ruleForm.registrationStartTime = this.ruleForm.signUpTime[0]
          this.ruleForm.registrationClosingTime = this.ruleForm.signUpTime[1]
          this.ruleForm.startTime = this.ruleForm.activityTime[0]
          this.ruleForm.endTime = this.ruleForm.activityTime[1]
          // 将json转为formData
          const formData = new FormData()
          Object.keys(this.ruleForm).forEach((item) => {
            formData.append(item, this.ruleForm[item])
          })
          console.log(url)
          console.log(this.ruleForm)
          formData.forEach((item) => {
            console.log(item)
          })
          this.$api.http.upload(url, formData)
            .then(res => {
              this.$message.success('成功!')
              this.$confirm('您已成功创建活动，点击确认将跳转到活动报名页！', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消'
              }).then(() => {
                this.$router.push('/activity/registration')
              }).catch(() => {})
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            message: '表单有未填写或填写不规范的项，请检查您填写的信息是否规范。',
            type: 'error',
            duration: 4000
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">

  .activity-promotional {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .activity-promotional-container {
    margin: 10px auto;
    border-radius: 10px;
    width: 700px;
    background-color: #f6f8fc;
  }

  .activity-promotional .el-select > .el-input {
    width: 130px !important;
  }

  .activity-promotional .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .activity-promotional .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .activity-promotional .el-form {
    width: 100%;
    max-width: 660px;

  }

  .avatar-uploader {
    float: left;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    background: rgba(255, 255, 255, 0.5);
    border: 2px dashed #8c939d;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

</style>
