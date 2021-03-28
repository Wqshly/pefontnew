<template>
  <div class="container">
    <div class="container-inner">
      <basic-table-temp :ref="refName"
                        :url="url"
                        :title-show="false"
                        :table-header-list="tableHeaderList"
                        :search-list="tableHeaderList"
                        @click-row="clickRow"
                        @add-record="addRecord"
                        @edit-record="editRecord"
                        @download-template="downloadTemplate"
                        @upload-excel="uploadExcelMethod"
                        @data-format="dataFormat">
        <el-form slot="addForm" :model="addForm" style="overflow: auto" label-width="120px" ref="addForm" :rules="addFormRules">
          <el-form-item label="学院 - 班级：" prop="classesId">
            <el-select v-model="addForm.collegeId" @change="addForm.classesId = ''" placeholder="选择学院" value="">
              <el-option v-for="(item,index) in collegeList"
                         :key="index"
                         :label="item.collegeName"
                         :value="item.id">
              </el-option>
            </el-select>
            &nbsp;-&nbsp;
            <el-select v-model="addForm.classesId" placeholder="选择班级" @click.native="getClass('addForm')" value="">
              <el-option v-for="(item,index) in classList"
                         :key="index"
                         :label="item.className"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号：" prop="studentNumber">
            <el-input v-model="addForm.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="studentName">
            <el-input v-model="addForm.studentName"></el-input>
          </el-form-item>
          <el-form-item label="当前学期：">
            <el-input v-model="addForm.gradeNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio v-model="addForm.sex" label="男">男</el-radio>
            <el-radio v-model="addForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker v-model="addForm.birthday" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="民族：" prop="nationalCode">
            <el-input v-model="addForm.nationalCode"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model="addForm.idCard"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
          </el-form-item>
        </el-form>
        <el-form slot="editForm" :model="editForm" style="overflow: auto" label-width="120px" ref="editForm">
          <el-form-item label="学院 - 班级：" prop="classesId">
            <el-select v-model="editForm.collegeId" @change="editForm.classesId = ''" placeholder="选择学院" value="">
              <el-option v-for="(item,index) in collegeList"
                         :key="index"
                         :label="item.collegeName"
                         :value="item.id">
              </el-option>
            </el-select>
            &nbsp;-&nbsp;
            <el-select v-model="editForm.classesName" placeholder="选择班级" @click.native="getClass('editForm')" value="">
              <el-option v-for="(item,index) in classList"
                         :key="index"
                         :label="item.className"
                         :value="item.className">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号：" prop="studentNumber">
            <el-input v-model="editForm.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="studentName">
            <el-input v-model="editForm.studentName"></el-input>
          </el-form-item>
          <el-form-item label="当前学期：">
            <el-input v-model="editForm.gradeNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio v-model="editForm.sex" label="男">男</el-radio>
            <el-radio v-model="editForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker v-model="editForm.birthday" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="民族：" prop="nationalCode">
            <el-input v-model="editForm.nationalCode"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model="editForm.idCard"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
          </el-form-item>
        </el-form>
        <div slot="excelForm">
          <div class="upload-excel-col">
            <div style="float: left;padding-right: 20px;">
              <p style="font-size: 20px;">如您尚未上传班级信息，请先上传班级信息，否则将导入失败！</p>
            </div>
          </div>
          <div class="upload-excel-col">
            <div style="float: left;padding-right: 20px;">
              <p>1.下载《学院-班级信息表.xlsx》模板: </p>
            </div>
            <el-button>
              下载&nbsp;<font-awesome-icon :icon="['fas', 'download']" class="button-icon"></font-awesome-icon>
            </el-button>
          </div>
          <div class="upload-excel-col">
            <div style="float: left;padding-right: 20px;">
              <p>2.上传《学院-班级信息表》: </p>
            </div>
            <el-button>
              下载&nbsp;<font-awesome-icon :icon="['fas', 'download']" class="button-icon"></font-awesome-icon>
            </el-button>
          </div>
          <div class="upload-excel-col">
            <div style="float: left;padding-right: 20px;">
              <p>1.下载《学生信息表》模板: </p>
            </div>
            <el-button>
              下载&nbsp;<font-awesome-icon :icon="['fas', 'download']" class="button-icon"></font-awesome-icon>
            </el-button>
          </div>
          <div class="upload-excel-col">
            <div style="float: left;padding-right: 20px;">
              <p>2.上传文件导入数据: </p>
            </div>
            <el-upload ref="upload"
                       action
                       :auto-upload="false"
                       :limit="1"
                       accept=".xls,.xlsx"
                       :file-list="fileList"
                       :before-upload="beforeUpload"
                       :on-change="handleChange"
                       :on-remove="handleRemove">
              <el-button>
                上传&nbsp;<font-awesome-icon :icon="['fas', 'cloud-upload-alt']" class="button-icon"></font-awesome-icon>
              </el-button>
            </el-upload>
          </div>
        </div>
      </basic-table-temp>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/commons/date'

