<template>
    <div class="device-ctn">
        <div class="device-left-ctn">
            <img class="left-img-title" :src="`${baseURL}/public/images/microPowerGrid/device_label.png`">
            <div class="left-title">
                {{ props.content?.title }}
            </div>
            <slot></slot>
            <img class="left-img-device"
                :src="`${baseURL}/public/images/microPowerGrid/${props.content?.deviceImg}.png`">
        </div>
        <div class="device-right-ctn" style="">
            <div class="right-item" v-for="(it, i) in props.content?.cont_data" :key="i">
                <div class="item-left">
                    <img :src="`${baseURL}/public/images/microPowerGrid/${it.iconName}.png`">
                </div>
                <div class="item-right">
                    <div class="item-right-top">
                        {{ it.dataName }}
                    </div>
                    <div class="item-right-bottom">
                        <div class="bottom-data">
                            <span v-if="String(it.realData).length < 4">
                                {{ it.realData }}
                            </span>
                            <el-tooltip v-else effect="customized" :content="`${it.realData} ${it.unit}`"
                                placement="top">
                                {{ String(it.realData).slice(0, 2) }}..
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
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";


const props = defineProps(['content']);
const baseURL: any = import.meta.env.BASE_URL;

onMounted(() => {
    init();
});
const init = async () => {
    console.log(props.content);

};
</script>
<style lang="less" scoped>
.device-ctn {
    display: flex;
    height: 100%;

    .device-left-ctn {
        /* background-color: rgb(0,0,0,0.2); */
        flex: 1.4;
        display: flex;
        /* justify-content: center; */
        align-items: center;
        flex-direction: column;
        position: relative;

        .left-img-title {
            position: absolute;
            width: 7.5rem;
            height: 2rem;
            top: 0.8rem;
            left: 1.3rem;
        }

        .left-title {
            position: static;
            z-index: 2;
            margin: 1rem 0;
            font-size: 1rem;
            font-style: italic;
            font-weight: bolder;
            color: #fff;
        }

        .left-img-device {
            position: absolute;
            bottom: 2rem;
            width: 9rem;
        }
    }

    .device-right-ctn {
        flex: 2.5;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .right-item {
            height: 5rem;
            /* 每个子元素占据 50% 宽度 */
            flex: 0 0 50%;
            /* 包括 padding 和 border */
            box-sizing: border-box;
            // border: 1px solid #000;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .item-left {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 3.5rem;
                }
            }

            .item-right {
                flex: 2;
                // background-color: #ff5353;
                font-size: 0.65rem;
                font-weight: bold;
                color: #fff;
                padding-top: 1rem;

                .item-right-top {}

                .item-right-bottom {
                    // background-color: #ff5353;
                    height: 2.5rem;
                    display: flex;
                    align-items: end;
                    color: rgb(199, 239, 255);
                    letter-spacing: 0; //字体间隔

                    .bottom-data {
                        // background-color: #000000;
                        flex: 3;
                        font-weight: bolder;
                        font-size: 1.5rem;
                    }

                    .bottom-unit {
                        flex: 1;
                        margin-right: 0.2rem;
                    }
                }
            }
        }
    }
}
</style>