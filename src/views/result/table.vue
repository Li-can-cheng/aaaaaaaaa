<template>
  <table class="content">
    <thead>
      <tr>
        <th style="width: 100px;">职位名称</th>
        <th style="width: 100px;">公司</th>
        <th style="width: 100px;">薪资</th>
        <th style="width: 100px;">类型</th>
        <th style="width: 100px;">学历</th>
        <th style="width: 100px;">地址</th>
        <th style="width: 100px;">技能</th>
        <th style="width: 100px;">质量</th>
        <th style="width: 100px;">经验</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in recommendations" :key="item.Position">
        <td style="width: 100px;">{{ item['Job Name'] }}</td>
        <td style="width: 100px;">{{ item.公司 }}</td>
        <td style="width: 100px;">{{ item.薪资 }}</td>
        <td style="width: 100px;">{{ item.类型 }}</td>
        <td style="width: 100px;">{{ item.学历 }}</td>
        <td style="width: 100px;">{{ item.地址 }}</td>
        <td style="width: 100px;">{{ item.技能 }}</td>
        <td style="width: 100px;">{{ item.质量 }}</td>
        <td style="width: 100px;">{{ item.经验 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    recommendations: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.content{
  table-layout: fixed; 
  width: 100%;
  top:50px;
}
</style>
