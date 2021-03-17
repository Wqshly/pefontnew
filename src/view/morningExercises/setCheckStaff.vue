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
                           @btn-disabled="btnDisabled">
        </basic-table-temp>
      </div>
    </div>
</template>

<script>
export default {
  name: 'setCheckStaff',
  data () {
    return {
      refName: 'setCheckStaffForm',
      tableHeaderList: [
        {value: 'studentNumber', label: '学生学号', width: '180'},
        {value: 'studentName', label: '学生姓名', minWidth: '120'},
        {value: 'identity', label: '身份', minWidth: '160'}
      ],
      url: {
        refreshUrl: '/student/queryStudentInfoByClass',
        addUrl: '/student/addStudent',
        editUrl: '/school/updateSchool',
        searchUrl: '/student/queryStudentInfoBySchool',
        deleteUrl: '/student/deleteStudent'
      },
      buttonShow: {},
      funcBtn: {
        isShow: true,
        width: 240,
        fixed: 'right',
        buttons: [
          {
            name: '设为签到员',
            value: 'setCheckInStaff'
          },
          {
            name: '撤销签到员',
            value: 'Cancellation'
          }
        ]
      }
    }
  },
  methods: {
    btnClick (value, index) {
      if (value === 'setCheckInStaff') {
        this.$api.http.get('/sport/designateChecker/1/' + this.$refs[this.refName].tableData[index].id)
          .then(res => {
            this.$message.success('设置成功!')
            this.$refs[this.refName].refreshRecord()
          })
      } else if (value === 'Cancellation') {
        this.$api.http.get('/sport/cancelChecker/1/' + this.$refs[this.refName].tableData[index].id)
          .then(res => {
            this.$message.success('撤销成功!')
            this.$refs[this.refName].refreshRecord()
          })
      }
    },
    btnDisabled (value, row, callback) {
      let flag = true
      if (value === 'setCheckInStaff') {
        flag = row.identity !== '学生'
      } else if (value === 'Cancellation') {
        flag = row.identity !== '签到员'
      }
      callback(flag)
    }
  },
  mounted () {
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
