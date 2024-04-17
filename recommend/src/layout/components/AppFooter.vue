<template>
  <div class="by-app-footer">
    Copyright&nbsp;&nbsp;&copy;2024&nbsp;&nbsp;职位推荐系统&nbsp;&nbsp;All&nbsp;Rights&nbsp;Reserved
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppFooter',

  computed: {
    ...mapState('webSocket', ['socketData'])
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.by-app-footer {
    height: 20px;
    width: 100%;
    text-align: center;
    padding-left: 15%;
    font-size: 12px;
    line-height: 20px;
    color: #808080;
    letter-spacing: 1px;
    background: white;
    position: fixed; /* 固定位置 */
    bottom: 0; /* 与页面底部对齐 */
    border-top: 1px solid #eee; /* 页脚上边界线 */
}
</style>
