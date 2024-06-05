<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <img src="../../../assets/images/microPowerGrid/mini_title.png">
                <span>实时功率</span>
            </div>
            <div>
                <div class="item-tooltip" v-if="!mouseIn && mouseInSetTime" :style="{
                    backgroundColor: 'rgb(101, 211, 255, 0.5)',
                }">
                    Pz： {{ seriesData[0]?.data[seriesData[0]?.data.length - 1] }} w <br />
                    温度：{{ seriesData[1]?.data[seriesData[1]?.data.length - 1] }} ℃<br />
                    时间：{{ seriesData[0]?.nowSecond }}
                </div>
                <div ref="lineChartRef" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" class="item-chart">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { getSsGvTj, getTemperatureInfo } from "@/utils/api/microPowerGridServer";
import { formatterDate } from "@/utils/base";
import { informStore } from "@/stores/inform";

const inStore: any = informStore();
const mouseIn = ref<boolean>(false);
const mouseInSetTime = ref<boolean>(false);
const lineChartRef = ref<any>();
const xAxisData = ref<any>([]);
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
        // formatter: '{a} <br/>{b}: {c}w',
        formatter: (params: any) => {
            // console.log(params[0],params[1]);
            if (params.length === 2) {
                return `
                <div>
                    Pz: ${params[0]['data']} w <br/>
                    温度: ${params[1]['data']} ℃ <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']}
                </div> `
            } else if (params[0].seriesName === "总功率") {
                return `
                <div>
                    Pz: ${params[0]['data']} w <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                </div> `
            } else {
                return `
                <div>
                    温度: ${params[0]['data']} ℃ <br/>
                    时间: ${formatterDate(new Date())} ${params[0]['name']} <br/>
                </div> `
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
            rotate: 45, // 设置文字倾斜的角度
            // interval: 0,//显示所有标签
            textStyle: {
                color: '#fff',
                fontSize: '0.6rem',
            }
        },
        data: [],
    },
    yAxis: [{
        name: '单位：w',
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
            getSsGvTj().then((res2: any) => {
                xAxisData.value.length = 0;
                seriesData.value[0].data.length = 0;
                seriesData.value[1].data.length = 0;
                const centerTemp: any[] = res1.data.filter((item: any) => item.type === '01')
                const centerPower: any[] = res2.data.filter((item: any) => item.type_code === '06')
                // console.log(centerTemp, centerPower);
                for (let i = 0; i < centerTemp.length; i++) {
                    const data_date: any = centerTemp[i].dataDate.split(' ');
                    const nowDate: string = data_date[0];
                    const nowTime: string = data_date[1].slice(0, 5);
                    seriesData.value[0].nowDate = nowDate;
                    seriesData.value[1].nowDate = nowDate;
                    xAxisData.value.push(nowTime);
                    if (Object.prototype.hasOwnProperty.call(centerTemp[i], 'snTemperature')) {
                        seriesData.value[1].data.push(centerTemp[i].snTemperature);
                        seriesData.value[1].nowSecond = centerTemp[i].dataDate;
                        inStore.updateInfo({
                            indoorTemp: centerTemp[i].snTemperature,
                            outdoorTemp: centerTemp[i].swTemperature,
                        })
                    }
                }
                for (let i = 0; i < centerPower.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(centerPower[i], 'pz')) {
                        seriesData.value[0].data.push(centerPower[i].pz);
                        seriesData.value[0].nowSecond = centerPower[i].data_date;
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
                    mouseInSetTime.value = true;
                }, 1000);
                // timer = setTimeout(() => {
                //     myChart.dispatchAction({
                //         type: 'showTip',
                //         seriesIndex: 0,
                //         dataIndex: seriesData.value[0]?.data.length - 1 || 0
                //     });
                // }, 1000);
                // // 默认显示最新数据的tooltip
                // interval.inter2 = setInterval(() => {
                //     myChart.dispatchAction({
                //         type: 'showTip',
                //         seriesIndex: 0,
                //         dataIndex: seriesData.value[0]?.data.length - 1 || 0
                //     });
                // }, 5000)
                myChart.resize();
            })
        }
    });
};

const handleMouseOver = () => {
    mouseIn.value = true;

}
const handleMouseLeave = () => {
    mouseIn.value = false;
}

onBeforeUnmount(() => {
    // console.log('家用电器实时功率关闭');
    mouseInSetTime.value = false;
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

    .item-tooltip {
        width: 15rem;
        // height: 5rem;
        position: absolute;
        left: 20%;
        top: 45%;
        border-radius: 0.1rem;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        padding: 0.5rem;
        font-size: 0.8rem;
        color: #fff;
    }
}
</style>
