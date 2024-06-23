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
                <div class="item-tooltip" v-if="!myChartList[0].mouseIn && myChartList[0].mouseInSetTime" :style="{
                    backgroundColor: myChartList[0]?.data.lineColorT,
                    top: '15%',
                }">
                    Pz：{{ myChartList[0]?.data.seriesData[myChartList[0]?.data.seriesData.length - 1] || 0 }} w <br />
                    时间：{{ myChartList[0]?.data.nowSecond }}
                </div>
                <div ref="lineChartRef1" @mouseover="handleMouseOver(0)" @mouseleave="handleMouseLeave(0)"
                    class="item-chart"></div>
            </div>
            <div style="height: 19rem;">
                <div style="height: 3rem;position: relative;">
                    <!-- <div>微波炉</div> -->
                    <img style="width: 9rem" :src="`${baseURL}images/monitorDashboard/micro-wave_cooker.png`">
                </div>
                <div class="item-tooltip" v-if="!myChartList[1].mouseIn && myChartList[1].mouseInSetTime" :style="{
                    backgroundColor: myChartList[1]?.data.lineColorT,
                    top: '46%',
                }">
                    Pz：{{ myChartList[1]?.data.seriesData[myChartList[1]?.data.seriesData.length - 1] || 0 }} w <br />
                    时间：{{ myChartList[1]?.data.nowSecond }}
                </div>
                <div ref="lineChartRef2" @mouseover="handleMouseOver(1)" @mouseleave="handleMouseLeave(1)"
                    class="item-chart"></div>
            </div>
            <div style="height: 19rem;">
                <div style="height: 3rem;position: relative;">
                    <!-- <div>洗衣机</div> -->
                    <img style="width: 9rem" :src="`${baseURL}images/monitorDashboard/wash_machine.png`">
                </div>
                <div class="item-tooltip" v-if="!myChartList[2].mouseIn && myChartList[2].mouseInSetTime" :style="{
                    backgroundColor: myChartList[2]?.data.lineColorT,
                    top: '77%',
                }">
                    Pz：{{ myChartList[2]?.data.seriesData[myChartList[2]?.data.seriesData.length - 1] || 0 }} w <br />
                    时间：{{ myChartList[2]?.data.nowSecond }}
                </div>
                <div ref="lineChartRef3" @mouseover="handleMouseOver(2)" @mouseleave="handleMouseLeave(2)"
                    class="item-chart"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { formatterDate } from "@/utils/base";
import { getSsJyfhGvTj } from "@/utils/api/monitorDashboardServer";

const baseURL: any = import.meta.env.BASE_URL;
const chartData = ref<any>({});
const lineChartRef1 = ref<any>();
const lineChartRef2 = ref<any>();
const lineChartRef3 = ref<any>();

// const myChartList: any = [{}, {}, {}];
const myChartList = reactive<any>([{
    mouseIn: false,
    mouseInSetTime: false,
}, {
    mouseIn: false,
    mouseInSetTime: false,
}, {
    mouseIn: false,
    mouseInSetTime: false,
}]);

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
let timer: any = null; //定时器
let interval: any = {}; //循环器

