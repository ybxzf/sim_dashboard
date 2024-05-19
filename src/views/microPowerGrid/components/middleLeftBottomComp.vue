<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span style="width: 10rem;">光伏发电情况</span>
                <div class="chart-button-ctn">
                    <div>
                        <span class="chart-button-img-1" @click="init('DAY')">
                            <img v-if="typeSelected === 'DAY'"
                                src="../../../assets/images/microPowerGrid/button_2_click.png">
                            <img v-else src="../../../assets/images/microPowerGrid/button_2_not_click.png">
                        </span>
                        <span>日发电量</span>
                    </div>
                    <div>
                        <span class="chart-button-img-2" @click="init('WEEK')">
                            <img v-if="typeSelected === 'WEEK'"
                                src="../../../assets/images/microPowerGrid/button_2_click.png">
                            <img v-else src="../../../assets/images/microPowerGrid/button_2_not_click.png">
                        </span>
                        <span>周发电量</span>
                    </div>
                </div>
            </div>
            <div ref="lineChartRef" class="item-chart"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';

const lineChartRef = ref<any>();
const xAxisData = ref<any>([]);
const seriesData = ref<any>([]);
const typeSelected = ref<string>('DAY');

let myChart: any = null;
let option: any = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        borderColor: 'transparent',
        backgroundColor: 'rgb(131, 238, 176, 0.5)',
        borderRadius: '2',
        textStyle: {
            color: "#fff", // 文字的颜色
            border: 'none',
        },
        formatter: '{b}: {c}kW.h',
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            interval: 0,//显示所有标签
            textStyle: {
                color: '#fff',
                fontSize: '0.75rem',
            }
        },
        data: [],
    },
    yAxis: {
        name: '单位：千瓦时',
        nameTextStyle: {
            color: '#fff' // 设置为白色
        },
        type: 'value',
        splitLine: {
            show: false,    //横线显示
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
                fontSize: '0.75rem',
            }
        },
    },
    grid: {
        show: false,
        top: '16%',    // 一下数值可为百分比也可为具体像素值
        right: '5%',
        bottom: '13%',
        left: '14%'
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true, //平滑
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [  // 渐变颜色
                    {
                        offset: 0,
                        color: 'rgb(165, 252, 184, 0.5)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0)',
                    },
                ],
                global: false,
            },
        },
        itemStyle: {
            // 设置线条上点的颜色（和图例的颜色）
            normal: {
                color: 'rgb(131, 238, 176, 0.5)',
            },
        },
    }]
};
watch(() => typeSelected.value,
    (_nv: string) => {
        console.log('xx', _nv);
    });
onMounted(() => {
    myChart = echarts.init(lineChartRef.value);
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = async (dateType: string = 'DAY') => {
    typeSelected.value = dateType;
    //默认日发电量请求API
    const elecData: any = await elecTotal(dateType);
    // xAxisData.value = ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'];
    // seriesData.value = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330];
    option.xAxis.data = elecData.xAxisData;
    option.series[0].data = elecData.seriesData;
    myChart.setOption(option);
    myChart.resize();
};

async function elecTotal(dateType: string) {
    const elecData: any = {};
    if (dateType == 'DAY') {
        elecData.xAxisData = ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'];
        // const res: any = await DAY_API();
        elecData.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330];
    } else {
        elecData.xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        // const res: any = await WEEK_API();
        elecData.seriesData = [1330, 1320, 820, 932, 901, 934, 1290];
    }
    return elecData;

}
</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;

    .item-title {
        // border: 1px solid rgb(165, 252, 184);
        position: relative;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        // border: 1px solid red;
    }
}
</style>
