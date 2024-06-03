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
            <div class="item-ctn" v-loading="switchLoading" element-loading-background="rgba(122, 122, 122, 0.4)"
                :style="{
                    backgroundImage: `url('${baseURL}images/microPowerGrid/${typeSelected === 'SIM' ? 'sim_scene' : 'roof_flat'}.png')`,
                    backgroundSize: `${typeSelected === 'SIM' ? '100% 100%' : '100% 120%'}`,
                }">
                <!-- <el-select class="button-switch-scene" v-if="typeSelected === 'SIM'" v-model="scenario"
                    placeholder="Select">
                    <el-option @click="switchScene(item.value)" v-for="item in sceneList" :key="item.value"
                        :label="item.label" :value="item.value">
                        <el-tooltip effect="customized" :content="item.describe" placement="top">
                            <span>
                                {{ item.label }}
                            </span>
                        </el-tooltip>
                    </el-option>
                </el-select> -->
                <div class="button-switch-scene" v-if="typeSelected === 'SIM'" @click="dialogVisible = true"></div>
                <div class="button-exchange-home" v-if="typeSelected === 'SIM'" @click="switchHome()"></div>
                <canvas id="canvas" class="item-canvas-line" v-show="typeSelected === 'SIM'"></canvas>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 12rem;left: 29rem;">
                    <span>k1</span>
                    <img :style="{ width: switchObj['k1'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k1'] ? 'line_on' : 'line_off1'}.png`">
                </div>
                <!-- <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 16rem;left: 1.33rem;">
                    <span>k2</span>
                    <img :style="{ width: switchObj['k2'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k2'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div> -->
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 18.1rem;left: 17.37rem;">
                    <span>k3</span>
                    <img :style="{ width: switchObj['k3'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k3'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 18.1rem;left: 22.59rem;">
                    <img :style="{ width: switchObj['k4'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k4'] ? 'line_on_new' : 'line_off_new'}.png`">
                    <span>k4</span>
                </div>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 18.1rem;left: 32.45rem;">
                    <span>k5</span>
                    <img :style="{ width: switchObj['k5'] ? '1.4rem' : '1.5rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k5'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 18.1rem;left: 37.68rem;">
                    <img :style="{ width: switchObj['k6'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k6'] ? 'line_on_new' : 'line_off_new'}.png`">
                    <span>k6</span>
                </div>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 15.9rem;left: 49.7rem;">
                    <span>k8</span>
                    <img :style="{ width: switchObj['k8'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k8'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
                <div class="item-switch" v-if="typeSelected === 'SIM'" style="top: 7rem;right: 3.05rem;">
                    <span>k7</span>
                    <img :style="{ width: switchObj['k7'] ? '1.4rem' : '1.45rem' }"
                        :src="`${baseURL}images/microPowerGrid/${switchObj['k7'] ? 'line_on_new' : 'line_off_new'}.png`">
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="75rem" :before-close="handleClose">
        <template #title>
            <span style="font-size: 2rem">场景切换</span>
        </template>
        <el-radio-group v-model="scenario" class="ml-4">
            <el-radio :value="item.value" size="large" v-for="item in sceneList" :key="item.value">
                <span style="font-size: 1.2rem !important">{{ item.label }}: ({{
                    item.describe }})</span>
            </el-radio>
        </el-radio-group>
        <!-- <span>确定执行切换操作？</span> -->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel" style="color: black !important;">取消</el-button>
                <el-button type="primary" @click="confirm" :disabled="scenarioBackup === scenario">
                    {{ scenarioBackup === scenario ? "未改变" : "切换" }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSelectScene } from "@/utils/api/microPowerGridServer";
import { ElMessageBox, ElMessage } from 'element-plus'

const route: any = useRoute();
const router: any = useRouter();
const baseURL: any = import.meta.env.BASE_URL;
const typeSelected = ref<string>('FLAT');
const scenario = ref<string>('');
const scenarioBackup = ref<string>(scenario.value);
const dialogVisible = ref<boolean>(false);
const switchLoading = ref<boolean>(false);

