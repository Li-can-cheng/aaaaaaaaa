<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="120px">
    <el-form-item label="求职类型" prop="workDayPreferenceList">
      <el-checkbox-group v-model="user.workDayPreferenceList" @change="handleCheckedWordDayChange">
        <el-checkbox v-for="workDay in jobtpyelist" :key="workDay.key" :label="workDay.key">
          {{ workDay.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="工作城市" prop="workTimePreference">
      <el-table :data="user.timeSlotList" style="width: 50%">
        <el-table-column label="城市" prop="city" align="center">
          <template slot-scope="scope">
            <el-time-select
              v-model="scope.row.city"
              :picker-options="{
                start: workcity,
                step: step,
                end: wordEndTime,
                minTime: scope.row.startMinTime,
                maxTime: scope.row.startMaxTime
              }"
              placeholder="选择城市"
              size="mini"
              class="city"
              @change="startChange(scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-button type="text" icon="el-icon-circle-plus-outline" @click="addTimeSlot">添加城市</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

// 求职类型
const jobtypeoptions = [
  { key: 1, label: '兼职' },
  { key: 2, label: '全职' },
  { key: 3, label: '实习' }
]

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // /求职类型选项
      jobtpyelist: jobtypeoptions
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // /求职类型数据保存
          let workDayPreference = ''
          for (let i = 0; i < this.user.workDayPreferenceList.length - 1; i++) {
            workDayPreference += this.user.workDayPreferenceList[i] + '|'
          }
          workDayPreference += this.user.workDayPreferenceList[this.user.workDayPreferenceList.length - 1]
          this.user.workDayPreference = workDayPreference
          // /工作城市
          let workTimePreference = ''
          for (let i = 0; i < this.user.timeSlotList.length - 1; i++) {
            workTimePreference += this.user.timeSlotList[i].city + '~' + this.user.timeSlotList[i].endTime + '|'
          }
          workTimePreference += this.user.timeSlotList[this.user.timeSlotList.length - 1].city + '~' + this.user.timeSlotList[this.user.timeSlotList.length - 1].endTime
          this.user.workTimePreference = workTimePreference
        }
      })
    },
    close() {
      this.$tab.closePage()
    },
    // /求职类型改变
    handleCheckedWordDayChange(arr) {
      // arr是选中的key数组
    },
    // /工作城市
    // 删除城市
    handleDelete(index, row) {
      console.log(index, row)
      this.user.timeSlotList.splice(index, 1)
    },
    // 添加城市
    addTimeSlot() {
      let newTimeSlot
      let city
      let endTime
      let minTime
      let maxTime
      minTime = city
      maxTime = this.wordEndTime
      newTimeSlot = {
        city: city,
        endTime: endTime,
        startMinTime: minTime,
        startMaxTime: maxTime,
        endMinTime: minTime,
        endMaxTime: maxTime
      }
      this.user.timeSlotList.push(newTimeSlot)
    },
    // 在初始城市的基础上面添加一个城市
    getAddTime(start, addHour) {
      const startStr = start + ''
      const startArray = startStr.split(':')
      // console.log("startArray:" + JSON.stringify(startArray))
      return (parseInt(startArray[0]) + addHour) + ':' + startArray[1]
    },
    // 修改城市
    startChange(row) {
      console.log('row:' + JSON.stringify(row))
    }
  }
}
</script>
<style scoped>
.city{
    width: 100px;
}
</style>
