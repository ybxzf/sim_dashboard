<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>光伏使用情况</span>
            </div>
            <div ref="chart3DRef" class="item-chart"></div>
            <div class="item-chart-title">
                <div v-for="(it, i) in optionsData" :key="i">
                    <div class="title-icon" :style="{ backgroundColor: it.itemStyle.iuconColor }" />
                    {{ it.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { getPie3D } from "@/utils/base";
import { getSelectDlsyqk } from "@/utils/api/microPowerGridServer";
import * as echarts from 'echarts';
import 'echarts-gl';

const chart3DRef = ref<any>();
// 传入数据生成 option
const optionsData = ref<any>([
    // {
    //     name: '储能',
    //     value: 10,
    //     itemStyle: {
    //         //   opacity: 0.5,
    //         color: 'rgb(0, 255, 76, 0.7)',
    //         iuconColor: 'rgb(0, 255, 76)',
    //     },
    // },

    {
        name: '充电桩',
        value: 10,
        itemStyle: {
            //   opacity: 0.5,
            color: 'rgb(255, 166, 0, 0.7)',
            iuconColor: 'rgb(255, 166, 0)',
        },
    },
    {
        name: '家用负荷',
        value: 10,
        itemStyle: {
            //   opacity: 0.5,
            color: 'rgb(0, 221, 255, 0.7)',
            iuconColor: 'rgb(0, 221, 255)',
        },
    },
]);

let myChart: any = null;
let interval: any = null; //循环器

onMounted(() => {
    myChart = echarts.init(chart3DRef.value);
    init();
    interval = setInterval(() => {
        init();
    }, 1000 * 30)
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});

const init = () => {
    //请求API
    getSelectDlsyqk().then((res: any) => {
        if (res.code === 0) {
            if (Object.prototype.hasOwnProperty.call(res, 'data')) {
                res.data.map((item: any) => {
                    // if (item.name === '储能充') {
                    //     optionsData.value[0].value = Number(item.num) * 100;
                    //     optionsData.value[0].realValue = Number(item.num);
                    // } 
                    if (item.name === '充电桩') {
                        optionsData.value[0].value = Number(item.num) * 100;
                        optionsData.value[0].realValue = Number(item.num);
                    }
                    if (item.name === '家用负荷总') {
                        optionsData.value[1].value = Number(item.num) * 100;
                        optionsData.value[1].realValue = Number(item.num);
                    }
                })
                const maxValue: number = (optionsData.value.reduce((max: any, current: any) => {
                    return current.value > max.value ? current : max;
                }, optionsData.value[0])).value;
                const series: any[] = getPie3D(optionsData.value, 0.8);
                series.push({
                    name: 'pie2d',
                    type: 'pie',
                    label: {
                        opacity: 1,
                        lineHeight: 20,
                        textStyle: {
                            fontSize: '1rem',
                            color: '#fff',
                        },
                        formatter: '{d}%',
                    },
                    labelLine: {
                        length: '10rem',
                        length2: '30rem',
                    },
                    startAngle: -30, //起始角度，支持范围[0, 360]。
                    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
                    radius: ['40%', '55%'],
                    center: ['52%', '37%'],
                    data: optionsData.value,
                    itemStyle: {
                        opacity: 0,
                    },
                })
                // 准备待返回的配置项，把准备好的 legendData、series 传入。
                let option: any = {
                    // legend: {
                    //     show: true,
                    //     tooltip: {
                    //         show: true,
                    //     },
                    //     orient: 'vertical',
                    //     data: ['待办', '已办', '未处理', '忽略'],
                    //     top: 'center',
                    //     itemGap: 14,
                    //     itemHeight: 8,
                    //     itemWidth: 17,
                    //     right: '2%',
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 12,
                    //     },
                    // },
                    animation: true,
                    tooltip: {
                        position: 'right',
                        borderColor: 'transparent',
                        backgroundColor: 'rgb(101, 211, 255, 0.5)',
                        borderRadius: '2',
                        textStyle: {
                            color: "#fff", // 文字的颜色
                            border: 'none',
                        },
                        formatter: (params: any) => {
                            if (
                                params.seriesName !== 'mouseoutSeries' &&
                                params.seriesName !== 'pie2d'
                            ) {
                                // console.log(params);
                                const value: any = option.series[params.seriesIndex]?.pieData.realValue ?
                                    option.series[params.seriesIndex]?.pieData.realValue :
                                    option.series[params.seriesIndex]?.pieData.value
                                return `${params.seriesName}<br/>
                                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};">
                                    </span>
                                    ${value}
                                    kWh
                                `
                            }
                        },
                    },
                    // title: {
                    //     x: 'center',
                    //     top: '20',
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 22,
                    //     },
                    // },
                    backgroundColor: 'transparent',//背景透明
                    // backgroundColor: '#fff',//背景透明
                    // labelLine: {
                    //     show: true,
                    //     lineStyle: {
                    //         color: '#fff',
                    //     },
                    //     normal: {
                    //         show: true,
                    //         length: 10,
                    //         length2: 10,
                    //     },
                    // },
                    // label: {
                    //     show: true,
                    //     position: 'outside',
                    //     formatter: '{b} \n{d}%',
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: '1rem',
                    //     },
                    // },
                    xAxis3D: {
                        min: -1,
                        max: 1,
                    },
                    yAxis3D: {
                        min: -1,
                        max: 1,
                    },
                    zAxis3D: {
                        min: -1,
                        max: 1,
                    },
                    grid3D: {
                        show: false,
                        boxHeight: maxValue > 1 ? (90 / maxValue) : 90,    //3D图高
                        // 9 * Math.pow(0.1, (String(maxValue.toFixed()).length) - 1),
                        top: -15,
                        left: '2%',
                        // bottom: '60%',
                        // environment: "rgba(255,255,255,0)",
                        viewControl: {
                            distance: 200,
                            alpha: 25,
                            beta: 30,
                            autoRotate: false, // 自动旋转
                        },
                    },
                    series: series,
                }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                myChart.resize();
            }
        } else {
            new Error('selectDlsyqk接口请求失败');
        }
    })
}

onBeforeUnmount(() => {
    console.log('光伏使用情况关闭');
    myChart.clear();
    clearInterval(interval);
})

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    position: relative;
    font-size: 1rem;
    font-weight: bolder;

    .flex-item {
        .item-chart-title {
            // background-color: #ee4545;
            color: #c2c2c2;
            position: absolute;
            left: 6rem;
            bottom: 1.5rem;
            width: 18rem;
            display: flex;

            >* {
                width: 6rem;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .title-icon {
                width: 1rem;
                height: 1rem;
                margin-right: 0.3rem;
            }
        }

        .item-chart {
            width: 100%;
            height: 16rem;
            // border: 1px solid red;
        }
    }

}
</style>