onMounted(() => {
    init();
    interval.inter1 = setInterval(() => {
        // console.log('更新数据');
        init();
    }, 1000 * 30)
    window.addEventListener('resize', () => {
        // console.log('窗口变化')
        init();
    });
});
const init = () => {
    for (let i = 0; i < myChartList.length; i++) {
        myChartList[i].data = {
            yAxisUnit: '单位：w',
            nowDate: '2014-06-25',    //当天年月日
            nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
            xAxisData: [],
            seriesData: [],
        };
        // myChartList[i].data.xAxisData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
        // myChartList[i].data.seriesData = [820, 932, 901, 934, 890, 1330, 1320, 820, 932,];
        // Object.assign(myChartList[i].data, {
        //     yAxisUnit: '单位：w',
        //     legendDataName: '充电桩',
        //     lineColorT: 'rgb(241, 193, 0, 0.5)',
        //     lineColor: 'rgb(241, 193, 0, 1)',
        // });

        myChartList[i].myChart = myChartList[i].myChart ? myChartList[i].myChart : null;
        myChartList[i].option = option;
    }
    getSsJyfhGvTj().then((res: any) => {
        // console.log(res);
        if (res.code === 0) {
            res.data.map((item: any) => {
                const data_date: any = item.data_date.split(' ');
                const nowDate: string = data_date[0];
                const nowTime: string = data_date[1].slice(0, 5);
                if (item.field03 === '电磁炉') {
                    myChartList[0].data.nowDate = nowDate;
                    myChartList[0].data.xAxisData.push(nowTime);
                    if (Object.prototype.hasOwnProperty.call(item, 'pz')) {
                        myChartList[0].data.seriesData.push(item.pz);
                        myChartList[0].data.nowSecond = item.data_date;
                    }

                }
                if (item.field03 === '微波炉') {
                    myChartList[1].data.nowDate = nowDate;
                    myChartList[1].data.xAxisData.push(nowTime);
                    if (Object.prototype.hasOwnProperty.call(item, 'pz')) {
                        myChartList[1].data.seriesData.push(item.pz);
                        myChartList[1].data.nowSecond = item.data_date;
                    }
                }
                if (item.field03 === '洗衣机') {
                    myChartList[2].data.nowDate = nowDate;
                    myChartList[2].data.xAxisData.push(nowTime);
                    if (Object.prototype.hasOwnProperty.call(item, 'pz')) {
                        myChartList[2].data.seriesData.push(item.pz);
                        myChartList[2].data.nowSecond = item.data_date;
                    }
                }
            })
            // console.log(myChartList);

            setOptionList(
                myChartList[0].myChart,
                lineChartRef1.value,
                Object.assign(myChartList[0].data, {
                    lineColorT: 'rgb(0, 83, 18, 0.5)',
                    lineColor: 'rgb(0, 83, 18, 1)',
                }),
                myChartList[0].option,
                0
            );
            setOptionList(
                myChartList[1].myChart,
                lineChartRef2.value,
                Object.assign(myChartList[1].data, {
                    lineColorT: 'rgb(161, 151, 0, 0.5)',
                    lineColor: 'rgb(161, 151, 0, 1)',
                }),
                myChartList[1].option,
                1
            );
            setOptionList(
                myChartList[2].myChart,
                lineChartRef3.value,
                Object.assign(myChartList[2].data, {
                    lineColorT: 'rgb(66, 66, 66, 0.5)',
                    lineColor: 'rgb(66, 66, 66, 1)',
                }),
                myChartList[2].option,
                2
            );
            // console.log('myChartList', myChartList);
        }
    })
    //请求API
    //  chartData.value = await CURVE_API();
    // const chartData: any = {};

    // console.log('chartData.value', chartData.value);



};
const setOptionList = (myChart: any, chartRef: any, data: any, option: any, index: number) => {
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
    if (Object.prototype.hasOwnProperty.call(data, 'nowSecond')) {
        option.series[0].nowSecond = data?.nowSecond;
    }

    // console.log(option)
    // nextTick(() => {

    myChart = echarts.init(chartRef);
    myChart.setOption(option);

    timer = setTimeout(() => {
        myChartList[index].mouseInSetTime = true;
    }, 1000);
    // timer = setTimeout(() => {
    //     myChart.dispatchAction({
    //         type: 'showTip',
    //         seriesIndex: 0,
    //         dataIndex: data?.seriesData.length - 1 || 0
    //     });
    // }, 1000);
    // // 默认显示最新数据的tooltip
    // interval.inter2 = setInterval(() => {
    //     myChart.dispatchAction({
    //         type: 'showTip',
    //         seriesIndex: 0,
    //         dataIndex: data?.seriesData.length - 1 || 0
    //     });
    // }, 1000 * 30)
    myChart.resize();
    // })
};



const handleMouseOver = (i: number) => {
    myChartList[i].mouseIn = true;

}
const handleMouseLeave = (i: number) => {
    timer = setTimeout(() => {
        myChartList[i].mouseIn = false;
    }, 200);
}

onBeforeUnmount(() => {
    // console.log('家用电器实时功率关闭');
    for (let i = 0; i < myChartList.length; i++) {
        myChartList[i].mouseInSetTime = false;
    }
    clearTimeout(timer);
    for (const key in interval) {
        if (Object.prototype.hasOwnProperty.call(interval, key)) {
            const element = interval[key];
            clearInterval(element);
        }
    }
})
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

        .item-tooltip {
            width: 18rem;
            // height: 5rem;
            position: absolute;
            left: 30%;
            border-radius: 0.1rem;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            padding: 0.5rem;
            font-size: 1.1rem;
            color: #fff;
        }
    }
}
</style>
