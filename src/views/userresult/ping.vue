<template>
    <div id="myChart" style="width: 100%; height: 280px; margin-top: 20px"></div>
</template>

<script>

export default {
    name: 'Radar',
    data() {

    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            let dataMax = [
                { name: '工资', max: '15' },
                { name: '社会评价信息', max: '15' },
                { name: '社会评价信息', max: '15' },
                { name: '社会评价信息', max: '15' },
                { name: '社会评价信息', max: '15' },
            ]
            let option = {
                //配置维度的最大值
                radar: {
                    center: ['50%', '50%'],//调位置  第一个左右   第二个上下
                    radius: 100,//调大小
                    //   雷达图的指示器，用来指定雷达图中的多个变量（维度）
                    indicator: dataMax,
                    shape: 'polygon', //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
                    splitArea: {
                        areaStyle: {// 图表背景网格区域的颜色
                            color: ["#ffffff"],
                        }
                    },
                },
                series: [
                    {
                        type: 'radar',
                        label: {
                            show: true, //显示数值
                        },
                        // areaStyle: {}, //每个雷达图形成一个阴影的面积
                        itemStyle: {//折线拐点标志的样式
                            color: "#4b85f1",
                        },
                        lineStyle: {//线条样式
                            color: "#4b85f1"
                        },
                        symbolSize: 4,//圆点大小
                        symbol: "circle",//圆点样式
                        data: [
                            {
                                name: '就业能力',
                                value: [7, 8, 15, 8, 15],
                            },
                        ],
                    },
                ],
            }
            // 绘制图表
            myChart.setOption(option)
        },
    }
}
</script>