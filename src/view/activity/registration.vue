<template>
  <div class="container">
    <div style="margin-top: 20px;">
      <!-- 表前工具栏 -->
      <div v-show="!detailDialogVisible">
        <div class="table-tools-column">
          <div style="float: right">
            <el-input v-model="searchData.content" class="search-box" placeholder="请输入内容搜索" size="small" clearable>
              <template slot="prepend">
                <el-select style="width: 100px;" v-model="searchData.title" placeholder="请选择">
                  <el-option v-for="(item, index) in searchList"
                             :key="index"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-input>
            <el-button-group>
              <el-button size="small" @click.native="search" icon="el-icon-search">搜索</el-button>
              <el-button size="small" @click.native="reset" icon="el-icon-refresh">重置</el-button>
            </el-button-group>
          </div>
        </div>
        <!-- 表格内容 -->
        <el-row>
          <template v-if="tableData.length !== 0">
            <slot name="card-content"></slot>
            <template v-for="(item,index) in tableData">
              <!-- @为v-on的缩写，:为v-bind的缩写 -->
              <el-card :key="index" style="margin: 10px 0; cursor: pointer; border-radius: 10px;" @click.native="rowClick(item)">
                <div style="width: 260px;float: left;">
                  <img style="width:100%; height:100%; border-radius: 5px;" v-lazy="'http://www.xiaoyuanpe.com/' + item.imagePath.split('\\')[item.imagePath.split('\\').length - 1]" alt="加载超时" />
                </div>
                <div style="float: left; padding-left: 30px; width: 600px;">
                  <div style="font-size: 24px; font-style: italic;margin-bottom: 10px;">{{ item.activityName }}</div>
                  <div><i class="el-icon-alarm-clock"></i> 报名时间：{{formatDate(item.registrationStartTime)}} 至 {{formatDate(item.registrationClosingTime)}}</div>
                  <div><i class="el-icon-time"></i> 活动时间：{{formatDate(item.startTime)}} 至 {{formatDate(item.endTime)}}</div>
                  <div><i class="el-icon-user"></i> 已报名：{{item.signNum}}/{{item.peopleNum}}人</div>
                  <div><i class="el-icon-location-information"></i> 活动地点：{{item.activityArea}}</div>
                </div>
                <span style="color: #e95f13;display: block"><br/></span>
              </el-card>
            </template>
          </template>
          <template v-if="tableData.length === 0">
            <div style="width: 100%;text-align: center;color: #8c939d;margin: 20px;">查无数据</div>
          </template>
        </el-row>
        <!-- 表后页码等 -->
        <el-row>
          <div class="table-footer" style="float: right;">
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="currentPageNumber"
              :page-sizes="[5, 10, 15, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="recordTotal"
              class="pagination-style"></el-pagination>
          </div>
        </el-row>
      </div>
      <template v-if="detailDialogVisible">
        <el-card style="margin: 20px 0; padding-bottom: 20px;border-radius: 20px;">
          <el-page-header @back="goBack" :content="selectRecord.activityName">
          </el-page-header>
          <el-divider content-position="right"><el-tag style="margin-left: 10px;">报名中</el-tag></el-divider>
          <div style="padding: 10px;">
            <div class="activity-detail-row">发布者：{{selectRecord.publisherId}} ({{selectRecord.collegeId}})</div>
            <div class="activity-detail-row">已报名：<span style="font-style: italic;">{{selectRecord.signNum}}</span>/<span style="font-style: italic;">{{selectRecord.peopleNum}}</span>人</div>
            <div class="activity-detail-row">活动简介：{{selectRecord.activityContent}}</div>
            <div class="activity-detail-row">活动地点：{{selectRecord.activityArea}}</div>
            <div class="activity-detail-row">联系方式：{{selectRecord.contactPhone}}</div>
            <div class="activity-detail-row">报名时间：{{formatDate(selectRecord.registrationStartTime)}} 至 {{formatDate(selectRecord.registrationClosingTime)}}</div>
            <div class="activity-detail-row">活动开展时间：{{formatDate(selectRecord.startTime)}} 至 {{formatDate(selectRecord.endTime)}}</div>
            <div class="activity-detail-row">活动缴费：{{selectRecord.cost}}</div>
            <div class="activity-detail-row">缴费说明：{{selectRecord.costDescription === null ? '无说明' : selectRecord.costDescription}}</div>
            <div class="activity-detail-row">联系方式：{{selectRecord.contactPhone === null ? '无' : selectRecord.contactPhone}}</div>
            <div class="activity-detail-row">宣传海报：<img style="width: 300px; vertical-align: text-top;" v-lazy="formatPath(selectRecord.imagePath)" alt="加载超时"/></div>
          </div>
          <el-button type="primary" style="float: right;" @click.native="handleSign">报名参加</el-button>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'registration',
  data () {
    return {
      url: {
        refreshUrl: '/activity/queryActivityListSignIn',
        searchUrl: '/activity/queryActivityListAll'
      },
      tableData: [], // 表数据
      searchList: [
        {
          label: 'id',
          value: 'id'
        },
        {
          label: '活动名称',
          value: 'activityName'
        },
        {
          label: '活动地点',
          value: 'activityArea'
        },
        {
          label: '活动开始时间',
          value: 'startTime'
        },
        {
          label: '活动结束时间',
          value: 'endTime'
        }
      ],
      tablePK: 'id',
      searchData: {title: '', content: ''},
      defaultSort: {prop: 'id', order: 'ascending'},
      tableDataIndex: -1, // 当前选中行的序号，用于编辑、详情页中的上一条下一条读取数据。如无该变量，直接使用indexOf(selectRecord)查行号，则编辑后无法回到正确的行数上。
      selectRecord: {}, // 查看详情的条目序号
      lastUrl: '', // 查询和刷新页面用的Url
      lastObject: {}, // 查询和刷新页面用的Object
      recordTotal: 0, // 数据的总条数
      currentPageNumber: 1, // 当前页
      pageSize: 15, // 每页显示条数
      sortField: 'id', // 排序的字段
      sortMethod: 'ascending', // 排序方法(升序、降序、不排序)
      tableLoading: false, // 表格显示loading
      detailDialogVisible: false // 查看详情窗口
    }
  },
  methods: {
    // 返回
    goBack () {
      this.detailDialogVisible = false
    },
    // 时间转换
    formatDate (date) {
      if (date !== null && date !== '' && date !== undefined) {
        return date.slice(0, 4) + '年' + date.slice(5, 7) + '月' + date.slice(8, 10) + '日 ' + date.slice(11, 19)
      } else {
        return date
      }
    },
    formatPath (data) {
      if (data !== null && data !== '' && data !== undefined) {
        return 'http://www.xiaoyuanpe.com/' + data.split('\\')[data.split('\\').length - 1]
      } else {
        return data
      }
    },
    // 点击某一行
    rowClick (item) {
      // assign 使后者的值赋到前者中。
      this.selectRecord = item
      this.detailDialogVisible = true
      this.tableDataIndex = this.tableData.indexOf(this.selectRecord)
    },
    // 关闭详情页面
    closeDetailDialog () {
      this.detailDialogVisible = false
    },
    // 刷新记录
    refreshRecord () {
      this.getRecord(null)
    },
    search () {
      if (this.searchData.title === '') {
        this.$message.warning('请勾选要筛选的项')
      } else if (this.searchData.content === '') {
        this.$message.warning('请输入搜索内容！')
      } else {
        this.getRecord(this.url.searchUrl + '/' + this.searchData.title + '/' + this.searchData.content)
      }
    },
    // 驼峰转下划线
    toLine (name) {
      return name.replace(/([A-Z])/g, '_$1').toLowerCase()
    },
    // 排序
    sortChange (data) {
      // 由于后端排顺序，故在此处将sort排序中的null值排除。
      if (data.order === null) {
        data.column.order = this.sortMethod === 'descending' ? data.order = 'ascending' : data.order = 'descending'
        this.sortMethod = data.prop
      }
      this.sortField = data.prop
      this.sortMethod = data.order
      this.refreshRecord()
    },
    reset () {
      this.searchData = {title: '', content: ''}
      this.getRecord(this.url.refreshUrl)
    },
    getRecord (url) {
      this.selectRecord = {
        signNum: 0
      }
      let obj = {}
      if (url === null) {
        url = this.lastUrl
        obj = this.lastObject
      }
      obj.currentPageNumber = this.currentPageNumber
      obj.pageSize = this.pageSize
      obj.sort = this.toLine(this.sortField) + ' ' + this.sortMethod.replace('descending', ' desc').replace('ascending', ' asc')
      let objJson = JSON.stringify(obj)
      this.tableLoading = true
      this.$api.http.postJson(url, objJson)
        .then(res => {
          console.log(res.data)
          this.tableLoading = false
          this.tableData = res.data.list
          this.recordTotal = res.data.total // 总条数
          this.lastUrl = url
          this.lastObject = JSON.parse(objJson)
        })
        .catch(err => {
          console.log(err)
        })
    },
    sizeChange (val) {
      this.pageSize = val
      this.refreshRecord()
    },
    currentChange (val) {
      this.currentPageNumber = val
      this.refreshRecord()
    },
    // 上一条按钮
    previousRecord () {
      if (this.tableDataIndex - 1 === -1) {
        this.tableDataIndex = this.tableData.length - 1
      } else {
        this.tableDataIndex -= 1
      }
      this.selectRecord = this.tableData[this.tableDataIndex]
    },
    // 下一条按钮
    nextRecord () {
      if (this.tableDataIndex + 1 === this.tableData.length) {
        this.tableDataIndex = 0
      } else {
        this.tableDataIndex += 1
      }
      this.selectRecord = this.tableData[this.tableDataIndex]
    },
    // 报名
    handleSign () {
      const url = '/activity/signUp/' + this.selectRecord.id
      this.$confirm('确认报名？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$api.http.get(url)
            .then(res => {
              if (res.code === 0) {
                this.$message.success('恭喜你，报名成功')
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(() => {})
        })
    }
  },
  mounted () {
    this.getRecord(this.url.refreshUrl)
  }
}
</script>

<style lang="less" scoped>

  .container {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
  }

  .activity-detail-row {
    margin: 30px 0;
  }

  .table-tools-column {
    width: 100%;
    min-height: 50px;
  }

  .search-box {
    width: 250px;
  }

  .button {
    color: #fff;
    background: inherit;
    border: none inherit;
  }

  .button:hover {
    background-color: #49c7ff;
  }

  .button:active {
    background-color: #49c7ff;
  }

  .button:focus {
    background-color: #49c7ff;
  }

  .button-icon {
    margin: 5px;
  }

  .table-footer {
    background: rgba(255, 255, 255, 0.7);
    height: 40px;
  }
</style>
