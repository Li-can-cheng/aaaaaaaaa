<template>
  <div id=" app">
    <div class="dashboard-container">
      <el-row class="job">
        <el-form
          ref="form"
          v-loading="loading"
          :model="form"
          status-icon
          label-width="100px"
          @submit.native.prevent
        >
          <el-form-item label="招聘岗位" prop="job_intention">
            <el-input v-model="form.job_intention" size="medium" placeholder="请填写招聘岗位" />
          </el-form-item>
          <el-form-item label="工作地点" prop="home">
            <el-input v-model="form.home" size="medium" placeholder="请填写工作地点" />
          </el-form-item>
          <el-form-item label="薪资" prop="money">
            <el-input v-model="form.age" size="medium" placeholder="请填写薪资" />
          </el-form-item>
          <el-form-item label="教育要求" prop="ability">
            <el-input v-model="form.ability" size="medium" placeholder="请填写对教育的要求" />
          </el-form-item>
          <el-form-item label="具体要求" prop="details">
            <el-input
              v-model="form.personal_summary"
              type="textarea"
              :rows="3"
              size="medium"
              placeholder="请填写详细要求"
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="submitForm('form')">保 存</el-button>
            <el-button @click="resetForm('form')">重 置</el-button>
            <el-button type="primary" style="margin-bottom: 30px;margin-left: 40px" @click="recommed">寻找应聘者</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="dashboard-container">
      <table-component v-if="showTable" :recommendations="recommendations" />
    </div>
    <div class="container">
      <div v-if="showTable" class="xing">
        <p>您对该推荐的满意度为
          <xing />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import xing from './xing'
import TableComponent from './table.vue'
import store from "@/store";
export default {
  components: { xing, TableComponent },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      id: '',
      recommendations: [],
      form: {},
      showTable: false
    }
  },

  methods: {
    recommed() {
      this.showTable = true

      var data = {
        id: this.id, // 使用 this.uid 获取当前的 uid 值
        page: 1,
        limit: 10
      }
      var filter={
        jobName: this.form.job_intention,
        education: this.form.ability,
      }

      var config = {
        method: 'post',
        url: '/api/algorithm/resumeData/listResumeData', // 确保 URL 是正确的，这里添加了 http:// 前缀
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'satoken':store.getters.token
        },
        params: data,
        data: filter
      }

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.recommendations = response.data.data.list
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.job{
  margin-left: 40px;
  width:80%;
}
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* Adjust this according to your layout */
}

.xing {
  position: absolute;
  top: -165px;
  right: 0;
  width: 25%;
}
</style>
