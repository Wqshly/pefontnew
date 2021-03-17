<template>
  <div class="container">
    <div style="margin-top: 20px;">
      <basic-table-temp  :ref="refName"
                         :table-header-list="tableHeaderList"
                         :search-list="tableHeaderList"
                         :url="url"
                         :button-show="buttonShow"
                         :func-btn="funcBtn"
                         sortable="false"
                         @btn-click="btnClick"
                         @btn-disabled="btnDisabled"
                         @select-change="selectChange"
                         @data-format="dataFormat">
        <el-button-group slot="expand-button">
          <el-button size="small" :disabled="this.selectRecord.length === 0" @click.native="MultiSignIn">批量签到</el-button>
          <el-button size="small" :disabled="this.selectRecord.length === 0" @click.native="MultiSignOut">批量签退</el-button>
        </el-button-group>
      </basic-table-temp>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/commons/date'

export default {
  name: 'clockIn',
  data () {
    return {
      refName: 'setCheckStaffForm',
      tableHeaderList: [
        {value: 'studentNumber', label: '学生学号', width: '180'},
        {value: 'studentName', label: '学生姓名', width: '160'},
        {value: 'signTime', label: '签到时间', width: '160'},
        {value: 'signOutTime', label: '签退时间', width: '160'},
        {value: 'flag', label: '状态', minWidth: '160'}
      ],
      url: {
        refreshUrl: '/SignIn/getSignInByClass',
        searchUrl: '/SignIn/getSignByClass'
      },
      buttonShow: {},
      funcBtn: {
        isShow: true,
        width: 200,
        fixed: 'right',
        buttons: [
          {
            name: '签到',
            value: 'signIn'
          },
          {
            name: '签退',
            value: 'signOut'
          }
        ]
      },
      clockDate: true,
      selectRecord: []
    }
  },
  methods: {
    // 判断是否为签到日
    isClockDate () {
      var date = new Date().getDay()
      if (date === 6 || date === 0) {
        this.$message.warning('今天不是签到日！')
        this.$router.back()
      }
    },
    // 签到、签退按钮点击事件
    btnClick (value, index) {
      if (value === 'signIn') {
        this.$api.http.postJson('/SignIn/setSignInByClass', [this.$refs[this.refName].tableData[index].id])
          .then(res => {
            this.$refs[this.refName].refreshRecord()
            this.$message.success('签到成功!')
          })
      } else if (value === 'signOut') {
        this.$api.http.postJson('/SignIn/setSignOutByClass', [this.$refs[this.refName].tableData[index].id])
          .then(res => {
            this.$refs[this.refName].refreshRecord()
            this.$message.success('签退成功!')
          })
      }
    },
    // 判断签到、签退按钮是否可点击
    btnDisabled (value, row, callback) {
      let flag = false
      if (value === 'signIn') {
        flag = row.flag !== 0
      } else if (value === 'signOut') {
        flag = row.flag !== 1
      }
      callback(flag)
    },
    // 监听勾选变化
    selectChange (selects) {
      this.selectRecord = selects
    },
    // 批量签到
    MultiSignIn () {
      const selectMultipleId = this.selectRecord.map(item => item.id)
      this.$api.http.postJson('/SignIn/setSignInByClass', selectMultipleId)
        .then(res => {
          this.$refs[this.refName].refreshRecord()
          this.$message.success('签到成功!')
        })
    },
    // 批量签退
    MultiSignOut () {
      const selectMultipleId = this.selectRecord.map(item => item.id)
      this.$api.http.postJson('/SignIn/setSignOutByClass', selectMultipleId)
        .then(res => {
          this.$refs[this.refName].refreshRecord()
          this.$message.success('签退成功!')
        })
    },
    // 数据规范
    dataFormat (data, tableHeader, callback) {
      if (tableHeader === 'signTime' || tableHeader === 'signOutTime') {
        if (data === '' || data === null) {
          const status = '无'
          callback(status)
        } else {
          const date = new Date(data)
          callback(formatDate(date, 'hh时mm分ss秒'))
        }
      } else if (tableHeader === 'flag') {
        let status = ''
        if (data === 0) {
          status = '未签到'
        } else if (data === 1) {
          status = '未签退'
        } else if (data === 2) {
          status = '已签退'
        }
        callback(status)
      } else {
        callback(data)
      }
    }
  },
  mounted () {
    // this.isClockDate()
    this.$refs[this.refName].getRecord(this.url.refreshUrl)
  }
}
</script>

<style scoped>

  .container {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
  }
</style>
