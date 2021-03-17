<template>
  <div class="page-area">
    <!-- v-show 不可在template中使用 -->
    <div v-show="!isRegistrationPage">
      <el-input
        type="text"
        v-model="search"
        prefix-icon="el-icon-search"
        style="width: 200px;margin:20px;"
        placeholder="按活动名搜索"></el-input>
      <template v-for="(item, index) in handleData()">
        <div :key="index" @click="handleClick(item)">
          <el-card shadow="hover" style="margin: 5px; padding: 5px; border-radius: 10px; cursor:pointer;">
            <div style="width: 260px;float: left;">
              <img style="width:100%; height:100%; border-radius: 5px;"
                   v-lazy="'http://www.xiaoyuanpe.com/' + item.imagePath.split('\\')[item.imagePath.split('\\').length - 1]"
                   alt="加载超时"/>
            </div>
            <div style="float: left; padding-left: 30px; width: 600px;">
              <div style="float: right">
                <el-tag type="warning">待审核</el-tag>
              </div>
              <div style="font-size: 24px; font-style: italic;margin-bottom: 10px;">{{ item.activityName }}</div>
              <div><i class="el-icon-alarm-clock"></i> 报名时间：{{formatDate(item.registrationStartTime)}} 至
                {{formatDate(item.registrationClosingTime)}}
              </div>
              <div><i class="el-icon-time"></i> 活动时间：{{formatDate(item.startTime)}} 至 {{formatDate(item.endTime)}}</div>
              <div><i class="el-icon-user"></i> 已报名：{{item.signNum}}/{{item.peopleNum}}人</div>
              <div><i class="el-icon-location-information"></i> 活动地点：{{item.activityArea}}</div>
            </div>
            <span style="color: #e95f13;display: block"><br/></span>
          </el-card>
        </div>
      </template>
      <div style="float: right;">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
      </div>
    </div>
    <template v-if="isRegistrationPage">
      <el-card style="margin-top: 20px; padding-bottom: 20px;border-radius: 20px;">
        <el-page-header @back="goBack" :content="item.activityName"></el-page-header>
        <el-divider content-position="right">
          <el-tag style="margin-left: 10px;">待审核</el-tag>
        </el-divider>
        <div style="padding: 10px;">
          <div class="activity-detail-row">发布者：{{item.publisherId}} ({{item.college}})</div>
          <div class="activity-detail-row">人数限制：{{item.peopleNum}}人</div>
          <div class="activity-detail-row">活动简介：{{item.activityContent}}</div>
          <div class="activity-detail-row">活动地点：{{item.activityArea}}</div>
          <div class="activity-detail-row">联系方式：{{item.contactPhone}}</div>
          <div class="activity-detail-row">报名时间：{{formatDate(item.registrationStartTime)}} 至
            {{formatDate(item.registrationClosingTime)}}
          </div>
          <div class="activity-detail-row">活动开展时间：{{formatDate(item.startTime)}} 至 {{formatDate(item.endTime)}}</div>
          <div class="activity-detail-row">活动缴费：{{item.cost}}</div>
          <div class="activity-detail-row">缴费说明：{{item.costDescription === null ? '无说明' : item.costDescription}}</div>
          <div class="activity-detail-row">联系方式：{{item.contactPhone === null ? '无' : item.contactPhone}}</div>
          <div class="activity-detail-row">宣传海报：<img style="width: 300px; vertical-align: text-top;"
                                                     v-lazy="'http://www.xiaoyuanpe.com/' + item.imagePath.split('\\')[item.imagePath.split('\\').length - 1]"
                                                     alt="加载超时"/></div>
        </div>
        <el-button style="float: left;" @click.native="approval(6)">拒绝通过</el-button>
        <el-button type="primary" style="float: right;" @click.native="approval(1)">审核通过</el-button>
      </el-card>
    </template>
  </div>
</template>

<script>

export default {
  name: 'activityApproval',
  data () {
    return {
      isRegistrationPage: false, // 是否为报名参赛页
      tableData: [], // 返还的数据
      search: '', // 搜索内容
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条数
      total: 0, // 数据总条数
      item: {} // 查看详情的条目序号
    }
  },
  methods: {
    // 获取数据
    getActivity () {
      this.$api.http.get('/activity/selectReview')
        .then(res => {
          this.tableData = res.data
          this.total = this.tableData.length
          // this.total = res.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 筛选数据
    handleData () {
      let tempData = this.tableData.filter((data) => {
        return !this.search || data.activityName.toLowerCase().includes(this.search.toLowerCase())
      })
      this.total = tempData.length
      return tempData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    // 时间转换
    formatDate (date) {
      if (date === null) {
        return null
      }
      return date.slice(0, 4) + '年' + date.slice(5, 7) + '月' + date.slice(8, 10) + '日 ' + date.slice(11, 19)
    },
    // 为详细页面赋值
    handleClick (item) {
      this.isRegistrationPage = true
      this.item = item
      console.log(this.item)
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 当前页数
    handleCurrentChange (val) {
    },
    // 返回
    goBack () {
      this.isRegistrationPage = false
    },
    // 审核通过或拒绝
    approval (code) {
      const url = '/activity/reviewById/' + this.item.id + '/' + code
      this.$confirm('确认审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '撤销'
      })
        .then(() => {
          this.$api.http.get(url)
            .then(res => {
              this.$message.success('完成审核！')
            })
            .catch(err => {
              this.$message.error(err.msg)
            })
        })
    },
    // 报名
    handleSign () {
      const url = '/activity/signUp/' + this.item.id
      this.$confirm('确认报名？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$api.http.get(url)
            .then(res => {
              this.$message.success('恭喜你，报名成功')
            })
            .catch(err => {
              this.$message.error(err.msg)
            })
        })
    }
  },
  mounted () {
    this.getActivity()
  }
}
</script>

<style scoped>
  .page-area {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    min-height: 800px;
  }

  .activity-detail-data {
    font-size: 15px;
    font-weight: 300;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;
  }

  .activity-detail-row {
    margin: 30px 0;
  }
</style>
