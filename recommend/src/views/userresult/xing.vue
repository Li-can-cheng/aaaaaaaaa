<template>
  <div class="rating-container">
    <div class="star-rating">
      <span
        v-for="star in 5"
        :key="star"
        :class="{ 'filled': star <= rating }"
        @click="setRating(star)"
      >
        ★
      </span>
    </div>
    <button class="submit-button" @click="submitRating">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    setRating(star) {
      // 当用户点击星星时，设置评分值
      this.rating = star
    },
    submitRating() {
      // 在这里你可以处理提交评分的逻辑，比如发送到服务器
      alert('你对推荐结果的满意度为 ' + this.rating + ' 星！')
    }
  }
}
</script>

<style>
.rating-container {
    display: flex;
    align-items: center;
}

.star-rating {
    font-size: 24px;
}

.star-rating span {
    cursor: pointer;
    color: #ccc;
}

.star-rating span.filled {
    color: gold;
}

.submit-button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>
