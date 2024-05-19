<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span class="title-name">
                    {{ typeSelected === 'REAL_TIME' ? '储能实时数据' : '储能功率监测' }}
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
                    <div class="item-slot">
                        <img :src="`${baseURL}images/microPowerGrid/photovoltaic_click.png`">
                        <img :src="`${baseURL}images/microPowerGrid/city_elec_not_click.png`">
                    </div>
                </realTimeData>
            </div>
            <div v-else>
                <curveChartData :chartData="chartData"></curveChartData>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import realTimeData from "@/components/realTimeData.vue";
import curveChartData from "@/components/curveChartData.vue";
import type { PROP_CONT } from "@/assets/interface";

const baseURL: any = import.meta.env.BASE_URL;
const chartData = ref<any>([]);
const typeSelected = ref<string>('REAL_TIME');
const contentData = ref<PROP_CONT>();


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
    setInterval(() => {
        console.log('更新数据', typeSelected.value);
        init(typeSelected.value);
    }, 5000)

});
const init = async (dateType: string = 'REAL_TIME') => {
    typeSelected.value = dateType;
    if (dateType === 'REAL_TIME') {
        // const res:any = await REAL_TIME_API();
        contentData.value = {
            title: '储能设备1号',
            deviceImg: 'energy_device',
            cont_data: [
                {
                    iconName: 'battery_power',
                    dataName: '电池电量',
                    realData: 80,
                    unit: '%'
                }, {
                    iconName: 'DC_power',
                    dataName: '直流功率',
                    realData: 20,
                    unit: 'kW'
                }, {
                    iconName: 'charge_total',
                    dataName: '总充电量',
                    realData: 50,
                    unit: 'kW.h'
                }, {
                    iconName: 'discharge_total',
                    dataName: '总放电量',
                    realData: 2001,
                    unit: 'kW.h'
                }, {
                    iconName: 'daily_charge',
                    dataName: '今日充电量',
                    realData: 10,
                    unit: 'kW.h'
                }, {
                    iconName: 'daily_discharge',
                    dataName: '今日放电量',
                    realData: 20,
                    unit: 'kW.h'
                },
            ],
        }
    } else {
        //  chartData.value = await CURVE_API();
        // const chartData: any = {};
        chartData.value.xAxisData = ['00:00', '01:30', '03:00', '04:30', '06:00', '07:30', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30', '24:00'];
        chartData.value.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290];
        Object.assign(chartData.value, {
            yAxisUnit: '单位：kW',
            legendDataName: '储能功率',
            lineColorT: 'rgb(0, 186, 255, 0.5)',
            lineColor: 'rgb(0, 186, 255, 1)',
        })

    }

};

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
            display: flex;
            justify-content: center;
            img{
                width: 4rem;
            }
        }
    }
}
</style>
