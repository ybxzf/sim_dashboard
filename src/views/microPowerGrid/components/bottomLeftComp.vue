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
import * as echarts from 'echarts';
import 'echarts-gl';

const chart3DRef = ref<any>();
// 传入数据生成 option
const optionsData = ref<any>([]);

let myChart: any = null;

onMounted(() => {
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});

const init = async () => {
    myChart = echarts.init(chart3DRef.value)
    //请求API
    optionsData.value = [
        {
            name: '储能',
            value: 4256,
            itemStyle: {
                //   opacity: 0.5,
                color: 'rgb(0, 136, 255, 0.4)',
                iuconColor: 'rgb(0, 136, 255, 0.4)',
            },
        },

        {
            name: '充电桩',
            value: 2356,
            itemStyle: {
                //   opacity: 0.5,
                color: 'rgb(255, 166, 0, 0.4)',
                iuconColor: 'rgb(255, 166, 0)',
            },
        },
        {
            name: '家用负荷',
            value: 2018,
            itemStyle: {
                //   opacity: 0.5,
                color: 'rgb(255, 255, 255, 0.4)',
                iuconColor: 'rgb(255, 255, 255)',
            },
        },
    ]
    const series = getPie3D(optionsData.value, 0.8);
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
            length2: '40rem',
        },
        startAngle: -30, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['40%', '60%'],
        center: ['50%', '35%'],
        data: optionsData.value,
        itemStyle: {
            opacity: 0,
        },
    })
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
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
                    console.log(params);

                    return `${params.seriesName}<br/>
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};">
                    </span>
                    ${option.series[params.seriesIndex].pieData.value}
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
            boxHeight: 0.015,
            top: -15,
            left: '2%',
            // bottom: '60%',
            // environment: "rgba(255,255,255,0)",
            viewControl: {
                distance: 180,
                alpha: 25,
                beta: 30,
                autoRotate: false, // 自动旋转
            },
        },
        series: series,
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
}

function getParametricEquation(
    startRatio: any,
    endRatio: any,
    isSelected: any,
    isHovered: any,
    k: any,
    height: any,
) {
    // 计算
    let midRatio = (startRatio + endRatio) / 2

    let startRadian = startRatio * Math.PI * 2
    let endRadian = endRatio * Math.PI * 2
    let midRadian = midRatio * Math.PI * 2

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        isSelected = false
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1

    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x: function (u: any, v: any) {
            if (u < startRadian) {
                return (
                    offsetX +
                    Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                )
            }
            if (u > endRadian) {
                return (
                    offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                )
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        y: function (u: any, v: any) {
            if (u < startRadian) {
                return (
                    offsetY +
                    Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                )
            }
            if (u > endRadian) {
                return (
                    offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                )
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
        },

        z: function (u: any, v: any) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u)
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u)
            }
            return Math.sin(v) > 0 ? 1 * height : -1
        },
    }
}
// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: any, internalDiameterRatio: any) {
    let series = []
    let sumValue = 0
    let startValue = 0
    let endValue = 0
    let legendData = []
    let k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value

        let seriesItem: any = {
            name:
                typeof pieData[i].name === 'undefined'
                    ? `series${i}`
                    : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k: k,
            },
        }

        if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle: any = {}

            typeof pieData[i].itemStyle.color != 'undefined'
                ? (itemStyle.color = pieData[i].itemStyle.color)
                : null
            typeof pieData[i].itemStyle.opacity != 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null

            seriesItem.itemStyle = itemStyle
        }
        series.push(seriesItem)
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value
        console.log(series[i])
        series[i].pieData.startRatio = startValue / sumValue
        series[i].pieData.endRatio = endValue / sumValue
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value,
        )

        startValue = endValue

        legendData.push(series[i].name)
    }
    return series
}





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
                display: flex;
                // justify-content: center;
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
