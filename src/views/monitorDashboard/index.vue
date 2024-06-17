<template>
    <div class="pg-ctn">
        <div class="grid-logo"></div>
        <div class="back-button" @click="backFrontPage">返回首页</div>
        <div class="fridge-button" @click="chartDialog('fridge')"></div>
        <div class="tv-button" @click="chartDialog('tv')"></div>
        <div class="air-button" @click="chartDialog('air')"></div>
        <div class="wash-button" @click="chartDialog('wash')"></div>
        <div class="ic-button" @click="chartDialog('ic')"></div>
        <div class="mo-button" @click="chartDialog('mo')"></div>
        <el-row class="pg-title-ctn">
            <el-col class="pg-title-col" :span="24">
                <titleComp />
            </el-col>
        </el-row>
        <el-row class="pg-content-ctn">
            <el-col :span="6">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleLeftTopComp />
                    </el-col>
                    <el-col :span="24">
                        <middleLeftMiddleComp />
                    </el-col>
                    <el-col :span="24">
                        <middleLeftBottomComp />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleMiddleTopComp />
                    </el-col>
                    <el-col :span="24">
                        <middleMiddleBottomComp />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row class="content-item">
                    <el-col :span="24">
                        <middleRightComp />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog v-model="dialogVisible" :before-close="handleClose">
            <template #title>
                <span>{{ deviceObj[deviceName] }}实时功率曲线</span>
            </template>
            <middleMiddleBottomComp v-if="deviceName === 'air'" :isDialog="true" />
            <div v-else class="chart-cnt">
                <div class="item-tooltip" v-if="!mouseIn && mouseInSetTime" :style="{
                    backgroundColor: chartData.lineColorT,
                }">
                    Pz: {{ chartData?.seriesData[chartData?.seriesData.length - 1] || 0 }} w <br />
                    时间: {{ chartData.nowSecond }}
                </div>
                <curveChartData ref="chartRef" class="chart" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"
                    :chartData="chartData">
                </curveChartData>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="closeDialog">关闭</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from 'element-plus'
import titleComp from "./components/titleComp.vue";
import middleLeftTopComp from "./components/middleLeftTopComp.vue";
import middleLeftMiddleComp from "./components/middleLeftMiddleComp.vue";
import middleLeftBottomComp from "./components/middleLeftBottomComp.vue";
import middleMiddleTopComp from "./components/middleMiddleTopComp.vue";
import middleMiddleBottomComp from "./components/middleMiddleBottomComp.vue";
import middleRightComp from "./components/middleRightComp.vue";
import curveChartData from "@/components/curveChartData.vue";
import { getSsJyfhGvTj } from "@/utils/api/monitorDashboardServer";

const baseURL: any = import.meta.env.BASE_URL;
const route: any = useRoute();
const router: any = useRouter();

const dialogVisible = ref<boolean>(false);
const chartRef = ref<any>(null);
const deviceName = ref<string>('');
const deviceObj = ref<any>({
    fridge: '冰箱',
    tv: '电视机',
    air: '空调',
    wash: '洗衣机',
    ic: '电磁炉',
    mo: '微波炉',
});
const mouseIn = ref<boolean>(false);
const mouseInSetTime = ref<boolean>(false);
const chartData = ref<any>({
    yAxisUnit: '单位：w',
    legendDataName: '功率曲线',
    lineColorT: 'rgb(131, 238, 176, 0.5)',
    lineColor: 'rgb(131, 238, 176, 1)',
    nowDate: '2014-06-25',    //当天年月日
    nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
    xAxisData: [],  //x轴时分集合
    seriesData: [],
});

let timer: any = {}; //定时器
let interval: any = null; //循环器

watch(() => dialogVisible.value,
    (_nv: boolean) => {
        if (!_nv) {
            timer.timer1 = setTimeout(() => {
                deviceName.value = '';
                chartData.value = {
                    yAxisUnit: '单位：w',
                    legendDataName: '功率曲线',
                    lineColorT: 'rgb(131, 238, 176, 0.5)',
                    lineColor: 'rgb(131, 238, 176, 1)',
                    nowDate: '2014-06-25',    //当天年月日
                    nowAllDate: '2014-06-25 00:00:00',  //当前完整年月日时分秒
                    xAxisData: [],  //x轴时分集合
                    seriesData: [],
                };
                clearInterval(interval);
            }, 100);
        }
    })
onMounted(() => {
    init();
});

const init = async () => { };

const backFrontPage = () => {
    console.log('返回首页');
    console.log('route', route);
    console.log('router', router);
    router.push({
        name: 'home',
        params: {}
    })
};

