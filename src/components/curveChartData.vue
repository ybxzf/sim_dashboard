<template>
    <div ref="lineChartRef" class="item-chart"></div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount, defineExpose } from "vue";
import * as echarts from 'echarts';
import { formatterDate } from "@/utils/base";

const props = defineProps(['chartData'])
const lineChartRef = ref<any>(null);

let timer: any = null; //定时器
let interval: any = null; //循环器


let myChart: any = null;
let option: any = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderRadius: '2',
        textStyle: {
            color: "#fff", // 文字的颜色
            border: 'none',
        },
        formatter: (params: any) => {
            // console.log(params[0]);
            return `
            <div>
                Pz: ${params[0]['data']} w <br/>
                时间: ${formatterDate(new Date())} ${params[0]['name']}
            </div>
            `
        },
        // formatter: `<div>Pz: {c} w <br/>时间: {b}</div>`,
    },
    legend: {
        data: [''],
        textStyle: {
            color: '#fff',
            fontSize: '0.8rem',
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            rotate: 30, // 设置文字倾斜的角度
            // interval: 1,//显示x轴标签间隔
            textStyle: {
                color: '#fff',
                fontSize: '0.65rem',
            }
        },
        data: [],
    },
    yAxis: {
        name: '',
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
        name: '',
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
                        color: '',
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
                color: '',
            },
        },
    }]
};

watch(() => props.chartData,
    (_nv: any) => {
        // console.log('数据改变', _nv);
        init();
    }, {
    deep: true
})
onMounted(() => {
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = () => {
    if (props.chartData) {
        //设置颜色
        option.tooltip.backgroundColor = props.chartData?.lineColorT;
        option.series[0].areaStyle.color.colorStops[0].color = props.chartData?.lineColorT;
        option.series[0].itemStyle.normal.color = props.chartData?.lineColor;
        //设置名称
        option.legend.data[0] = props.chartData?.legendDataName;
        option.yAxis.name = props.chartData?.yAxisUnit;
        option.series[0].name = props.chartData?.legendDataName;
        //设置数据
        option.xAxis.data = props.chartData?.xAxisData;
        option.series[0].data = props.chartData?.seriesData;

        // console.log(option)
        // nextTick(() => {
        myChart = echarts.init(lineChartRef.value);
        myChart.setOption(option);
        // timer = setTimeout(() => {
        //     myChart.dispatchAction({
        //         type: 'showTip',
        //         seriesIndex: 0,
        //         dataIndex: props.chartData?.seriesData.length - 1 || 0
        //     });
        // }, 1500);
        // // 默认显示最新数据的tooltip
        // interval = setInterval(() => {
        //     myChart.dispatchAction({
        //         type: 'showTip',
        //         seriesIndex: 0,
        //         dataIndex: props.chartData?.seriesData.length - 1 || 1
        //     });
        // }, 1000 * 30)
        // })
    }
}

const clearResource = () => {
    // console.log('关闭');
    myChart.clear();
    clearTimeout(timer);
    clearInterval(interval);
};

onBeforeUnmount(() => {
    clearResource();
})

defineExpose({
    clearResource,
});
</script>
<style lang="less" scoped>
.item-chart {
    // background-color: rgba(228, 255, 234, 0.5);
    width: 100%;
    height: 16rem;
}
</style>