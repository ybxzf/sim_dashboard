<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <span>昨日电量统计</span>
            </div>
            <!-- <img style="width: 100%; height : 16rem;" src="../../../assets/images/monitorDashboard/middleLeftTop.png"> -->
            <div class="content-cnt">

                <div class="content-cnt-item" v-for="(it, i) in runningData" :key="i">
                    <div class="content-cnt-item-left">
                        <img :src="`${baseURL}images/monitorDashboard/${it.imgName}.png`">
                    </div>
                    <div class="content-cnt-item-right">
                        <div class="item-right-top">
                            <!-- <img src="../../../assets/images/microPowerGrid/running_bg.png"> -->
                            <span>{{ it.title }}</span>
                        </div>
                        <div class="item-right-bottom">
                            <div class="bottom-data">
                                <span v-if="String(it.data).length < 5">
                                    {{ it.data }}
                                </span>
                                <el-tooltip v-else effect="customized" :content="`${it.data} ${it.unit}`"
                                    placement="top">
                                    {{ String(it.data).slice(0, 3) }}..
                                </el-tooltip>


                                <!-- <span>{{ it.data }}</span> -->
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
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";

const baseURL: any = import.meta.env.BASE_URL;
const runningData = ref<any[]>();


onMounted(() => {
    init();

});
const init = async () => {
    //请求API
    runningData.value = [
        {
            imgName: 'real-time_power_total',
            title: '实时总功率',
            data: '23412',
            unit: 'kW',
        }, {
            imgName: 'daily_power_total',
            title: '日总电量',
            data: '2342',
            unit: 'kWh',
        }, {
            imgName: 'month_power_total',
            title: '总电量',
            data: '2342',
            unit: 'kWh',
        },
    ]
};

</script>
<style lang="less" scoped>
.flex-item-ctn {
    display: block;
    position: relative;
    font-size: 1rem;
    font-weight: bolder;

    .flex-item {
        width: 100%;
        height: 20rem;

        .content-cnt {
            width: 100%;
            height: 15rem;
            // background-color: rgb(255, 255, 100, 0.9);
            color: #fff;
            font-weight: 400;
            display: flex;
            flex-wrap: wrap;

            .content-cnt-item {
                // border: 1px solid rgb(199, 239, 255);
                flex-basis: 14rem;
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
                        width: 4.5rem;
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

                        // img {
                        //     position: absolute;
                        //     width: 8rem;
                        //     left: 0;
                        // }

                        // span {
                        //     z-index: 1;
                        // }
                    }

                    .item-right-bottom {
                        height: 2.5rem;
                        display: flex;
                        align-items: baseline;
                        color: rgb(199, 239, 255);

                        .bottom-data {
                            flex: 1;
                            font-size: 1.5rem;
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
</style>