export default {
  name: 'studentManage',
  data () {
    // 身份证校验
    const idCardValidity = (rule, code, callback) => {
      const city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
      }
      let tip = ''
      let pass = true

      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
      } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
      }
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
    }
    return {
      refName: 'studentForm',
      url: {
        refreshUrl: '/student/queryStudentInfoBySchool',
        addUrl: '/student/addStudent',
        editUrl: '/school/updateSchool',
        searchUrl: '/student/queryStudentInfoBySchool',
        deleteUrl: '/student/deleteStudent'
      },
      tableHeaderList: [
        {value: 'collegeName', label: '所属学院', width: '120'},
        {value: 'classesName', label: '所属班级', width: '180'},
        {value: 'studentName', label: '学生姓名', width: '140'},
        {value: 'studentNumber', label: '学生学号', width: '180'},
        {value: 'term', label: '当前学期', width: '100'},
        {value: 'sex', label: '性别', width: '80'},
        {value: 'birthday', label: '出生日期', width: '140'},
        {value: 'gradeNumber', label: '年级编号', width: '120'},
        {value: 'nationalCode', label: '民族编号', width: '120'},
        {value: 'idCard', label: '身份证号', width: '160'},
        {value: 'address', label: '家庭住址', minWidth: '140'}
      ],
      addForm: {collegeId: '', classesId: '', studentName: '', studentNumber: '', term: '', sex: '', birthday: '', gradeNumber: '', nationalCode: '', idCard: '', address: ''}, // 新增
      editForm: {collegeId: '', collegeName: '', classesId: '', classesName: '', studentName: '', studentNumber: '', term: '', sex: '', birthday: '', gradeNumber: '', nationalCode: '', idCard: '', address: ''}, // 编辑
      addFormRules: {
        classesId: [
          {required: true, message: '请选择学院和班级', trigger: 'blur'}
        ],
        studentNumber: [
          {required: true, message: '请输入学号', trigger: 'blur'}
        ],
        studentName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请选择出生日期', trigger: 'blur'}
        ],
        nationalCode: [
          {required: true, message: '请选择民族', trigger: 'blur'}
        ],
        idCard: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号'
          },
          {validator: idCardValidity, trigger: 'blur'}
        ]
      },
      collegeList: [],
      allClassList: [],
      classList: [],
      fileList: []
    }
  },
  methods: {
    // 数据规范
    dataFormat (data, tableHeader, callback) {
      if (tableHeader === 'birthday') {
        if (data === '' || data === null) {
          const status = '未填写'
          callback(status)
        } else {
          const date = new Date(data)
          callback(formatDate(date, 'yyyy年MM月dd日'))
        }
      } else if (tableHeader === 'sex') {
        let status = ''
        if (data !== '' && data !== null) {
          if (data === '1') {
            status = '男'
            callback(status)
          } else if (data === '2') {
            status = '女'
            callback(status)
          }
        } else {
          status = '未填写'
          callback(status)
        }
      } else {
        callback(data)
      }
    },
    async addRecord () {
      await this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$refs[this.refName].createMethod('/student/addStudent', this.addForm)
        }
      })
    },
    async editRecord () {
      this.allClassList.map(item => {
        if (this.editForm.classesName === item.className) {
          this.editForm.classesId = item.id
        }
      })
      await this.$refs[this.refName].updateMethod('/student/updateStudent', this.editForm)
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
    downloadTemplate () {
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
