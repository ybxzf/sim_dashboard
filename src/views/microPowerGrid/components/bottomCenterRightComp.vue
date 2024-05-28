<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <img src="../../../assets/images/microPowerGrid/mini_title.png">
                <span>实时功率</span>
            </div>
            <div>
                <div ref="lineChartRef" class="item-chart"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { formatterDate } from "@/utils/base";

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
        // formatter: '{a} <br/>{b}: {c}KW',
        formatter: (params: any) => {
            // console.log(params[0],params[1]);
            return `
            <div>
                Pz: ${params[0]['data']} kW <br/>
                时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                温度: ${params[1]['data']} ℃
            </div>
            `
        },
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
            rotate: 45, // 设置文字倾斜的角度
            interval: 0,//显示所有标签
            textStyle: {
                color: '#fff',
                fontSize: '0.6rem',
            }
        },
        data: [],
    },
    yAxis: [{
        name: '单位：kW',
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
        top: '20%',    // 一下数值可为百分比也可为具体像素值
        right: '12%',
        bottom: '16%',
        left: '14%'
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
    xAxisData.value = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
    //请求API
    // const res: any = await API();
    seriesData.value = [
        {
            name: '总功率',
            data: [820, 932, 901, 934, 890, 1330, 820, 1320],
            color: 'rgb(131, 238, 176, 0.5)',
            yAxisIndex: 0,
        },
        {
            name: '室内温度',
            data: [32, 30, 33, 29, 26, 27, 30, 22],
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

    // console.log(option)
    myChart.setOption(option);
    setTimeout(() => {
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: seriesData.value[0]?.data.length - 1 || 0
        });
    }, 1000);
    // 默认显示最新数据的tooltip
    setInterval(() => {
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: seriesData.value[0]?.data.length - 1 || 0
        });
    }, 5000)
    myChart.resize();
};

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    font-size: 1rem;
    background-image: url('');

    .item-title {
        // border: 1px solid #53ff5b;
        height: 1.7rem;
        // font-size: 1rem;
        display: flex;
        align-items: center;
        margin-top: 2rem;
        position: relative;

        img {
            position: absolute;
            width: 20rem;
            left: 1.2rem;
        }
    }

    .item-chart {
        width: 100%;
        height: 15rem;
        // border: 1px solid red;
    }
}
</style>
