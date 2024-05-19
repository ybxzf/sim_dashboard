<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span class="title-name">
                    家用电器实时功率
                </span>
            </div>
            <div style="height: 19rem;">
                <div style="height: 3rem;position: relative;">
                    <!-- <div>电磁炉</div> -->
                    <img style="width: 9rem" :src="`${baseURL}images/monitorDashboard/induction_cooker.png`">
                </div>
                <div ref="lineChartRef1" class="item-chart"></div>
            </div>
            <div style="height: 19rem;">
                <div style="height: 3rem;position: relative;">
                    <!-- <div>微波炉</div> -->
                    <img style="width: 9rem" :src="`${baseURL}images/monitorDashboard/micro-wave_cooker.png`">
                </div>
                <div ref="lineChartRef2" class="item-chart"></div>
            </div>
            <div style="height: 19rem;">
                <div style="height: 3rem;position: relative;">
                    <!-- <div>洗衣机</div> -->
                    <img style="width: 9rem" :src="`${baseURL}images/monitorDashboard/wash_machine.png`">
                </div>
                <div ref="lineChartRef3" class="item-chart"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';

const baseURL: any = import.meta.env.BASE_URL;
const chartData = ref<any>({});
const lineChartRef1 = ref<any>();
const lineChartRef2 = ref<any>();
const lineChartRef3 = ref<any>();

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
                时间: ${params[0]['name']}
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
                fontSize: '0.6rem',
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
                fontSize: '0.6rem',
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
const myChartList: any = [{}, {}, {}]

onMounted(() => {
    init();
    // setInterval(() => {
    //     console.log('更新数据');
    //     init();
    // }, 5000)
});
const init = () => {

    for (let i = 0; i < myChartList.length; i++) {
        myChartList[i].data = {};
        myChartList[i].data.xAxisData = ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'];
        myChartList[i].data.seriesData = [820, 932, 901, 934, 890, 1330, 1320, 820, 932,];
        Object.assign(myChartList[i].data, {
            yAxisUnit: '单位：w',
            legendDataName: '充电桩',
            lineColorT: 'rgb(241, 193, 0, 0.5)',
            lineColor: 'rgb(241, 193, 0, 1)',
        });

        myChartList[i].myChart = null;
        myChartList[i].option = option;
    }
    setOptionList(
        myChartList[0].myChart,
        lineChartRef1.value,
        Object.assign(myChartList[0].data, {
            lineColorT: 'rgb(0, 83, 18, 0.5)',
            lineColor: 'rgb(0, 83, 18, 1)',
        }),
        myChartList[0].option
    );
    setOptionList(
        myChartList[1].myChart,
        lineChartRef2.value,
        Object.assign(myChartList[1].data, {
            lineColorT: 'rgb(161, 151, 0, 0.5)',
            lineColor: 'rgb(161, 151, 0, 1)',
        }),
        myChartList[1].option
    );
    setOptionList(
        myChartList[2].myChart,
        lineChartRef3.value,
        Object.assign(myChartList[2].data, {
            lineColorT: 'rgb(66, 66, 66, 0.5)',
            lineColor: 'rgb(66, 66, 66, 1)',
        }),
        myChartList[2].option
    );
    //请求API
    //  chartData.value = await CURVE_API();
    // const chartData: any = {};

    console.log('chartData.value', chartData.value);



};
const setOptionList = async (myChart: any, chartRef: any, data: any, option: any) => {
    //设置颜色
    option.tooltip.backgroundColor = data?.lineColorT;
    option.series[0].areaStyle.color.colorStops[0].color = data?.lineColorT;
    option.series[0].itemStyle.normal.color = data?.lineColor;
    //设置名称
    // option.legend.data[0] = data?.legendDataName;
    option.yAxis.name = data?.yAxisUnit;
    option.series[0].name = data?.legendDataName;
    //设置数据
    option.xAxis.data = data?.xAxisData;
    option.series[0].data = data?.seriesData;

    console.log(option)
    // nextTick(() => {

    myChart = echarts.init(chartRef);
    myChart.setOption(option);
    // })
}

</script>
<style lang="less" scoped>
.flex-item-ctn {
    background-image: url('');
    // background-color: rgba(128, 201, 60, 0.767);
    // border: 1px solid #cc2727;

    .flex-item {
        width: 100%;
        margin: 0 0 0 1rem;
        height: 62rem;
        background-image: url('../../../assets/images/monitorDashboard/item_border_4.png');
        background-size: 100% 96%;
        background-position: center;
        /* 防止背景图片重复 */
        background-repeat: no-repeat;
        position: relative;

        .item-title {
            height: 2rem;
            // padding-top: 1rem 1rem;
            position: relative;
            display: flex;
            align-items: center
        }

        .item-chart {
            // background-color: rgb(161, 151, 0);
            width: 100%;
            height: 16rem;
        }
    }
}
</style>
