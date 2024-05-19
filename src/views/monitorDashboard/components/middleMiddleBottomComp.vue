<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span class="title-name">
                    室内空调监测
                </span>
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
        backgroundColor: 'rgb(101, 211, 255, 0.5)',
        borderRadius: '2',
        textStyle: {
            color: "#fff", // 文字的颜色
            border: 'none',
        },
        formatter: '{a} <br/>{b}: {c}W',
    },
    legend: {
        data: ['总功率', '室内温度',],
        textStyle: {
            color: '#fff',
            fontSize: '0.8rem',
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            interval: 0,//显示所有标签
            textStyle: {
                color: '#fff',
                fontSize: '0.6rem',
            }
        },
        data: [],
    },
    yAxis: [{
        name: '单位：W',
        type: 'value',
        nameTextStyle: {
            color: '#fff', // 设置为白色
            fontSize: '0.8rem',
        },
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
    {
        name: '单位：℃',
        type: 'value',
        nameTextStyle: {
            color: '#fff', // 设置为白色
            fontSize: '0.8rem',
        },
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
    ],
    grid: {
        show: false,
        left: '6%',
        right: '6%',
        top: '20%',    // 一下数值可为百分比也可为具体像素值
        bottom: '13%',
    },
    series: [],
};
onMounted(() => {
    myChart = echarts.init(lineChartRef.value);
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = async () => {
    xAxisData.value = ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'];
    //请求API
    // const res: any = await API();
    seriesData.value = [
        {
            name: '总功率',
            data: [820, 932, 901, 934, 890, 1330, 1320, 820, 932, 901, 934, 1290, 1330],
            color: 'rgb(131, 238, 176, 0.5)',
            yAxisIndex: 0,
        },
        {
            name: '室内温度',
            data: [800, 902, 781, 834, 1090, 1130, 1020, 800, 732, 801, 834, 1200, 1200],
            color: 'rgb(101, 211, 255, 0.5)',
            yAxisIndex: 1,
        },
    ];
    option.xAxis.data = xAxisData.value;
    option.series = seriesData.value.map((item: any) => {
        item.type = 'line';
        item.smooth = true; //平滑
        item.areaStyle = {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [  // 渐变颜色
                    {
                        offset: 0,
                        color: item.color,
                    },
                    {
                        offset: 1,
                        color: 'rgba(255, 255, 255, 0)',
                    },
                ],
                global: false,
            },
        };
        return item;
    });

    console.log(option)
    myChart.setOption(option);
    myChart.resize();
};

</script>
<style lang="less" scoped>
.flex-item-ctn {
    background-image: url('');
    // background-color: rgba(128, 201, 60, 0.767);

    .flex-item {
        width: 100%;
        height: 26.5rem;
        background-image: url('../../../assets/images/monitorDashboard/item_border_3.png');
        // background-color: rgba(255, 116, 116, 0.5);
        background-size: 100% 90%;
        background-position: center;
        /* 防止背景图片重复 */
        background-repeat: no-repeat;
        position: relative;

        .item-title {
            height: 2rem;
            padding-top: 0.2rem;
            position: relative;
            display: flex;
            align-items: center
        }

        .item-chart {
            width: 100%;
            height: 21rem;
            margin-top: 1rem;
        }
    }
}
</style>
