<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <img class="button-img-1" @click="init('FLAT')"
                    :src="`${baseURL}/public/images/microPowerGrid/${typeSelected === 'FLAT' ? 'button_1_click' : 'button_1_not_click'}.png`">
                <div class="title-button">楼顶平面图</div>
                <img class="button-img-2" @click="init('SIM')"
                    :src="`${baseURL}/public/images/microPowerGrid/${typeSelected === 'SIM' ? 'button_1_click' : 'button_1_not_click'}.png`">
                <div class="title-button">仿真场景</div>
            </div>
            <div class="item-ctn" :style="{
                backgroundImage: `url('${baseURL}/public/images/microPowerGrid/${typeSelected === 'SIM' ? 'middle_sim' : 'middle_flat'}.png')`,
            }">
                <div class="button-switch-scene" v-if="typeSelected === 'SIM'" @click="switchScene()"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const route: any = useRoute();
const router: any = useRouter();
const baseURL: any = import.meta.env.BASE_URL;
const typeSelected = ref<string>('FLAT');

onMounted(() => {
    init();
});
const init = async (dateType: string = 'FLAT') => {
    typeSelected.value = dateType;
    //请求API

};

const switchScene = () => {
    console.log('切换场景');
    console.log('route', route);
    console.log('router', router);
    router.push({
        name: 'monitorDashboard',
        params: {}
    })
};
</script>
<style lang="less" scoped>
.flex-item-ctn {
    background-image: url('');
    // background-color: rgba(128, 201, 60, 0.767);

    .flex-item {
        // background-color: rgba(255, 116, 116, 0.5);
        height: 38rem;
        width: 100%;
        position: relative;

        .item-title {
            display: flex;
            justify-content: end;

            .title-button {
                // width: 10rem;
                height: 2rem;
                margin-right: 5rem;


                /* background-color: #fff; */
            }

            .button-img-1 {
                cursor: pointer;
                width: 10rem;
                height: 2rem;
                position: absolute;
                top: 0.8rem;
                right: 13rem;
            }

            .button-img-2 {
                cursor: pointer;
                width: 10rem;
                height: 2rem;
                position: absolute;
                top: 0.8rem;
                right: 3rem;
            }

        }

        .item-ctn {
            height: 36rem;
            background-size: 100% 100%;
            background-position: center;
            /* 防止背景图片重复 */
            background-repeat: no-repeat;
            position: relative;

            .button-switch-scene {
                // background-color: rgba(228, 255, 234, 0.5);
                position: absolute;
                left: 2rem;
                height: 2rem;
                width: 6.5rem;
                cursor: pointer;
            }
        }

    }
}
</style>
