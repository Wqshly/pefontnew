<template>
    <div class="container">
        <div class="card-container">
          <basic-card-temp :search-list="searchList"
                           :ref="cardRefs">
            <template slot="card-data" slot-scope="item">
              <div style="width: 260px;float: left;">
                <img style="width:100%; height:100%; border-radius: 5px;" v-lazy="formatImgPath(item.data.imagePath)" alt="加载超时" />
              </div>
              <div style="float: left; padding-left: 30px; width: 600px;">
                <div style="font-size: 24px; font-style: italic;margin-bottom: 10px;">{{ item.data.activityName }}</div>
                <div><i class="el-icon-alarm-clock"></i> 活动名称：{{item.data.activityName}}</div>
                <div><i class="el-icon-alarm-clock"></i> 报名时间：{{formatTime(item.data.registrationStartTime)}} 至 {{formatTime(item.data.registrationClosingTime)}}</div>
                <div><i class="el-icon-time"></i> 活动时间：{{formatTime(item.data.startTime)}} 至 {{formatTime(item.data.endTime)}}</div>
                <div><i class="el-icon-user"></i> 报名人数：{{item.data.signNum}}/{{item.data.peopleNum}}人</div>
                <div><i class="el-icon-location-information"></i> 活动地点：{{item.data.activityArea}}</div>
              </div>
            </template>
            <template slot="card-detail-data" slot-scope="selectRecord">
              <el-page-header @back="goBack" :content="selectRecord.data.activityName"></el-page-header>
              <el-divider content-position="right">
                <el-tag style="margin-left: 10px;">{{statusFormat(selectRecord.data.status)}}</el-tag>
              </el-divider>
              <div style="padding: 10px;">
                <div class="activity-detail-row">发布者：{{selectRecord.data.publisherId}} ({{selectRecord.data.college}})</div>
                <div class="activity-detail-row">人数限制：{{selectRecord.data.peopleNum}}人</div>
                <div class="activity-detail-row">活动简介：{{selectRecord.data.activityContent}}</div>
                <div class="activity-detail-row">活动地点：{{selectRecord.data.activityArea}}</div>
                <div class="activity-detail-row">联系方式：{{selectRecord.data.contactPhone}}</div>
                <div class="activity-detail-row">报名时间：{{formatTime(selectRecord.data.registrationStartTime)}} 至
                  {{formatTime(selectRecord.data.registrationClosingTime)}}
                </div>
                <div class="activity-detail-row">活动开展时间：{{formatTime(selectRecord.data.startTime)}} 至 {{formatTime(selectRecord.data.endTime)}}</div>
                <div class="activity-detail-row">活动缴费：{{selectRecord.data.cost}}</div>
                <div class="activity-detail-row">缴费说明：{{selectRecord.data.costDescription === null ? '无说明' : selectRecord.data.costDescription}}</div>
                <div class="activity-detail-row">联系方式：{{selectRecord.data.contactPhone === null ? '无' : selectRecord.data.contactPhone}}</div>
                <div class="activity-detail-row">宣传海报：<img style="width: 300px; vertical-align: text-top;" v-lazy="formatImgPath(selectRecord.data.imagePath)" alt="加载超时"/></div>
              </div>
              <el-button style="float: left;" @click.native="approval(6)">拒绝通过</el-button>
              <el-button type="primary" style="float: right;" @click.native="approval(1)">审核通过</el-button>
            </template>
          </basic-card-temp>
      </div>
    </div>
</template>

<script>
export default {
  name: 'cardTest',
  data () {
    return {
      cardRefs: 'cardRefs',
      url: {
        refreshUrl: '/activity/queryActivityListAll',
        // refreshUrl: '/activity/queryActivityListSignIn',
        searchUrl: '/activity/queryActivityListAll'
      },
      searchList: [
        {label: '活动名称', value: 'search1'},
        {label: '活动地点', value: 'search2'}
      ]
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$refs[this.cardRefs].isDetailPage = false
    },
    statusFormat (data) {
      switch (data) {
        case 1:
          return '待审核'
        case 2:
          return '已审核'
        case 3:
          return '进行中'
        case 4:
          return '已结束'
        case 5:
          return '已过期'
      }
    },
    formatTime (data) {
      if (data === null || data === undefined) {
        return data
      } else {
        return data.slice(0, 4) + '年' + data.slice(5, 7) + '月' + data.slice(8, 10) + '日 ' + data.slice(11, 13) + '时' + data.slice(14, 16) + '分'
      }
    },
    formatImgPath (path) {
      // 遍历ul的时候，第一次会得到一个空值，所以用if排除该空值
      if (path) {
        return 'http://www.xiaoyuanpe.com/' + path.split('\\')[path.split('\\').length - 1]
      }
    },
    // 审核通过或拒绝
    approval (code) {
      const url = '/activity/reviewById/' + this.$refs[this.cardRefs].selectRow.id + '/' + code
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
    }
  },
  mounted () {
    this.$refs[this.cardRefs].getRecord(this.url.refreshUrl)
  }
}
</script>

<style scoped>

  .container {
    width: 100%;
  }

  .card-container {
    margin: 10px;
    padding: 10px;
    background-color: white;
  }

  .activity-detail-row {
    margin: 30px 0;
  }
</style>
