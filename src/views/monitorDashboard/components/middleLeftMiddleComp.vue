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
                        <span class="chart-button-img-2" @click="init('WEEK')">
                            <img v-if="typeSelected === 'WEEK'"
                                src="../../../assets/images/monitorDashboard/button_2_click.png">
                            <img v-else src="../../../assets/images/monitorDashboard/button_2_not_click.png">
                        </span>
                        <span>月电量</span>
                    </div>
                </div>
            </div>
            <img style="width: 100%; height : 16rem;"
                src="../../../assets/images/monitorDashboard/middleLeftMiddle.png">
            <!-- <div ref="lineChartRef" class="item-chart"></div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';

const lineChartRef = ref<any>();
const typeSelected = ref<string>('DAY');


watch(() => typeSelected.value,
    (_nv: string) => {
        console.log('xx', _nv);
    });
onMounted(() => {
    init();
});
const init = async (dateType: string = 'DAY') => {
    typeSelected.value = dateType;
    //默认日发电量请求API
    const elecData: any = await elecTotal(dateType);

};

async function elecTotal(dateType: string) {
    const elecData: any = {};
    if (dateType == 'DAY') {
        elecData.xAxisData = ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'];
        // const res: any = await DAY_API();
        elecData.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330];
    } else {
        elecData.xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        // const res: any = await WEEK_API();
        elecData.seriesData = [1330, 1320, 820, 932, 901, 934, 1290];
    }
    return elecData;

}
</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;

    .item-title {
        // border: 1px solid rgb(165, 252, 184);
        position: relative;
    }

    .item-chart {
        width: 100%;
        height: 16rem;
        // border: 1px solid red;
    }
}
</style>
