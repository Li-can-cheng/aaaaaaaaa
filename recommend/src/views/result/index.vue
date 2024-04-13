<template>
  <div id=" app">
      <div class="dashboard-container">
        <el-row class="job">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading"
            @submit.native.prevent>
            <el-form-item label="招聘岗位" prop="job_intention">
              <el-input size="medium" v-model="form.job_intention" placeholder="请填写招聘岗位"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" prop="home">
              <el-input size="medium" v-model="form.home" placeholder="请填写工作地点"></el-input>
            </el-form-item>
            <el-form-item label="薪资" prop="money">
              <el-input size="medium" v-model="form.age" placeholder="请填写薪资"></el-input>
            </el-form-item>
            <el-form-item label="教育要求" prop="ability">
              <el-input size="medium" v-model="form.ability" placeholder="请填写对教育的要求">
              </el-input>
            </el-form-item>
            <el-form-item label="具体要求" prop="details">
              <el-input type="textarea" :rows="3" size="medium" v-model="form.personal_summary"
                placeholder="请填写详细要求"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
              <el-button  type="primary" @click="recommed" style="margin-bottom: 30px;margin-left: 40px">寻找应聘者</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
      <div class="dashboard-container">
        <table-component v-if="showTable" :recommendations="recommendations" ></table-component>
      </div>
      <div class="container">
        <div class="xing" v-if="showTable">
          <p>您对该推荐的满意度为
            <xing></xing>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import xing from './xing'
import TableComponent from "./table.vue";
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
      this.showTable = true;
      
      var data = {
        id: this.id // 使用 this.uid 获取当前的 uid 值
      }

      var config = {
        method: 'post',
        url: 'http://localhost:3012/recommendations/resume_converter', // 确保 URL 是正确的，这里添加了 http:// 前缀
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.recommendations = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
