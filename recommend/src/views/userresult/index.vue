<template>
  <div id=" app">
    <div class="upper-section">
      <div class="dashboard-container">
        <el-button type="primary" style="margin-left: 40px" @click="openDialog">能力评价</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="isDialogVisible" width="50%" :append-to-body="true">
          <ping/>
          <div style="text-indent: 2em;">{{ text }}</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmDialog">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="container">
      <div v-if="showTable" class="xing">
        <p>您对该推荐的满意度为
          <xing/>
        </p>
      </div>
    </div>
    <div class="lower-section">
      <div class="dashboard-container">
        <div class="job_recommend">
          <el-form @submit.prevent="job_recommend">
            <el-button type="primary" style="margin-bottom: 30px;margin-left: 40px" @click="job_recommend">职位推荐
            </el-button>
            <table-component v-if="showTable" :recommendations="recommendations"/>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import xing from './xing'
import ping from './ping'
import TableComponent from './table.vue'
import store from '@/store'

export default {
  components:{xing, ping, TableComponent},
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      id: store.getters.resume_id,
      recommendations: [],
      isDialogVisible: false, // 控制弹出框可见性
      dialogTitle: '能力评价',
      showTable: false
    }
  },
  computed: {
    text() {
      return this.$store.state.evaluation.data ? this.$store.state.evaluation.data.suggestion : '正在加载建议...';
    }
  },
  methods: {
    openDialog() {
      this.isDialogVisible = true // 打开弹出框
    },
    confirmDialog() {
      this.isDialogVisible = false // 关闭弹出框
    },

    job_recommend() {
      this.showTable = true

      // 准备第一个请求的数据和配置
      var data = {
        id: this.id // 这里假设this.id已经是正确的uid值
      }

      var preDo = {
        method: 'post',
        url: '/api/algorithm/recommendations/resume_converter', // 确保URL是正确的，并添加了http://前缀
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      // 发送第一个请求
      axios(preDo)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.recommendations = response.data.data

          // 准备第二个请求的数据和配置
          var getRecommendations = {
            method: 'post',
            url: '/api/algorithm/recommendations/get_recommendations',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }

          // 在第一个请求成功后发送第二个请求
          return axios(getRecommendations)
        })
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.recommendations = JSON.parse(response.data.data).data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.upper-section {
  height: 50%;
  width: 100%;
}

.lower-section {
  height: 50%;
  width: 100%;
}

.dashboard {
  &-container {
    margin: 20px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.container {
  position: relative;
  width: 100%;
  //height: 100vh;
  /* Adjust this according to your layout */
}

.xing {
  position: absolute;
  top: -50px;
  right: 0;
  width: 20%;
}

</style>
