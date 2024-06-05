<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span class="title-name">
                    {{ typeSelected === 'REAL_TIME' ? '光伏发电监测' : '光伏发电功率监测' }}
                </span>
                <div class="chart-button-ctn">
                    <div>
                        <span class="chart-button-img-1" @click="init('REAL_TIME')">
                            <img v-if="typeSelected === 'REAL_TIME'"
                                src="../../../assets/images/microPowerGrid/button_2_click.png">
                            <img v-else src="../../../assets/images/microPowerGrid/button_2_not_click.png">
                        </span>
                        <span>实时数据</span>
                    </div>
                    <div>
                        <span class="chart-button-img-2" @click="init('CURVE')">
                            <img v-if="typeSelected === 'CURVE'"
                                src="../../../assets/images/microPowerGrid/button_2_click.png">
                            <img v-else src="../../../assets/images/microPowerGrid/button_2_not_click.png">
                        </span>
                        <span>曲线数据</span>
                    </div>
                </div>
            </div>
            <div v-if="typeSelected === 'REAL_TIME'" class="item-chart">
                <realTimeData :content="contentData">
                    <div class="item-slot">充电中...</div>
                </realTimeData>
            </div>
            <div v-else>
                <div class="item-tooltip" v-if="!mouseIn && mouseInSetTime" :style="{
                    backgroundColor: chartData.lineColorT,
                }">
                    Pz: {{ chartData?.seriesData[chartData?.seriesData.length - 1] || 0 }} w <br />
                    时间: {{ chartData.nowSecond }}
                </div>
                <curveChartData @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" :chartData="chartData">
                </curveChartData>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import realTimeData from "@/components/realTimeData.vue";
import curveChartData from "@/components/curveChartData.vue";
import { getSsGvTj } from "@/utils/api/microPowerGridServer";
import type { PROP_CONT } from "@/assets/interface";
import { realTimeDataStore } from "@/stores/realTimeData";

const realStore: any = realTimeDataStore();
const mouseIn = ref<boolean>(false);
const mouseInSetTime = ref<boolean>(false);
const chartData = ref<any>({
    yAxisUnit: '单位：w',
    legendDataName: '光伏发电',
    lineColorT: 'rgb(131, 238, 176, 0.5)',
    lineColor: 'rgb(131, 238, 176, 1)',
    nowDate: '2014-06-25',    //当天年月日
    nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
    xAxisData: [],  //x轴时分集合
    seriesData: [],
});
const typeSelected = ref<string>('REAL_TIME');
const contentData = computed(() => {
    return {
        title: '光伏发电',
        deviceImg: 'photovoltaic_device',
        cont_data: [
            {
                iconName: 'real-time_output_volt',
                dataName: '实时输出电压',
                realData: realStore.realTimeData.photovoltaicUa,
                unit: 'V'
            }, {
                iconName: 'output_current',
                dataName: '输出电流',
                realData: realStore.realTimeData.photovoltaicIa,
                unit: 'A'
            }, {
                iconName: 'output_power_total',
                dataName: '累计输出电量',
                realData: realStore.realTimeData.photovoltaicTotal,
                unit: 'kWh'
            }, {
                iconName: 'output_power',
                dataName: '输出功率',
                realData: realStore.realTimeData.photovoltaicPz,
                unit: 'kWh'
            }, {
                iconName: 'daily_power_generate',
                dataName: '日发电量',
                realData: realStore.realTimeData.photovoltaiDaily,
                unit: 'kWh'
            },
        ],
    }
})

let timer: any = null; //定时器
let interval: any = null; //循环器

watch(() => typeSelected.value,
    (_nv: any, _ov: any) => {
        // if (_ov === undefined && _nv === 'REAL_TIME') {
        //     console.log('第一次', lineChartRef.value);
        // }
        // if (_ov === 'CURVE' && myChart !== null) {
        //     console.log('切换', _nv, _ov);
        //     myChart.clear();
        // }
    }, { immediate: true }
);
onMounted(() => {
    init();
    interval = setInterval(() => {
        // console.log('更新数据', typeSelected.value);
        init(typeSelected.value);
    }, 5000)

});

const init = async (dateType: string = 'REAL_TIME') => {
    typeSelected.value = dateType;
    if (dateType === 'REAL_TIME') {
        clearTimeout(timer);
        mouseInSetTime.value = false;
        // const res:any = await REAL_TIME_API();
        // contentData.value = 
    } else {
        // chartData.value.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290];
        // chartData.value.xAxisData = ['00:00', '01:30', '03:00', '04:30', '06:00', '07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30', '24:00'];
        // chartData.value.xAxisData = ['00:00', '01:30', '03:00', '04:30', '06:00', '07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30', '24:00'];
        // chartData.value.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290];
        // Object.assign(chartData.value, {
        //     yAxisUnit: '单位：w',
        //     legendDataName: '光伏发电',
        //     lineColorT: 'rgb(131, 238, 176, 0.5)',
        //     lineColor: 'rgb(131, 238, 176, 1)',
        // })
        getSsGvTj().then((res: any) => {
            // console.log(res);
            if (res.code === 0) {
                const seriesData: number[] = [];
                const xAxisData: string[] = [];
                const data: any = res.data.filter((item: any) => {
                    return item.type_code === "01"
                })
                data.map((item: any) => {
                    const data_date: any = item.data_date.split(' ');
                    const nowDate: string = data_date[0];
                    const nowTime: string = data_date[1].slice(0, 5);
                    // const nowSecond: string = data_date[1].slice(-2);
                    chartData.value.nowDate = nowDate;
                    xAxisData.push(nowTime);
                    if (Object.prototype.hasOwnProperty.call(item, 'pz')) {
                        seriesData.push(item.pz);
                        chartData.value.nowSecond = item.data_date;
                    }
                })
                chartData.value.seriesData = seriesData;
                chartData.value.xAxisData = xAxisData;
                timer = setTimeout(() => {
                    mouseInSetTime.value = true;
                }, 1000);
                // console.log(chartData.value);
            }
        });
    }

};

const handleMouseOver = () => {
    mouseIn.value = true;

}
const handleMouseLeave = () => {
    timer = setTimeout(() => {
        mouseIn.value = false;
    }, 200);
}

onBeforeUnmount(() => {
    mouseInSetTime.value = false;
    clearTimeout(timer);
    clearInterval(interval);
});
</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;

    .item-title {
        // border: 1px solid rgb(165, 252, 184);
        position: relative;

        .title-name {
            width: 10rem;
        }
    }

    .item-chart {
        // background-color: rgba(228, 255, 234, 0.5);
        width: 100%;
        height: 16rem;

        // border: 1px solid red;
        .item-slot {
            color: aqua;
            font-size: 1rem;
            margin-top: 0.5rem;
        }
    }

    .item-tooltip {
        width: 18rem;
        height: 5rem;
        position: absolute;
        left: 30%;
        top: 40%;
        border-radius: 0.1rem;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        padding: 0.5rem;
        font-size: 1.1rem;
        color: #fff;
    }
}
</style>
