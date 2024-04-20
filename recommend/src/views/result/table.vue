<template>
  <el-table
    :data="recommendations"
    style="width: 100%"
    stripe
    border
  >
    <el-table-column
      prop="jobName"
      label="职位名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="company"
      label="公司"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salary"
      label="薪资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="title1"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="education"
      label="学历"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="skill"
      label="技能"
      width="180">
    </el-table-column>
    <el-table-column
      prop="quality"
      label="品质"
      width="180">
    </el-table-column>
    <el-table-column
      prop="experience"
      label="经验"
      width="180">
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  props: {
    recommendations: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.content{
  table-layout: fixed;
  width: 100%;
  top:50px;
}
</style>