const chartDialog = (device: string) => {
    deviceName.value = device;
    getDataFromAPI();
    interval = setInterval(() => {
        // console.log('更新数据');
        getDataFromAPI();
    }, 1000 * 30)
};

const getDataFromAPI = () => {
    getSsJyfhGvTj().then((res: any) => {
        if (res.code === 0) {
            const seriesData: number[] = [];
            const xAxisData: string[] = [];
            const data: any = res.data.filter((item: any) => {
                return item.field03 === deviceObj.value[`${deviceName.value}`]
                // if (deviceName.value === 'fridge') {
                //     return item.field03 === '冰箱'
                // } else if (deviceName.value === 'tv') {
                //     return item.field03 === '电视'
                // }
            })
            console.log(data);
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
            timer.timer2 = setTimeout(() => {
                mouseInSetTime.value = true;
            }, 1000);
            dialogVisible.value = true;
            // console.log(chartData.value);
        }
    });
};

const handleMouseOver = () => {
    mouseIn.value = true;
};

const handleMouseLeave = () => {
    timer.timer3 = setTimeout(() => {
        mouseIn.value = false;
    }, 200);
};

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定要关闭该窗口吗？')
        .then(() => {
            done();
        })
        .catch(() => {
            // catch error
        })
};

const closeDialog = () => {
    dialogVisible.value = false;
    chartRef.value.clearResource();
};

onBeforeUnmount(() => {
    for (const key in timer) {
        if (Object.prototype.hasOwnProperty.call(timer, key)) {
            const element = timer[key];
            clearTimeout(element);
        }
    }
});
</script>
<style lang="less" scoped>
.pg-ctn {
    width: 120rem;
    height: 67.5rem;
    background-image: url('../../assets/images/base/bg.png');
    background-size: 100% 100%;
    overflow-x: hidden !important;
    position: relative;

    .grid-logo {
        position: absolute;
        width: 7rem;
        height: 2rem;
        left: 8rem;
        top: 0.5rem;
        background-image: url('../../assets/images/base/grid_logo.png');
        background-size: 100% 100%;
        background-position: center;
        /* 防止背景图片重复 */
        background-repeat: no-repeat;
    }

    .pg-title-ctn {
        height: 5rem;
    }

    .pg-content-ctn {
        height: 62.5rem;
    }

    .back-button {
        cursor: pointer;
        width: 10rem;
        height: 2rem;
        position: absolute;
        font-size: 1rem;
        color: #fff;
        top: 5rem;
        left: 20rem;
        display: flex;
        justify-content: center;
        padding-top: 0.25rem;
        background-image: url('../../assets/images/microPowerGrid/button_1_click.png');
        background-size: 100% 100%;
        background-position: center;
        /* 防止背景图片重复 */
        background-repeat: no-repeat;
        z-index: 1;
    }

    .fridge-button {
        cursor: pointer;
        width: 10rem;
        height: 8rem;
        // border: 1px solid;
        position: absolute;
        top: 17rem;
        left: 39rem;
        z-index: 1;
    }

    .tv-button {
        cursor: pointer;
        width: 10rem;
        height: 7rem;
        // border: 1px solid;
        position: absolute;
        top: 27rem;
        left: 45.2rem;
        z-index: 1;
    }

    .air-button {
        cursor: pointer;
        width: 10rem;
        height: 7rem;
        // border: 1px solid;
        position: absolute;
        top: 27rem;
        right: 43.8rem;
        z-index: 1;
    }

    .wash-button {
        cursor: pointer;
        width: 10rem;
        height: 7rem;
        // border: 1px solid;
        position: absolute;
        top: 18rem;
        right: 37.5rem;
        z-index: 1;
    }

    .ic-button {
        cursor: pointer;
        width: 10rem;
        height: 6rem;
        // border: 1px solid;
        position: absolute;
        top: 9rem;
        right: 43.3rem;
        z-index: 1;
    }

    .mo-button {
        cursor: pointer;
        width: 10rem;
        height: 6rem;
        // border: 1px solid;
        position: absolute;
        top: 9rem;
        left: 45.7rem;
        z-index: 1;
    }
}

.chart-cnt {
    position: relative;

    .item-tooltip {
        width: 18rem;
        height: 5rem;
        position: absolute;
        left: 50%;
        top: 40%;
        border-radius: 0.1rem;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        padding: 0.5rem;
        font-size: 1.1rem;
        color: #fff;
    }

    .chart {
        width: 55rem;
        height: 20rem;
    }
}
</style>
