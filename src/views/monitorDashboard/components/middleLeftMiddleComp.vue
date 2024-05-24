<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span style="width: 10rem;">电量分解</span>
                <div class="chart-button-ctn">
                    <div>
                        <span class="chart-button-img-1" @click="init('DAY')">
                            <img v-if="typeSelected === 'DAY'"
                                src="../../../assets/images/monitorDashboard/button_2_click.png">
                            <img v-else src="../../../assets/images/monitorDashboard/button_2_not_click.png">
                        </span>
                        <span>日电量</span>
                    </div>
                    <div>
                        <span class="chart-button-img-2" @click="init('MONTH')">
                            <img v-if="typeSelected === 'MONTH'"
                                src="../../../assets/images/monitorDashboard/button_2_click.png">
                            <img v-else src="../../../assets/images/monitorDashboard/button_2_not_click.png">
                        </span>
                        <span>月电量</span>
                    </div>
                </div>
            </div>
            <div class="item-date-picker">
                <el-date-picker class="el-date-picker" v-if="typeSelected === 'DAY'" v-model="date" type="date"
                    placeholder="选择日期" size="small" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :clearable="false" />
                <el-date-picker class="el-date-picker" v-else v-model="month" type="date" placeholder="选择月份" size="small"
                    format="YYYY-MM" value-format="YYYY-MM" :clearable="false" />
            </div>
            <!-- <img style="width: 100%; height : 16rem;" src="../../../assets/images/monitorDashboard/middleLeftMiddle.png"> -->
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
import 'dayjs/locale/zh-cn';
import { getPie3D, formatterDate, formatterMonth } from "@/utils/base";
import * as echarts from 'echarts';
import "echarts-gl";

const typeSelected = ref<string>('DAY');
const date = ref<string>(formatterDate(new Date()));
const month = ref<string>(formatterMonth(new Date()));
const chart3DRef = ref<any>();
// 传入数据生成 option
const optionsData = ref<any>();

let myChart: any = null;


watch([date.value, date.value,],
    (_nv: any) => {
        console.log('日期改变', _nv);
        init(typeSelected.value);
    });
onMounted(() => {
    myChart = echarts.init(chart3DRef.value);
    init();
    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
const init = async (dateType: string = 'DAY') => {
    console.log(date.value, month.value);
    typeSelected.value = dateType;
    //请求API
    if (dateType === 'DAY') {
        optionsData.value = await getElectric(date.value);
    } else {
        optionsData.value = await getElectric(month.value);
    }
    const series: any = getPie3D(optionsData.value, 0);
    series.push({
        name: 'pie2d',
        type: 'pie',
        label: {
            opacity: 1,
            // lineHeight: 20,
            textStyle: {
                fontSize: '1rem',
                color: '#fff',
            },
            // formatter: `{b}\n{d}%`,
            formatter: (params: any) => {
                const total: number = option.series.reduce((acc: any, cur: number) => acc.pieD + cur, 0);
                console.log(params, 'xxxx', option.series);
                return ``
            },
        },
        labelLine: {
            length: '10rem',
            length2: '40rem',
        },
        startAngle: -30, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['20%', '45%'],
        center: ['50%', '38%'],
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

                    return `${params.seriesName}<br/>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};">
                        </span>
                        ${option.series[params.seriesIndex].pieData.value}
                        kW.h
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
            boxWidth: 50,    //3D图宽
            boxDepth: 50,    //3D图长
            boxHeight: 0.015,    //3D图高
            top: -15,
            // left: '2%',
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
    myChart.setOption(option);
};

async function getElectric(date: string) {
    // const res: any = await DATE_API();
    console.log('根据时间请求API', date.split('-'));
    let elecData: any = [];
    if (date.split('-').length === 2) {
        elecData = [
            {
                name: '洗衣机',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'rgb(214,60,243, 1)',
                    iuconColor: 'rgb(214,60,243)',
                },
            },

            {
                name: '冰箱',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(225,200,54,1)',
                    iuconColor: 'RGB(225,200,54)',
                },
            },
            {
                name: '微波炉',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(87,237,196,1)',
                    iuconColor: 'RGB(87,237,196)',
                },
            }, {
                name: '其他',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(102,65,243,1)',
                    iuconColor: 'RGB(102,65,243)',
                },
            }, {
                name: '电磁炉',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(37,75,243,1)',
                    iuconColor: 'RGB(37,75,243)',
                },
            }, {
                name: '空调',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(109,205,230,1)',
                    iuconColor: 'RGB(109,205,230)',
                },
            },
        ]
    } else {
        elecData = [
            {
                name: '洗衣机',
                value: 3018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'rgb(214,60,243, 1)',
                    iuconColor: 'rgb(214,60,243)',
                },
            },

            {
                name: '冰箱',
                value: 1018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(225,200,54,1)',
                    iuconColor: 'RGB(225,200,54)',
                },
            },
            {
                name: '微波炉',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(87,237,196,1)',
                    iuconColor: 'RGB(87,237,196)',
                },
            }, {
                name: '其他',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(102,65,243,1)',
                    iuconColor: 'RGB(102,65,243)',
                },
            }, {
                name: '电磁炉',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(37,75,243,1)',
                    iuconColor: 'RGB(37,75,243)',
                },
            }, {
                name: '空调',
                value: 2018,
                itemStyle: {
                    //   opacity: 0.5,
                    color: 'RGB(109,205,230,1)',
                    iuconColor: 'RGB(109,205,230)',
                },
            },
        ]
    }
    return elecData;

}

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    font-size: 1rem;
    position: relative;

    .item-title {
        // border: 1px solid rgb(165, 252, 184);
        position: relative;
    }

    .item-date-picker {
        display: flex;
        height: 1rem;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        // border: 1px solid red;
        // z-index: 999;
    }

    .item-chart-title {
        // background-color: #ee4545;
        color: #c2c2c2;
        font-size: 0.8rem;
        position: absolute;
        left: 2.5rem;
        bottom: 1.5rem;
        width: 30rem;
        display: flex;

        >* {
            width: 4.5rem;
            display: flex;
            // justify-content: center;
            align-items: center;
        }

        .title-icon {
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.3rem;
            border-radius: 50%;
        }
    }
}
</style>

<style scoped>
:deep(.el-date-picker) {
    width: 7rem !important;
    margin-left: 1rem;
}

:deep(.el-input__wrapper) {
    background: transparent !important;
    border-radius: 0.3rem;
    border: 1px solid RGB(37, 75, 243, 0.5);
}

:deep(.el-input__inner) {
    color: rgb(255, 255, 255);
}
</style>
