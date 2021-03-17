<template>
  <div class="fill-contain">
    <!-- 表前工具栏 -->
    <template v-if="tableTools ===true">
      <div class="table-tools-column">
        <el-button-group>
          <el-button v-if="buttonShow.addButton" style="color: #13ce66;" size="small" @click.native="openAddDialog" icon="el-icon-circle-plus-outline">新增</el-button>
          <el-button v-if="buttonShow.editButton" style="color: #f7c900;" size="small" @click.native="openEditDialog" icon="el-icon-edit-outline">编辑</el-button>
          <el-button v-if="buttonShow.deleteButton" style="color: #b9c9c7;" size="small" @click.native="deleteRecord" icon="el-icon-delete" :disabled="this.selectRecord.length === 0">删除</el-button>
          <el-button v-if="buttonShow.refreshButton" style="color: #12ce66;" size="small" @click.native="refreshRecord" icon="el-icon-refresh-right">刷新</el-button>
          <el-button v-if="buttonShow.downloadButton" style="color: #12ce66" size="small" @click.native="downloadTemp" icon="el-icon-download">下载模板</el-button>
          <el-button v-if="buttonShow.uploadButton" style="color: #12ce66" size="small" @click.native="openImportExcelDialog" icon="el-icon-upload">批量上传</el-button>
        </el-button-group>
        <slot name="expand-button"></slot>
        <div v-if="searchShow" style="float: right">
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
    </template>
    <!-- 表格内容 -->
    <el-row>
      <!-- @为v-on的缩写，:为v-bind的缩写 -->
      <el-table :data="tableData" ref="TableTemplate"
                @row-click="rowClick"
                @row-dblclick="rowDoubleClick" @selection-change="selectChange"
                :default-sort="defaultSort" @sort-change="sortChange"
                v-loading="tableLoading"
                :header-cell-style="{background: '#36507E', color: '#ffffff'}" stripe>
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 序号 -->
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <!-- 正式内容 -->
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据。 -->
        <!-- 使用sortable="custom" 即可通过后端排序 -->
        <el-table-column v-for="tableHeader in tableHeaderList" :key="tableHeader.value"
                         :label="tableHeader.label" :prop="tableHeader.value"
                         :min-width="tableHeader.minWidth" :width="tableHeader.width"
                         header-align="center" align="center"
                         :fixed="tableHeader.fixed" :sortable="sortable"
                         show-overflow-tooltip>
          <!-- Element UI固定写法 -->
          <template slot-scope="scope">
            <!-- 通过tableHeader.value获取表数据 -->
            <el-popover trigger="hover" placement="top">
              <p>{{dataFormat(scope.row[tableHeader.value], tableHeader.value)}}</p>
              <div slot="reference">{{dataFormat(scope.row[tableHeader.value], tableHeader.value)}}</div>
            </el-popover>
          </template>
        </el-table-column>
        <!-- 右侧操作栏 -->
        <el-table-column label="操作" :min-width="funcBtn.minWidth" :width="funcBtn.width" v-if="funcBtn.isShow" :fixed="funcBtn.fixed">
          <template slot-scope="scope">
            <!-- 通过tableHeader.value获取按钮名 -->
            <el-button size="small" v-for="(item, index) in funcBtn.buttons"
                       @click="btnClick(item.value, scope.$index)" :icon="item.icon" :key="index" :disabled="btnDisabled(item.value, scope.row)">
              {{item.name}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 表后页码等 -->
    <el-row>
      <div class="table-footer" style="float: right;">
        <el-pagination
          :hide-on-single-page="hidePagination"
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
    <!-- 新增窗口 -->
    <el-dialog ref="addFormDialog" title="新增" :visible.sync="addDialogVisible" :close-on-click-modal="false"
               class="dialog-style">
      <slot name="addForm"></slot>
      <div slot="footer">
        <!-- 作为模板时，不加.native将不会生效 -->
        <el-button type="primary" @click.native="addRecord">保存</el-button>
        <el-button type="primary" @click.native="addAndClose">保存并关闭</el-button>
        <el-button @click.native="addDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑窗口 -->
    <el-dialog ref="editFormDialog" title="编辑" :visible.sync="editDialogVisible" :close-on-click-modal="false"
               class="dialog-style">
      <slot name="editForm"></slot>
      <div slot="footer">
        <div style="float:left;">
          <el-button type="primary" @click.native="previousRecord">上一条</el-button>
          <el-button type="primary" @click.native="nextRecord">下一条</el-button>
        </div>
        <!-- 作为模板时，不加.native将不会生效 -->
        <el-button type="primary" @click.native="editRecord">保存</el-button>
        <el-button type="primary" @click.native="editAndClose">保存并关闭</el-button>
        <el-button @click.native="editDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 详情窗口 -->
    <el-dialog ref="detailFormDialog" title="详情" :visible.sync="detailDialogVisible" :close-on-click-modal="false"
               class="dialog-style">
      <slot name="detailForm"></slot>
      <div slot="footer">
        <div style="float: left;">
          <el-button type="primary" @click.native="previousRecord">上一条</el-button>
          <el-button type="primary" @click.native="nextRecord">下一条</el-button>
        </div>
        <!--        <el-button type="primary" @click.native="letsEdit">编辑</el-button>-->
        <el-button @click.native="closeDetailDialog">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 上传Excel窗口 -->
    <el-dialog ref="importExcelFormDialog" title="上传" :visible.sync="importExcelDialogVisible"
               :close-on-click-modal="false"
               class="dialog-style">
      <slot name="excelForm"></slot>
      <div slot="footer">
        <div style="float: left;">
          <el-button @click.native="closeImportExcelFormDialog">取消</el-button>
        </div>
        <el-button type="primary" @click.native="uploadExcel">确认上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'BasicTableTemp',
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
    tableTools: {type: Boolean, default: true},
    searchShow: {type: Boolean, default: true},
    buttonShow: {
      default () {
        return {
          addButton: true,
          editButton: true,
          deleteButton: true,
          refreshButton: true,
          downloadButton: true,
          uploadButton: true
        }
      }
    },
    tableHeaderList: {type: Array, required: true}, // 表头数据
    searchList: {type: Array, required: true}, // 搜索字段
    tablePK: {default: 'id'}, // 表的主键
    sortable: {type: Boolean | String, default: 'custom'}, // 是否排序/前端/后端排序
    hidePagination: {type: Boolean, default: false}, // 是否隐藏页码
    funcBtn: {
      default () {
        return {
          isShow: false,
          fixed: 'right',
          width: 200,
          buttons: []
        }
      }
    } // 右侧操作栏
  },
  data () {
    return {
      tableData: [], // 表数据
      searchData: {title: '', content: ''},
      defaultSort: {prop: 'id', order: 'ascending'},
      selectRow: null, // 当前选中行
      tableDataIndex: -1, // 当前选中行的序号，用于编辑、详情页中的上一条下一条读取数据。如无该变量，直接使用indexOf(selectRow)查行号，则编辑后无法回到正确的行数上。
      selectRecord: [], // 列表中选中的多行数据
      lastUrl: '', // 查询和刷新页面用的Url
      lastObject: {}, // 查询和刷新页面用的Object
      recordTotal: 0, // 数据的总条数
      currentPageNumber: 1, // 当前页
      pageSize: 10, // 每页显示条数
      sortField: 'id', // 排序的字段
      sortMethod: 'ascending', // 排序方法(升序、降序、不排序)
      tableLoading: false, // 表格显示loading
      addDialogVisible: false, // 添加窗口
      editDialogVisible: false, // 编辑窗口
      detailDialogVisible: false, // 查看详情窗口
      importExcelDialogVisible: false // 上传Excel窗口
    }
  },
  methods: {
    // 打开新增页面
    openAddDialog () {
      this.addDialogVisible = true
    },
    // 打开编辑页面
    openEditDialog () {
      if (this.selectRow !== null) {
        this.editDialogVisible = true
      } else {
        this.$message.warning('请选择一条记录')
      }
    },
    // 添加记录
    addRecord () {
      this.$emit('add-record')
    },
    // 添加并关闭窗口
    addAndClose () {
      this.addRecord()
      this.addDialogVisible = false
    },
    // 具体的新增记录的方法
    createMethod (url, param) {
      let JsonParam = JSON.stringify(param)
      console.log(url + JsonParam)
      this.$api.http.postJson(url, JsonParam)
        .then(
          this.refreshRecord()
        )
        .catch(err => {
          console.log(err)
        })
    },
    // 编辑记录
    editRecord () {
      this.$emit('edit-record')
    },
    // 编辑并关闭窗口
    editAndClose () {
      this.editRecord()
      this.editDialogVisible = false
    },
    // 具体的修改记录的方法
    updateMethod (url, param) {
      let JsonParam = JSON.stringify(param)
      this.$api.http.postJson(url, JsonParam)
        .then(
          this.refreshRecord()
        )
        .catch(err => {
          console.log(err)
        })
    },
    // 关闭详情页面
    closeDetailDialog () {
      this.detailDialogVisible = false
    },
    // 删除记录(批量删除)
    async deleteRecord () {
      const selectMultipleId = this.selectRecord.map(item => item[this.tablePK])
      await this.$confirm('确认删除 "选中的 ' + selectMultipleId.length + ' 条" 记录吗？', '提示', {type: 'warning'})
        .then(() => {
          this.tableLoading = true
          this.$api.http.postJson(this.url.deleteUrl, selectMultipleId)
            .then(res => {
              this.tableLoading = false
              this.refreshRecord()
            })
            .catch(err => {
              console.log(err)
              this.tableLoading = false
              this.$message.error('网络请求失败')
            })
        })
        .catch(() => {
        })
    },
    // 刷新记录
    refreshRecord () {
      this.getRecord(null)
    },
    // 下载模板
    downloadTemp () {
      this.$emit('download-template')
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
    reset () {
      this.searchData = {title: '', content: ''}
      this.getRecord(this.url.refreshUrl)
    },
    // 打开上传Excel页面
    openImportExcelDialog () {
      this.importExcelDialogVisible = true
    },
    // 上传Excel表
    uploadExcel () {
      this.$emit('upload-excel')
      this.importExcelDialogVisible = false
    },
    // 关闭上传Excel页面
    closeImportExcelFormDialog () {
      this.importExcelDialogVisible = false
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
    // 获取记录
    getRecord (url) {
      this.selectRow = null
      this.selectRecord = []
      let obj = {}
      if (url === null) {
        url = this.lastUrl
        obj = this.lastObject
      }
      obj.currentPageNumber = this.currentPageNumber
      obj.pageSize = this.pageSize
      obj.sort = this.toLine(this.sortField) + ' ' + this.sortMethod.replace('descending', 'desc').replace('ascending', 'asc')
      let objJson = JSON.stringify(obj)
      this.tableLoading = true
      this.$api.http.postJson(url, objJson)
        .then(res => {
          console.log(res.data)
          this.tableLoading = false
          this.tableData = res.data.list
          this.recordTotal = res.data.total // 总条数
          this.$emit('record-processing') // 其他的刷新事件，通过此处返还
          this.lastUrl = url
          this.lastObject = JSON.parse(objJson)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击某一行
    rowClick (row, column, event) {
      // assign 使后者的值赋到前者中。
      this.$emit('click-row', Object.assign({}, row))
      this.selectRow = row
      this.tableDataIndex = this.tableData.indexOf(this.selectRow)
    },
    // 双击某行时的事件
    rowDoubleClick (row, column, event) {
      this.$emit('click-row-double', Object.assign({}, row))
    },
    // 选中多行数据
    selectChange (selects) {
      this.selectRecord = selects
      this.$emit('select-change', selects)
    },
    // 右侧操作按钮点击事件
    btnClick (value, index) {
      this.$emit('btn-click', value, index)
    },
    // 右侧操作栏是否可点击
    btnDisabled (value, row) {
      let data = {}
      this.$emit('btn-disabled', value, row, val => {
        // console.log(val)
        data = val
      })
      return data
    },
    sizeChange (val) {
      this.pageSize = val
      this.refreshRecord()
    },
    currentChange (val) {
      this.currentPageNumber = val
      this.refreshRecord()
    },
    // 编辑界面中的上一条按钮
    previousRecord () {
      if (this.tableDataIndex - 1 === -1) {
        this.tableDataIndex = this.tableData.length - 1
      } else {
        this.tableDataIndex -= 1
      }
      this.selectRow = this.tableData[this.tableDataIndex]
      this.$emit('click-row', Object.assign({}, this.tableData[this.tableDataIndex]))
    },
    // 编辑页面中的下一条按钮
    nextRecord () {
      if (this.tableDataIndex + 1 === this.tableData.length) {
        this.tableDataIndex = 0
      } else {
        this.tableDataIndex += 1
      }
      this.selectRow = this.tableData[this.tableDataIndex]
      this.$emit('click-row', Object.assign({}, this.tableData[this.tableDataIndex]))
    },
    dataFormat (data, tableHeader) {
      this.$emit('data-format', data, tableHeader, val => {
        data = val
      })
      return data
    }
  }
}
</script>

<style lang="less" scoped>

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
