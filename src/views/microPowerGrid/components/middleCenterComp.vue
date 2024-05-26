<template>
    <div class="flex-item-ctn">
        <div class="flex-item">
            <div class="item-title">
                <img class="button-img-1" @click="init('FLAT')"
                    :src="`${baseURL}images/microPowerGrid/${typeSelected === 'FLAT' ? 'button_1_click' : 'button_1_not_click'}.png`">
                <div class="title-button">楼顶平面图</div>
                <img class="button-img-2" @click="init('SIM')"
                    :src="`${baseURL}images/microPowerGrid/${typeSelected === 'SIM' ? 'button_1_click' : 'button_1_not_click'}.png`">
                <div class="title-button">仿真场景</div>
            </div>
            <div class="item-ctn" :style="{
                backgroundImage: `url('${baseURL}images/microPowerGrid/${typeSelected === 'SIM' ? 'sim_scene' : 'roof_flat'}.png')`,
                backgroundSize: `${typeSelected === 'SIM' ? '100% 100%' : '100% 120%'}`,
            }">
                <div class="button-switch-scene" v-if="typeSelected === 'SIM'" @click="dialogVisible = true"></div>
                <div class="button-exchange-home" v-if="typeSelected === 'SIM'" @click="switchScene()"></div>
                <canvas id="canvas" class="item-canvas-line" v-show="typeSelected === 'SIM'"></canvas>
                <div class="item-switch" @click="switchOnOff('k1')" v-if="typeSelected === 'SIM'"
                    style="top: 12rem;left: 29rem;">
                    <span>k1</span>
                    <img :style="{ width: switchObj['k1'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k1'] ? 'line_on' : 'line_off1'}.png`">
                </div>
                <div class="item-switch" @click="switchOnOff('k2')" v-if="typeSelected === 'SIM'"
                    style="top: 16rem;left: 1.33rem;">
                    <span>k2</span>
                    <img :style="{ width: switchObj['k2'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k2'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" @click="switchOnOff('k3')" v-if="typeSelected === 'SIM'"
                    style="top: 18.1rem;left: 17.37rem;">
                    <span>k3</span>
                    <img :style="{ width: switchObj['k3'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k3'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" @click="switchOnOff('k4')" v-if="typeSelected === 'SIM'"
                    style="top: 18.1rem;left: 22.59rem;">
                    <img :style="{ width: switchObj['k4'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k4'] ? 'line_on_new' : 'line_off_new'}.png`">
                    <span>k4</span>
                </div>
                <div class="item-switch" @click="switchOnOff('k5')" v-if="typeSelected === 'SIM'"
                    style="top: 18.1rem;left: 32.45rem;">
                    <span>k5</span>
                    <img :style="{ width: switchObj['k5'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k5'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" @click="switchOnOff('k6')" v-if="typeSelected === 'SIM'"
                    style="top: 18.1rem;left: 37.68rem;">
                    <img :style="{ width: switchObj['k6'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k6'] ? 'line_on_new' : 'line_off_new'}.png`">
                    <span>k6</span>
                </div>
                <div class="item-switch" @click="switchOnOff('k8')" v-if="typeSelected === 'SIM'"
                    style="top: 15.9rem;left: 49.7rem;">
                    <span>k8</span>
                    <img :style="{ width: switchObj['k8'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k8'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" @click="switchOnOff('k7')" v-if="typeSelected === 'SIM'"
                    style="top: 7rem;right: 3.05rem;">
                    <span>k7</span>
                    <img :style="{ width: switchObj['k7'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k7'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="场景切换" width="500" :before-close="handleClose">
        <span>确定执行切换操作？</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox } from 'element-plus'

const route: any = useRoute();
const router: any = useRouter();
const baseURL: any = import.meta.env.BASE_URL;
const typeSelected = ref<string>('FLAT');
const dialogVisible = ref<boolean>(false);

const switchObj = ref<any>({});

onMounted(() => {
    init();
});
watch(() => switchObj.value,
    (_nv: any) => {
        canvasColor(_nv);
    }, {
    deep: true,
}
)
const init = async (dateType: string = 'SIM') => {
    typeSelected.value = dateType;
    //请求开关API
    switchObj.value = {
        k1: false,
        k2: true,
        k3: true,
        k4: false,
        k5: true,
        k6: false,
        k7: false,
        k8: true,
    };
    canvasColor(switchObj.value);
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

const canvasColor = (obj: any) => {
    const canvas: any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // 第一条线（市电-充电桩）
    ctx.beginPath();
    ctx.moveTo(234.5, 30.5);
    ctx.lineTo(280.5, 30.5);
    ctx.lineTo(280.5, 97.5);
    ctx.strokeStyle = obj['k7'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第二条线（光伏-充电桩）
    ctx.beginPath();
    ctx.moveTo(17.5, 111.5);
    ctx.lineTo(17.5, 68.5);
    ctx.lineTo(267.5, 68.5);
    ctx.lineTo(267.5, 99.5);
    ctx.strokeStyle = obj['k2'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第三、四条线（储能设备）
    ctx.beginPath();
    ctx.moveTo(110.5, 68.5);
    ctx.lineTo(110.5, 77.5);
    ctx.lineTo(100.5, 77.5);
    ctx.lineTo(100.5, 97.5);
    ctx.strokeStyle = obj['k3'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(110.5, 68.5);
    ctx.lineTo(110.5, 77.5);
    ctx.lineTo(120.5, 77.5);
    ctx.lineTo(120.5, 97.5);
    ctx.strokeStyle = obj['k4'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第五、六条线（储能设备）
    ctx.beginPath();
    ctx.moveTo(188.5, 68.5);
    ctx.lineTo(188.5, 77.5);
    ctx.lineTo(178.5, 77.5);
    ctx.lineTo(178.5, 104.5);
    ctx.strokeStyle = obj['k5'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(188.5, 68.5);
    ctx.lineTo(188.5, 77.5);
    ctx.lineTo(198.5, 77.5);
    ctx.lineTo(198.5, 103.5);
    ctx.strokeStyle = obj['k6'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
}

const switchOnOff = (serial: string) => {
    switchObj.value[serial] = !switchObj.value[serial]
    console.log(switchObj.value);
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定要关闭该窗口吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

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
            height: 35rem;
            background-position: center;
            /* 防止背景图片重复 */
            background-repeat: no-repeat;
            position: relative;
            // background-color: rgba(228, 255, 234, 0.5);
            color: #fff;
            font-size: 1rem;

            .button-switch-scene {
                background-image: url('../../../assets/images/microPowerGrid/exchange_botton.png');
                background-size: 100% 100%;
                background-position: center;
                /* 防止背景图片重复 */
                background-repeat: no-repeat;
                // position: relative;
                // background-color: rgba(228, 255, 234, 0.5);
                position: absolute;
                left: 2rem;
                height: 2rem;
                width: 6.5rem;
                cursor: pointer;
            }

            .button-exchange-home {
                position: absolute;
                cursor: pointer;
                width: 10rem;
                height: 10.8rem;
                bottom: 0;
                right: 16.2rem;
                // background-color: rgba(228, 255, 234, 0.5);
            }

            .item-canvas-line {
                width: 100%;
                height: 35rem;
                // background-color: rgba(0, 255, 76, 0.17);
            }

            .item-switch {
                position: absolute;
                cursor: pointer;
                display: flex;
                align-items: center;

                img {
                    // width: 1.4rem;
                }
            }
        }

    }
}
</style>
