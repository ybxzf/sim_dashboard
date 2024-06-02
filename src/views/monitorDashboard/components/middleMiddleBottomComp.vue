<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span class="title-name">
                    室内空调监测
                </span>
            </div>
            <div class="item-temp">
                <div class="item-temp-room">
                    <img src="../../../assets/images/monitorDashboard/home_temp.png">
                    <span>室内温度</span>
                    <span class="item-temp-value">{{ newTemp.snTemperature }} ℃</span>
                </div>
                <div class="item-temp-outdoor">
                    <img src="../../../assets/images/monitorDashboard/outdoor_temp.png">
                    <span>室外温度</span>
                    <span class="item-temp-value">{{ newTemp.swTemperature }} ℃</span>
                </div>
            </div>
            <div ref="lineChartRef" class="item-chart"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { getTemperatureInfo, getSsJyfhGvTj } from "@/utils/api/monitorDashboardServer";
import { formatterDate } from "@/utils/base";

const lineChartRef = ref<any>();
const xAxisData = ref<any[]>([]);
const newTemp = ref<any>({
    snTemperature: 0,
    swTemperature: 0,
});
const seriesData = ref<any>([
    {
        name: '总功率',
        data: [],
        color: 'rgb(131, 238, 176, 0.5)',
        yAxisIndex: 0,
        nowDate: '2014-06-25',    //当天年月日
        nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
    },
    {
        name: '室内温度',
        data: [],
        color: 'rgb(101, 211, 255, 0.5)',
        yAxisIndex: 1,
        nowDate: '2014-06-25',    //当天年月日
        nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
    },
]);

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
        // formatter: '{a} <br/>{b}: {c}W',
        formatter: (params: any) => {
            // console.log(params);
            if (params.length === 2) {
                return `
                <div>
                    Pz: ${params[0]['data']} kW <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                    温度: ${params[1]['data']} ℃
                </div>
                `
            } else if (params[0].seriesName === "总功率") {
                return `
                <div>
                    Pz: ${params[0]['data']} kW <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                </div>
                `
            } else {
                return `
                <div>
                    温度: ${params[0]['data']} ℃ <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                </div>
                `
            }
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
            // interval: 0,//显示所有标签
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
let timer: any = null; //定时器
let interval: any = {}; //循环器

onMounted(() => {
    myChart = echarts.init(lineChartRef.value);
    init();
    interval.inter1 = setInterval(() => {
        // console.log('更新数据');
        init();
    }, 5000)
    window.addEventListener('resize', () => {
        // console.log('窗口变化')
        init();
    });
});

const init = async () => {
    getTemperatureInfo().then((res1: any) => {
        if (res1.code === 0) {
            getSsJyfhGvTj().then((res2: any) => {
                if (res2.code === 0) {
                    xAxisData.value.length = 0;
                    seriesData.value[0].data.length = 0;
                    seriesData.value[1].data.length = 0;
                    const indoorTemp: any[] = res1.data.filter((item: any) => item.type === '02')
                    const indoorPower: any[] = res2.data.filter((item: any) => item.field03 === '室内空调')
                    for (let i = 0; i < indoorTemp.length; i++) {
                        const data_date: any = indoorTemp[i].dataDate.split(' ');
                        const nowDate: string = data_date[0];
                        const nowTime: string = data_date[1].slice(0, 5);
                        seriesData.value[0].nowDate = nowDate;
                        seriesData.value[1].nowDate = nowDate;
                        xAxisData.value.push(nowTime);
                        if (Object.prototype.hasOwnProperty.call(indoorTemp[i], 'snTemperature')) {
                            seriesData.value[1].data.push(indoorTemp[i].snTemperature);
                            seriesData.value[1].nowSecond = indoorTemp[i].dataDate;
                            newTemp.value.snTemperature = indoorTemp[i].snTemperature;
                            newTemp.value.swTemperature = indoorTemp[i].swTemperature;
                        }
                    }
                    for (let i = 0; i < indoorPower.length; i++) {
                        if (Object.prototype.hasOwnProperty.call(indoorPower[i], 'pz')) {
                            seriesData.value[0].data.push(indoorPower[i].pz);
                            seriesData.value[0].nowSecond = indoorPower[i].data_date;
                        }
                    }
                    // console.log(seriesData.value);
                    // xAxisData.value = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
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
                    timer = setTimeout(() => {
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: seriesData.value[0]?.data.length - 1 || 0
                        });
                    }, 1000);
                    // 默认显示最新数据的tooltip
                    interval.inter2 = setInterval(() => {
                        myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: seriesData.value[0]?.data.length - 1 || 0
                        });
                    }, 5000)
                    myChart.resize();
                }
            })
        }
    })
};

onBeforeUnmount(() => {
    // console.log('家用电器实时功率关闭');
    clearTimeout(timer);
    for (const key in interval) {
        if (Object.prototype.hasOwnProperty.call(interval, key)) {
            const element = interval[key];
            clearInterval(element);
        }
    }
});


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

        .item-temp {
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            // border: 1px solid;
            position: absolute;
            width: 25rem;
            height: 2rem;
            right: 1.5rem;
            top: 1rem;
            color: #fff;

            >* {
                flex: 1;
                display: flex;
                align-items: center;

            }

            img {
                width: 2rem;
            }

            .item-temp-value {
                font-size: 1.5rem;
                margin-left: 0.5rem;
                color: #00eeff;

            }
        }

        .item-chart {
            width: 100%;
            height: 21rem;
            margin-top: 1rem;
        }
    }
}
</style>
