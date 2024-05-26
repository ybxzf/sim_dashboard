<template>
    <div ref="lineChartRef" class="item-chart"></div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { formatterDate } from "@/utils/base";

const props = defineProps(['chartData'])
const lineChartRef = ref<any>(null);

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
                Pz: ${params[0]['data']} kW <br/>
                时间: ${formatterDate(new Date())} ${params[0]['name']}
            </div>
            `
        },
        // formatter: `<div>Pz: {c} kW <br/>时间: {b}</div>`,
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
            interval: 1,//显示所有标签
            textStyle: {
                color: '#fff',
                fontSize: '0.75rem',
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
onMounted(() => {
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = () => {
    console.log('props.chartData', props.chartData);
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

        console.log(option)
        // nextTick(() => {
        myChart = echarts.init(lineChartRef.value);
        myChart.setOption(option);
        setTimeout(() => {
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: props.chartData?.seriesData.length - 1 || 0
            });
        }, 1000);
        // 默认显示最新数据的tooltip
        setInterval(() => {
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: props.chartData?.seriesData.length - 1 || 0
            });
        }, 5000)
        // })
    }
}

onBeforeUnmount(() => {
    console.log('关闭');
    myChart.clear();
})
</script>
<style lang="less" scoped>
.item-chart {
    // background-color: rgba(228, 255, 234, 0.5);
    width: 100%;
    height: 16rem;
}
</style>