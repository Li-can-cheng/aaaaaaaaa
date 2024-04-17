<template>
  <el-table
    :data="recommendations"
    style="width: 100%"
    border
    stripe
  >
    <el-table-column
      prop="Job Name"
      label="ID"
      width="50"
    />
    <el-table-column
      prop="岗位名"
      label="职位名称"
      width="100"
    />
    <el-table-column
      prop="Score"
      label="得分"
      width="200"
    />

    <el-table-column
      prop="公司"
      label="公司"
      width="200"
    />
    <el-table-column
      prop="薪资"
      label="薪资"
      width="100"
    />
    <el-table-column
      prop="类型"
      label="类型"
      width="50"
    />
    <el-table-column
      prop="学历"
      label="学历"
      width="50"
    />
    <el-table-column
      prop="地址"
      label="地址"
      width="100"
    />
    <el-table-column
      prop="描述"
      label="描述"
      width="800"
    />
    <el-table-column
      prop="技能"
      label="技能"
      width="200"
    />
    <el-table-column
      prop="经验"
      label="经验"
      width="100"
    />
    <el-table-column
      label="链接"
      width="100"
    >
      <template slot-scope="scope">
        <!-- 使用 el-link 组件创建一个可点击的链接，显示为“链接” -->
        <el-link type="primary" :underline="false" @click.native="openLink(scope.row.链接)">链接</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="招聘者"
      label="招聘者"
      width="80"
    />
    <el-table-column
      prop="最后活跃"
      label="最后活跃"
      width="50"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    recommendations: {
      type: Array,
      required: true
    }
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank') // 使用 '_blank' 来在新标签页中打开链接
    }
  }
}
</script>

<style scoped>
.content {
  table-layout: fixed;
  width: 100%;
  top: 50px;
}

.el-table {
  border-collapse: separate;
  border-spacing: 0 15px; /* 调整行间距 */
}

.el-table th {
  background-color: #f2f2f2; /* 表头背景颜色 */
}

.el-table td {
  background-color: #fff; /* 单元格背景颜色 */
  border-bottom: 1px solid #ebeef5; /* 单元格底部边框 */
}

</style>
