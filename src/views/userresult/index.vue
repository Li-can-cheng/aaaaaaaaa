<template>
  <div id=" app">
    <div class="upper-section">
      <div class="dashboard-container">
        <el-button type="primary" @click="openDialog"style="margin-left: 40px">能力评价</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="isDialogVisible" width="50%">
          <ping />
          <div  style="text-indent: 2em;">{{ text }}</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmDialog">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="lower-section">
      <div class="dashboard-container">
        <div class="job_recommend">
          <el-form @submit.prevent="job_recommend">
              <el-button  type="primary" @click="job_recommend" style="margin-bottom: 30px;margin-left: 40px">职位推荐</el-button>
              <table-component v-if="showTable" :recommendations="recommendations" ></table-component>
          </el-form>
        </div>
      </div>
      <div class="container">
        <div class="xing" v-if="showTable">
          <p>您对该推荐的满意度为
            <xing></xing>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import xing from './xing'
import ping from './ping'
import TableComponent from "./table.vue";
export default {
  components: { xing, ping, TableComponent },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      id: '',
      recommendations: [],
      isDialogVisible: false, // 控制弹出框可见性
      dialogTitle: '能力评价',
      text: '你好', // 用于存储输出内容
      showTable: false,
      recommendations: []
    }
  },
  methods: {
    openDialog() {
      this.isDialogVisible = true; // 打开弹出框
    },
    confirmDialog() {
      this.isDialogVisible = false; // 关闭弹出框
    },

    job_recommend() {
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
  height: 100vh;
  /* Adjust this according to your layout */
}

.xing {
  position: absolute;
  top: -145px;
  right: 0;
  width: 20%;
}
</style>
