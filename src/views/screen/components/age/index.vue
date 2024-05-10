<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" />
        </div>
        <!-- 图形图标的容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 引入echarts
import * as echarts from 'echarts';
let charts = ref();
// 组件挂载完毕初始化图像图标
onMounted(() => {
    let mychart = echarts.init(charts.value);
    // 设置配置项
    let option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: 40,
            right: 30,
            orient: 'vertical', // 图例组件方向
            textStyle: {
                color: 'white',
                fontSize: 14,
            },
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: true,
                    position: 'inside',
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' },
                ],
            },
        ],
        // 调整图形图标的位置
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
    };
    mychart.setOption(option);
});
</script>

<style lang="scss" scoped>
.box2 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png);
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p {
            color: white;
            font-size: 20px;
        }
    }
    .charts {
        height: 260px;
    }
}
</style>