const sceneList = ref<any[]>([
    {
        label: '场景一',
        value: '1',
        describe: 'K6、K7断开，K1、K3、K4、K5、K8闭合,可实现市电给储能电池充电，同时实现储能电池给负载供电的场景',
    }, {
        label: '场景二',
        value: '2',
        describe: 'K3、K4、K5、K7断开,K1、K6、K8闭合，可实现市电给负载供电的场景',
    }, {
        label: '场景三',
        value: '3',
        describe: 'K8断开,K7闭合，可实现市电给充电桩供电的场景(充电供电常用场景，不涉及光伏系统)',
    }, {
        label: '场景四',
        value: '4',
        describe: 'K1、K7断开,K3、K5、K8闭合，可实现光伏给负载供电的场景',
    }, {
        label: '场景五',
        value: '5',
        describe: 'K1、K7断开,K3、K5、K8闭合,可实现光伏发电剩余电量到储能的场景',
    }, {
        label: '场景六',
        value: '6',
        describe: 'K1、K7断开，K3、K5、K8闭合,可实现储能给负载供电的场景',
    },
]);

const switchObj = ref<any>({
    k1: false,
    k2: true,
    k3: true,
    k4: false,
    k5: true,
    k6: false,
    k7: false,
    k8: true,
});

onMounted(() => {
    init();
});
// watch(() => switchObj.value,
//     (_nv: any) => {
//         canvasColor(_nv);
//     }, {
//     deep: true,
// }
// )
watch(() => scenarioBackup.value,
    (_nv: string) => {
        console.log('场景切换成功，', _nv);
        getSwitchObj(_nv);
        canvasColor(switchObj.value);
    }
)

const init = async (dateType: string = 'SIM') => {
    typeSelected.value = dateType;
    if (!window.localStorage.getItem('scenario')) {
        window.localStorage.setItem('scenario', '1');
        scenario.value = '1';
        scenarioBackup.value = scenario.value;
    } else {
        scenario.value = window.localStorage.getItem('scenario') || '1';
        scenarioBackup.value = scenario.value;
    }
};

const switchScene = (_val: string) => {
    // console.log('_val', _val, scenario.value, scenarioBackup.value);
    dialogVisible.value = true;
}

const confirm = () => {
    switchLoading.value = true;
    dialogVisible.value = false;
    // console.log('_val', _val, scenario.value);
    getSelectScene(scenario.value).then((res: any) => {
        console.log('res', res);
        if (res.code === 0) {
            const scene: any = sceneList.value.filter((item: any) => {
                return item.value === scenario.value
            })
            ElMessage({
                message: `成功切换至${scene[0].label}`,
                type: 'success',
            });
            scenarioBackup.value = scenario.value;
            window.localStorage.setItem('scenario', scenario.value);
        } else {
            const scene: any = sceneList.value.filter((item: any) => {
                return item.value === scenarioBackup.value
            })
            ElMessage({
                message: `切换失败，恢复为${scene[0].label}`,
                type: 'error',
            })
            scenario.value = scenarioBackup.value;
        }
    }).catch((_err: any) => {
        const scene: any = sceneList.value.filter((item: any) => {
            return item.value === scenarioBackup.value
        })
        ElMessage({
            message: `切换失败，恢复为${scene[0].label}`,
            type: 'error',
        })
        scenario.value = scenarioBackup.value;
    }).finally(() => {
        switchLoading.value = false;
    })
}
const cancel = () => {
    scenario.value = scenarioBackup.value;
    dialogVisible.value = false;
}

