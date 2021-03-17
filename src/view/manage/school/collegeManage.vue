<template>
  <div class="container">
    <div class="container-inner">
      <basic-table-temp :ref="refName"
                        :url="url"
                        :search-show="false"
                        :title-show="false"
                        :table-header-list="tableHeaderList"
                        :search-list="tableHeaderList"
                        :button-show="buttonShow"
                        @click-row="clickRow"
                        @add-record="addRecord"
                        @edit-record="editRecord"
                        @upload-excel="uploadExcelMethod">
        <el-form slot="addForm" :model="addForm" style="overflow: auto" label-width="140px" ref="addForm" :rules="addFormRules">
          <el-form-item label="学院编号：" prop="collegeNumber">
            <el-input v-model="addForm.collegeNumber"></el-input>
          </el-form-item>
          <el-form-item label="学院名称：" prop="collegeName">
          <el-input v-model="addForm.collegeName"></el-input>
        </el-form-item>
          <el-form-item label="达标所需积分：" prop="score">
            <el-input v-model="addForm.score"></el-input>
          </el-form-item>
          <el-form-item label="学院简介：">
            <el-input v-model="addForm.collegeInfo"></el-input>
          </el-form-item>
        </el-form>
        <el-form slot="editForm" :model="editForm" style="overflow: auto" label-width="120px" ref="editForm">
          <el-form-item label="学院编号：" prop="collegeNumber">
            <el-input v-model="editForm.collegeNumber"></el-input>
          </el-form-item>
          <el-form-item label="学院名称：" prop="collegeName">
            <el-input v-model="editForm.collegeName"></el-input>
          </el-form-item>
          <el-form-item label="信息简介：" prop="collegeInfo">
            <el-input v-model="editForm.collegeInfo"></el-input>
          </el-form-item>
          <el-form-item label="达标所需积分：">
            <el-input v-model="editForm.score"></el-input>
          </el-form-item>
        </el-form>
      </basic-table-temp>
    </div>
  </div>
</template>

<script>

export default {
  name: 'collegeManage',
  data () {
    return {
      refName: 'studentForm',
      url: {
        refreshUrl: '/college/queryCollegeList',
        addUrl: '/college/addCollege',
        editUrl: '/college/updateCollege',
        searchUrl: '',
        deleteUrl: '/college/deleteCollege'
      },
      tableHeaderList: [
        {value: 'collegeNumber', label: '学院编号', width: '180'},
        {value: 'collegeName', label: '学院名称', width: '120'},
        {value: 'score', label: '达标所需积分', width: '140'},
        {value: 'collegeInfo', label: '学院信息', minWidth: '220'}
      ],
      buttonShow: {
        addButton: true,
        editButton: true,
        deleteButton: true,
        refreshButton: true,
        downloadButton: false,
        uploadButton: false
      },
      addForm: {collegeNumber: '', collegeName: '', collegeInfo: '', score: ''}, // 新增
      editForm: {collegeNumber: null, collegeName: null, collegeInfo: null, score: null}, // 编辑
      addFormRules: {
        collegeNumber: [
          {required: true, message: '学员编号不能为空!', trigger: 'blur'}
        ],
        collegeName: [
          {required: true, message: '学院名不能为空!', trigger: 'blur'}
        ],
        score: [
          {required: true, message: '必须设置积分!', trigger: 'blur'}
        ]
      },
      collegeList: [],
      allClassList: [],
      classList: [],
      fileList: []
    }
  },
  methods: {
    async addRecord () {
      await this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$refs[this.refName].createMethod(this.url.addUrl, this.addForm)
        }
      })
    },
    async editRecord () {
      this.allClassList.map(item => {
        if (this.editForm.classesName === item.className) {
          this.editForm.classesId = item.id
        }
      })
      await this.$refs[this.refName].updateMethod(this.url.editUrl, this.editForm)
    },
    // 点击将基本信息项的某一行信息付给编辑表
    clickRow (row) {
      this.editForm = row
    },
    // 获取学院列表
    getCollege () {
      this.$api.http.get('/college/queryCollegeList')
        .then(res => {
          this.collegeList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取班级列表
    getClass (formName) {
      this.classList = []
      if (formName === '') {
        this.$api.http.get('/classes/queryClassesList')
          .then(res => {
            this.allClassList = res.data
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this[formName].collegeId !== '') {
        this.$api.http.get('/classes/queryClassesListByCollege/' + this[formName].collegeId)
          .then(res => {
            this.classList = res.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.warning('请先选择学院!')
      }
    },
    async beforeUpload (file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log(extension)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx' && extension !== 'xls') {
        this.$message.warning('只能上传后缀是.xls或.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    // 文件状态改变
    async handleChange (file, fileList) {
      if (file) {
        this.fileList = fileList.slice(-1)
      }
    },
    // 删除文件
    async handleRemove (file, fileList) {
      this.fileList = []
    },
    // 上传Excel方法
    uploadExcelMethod () {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const data = new FormData()
        const UploadExcel = this.fileList[0].raw
        data.append('excelFile', UploadExcel)
        console.log(data)
        this.$api.http.upload('/importFile/readExcel', data)
          .then(res => {
            this.$message.success('导入成功！')
            this.$refs[this.refName].refreshRecord()
          })
      }
    }
  },
  mounted () {
    this.$refs[this.refName].getRecord(this.url.refreshUrl)
    this.getCollege()
    this.getClass('')
  }
}
</script>

<style scoped>
  /*.container {*/
  /*  width: 100%;*/
  /*  max-width: 1140px;*/
  /*  min-height: 100px;*/
  /*  margin: 0 auto;*/
  /*  background-color: white;*/
  /*  padding-bottom: 50px;*/
  /*}*/

  .container {
    width: 100%;
  }

  .container-inner {
    margin: 10px;
    padding: 10px;
    background-color: white;
  }

  .upload-excel-col {
    align-items: center;
    display: flex;
    margin: 20px 0 20px 40px;
  }
</style>
