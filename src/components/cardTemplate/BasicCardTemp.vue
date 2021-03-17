<template>
  <div class="container">
    <!-- 展示页内容 -->
    <div v-show="!isDetailPage">
      <!-- 搜索功能 -->
      <div class="table-tools-column">
        <div style="float: left;">
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
      <template v-if="cardData.length !== 0" v-for="(item,index) in cardData">
        <el-card :key="index" class="card-style" @click.native="rowClick(item)">
          <slot name="card-data" :data="item"></slot>
        </el-card>
      </template>
      <template v-if="cardData.length === 0">
        <div style="width: 100%;text-align: center;color: #8c939d;margin: 20px;">查无数据</div>
      </template>
      <div class="card-pagination">
        <div style="float: right;">
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
      </div>
    </div>
    <!-- 详情页内容 -->
    <div v-show="isDetailPage">
      <el-card class="detail-card-style">
        <slot name="card-detail-data" :data="selectRow"></slot>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicCardTemp',
  props: {
    url: {
      default () {
        return {
          refreshUrl: '',
          addUrl: '',
          editUrl: '',
          searchUrl: '',
          deleteUrl: ''
        }
      }
    },
    searchList: {type: Array, required: true} // 搜索字段
  },
  data () {
    return {
      cardData: [], // 数据
      searchData: {
        title: '',
        content: ''
      },
      cardDataIndex: -1, // 当前选中行的序号，用于编辑、详情页中的上一条下一条读取数据。如无该变量，直接使用indexOf(selectRow)查行号，则编辑后无法回到正确的行数上。
      selectRow: {}, // 查看详情的条目序号
      lastUrl: '', // 查询和刷新页面用的Url
      lastObject: {}, // 查询和刷新页面用的Object
      recordTotal: 0, // 数据的总条数
      currentPageNumber: 1, // 当前页
      pageSize: 10, // 每页显示条数
      sortField: 'id', // 排序的字段
      sortMethod: 'ascending', // 排序方法(升序、降序、不排序)
      tableLoading: false, // 表格显示loading
      isDetailPage: false
    }
  },
  methods: {
    search () {
      if (this.searchData.title === '') {
        this.$message.warning('请勾选要筛选的项')
      } else if (this.searchData.content === '') {
        this.$message.warning('请输入搜索内容！')
      } else {
        this.getRecord(this.url.searchUrl + '/' + this.searchData.title + '/' + this.searchData.content)
      }
    },
    reset () {
      this.searchData = {title: '', content: ''}
      this.getRecord(this.url.refreshUrl)
    },
    // 点击某一行的事件
    rowClick (item) {
      // assign 使后者的值赋到前者中。
      this.selectRow = item
      this.cardDataIndex = this.cardData.indexOf(this.selectRow)
      this.isDetailPage = true
    },
    // 页码发生变化时
    sizeChange (val) {
      this.pageSize = val
      this.refreshRecord()
    },
    // 当前页发生变化时
    currentChange (val) {
      this.currentPageNumber = val
      this.refreshRecord()
    },
    // 获取记录
    getRecord (url) {
      this.selectRow = {}
      let obj = {}
      if (url === null) {
        url = this.lastUrl
        obj = this.lastObject
      }
      obj.currentPageNumber = this.currentPageNumber
      obj.pageSize = this.pageSize
      obj.sort = this.toLine(this.sortField) + ' ' + this.sortMethod.replace('descending', 'desc').replace('ascending', 'asc')
      let objJson = JSON.stringify(obj)
      console.log(objJson)
      this.$api.http.postJson(url, objJson)
        .then(res => {
          console.log(res.data)
          this.tableLoading = false
          this.cardData = res.data.list
          this.recordTotal = res.data.total // 总条数
          this.$emit('record-processing') // 其他的刷新事件，通过此处返还
          this.lastUrl = url
          this.lastObject = JSON.parse(objJson)
        })
        .catch(err => {
          console.log(err)
        })
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
    // 刷新记录
    refreshRecord () {
      this.getRecord(null)
    }
  }
}
</script>

<style lang="less" scoped>

  .container {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
  }

  .table-tools-column {
    width: 100%;
    min-height: 50px;
  }

  .search-box {
    width: 250px;
  }

  .card-style {
    margin: 10px 0;
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;
  }

  .detail-card-style {
    margin-top: 20px;
    padding-bottom: 20px;
    border-radius: 20px;
  }

  .card-pagination {
    background: rgba(255, 255, 255, 0.7);
    height: 40px;
  }
</style>