const switchHome = () => {
    console.log('切换家用负荷场景');
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
    //第二条线（光伏-充电桩）第一段
    ctx.beginPath();
    ctx.moveTo(17.5, 111.5);
    ctx.lineTo(17.5, 68.5);
    ctx.strokeStyle = obj['k2'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第二条线（光伏-充电桩）第二段
    ctx.beginPath();
    ctx.moveTo(17.5, 68.5);
    ctx.lineTo(110.5, 68.5);
    ctx.strokeStyle = obj['k2'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第二条线（光伏-充电桩）第三段
    ctx.beginPath();
    ctx.moveTo(110.5, 68.5);
    ctx.lineTo(188.5, 68.5);
    ctx.strokeStyle = obj['k1'] ||
        (obj['k2'] && (obj['k5'] || obj['k6'] || obj['k8'])) ||
        (obj['k8'] && (obj['k3'] || obj['k4'] || obj['k2']))
        ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第二条线（光伏-充电桩）第四段
    ctx.beginPath();
    ctx.moveTo(188.5, 68.5);
    ctx.lineTo(267.5, 68.5);
    ctx.strokeStyle = obj['k8'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第二条线（光伏-充电桩）第五段
    ctx.beginPath();
    ctx.moveTo(267.5, 68.5);
    ctx.lineTo(267.5, 99.5);
    ctx.strokeStyle = obj['k8'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第三、四条线（储能设备）及公共线
    ctx.beginPath();
    // ctx.moveTo(110.5, 68.5);
    // ctx.lineTo(110.5, 77.5);
    ctx.moveTo(110.5, 77.5);
    ctx.lineTo(100.5, 77.5);
    ctx.lineTo(100.5, 97.5);
    ctx.strokeStyle = obj['k3'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    ctx.beginPath();
    // ctx.moveTo(110.5, 68.5);
    // ctx.lineTo(110.5, 77.5);
    ctx.moveTo(110.5, 77.5);
    ctx.lineTo(120.5, 77.5);
    ctx.lineTo(120.5, 97.5);
    ctx.strokeStyle = obj['k4'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //公共线
    ctx.beginPath();
    ctx.moveTo(110.5, 68.5);
    ctx.lineTo(110.5, 77.5);
    ctx.strokeStyle = obj['k3'] || obj['k4'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //第五、六条线（储能设备）及公共线
    ctx.beginPath();
    // ctx.moveTo(188.5, 68.5);
    // ctx.lineTo(188.5, 77.5);
    ctx.moveTo(188.5, 77.5);
    ctx.lineTo(178.5, 77.5);
    ctx.lineTo(178.5, 104.5);
    ctx.strokeStyle = obj['k5'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    ctx.beginPath();
    // ctx.moveTo(188.5, 68.5);
    // ctx.lineTo(188.5, 77.5);
    ctx.moveTo(188.5, 77.5);
    ctx.lineTo(198.5, 77.5);
    ctx.lineTo(198.5, 103.5);
    ctx.strokeStyle = obj['k6'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
    //公共线
    ctx.beginPath();
    ctx.moveTo(188.5, 68.5);
    ctx.lineTo(188.5, 77.5);
    ctx.strokeStyle = obj['k5'] || obj['k6'] ? 'rgba(0, 255, 76, 1)' : 'rgba(170, 170, 170, 1)';  // 设置线的颜色
    ctx.lineWidth = 1; // 设置线的宽度
    ctx.stroke();
}

const switchOnOff = (serial: string) => {
    switchObj.value[serial] = !switchObj.value[serial]
    console.log(switchObj.value);
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('场景不会切换，确定要关闭该窗口吗？')
        .then(() => {
            scenario.value = scenarioBackup.value;
            done();
        })
        .catch(() => {
            // catch error
        })
}

const getSwitchObj = (scenario: string) => {
    if (scenario == '1') {
        switchObj.value = {
            k1: true,
            k2: true,
            k3: true,
            k4: true,
            k5: true,
            k6: false,
            k7: false,
            k8: true,
        }
    } else if (scenario == '2') {
        switchObj.value = {
            k1: true,
            k2: true,
            k3: false,
            k4: false,
            k5: false,
            k6: true,
            k7: false,
            k8: true,
        }
    } else if (scenario == '3') {
        switchObj.value = {
            k1: false,
            k2: false,
            k3: false,
            k4: false,
            k5: false,
            k6: false,
            k7: true,
            k8: false,
        }
    } else if (scenario == '4') {
        switchObj.value = {
            k1: false,
            k2: true,
            k3: true,
            k4: false,
            k5: true,
            k6: false,
            k7: false,
            k8: true,
        }
    } else if (scenario == '5') {
        switchObj.value = {
            k1: false,
            k2: true,
            k3: true,
            k4: false,
            k5: true,
            k6: false,
            k7: false,
            k8: true,
        }
    } else if (scenario == '6') {
        switchObj.value = {
            k1: false,
            k2: true,
            k3: true,
            k4: false,
            k5: true,
            k6: false,
            k7: false,
            k8: true,
        }
    }
}

</script>
<style lang="less">
.el-radio {
    color: #ffffff !important;
}

.el-dialog {
    background-color: rgba(0, 67, 122, 0.7) !important;
    border: 1px solid rgb(0, 67, 122);
    box-shadow: inset 0 0 5px rgba(0, 67, 122, 0.8);

    >* {
        color: #ffffff;
    }
}
</style>

<style lang="less" scoped>
// :deep(.el-dialog) {
//     background-color: transparent;
// }

// :deep(.el-select__wrapper) {
//     border-radius: 5rem;
//     background-color: transparent;
// }

// :deep(.el-select__popper) {
//     border: none !important;
//     background-color: transparent !important;
//     color: red;
// }

// :deep(.el-popper .is-pure .is-light .el-select__popper) {

//     background-color: transparent !important;
// }

// :deep(.el-select__placeholder) {
//     span {
//         color: transparent;
//     }
// }
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
