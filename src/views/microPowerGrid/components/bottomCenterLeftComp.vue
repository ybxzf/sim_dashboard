<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>中央空调实时监控</span>
            </div>
            <div class="item-content">
                <div class="content-title">
                    <img src="../../../assets/images/microPowerGrid/mini_title.png">
                    <span>运行概况</span>
                </div>
                <div class="content-cnt">
                    <div class="content-cnt-item" v-for="(it, i) in runningData" :key="i">
                        <div class="content-cnt-item-left">
                            <img :src="`${baseURL}images/microPowerGrid/${it.imgName}.png`">
                        </div>
                        <div class="content-cnt-item-right">
                            <div class="item-right-top">
                                <img src="../../../assets/images/microPowerGrid/running_bg.png">
                                <span>{{ it.title }}</span>
                            </div>

                            <div class="item-right-bottom">
                                <div class="bottom-data">
                                    <span v-if="String(it.data).length < 7">{{ it.data }}</span>
                                    <span v-else-if="String(it.data).length >= 7 && String(it.data).length < 9" style="font-size: 0.9rem;">{{
                                        it.data }}</span>
                                    <el-tooltip v-else class="item-right-bottom" effect="customized"
                                        :content="`${it.data}${it.unit}`" placement="top">
                                        <span>{{ String(it.data).slice(0, 2) }}...</span>
                                    </el-tooltip>
                                </div>
                                <div class="bottom-unit">
                                    <span>{{ it.unit }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { getNowDltj, getSelectMonthDlsyqk } from "@/utils/api/microPowerGridServer";
import { informStore } from "@/stores/inform";

const inStore = informStore();
const baseURL: any = import.meta.env.BASE_URL;
const runningData = ref<any>([
    // {
    //     imgName: 'room_temp',
    //     title: '室内温度',
    //     data: inStore.runningSummary.indoorTemp,
    //     unit: '℃',
    // },
     {
        imgName: 'outdoor_temp',
        title: '室外温度',
        data: inStore.runningSummary.outdoorTemp,
        unit: '℃',
    }, {
        imgName: 'daily_power_consume',
        title: '日耗电量',
        data: '0',
        unit: 'kWh',
    }, {
        imgName: 'monthly_power_consume',
        title: '月耗电量',
        data: '0',
        unit: 'kWh',
    },
]);

let interval: any = {}; //循环器
watch(() => inStore.runningSummary,
    () => {
        // runningData.value[0].data = inStore.runningSummary.indoorTemp;
        runningData.value[0].data = inStore.runningSummary.outdoorTemp;
    }, {
    deep: true,
}
)

onMounted(() => {
    init();
    interval.inter1 = setInterval(() => {
        // console.log('更新数据');
        init();
    }, 1000 * 30)
});
const init = async () => {
    getNowDltj().then((res: any) => {
        if (res.code === 0) {
            res.data.map((item: any) => {
                if (item.typeCode == '中央空调') {
                    runningData.value[1].data = item.quantity;
                }
            })
        }
    });
    getSelectMonthDlsyqk().then((res: any) => {
        if (res.code === 0) {
            res.data.map((item: any) => {
                if (item.name == '中央空调') {
                    runningData.value[2].data = item.num;
                }
            })
        }
    });

};
</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    font-size: 1rem;
    background-image: url('');

    .flex-item {
        padding: 0 1rem 1rem 1rem;

        .item-title {
            // border: 1px solid #53ff5b;
            height: 3rem;
            font-size: 1rem;
            display: flex;
            align-items: center;
        }

        .item-content {
            width: 30rem;
            height: 16.7rem;
            // border: 1px solid red;

            .content-title {
                // border: 1px solid #fff;
                height: 1.7rem;
                position: relative;
                padding-left: 2rem;
                font-style: italic;
                font-weight: bolder;
                color: #fff;
                background: linear-gradient(to bottom, white, rgb(148, 203, 255));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;

                img {
                    position: absolute;
                    width: 20rem;
                    left: 1.2rem;
                }
            }

            .content-cnt {
                // border: 1px solid #fff;
                // background-color: #fff;
                color: #fff;
                font-weight: 400;
                height: 15rem;
                display: flex;
                flex-wrap: wrap;
                // justify-content: center;

                .content-cnt-item {
                    // border: 1px solid rgb(199, 239, 255);
                    flex-basis: 13rem;
                    /* 包括 padding 和 border */
                    box-sizing: border-box;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                    .content-cnt-item-left {
                        flex: 1.5;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        img {
                            width: 4rem;
                        }
                    }

                    .content-cnt-item-right {
                        flex: 2;

                        // background-color: #ff5353;
                        .item-right-top {
                            height: 4rem;
                            display: flex;
                            align-items: center;
                            position: relative;
                            padding-left: 0.5rem;

                            img {
                                position: absolute;
                                width: 8rem;
                                left: 0;
                            }

                            span {
                                z-index: 1;
                            }
                        }

                        .item-right-bottom {
                            height: 2.5rem;
                            display: flex;
                            align-items: end;
                            color: rgb(199, 239, 255);

                            .bottom-data {
                                flex: 1;
                                font-size: 1.2rem;
                                font-weight: bolder;
                            }

                            .bottom-unit {
                                flex: 1
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
