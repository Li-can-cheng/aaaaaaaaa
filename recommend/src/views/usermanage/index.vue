<template>
  <div class="enterpriseContainer">
    <div class="contentDiv">
      <div class="titleDiv">
        <span style="margin-right: 20px; margin-left: 5px; font-weight: bold">用户列表</span>
        <el-input
          v-model="dataForm.key"
          placeholder="参数名"
          clearable
          style="width: 150px; margin-right: 10px"
          size="small"
          @keyup.enter.native="getDataList"
        />
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getDataList()">查询</el-button>
      </div>
      <div class="toolDiv">
        <el-button type="text" size="small" @click="addOrUpdateHandle()">
          <i class="iconfont icon-tianjia" style="margin-right: 3px" />添加</el-button>
        <el-button
          id="button-danger"
          type="text"
          icon="el-icon-delete"
          size="small"
          :disabled="dataListSelections.length <= 0"
          @click="deleteHandle()"
        >批量删除</el-button>
      </div>
      <div class="tableDisplayDiv">
        <div class="tableDiv">
          <el-table
            v-loading="dataListLoading"
            :data="dataList"
            style="width: 100%;"
            @selection-change="selectionChangeHandle"
          >
            <el-table-column type="selection" header-align="center" align="center" width="50" />
            <el-table-column prop="userName" header-align="left" align="left" label="用户名" width="180" />
            <el-table-column prop="nickName" header-align="left" align="left" label="姓名" width="180" />
            <el-table-column
              prop="sex"
              header-align="left"
              align="left"
              label="性别"
              width="180"
              :formatter="formatSex"
            />
            <el-table-column prop="age" header-align="left" align="left" label="年龄" width="180" />
            <el-table-column prop="phone" header-align="left" align="left" label="手机号" width="180" />
            <el-table-column prop="email" header-align="left" align="left" label="邮箱" width="180" />
            <el-table-column prop="roles" header-align="left" align="left" label="角色" width="180" />

            <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                <el-button id="button-danger" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          v-show="totalPage > 0"
          :total="totalPage"
          :current-page.sync="pageIndex"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="currentChangeHandle"
          @size-change="sizeChangeHandle"
        />
      </div>

    </div>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import userApi from '@/api/user'
import AddOrUpdate from './user-add-or-update'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableData: [
        { sex: 1 },
        { sex: 0 }
        // 其他数据
      ]
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    formatSex(row, column, value, index) {
      return value === 1 ? '男' : '女'
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      const params = {
        'page': this.pageIndex,
        'limit': this.pageSize
        // 'key': this.dataForm.key
      }

      userApi.listEnterpriseVo(params)
        .then(res => {
          console.log('API response:', res)
          const data = res.data
          if (data.code === 200 && data.data && data.data.page) {
            this.dataList = data.data.list || []
            this.totalPage = data.data.page.totalCount || 0
            console.log('岗位列表:', JSON.stringify(this.dataList))
          } else {
            console.error('未能获取到有效的数据:', data.msg || '无错误消息')
            this.dataList = []
            this.totalPage = 0
          }
        })
        .catch(error => {
          console.error('请求岗位列表数据失败:', error)
          this.dataList = []
          this.totalPage = 0
        })
        .finally(() => {
          this.dataListLoading = false
        })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    }
    // // 删除
    // deleteHandle(id) {
    //   var ids = id ? [id] : this.dataListSelections.map(item => {
    //     return item.id
    //   })
    //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     enterpriseApi.deleteBatch(ids)
    //       .then(res => {
    //         if (res.code === this.ResultCode.success) {
    //           this.getDataList()
    //           this.$message({
    //             message: '操作成功',
    //             type: 'success',
    //             duration: 1500
    //           })
    //         } else {
    //           this.$message.error(data.msg)
    //         }
    //       })
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.enterpriseContainer {
  padding: 20px 20px 0px 20px;
  // background: rgb(243, 5, 183);
  height: 100%;

  .contentDiv {
    background: #D3E6FB;
    border-radius: 5px;
    padding: 1px;
    height: 100%;

    .titleDiv {
      display: flex;
      align-items: center;
      padding: 5px 15px 5px 0px;
      height: 45px;
    }

    .toolDiv {
      background: #FFFFFF;
      padding: 1px;
      padding-left: 15px;
      height: 35px;
      display: flex;
      align-items: center;
    }

    .tableDisplayDiv {
      background: #FFFFFF;
      // height: 300px;
      height: calc(100% - 35px - 45px);

      .tableDiv {
        background: #FFFFFF;
        // height: 300px;
        height: calc(100% - 40px);
      }
    }

  }
}

.image {
  height: 150px;
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  background-color: #f9f9f9;
  transition: all 0.3s ease-in-out;
}
</style>
