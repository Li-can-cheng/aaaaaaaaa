<template>
    <div class="shell">
        <ul class="images" :style="{ left: `${index * -100}%` }">
            <li v-for="(image, i) in images" :key="i" class="img">
                <img :src="image" :alt="'Slide ' + (i + 1)">
            </li>
        </ul>
        <ul class="min">
            <li v-for="(image, i) in images" :key="i" class="m" @click="goToSlide(i)"></li>
        </ul>
        <div class="button">
            <div class="button-left" @click="prevSlide">&lt;</div>
            <div class="button-right" @click="nextSlide">&gt;</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            index: 0,
            images: [
                "../../assets/lunbo/1.jpg",
                "../../assets/lunbo/2.jpg",
                "../../assets/lunbo/3.jpg",
                "../../assets/lunbo/4.jpg",
                "../../assets/lunbo/5.jpg"
            ],
            time: null
        };
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        startTimer() {
            this.time = setInterval(this.nextSlide, 3000);
        },
        stopTimer() {
            clearInterval(this.time);
        },
        goToSlide(index) {
            this.index = index;
            this.stopTimer();
            this.startTimer();
        },
        prevSlide() {
            if (this.index === 0) {
                this.index = this.images.length - 1;
            } else {
                this.index--;
            }
            this.stopTimer();
            this.startTimer();
        },
        nextSlide() {
            if (this.index === this.images.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            this.stopTimer();
            this.startTimer();
        }
    }
};
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
    list-style: none;
    justify-content: center;
    bottom: 0;
    text-decoration: none;
}

.shell {
    width: 1000px;
    height: 480px;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 10px 5px 50px rgba(122, 39, 39, 0.39);
}

.images {
    width: 500%;
    height: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    left: 0;
    transition: .2s;
}

.img {
    width: 100%;
    background-size: cover;
}

.img:nth-child(1) {
    background-image: url("../../assets/lunbo/1.jpg");
}

.img:nth-child(2) {
    background-image: url("../../assets/lunbo/2.jpg");
}

.img:nth-child(3) {
    background-image: url("../../assets/lunbo/3.jpg");
}

.img:nth-child(4) {
    background-image: url("../../assets/lunbo/4.jpg");
}

.img:nth-child(5) {
    background-image: url("../../assets/lunbo/5.jpg");
}

.min {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 20px;
    width: 30%;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
}

.m {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: solid rgba(255, 255, 255, 0.5) 5px;
    background-color: #fff;
}

.button {
    width: 100%;
    height: 120%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    user-select: none;
}

.button-left,
.button-right {
    font-size: 50px;
    background-color: rgba(102, 123, 161, 0.288);
    padding: 0 15px;
    cursor: pointer;
    line-height: 700px;
    color: #fff;
}
</style>